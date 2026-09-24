#!/usr/bin/env python3
"""
FUMI AI - Script d'Entraînement Souverain LoRA via Unsloth
Entraîne le modèle Fumi-7B (basé sur Qwen 2.5 7B Instruct) sur GPU cloud économique ou Colab gratuit.
"""

import os
import torch

def train():
    try:
        from unsloth import FastLanguageModel
        from datasets import load_dataset
        from trl import SFTTrainer
        from transformers import TrainingArguments
    except ImportError:
        print("❌ Bibliothèques d'entraînement manquantes.")
        print("💡 Installez Unsloth avec :")
        print('   pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"')
        print("   pip install trl transformers datasets accelerate bitsandbytes")
        return

    max_seq_length = 4096
    dtype = None # Auto-détection (Float16 ou Bfloat16 selon GPU)
    load_in_4bit = True # Économise 80% de mémoire VRAM

    print("🚀 Chargement du modèle de base : Qwen/Qwen2.5-7B-Instruct...")
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name="Qwen/Qwen2.5-7B-Instruct",
        max_seq_length=max_seq_length,
        dtype=dtype,
        load_in_4bit=load_in_4bit,
    )

    print("⚡ Configuration des adaptateurs LoRA souverains...")
    model = FastLanguageModel.get_peft_model(
        model,
        r=16,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
        lora_alpha=16,
        lora_dropout=0,
        bias="none",
        use_gradient_checkpointing="unsloth",
        random_state=3407,
    )

    dataset_path = os.path.join(os.path.dirname(__file__), "..", "datasets", "sample_fumi_dataset.jsonl")
    if not os.path.exists(dataset_path):
        print(f"⚠️ Dataset non trouvé à {dataset_path}, vérifiez vos données.")
        return

    print("📚 Préparation du dataset d'entraînement...")
    dataset = load_dataset("json", data_files=dataset_path, split="train")

    def formatting_prompts_func(examples):
        convs = examples["conversations"]
        texts = []
        for conv in convs:
            text = tokenizer.apply_chat_template(conv, tokenize=False, add_generation_prompt=False)
            texts.append(text)
        return {"text": texts}

    formatted_dataset = dataset.map(formatting_prompts_func, batched=True)

    print("🔥 Démarrage de l'entraînement SFT...")
    trainer = SFTTrainer(
        model=model,
        tokenizer=tokenizer,
        train_dataset=formatted_dataset,
        dataset_text_field="text",
        max_seq_length=max_seq_length,
        dataset_num_proc=2,
        packing=False,
        args=TrainingArguments(
            per_device_train_batch_size=2,
            gradient_accumulation_steps=4,
            warmup_steps=10,
            max_steps=200,
            learning_rate=2e-4,
            fp16=not torch.cuda.is_bf16_supported(),
            bf16=torch.cuda.is_bf16_supported(),
            logging_steps=1,
            optim="adamw_8bit",
            weight_decay=0.01,
            lr_scheduler_type="linear",
            seed=3407,
            output_dir="fumi_checkpoints",
        ),
    )

    trainer.train()

    output_dir = "fumi-7b-v1"
    print(f"💾 Sauvegarde du modèle souverain FUMI fusionné dans : {output_dir}...")
    model.save_pretrained_merged(output_dir, tokenizer, save_method="merged_16bit")
    print("✨ Modèle FUMI 1.0 prêt pour déploiement sur vLLM ou Hugging Face !")

if __name__ == "__main__":
    train()
