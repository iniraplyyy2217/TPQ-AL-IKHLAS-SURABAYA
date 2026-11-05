// Daftar Avatar Santri Islami Siap Pakai & Helper Foto Profil
export interface AvatarPreset {
  id: string;
  name: string;
  gender: 'L' | 'P';
  svgDataUri: string;
}

// Function to generate nice colorful SVG avatars
function generateAvatarSvg(bgGradient: string, characterSvg: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        ${bgGradient}
      </linearGradient>
    </defs>
    <rect width="120" height="120" rx="60" fill="url(#g)"/>
    ${characterSvg}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const AVATAR_PRESETS: AvatarPreset[] = [
  {
    id: 'santri-peci-hitam',
    name: 'Santri Peci Hitam',
    gender: 'L',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#059669"/><stop offset="100%" stop-color="#047857"/>',
      `<!-- Wajah & Baju -->
      <circle cx="60" cy="55" r="28" fill="#FBD5B5"/>
      <!-- Peci Songkok Hitam -->
      <path d="M34 45 C34 26 86 26 86 45 Z" fill="#1E293B"/>
      <rect x="33" y="42" width="54" height="6" rx="2" fill="#0F172A"/>
      <!-- Mata & Senyum -->
      <circle cx="50" cy="56" r="3" fill="#1E293B"/>
      <circle cx="70" cy="56" r="3" fill="#1E293B"/>
      <path d="M52 66 Q60 74 68 66" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Baju Koko Putih -->
      <path d="M25 110 C25 85 95 85 95 110 Z" fill="#FFFFFF"/>
      <path d="M55 85 L60 98 L65 85 Z" fill="#E2E8F0"/>`
    )
  },
  {
    id: 'santri-peci-putih',
    name: 'Santri Peci Putih',
    gender: 'L',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#0284C7"/><stop offset="100%" stop-color="#0369A1"/>',
      `<!-- Wajah -->
      <circle cx="60" cy="55" r="28" fill="#F8D0B0"/>
      <!-- Peci Putih Rajut -->
      <path d="M35 44 C35 25 85 25 85 44 Z" fill="#FFFFFF"/>
      <rect x="34" y="42" width="52" height="5" rx="2" fill="#E2E8F0"/>
      <!-- Mata Ceria -->
      <circle cx="49" cy="55" r="3" fill="#0F172A"/>
      <circle cx="71" cy="55" r="3" fill="#0F172A"/>
      <path d="M53 66 Q60 73 67 66" stroke="#0F172A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Baju Koko Biru Soft -->
      <path d="M25 110 C25 85 95 85 95 110 Z" fill="#E0F2FE"/>
      <path d="M54 85 L60 97 L66 85 Z" fill="#BAE6FD"/>`
    )
  },
  {
    id: 'santri-sorban-hijau',
    name: 'Santri Bersorban',
    gender: 'L',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#10B981"/><stop offset="100%" stop-color="#065F46"/>',
      `<!-- Wajah -->
      <circle cx="60" cy="55" r="28" fill="#FBD5B5"/>
      <!-- Sorban Hijau -->
      <ellipse cx="60" cy="38" rx="28" ry="14" fill="#065F46"/>
      <path d="M36 38 C36 28 84 28 84 38 Z" fill="#10B981"/>
      <path d="M78 38 Q88 55 76 72" stroke="#10B981" stroke-width="6" fill="none" stroke-linecap="round"/>
      <!-- Mata -->
      <circle cx="50" cy="56" r="3" fill="#1E293B"/>
      <circle cx="70" cy="56" r="3" fill="#1E293B"/>
      <path d="M52 66 Q60 74 68 66" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Baju Hijau -->
      <path d="M25 110 C25 85 95 85 95 110 Z" fill="#ECFDF5"/>`
    )
  },
  {
    id: 'santri-koko-kuning',
    name: 'Santri Koko Emas',
    gender: 'L',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#F59E0B"/><stop offset="100%" stop-color="#D97706"/>',
      `<!-- Wajah -->
      <circle cx="60" cy="55" r="28" fill="#FBD5B5"/>
      <path d="M35 45 C35 27 85 27 85 45 Z" fill="#1E293B"/>
      <circle cx="50" cy="56" r="3" fill="#1E293B"/>
      <circle cx="70" cy="56" r="3" fill="#1E293B"/>
      <path d="M52 66 Q60 74 68 66" stroke="#1E293B" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Baju Kuning Emas -->
      <path d="M25 110 C25 85 95 85 95 110 Z" fill="#FEF3C7"/>`
    )
  },
  {
    id: 'santriyah-hijab-emerald',
    name: 'Santriyah Hijab Emerald',
    gender: 'P',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#059669"/><stop offset="100%" stop-color="#047857"/>',
      `<!-- Hijab Luar -->
      <path d="M28 65 C28 25 92 25 92 65 C92 95 80 115 60 115 C40 115 28 95 28 65 Z" fill="#047857"/>
      <!-- Wajah Oval -->
      <ellipse cx="60" cy="58" rx="21" ry="24" fill="#FBD5B5"/>
      <!-- Inner Hijab / Ciput -->
      <path d="M41 44 C45 38 75 38 79 44 Z" fill="#34D399"/>
      <!-- Mata Cantik & Senyum -->
      <circle cx="51" cy="56" r="2.8" fill="#1E293B"/>
      <circle cx="69" cy="56" r="2.8" fill="#1E293B"/>
      <circle cx="44" cy="62" r="3" fill="#FDA4AF" opacity="0.6"/>
      <circle cx="76" cy="62" r="3" fill="#FDA4AF" opacity="0.6"/>
      <path d="M53 66 Q60 72 67 66" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/>`
    )
  },
  {
    id: 'santriyah-hijab-pink',
    name: 'Santriyah Hijab Pink',
    gender: 'P',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#EC4899"/><stop offset="100%" stop-color="#BE185D"/>',
      `<!-- Hijab Luar Pink -->
      <path d="M28 65 C28 25 92 25 92 65 C92 95 80 115 60 115 C40 115 28 95 28 65 Z" fill="#F472B6"/>
      <!-- Wajah Oval -->
      <ellipse cx="60" cy="58" rx="21" ry="24" fill="#FCE7D6"/>
      <!-- Inner Hijab Putih -->
      <path d="M41 44 C45 38 75 38 79 44 Z" fill="#FFFFFF"/>
      <!-- Mata & Senyum -->
      <circle cx="51" cy="56" r="2.8" fill="#1E293B"/>
      <circle cx="69" cy="56" r="2.8" fill="#1E293B"/>
      <circle cx="44" cy="62" r="3.5" fill="#FB7185" opacity="0.6"/>
      <circle cx="76" cy="62" r="3.5" fill="#FB7185" opacity="0.6"/>
      <path d="M53 66 Q60 72 67 66" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/>`
    )
  },
  {
    id: 'santriyah-hijab-tosca',
    name: 'Santriyah Hijab Tosca',
    gender: 'P',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#0D9488"/><stop offset="100%" stop-color="#0F766E"/>',
      `<!-- Hijab Luar Tosca -->
      <path d="M28 65 C28 25 92 25 92 65 C92 95 80 115 60 115 C40 115 28 95 28 65 Z" fill="#14B8A6"/>
      <!-- Wajah Oval -->
      <ellipse cx="60" cy="58" rx="21" ry="24" fill="#FBD5B5"/>
      <path d="M41 44 C45 38 75 38 79 44 Z" fill="#CCFBF1"/>
      <circle cx="51" cy="56" r="2.8" fill="#1E293B"/>
      <circle cx="69" cy="56" r="2.8" fill="#1E293B"/>
      <path d="M53 66 Q60 72 67 66" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/>`
    )
  },
  {
    id: 'santriyah-hijab-ungu',
    name: 'Santriyah Hijab Lavender',
    gender: 'P',
    svgDataUri: generateAvatarSvg(
      '<stop offset="0%" stop-color="#8B5CF6"/><stop offset="100%" stop-color="#6D28D9"/>',
      `<!-- Hijab Luar Ungu -->
      <path d="M28 65 C28 25 92 25 92 65 C92 95 80 115 60 115 C40 115 28 95 28 65 Z" fill="#A78BFA"/>
      <!-- Wajah Oval -->
      <ellipse cx="60" cy="58" rx="21" ry="24" fill="#FCE7D6"/>
      <path d="M41 44 C45 38 75 38 79 44 Z" fill="#EDE9FE"/>
      <circle cx="51" cy="56" r="2.8" fill="#1E293B"/>
      <circle cx="69" cy="56" r="2.8" fill="#1E293B"/>
      <path d="M53 66 Q60 72 67 66" stroke="#1E293B" stroke-width="2" fill="none" stroke-linecap="round"/>`
    )
  }
];

// Helper to resize uploaded file image to lightweight Base64 string
export async function resizeImageToBase64(file: File, maxDimension = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as jpeg/webp data url
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar foto.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}
