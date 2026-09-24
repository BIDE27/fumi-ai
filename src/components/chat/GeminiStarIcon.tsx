import React from 'react';

interface GeminiStarIconProps {
  className?: string;
  size?: number;
  variant?: 'brand' | 'rainbow';
}

export function GeminiStarIcon({ className = '', size = 24, variant = 'brand' }: GeminiStarIconProps) {
  const gradientId = variant === 'brand' ? 'brand-sacred-star' : 'gemini-grad-star';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {variant === 'brand' ? (
          <radialGradient
            id="brand-sacred-star"
            cx="40%"
            cy="40%"
            r="60%"
            fx="25%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#f0e6cb" />
            <stop offset="25%" stopColor="#dab372" />
            <stop offset="55%" stopColor="#d1984b" />
            <stop offset="80%" stopColor="#a26131" />
            <stop offset="100%" stopColor="#6b4028" />
          </radialGradient>
        ) : (
          <radialGradient
            id="gemini-grad-star"
            cx="50%"
            cy="50%"
            r="50%"
            fx="20%"
            fy="20%"
          >
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="30%" stopColor="#9B72CB" />
            <stop offset="60%" stopColor="#D96570" />
            <stop offset="100%" stopColor="#F4B400" />
          </radialGradient>
        )}
      </defs>
      <path
        d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

// Avatar officiel de Fumi (sans encerclement, rendu libre et transparent)
export function FumiAvatar({ 
  size = 34, 
  className = '',
  bordered = false 
}: { 
  size?: number | string; 
  className?: string;
  bordered?: boolean;
}) {
  return (
    <img 
      src="/images/fumi/fumi_avatar.png" 
      alt="Fumi" 
      loading="eager"
      decoding="async"
      className={`shrink-0 object-contain select-none pointer-events-none ${className}`} 
      style={{ width: size, height: size }} 
    />
  );
}

// Logo officiel de Fumi (composé de l'avatar et de la typographie avec espacement flex garanti sans chevauchement)
export function FumiLogo({ 
  height = 32, 
  className = '',
  withText = true 
}: { 
  height?: number | string; 
  className?: string;
  withText?: boolean;
}) {
  const numericHeight = typeof height === 'number' ? height : parseInt(String(height), 10) || 32;
  const avatarSize = numericHeight;
  const letterHeight = Math.max(16, Math.round(numericHeight * 0.72));

  return (
    <div className={`inline-flex items-center gap-2 select-none shrink-0 ${className}`}>
      <FumiAvatar size={avatarSize} />
      {withText && <FumiLettre height={letterHeight} />}
    </div>
  );
}

// Typographie officielle de Fumi (lettres uniquement, sans la mascotte)
export function FumiLettre({ 
  height = 32, 
  className = '' 
}: { 
  height?: number | string; 
  className?: string;
}) {
  return (
    <img 
      src="/images/fumi/fumi_lettre.png" 
      alt="Fumi" 
      loading="eager"
      decoding="async"
      className={`w-auto object-contain shrink-0 select-none ${className}`} 
      style={{ height: height }}
    />
  );
}
