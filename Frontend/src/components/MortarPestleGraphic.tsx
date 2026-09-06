import React from 'react';

interface MortarPestleGraphicProps {
  className?: string;
  size?: number;
  glow?: boolean;
  animate?: boolean;
}

export const MortarPestleGraphic: React.FC<MortarPestleGraphicProps> = ({
  className = '',
  size = 200,
  glow = true,
  animate = false,
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Warm ambient underglow */}
      {glow && (
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(184, 149, 90, 0.45) 0%, rgba(142, 36, 28, 0.3) 50%, transparent 75%)',
            transform: 'scale(1.3) translateY(10%)',
          }}
        />
      )}

      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={`w-full h-full drop-shadow-[0_12px_24px_rgba(43,26,20,0.35)] ${animate ? 'hover:scale-105 transition-transform duration-300' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Wooden bowl gradients */}
          <radialGradient id="woodBowlGrad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7E422F" />
            <stop offset="35%" stopColor="#5B291D" />
            <stop offset="70%" stopColor="#431C13" />
            <stop offset="100%" stopColor="#2D110B" />
          </radialGradient>

          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8E4A35" />
            <stop offset="30%" stopColor="#B36F52" />
            <stop offset="50%" stopColor="#C98B6D" />
            <stop offset="70%" stopColor="#9B563E" />
            <stop offset="100%" stopColor="#4D1E15" />
          </linearGradient>

          <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8955A" />
            <stop offset="50%" stopColor="#E2C78E" />
            <stop offset="100%" stopColor="#96743A" />
          </linearGradient>

          {/* Pestle gradient */}
          <linearGradient id="pestleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#96523D" />
            <stop offset="25%" stopColor="#BA7559" />
            <stop offset="55%" stopColor="#6C3324" />
            <stop offset="100%" stopColor="#3C170E" />
          </linearGradient>

          {/* Inner cavity depth */}
          <radialGradient id="innerCavity" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#250F09" />
            <stop offset="75%" stopColor="#35140C" />
            <stop offset="100%" stopColor="#4F2116" />
          </radialGradient>

          {/* Herb leaves gradients */}
          <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EB84C" />
            <stop offset="50%" stopColor="#418728" />
            <stop offset="100%" stopColor="#265B17" />
          </linearGradient>

          <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8ACD62" />
            <stop offset="60%" stopColor="#549E31" />
            <stop offset="100%" stopColor="#33681E" />
          </linearGradient>

          {/* Spices & Turmeric */}
          <linearGradient id="turmericGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E59934" />
            <stop offset="50%" stopColor="#C9751A" />
            <stop offset="100%" stopColor="#8A4A0A" />
          </linearGradient>

          <linearGradient id="cinnamonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#82462E" />
            <stop offset="50%" stopColor="#A86345" />
            <stop offset="100%" stopColor="#5C2D1B" />
          </linearGradient>
        </defs>

        {/* Ambient shadow underneath base */}
        <ellipse cx="100" cy="174" rx="55" ry="12" fill="#1C0905" opacity="0.65" filter="blur(3px)" />

        {/* --- Surrounding Spices & Botanicals (Behind and sides) --- */}
        {/* Cinnamon stick on the left side */}
        <g transform="rotate(-25 50 162)">
          <rect x="36" y="156" width="36" height="7" rx="3.5" fill="url(#cinnamonGrad)" stroke="#4A2117" strokeWidth="0.75" />
          <line x1="42" y1="159" x2="68" y2="159" stroke="#683421" strokeWidth="0.75" />
          <ellipse cx="71" cy="159.5" rx="1.8" ry="3" fill="#502414" />
        </g>

        {/* Turmeric rhizome on right side */}
        <g transform="rotate(18 152 165)">
          <path d="M142 163 C145 158, 158 159, 164 163 C168 166, 166 172, 158 171 C150 170, 140 168, 142 163 Z" fill="url(#turmericGrad)" stroke="#743C08" strokeWidth="0.75" />
          {/* Knobby lines */}
          <path d="M148 160 C149 164, 150 168, 151 170" stroke="#8A4A0A" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M156 161 C157 165, 157 169, 158 171" stroke="#8A4A0A" strokeWidth="0.8" strokeLinecap="round" />
        </g>

        {/* Pepper corns / dried seeds */}
        <circle cx="58" cy="173" r="3.2" fill="#2C160F" stroke="#4F2C1F" strokeWidth="0.6" />
        <circle cx="65" cy="175" r="2.6" fill="#3D2015" stroke="#5E3524" strokeWidth="0.5" />
        <circle cx="140" cy="174" r="3.0" fill="#2C160F" stroke="#4F2C1F" strokeWidth="0.6" />
        <circle cx="147" cy="176" r="2.4" fill="#3D2015" />

        {/* Botanical leafy sprig emerging behind mortar on left */}
        <g className="origin-bottom-left">
          {/* Stem */}
          <path d="M68 115 C58 98, 48 85, 38 72" stroke="#48782E" strokeWidth="2.2" strokeLinecap="round" />
          {/* Leaf 1 */}
          <path d="M38 72 C42 63, 56 64, 52 76 C48 85, 41 78, 38 72 Z" fill="url(#leafGrad1)" />
          <path d="M39 72 Q 46 70 50 75" stroke="#77C250" strokeWidth="0.6" fill="none" />
          {/* Leaf 2 */}
          <path d="M46 88 C40 82, 30 86, 32 94 C35 101, 44 95, 46 88 Z" fill="url(#leafGrad2)" />
          {/* Leaf 3 */}
          <path d="M57 102 C50 97, 42 101, 45 109 C49 114, 56 108, 57 102 Z" fill="url(#leafGrad1)" />
        </g>

        {/* Botanical leafy sprig emerging behind mortar on right */}
        <g>
          {/* Stem */}
          <path d="M132 112 C146 95, 156 82, 168 68" stroke="#48782E" strokeWidth="2.2" strokeLinecap="round" />
          {/* Leaf 1 */}
          <path d="M168 68 C162 60, 149 63, 152 75 C155 83, 164 75, 168 68 Z" fill="url(#leafGrad1)" />
          <path d="M167 68 Q 159 68 154 74" stroke="#77C250" strokeWidth="0.6" fill="none" />
          {/* Leaf 2 */}
          <path d="M154 86 C161 80, 171 85, 168 93 C165 99, 156 93, 154 86 Z" fill="url(#leafGrad2)" />
          {/* Leaf 3 */}
          <path d="M142 100 C149 96, 156 100, 153 108 C149 113, 142 107, 142 100 Z" fill="url(#leafGrad1)" />
        </g>

        {/* --- MORTAR MAIN BODY --- */}
        {/* Lower pedestal / base ring */}
        <path
          d="M68 165 C68 161, 76 158, 100 158 C124 158, 132 161, 132 165 C132 170, 122 173, 100 173 C78 173, 68 170, 68 165 Z"
          fill="#35160E"
          stroke="#4D2015"
          strokeWidth="1"
        />

        {/* Mortar cup outer curve */}
        <path
          d="M40 108 
             C40 138, 62 164, 76 167 
             C84 169, 116 169, 124 167 
             C138 164, 160 138, 160 108 
             C156 107, 148 107, 100 107 
             C52 107, 44 107, 40 108 Z"
          fill="url(#woodBowlGrad)"
          stroke="#552418"
          strokeWidth="1"
        />

        {/* Subtle wood grain texture rings on bowl */}
        <path d="M54 125 C68 148, 132 148, 146 125" stroke="#763927" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" fill="none" />
        <path d="M62 140 C75 156, 125 156, 138 140" stroke="#682E1E" strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none" />
        
        {/* Subtle decorative gold/warm accent band */}
        <path d="M48 118 C64 128, 136 128, 152 118" stroke="url(#goldTrimGrad)" strokeWidth="1.2" opacity="0.75" fill="none" />

        {/* Mortar Inner Well (Top opening) */}
        <ellipse cx="100" cy="108" rx="60" ry="17" fill="url(#rimGrad)" stroke="#4A1E14" strokeWidth="1.2" />
        <ellipse cx="100" cy="108" rx="53" ry="13.5" fill="url(#innerCavity)" />

        {/* Herbs inside the mortar bowl (fresh crushed herbs & tulsi leaves) */}
        <g>
          {/* Dark crushed herb mass in bottom of cavity */}
          <ellipse cx="100" cy="111" rx="42" ry="9" fill="#1C3814" opacity="0.85" />
          <ellipse cx="98" cy="110" rx="34" ry="7" fill="#2E5A22" opacity="0.9" />

          {/* Fresh sprigs overflowing front left rim */}
          <path d="M72 108 C65 102, 54 105, 56 113 C58 120, 68 116, 72 108 Z" fill="url(#leafGrad1)" />
          <path d="M72 108 Q 63 110 59 115" stroke="#87D45C" strokeWidth="0.5" fill="none" />
          <path d="M82 107 C75 99, 65 101, 67 109 C70 115, 78 113, 82 107 Z" fill="url(#leafGrad2)" />

          {/* Fresh leaf at center right */}
          <path d="M118 106 C126 99, 137 101, 134 109 C131 116, 122 113, 118 106 Z" fill="url(#leafGrad1)" />
          <path d="M125 108 C132 104, 142 108, 139 116 C135 121, 127 116, 125 108 Z" fill="url(#leafGrad2)" />
        </g>

        {/* --- WOODEN PESTLE --- */}
        {/* Angled diagonally resting inside the bowl */}
        <g transform="rotate(-32 100 100)">
          {/* Pestle shadow on bowl interior */}
          <ellipse cx="100" cy="102" rx="14" ry="7" fill="#140704" opacity="0.7" />

          {/* Pestle handle stem */}
          <path
            d="M93 26 
               C93 22, 107 22, 107 26 
               L110 52 
               C112 70, 113 90, 111 112 
               C110 119, 90 119, 89 112 
               C87 90, 88 70, 90 52 
               Z"
            fill="url(#pestleGrad)"
            stroke="#4A1E14"
            strokeWidth="1.2"
          />

          {/* Pestle knob / rounded top handle */}
          <ellipse cx="100" cy="25" rx="8.5" ry="6.5" fill="#A85F45" stroke="#522216" strokeWidth="1" />
          <ellipse cx="99" cy="24" rx="5" ry="3.5" fill="#D38C6F" opacity="0.6" />

          {/* Pestle rounded grinding head (down in mortar) */}
          <ellipse cx="100" cy="112" rx="11" ry="8" fill="#3D180F" stroke="#2B1009" strokeWidth="1" />

          {/* Pestle decorative grip rings */}
          <line x1="91" y1="46" x2="109" y2="46" stroke="#481B11" strokeWidth="1.2" />
          <line x1="91" y1="52" x2="109" y2="52" stroke="#481B11" strokeWidth="1.2" />
          
          {/* Highlight along pestle edge */}
          <path d="M93 35 L91 95" stroke="#C98B6D" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
        </g>

        {/* Rim front highlight to give 3D depth over inner cavity */}
        <path
          d="M44 110 C50 117, 100 120, 156 110"
          stroke="#B36F52"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
          fill="none"
        />
        <path
          d="M56 113 C72 118, 128 118, 144 113"
          stroke="#E6A88A"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
      </svg>
    </div>
  );
};
