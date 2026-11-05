'use client';

import React, { useState } from 'react';
import {
  Heart,
  BookOpen,
  Compass,
  Award,
  Sparkles,
  CheckCircle2,
  Users,
  AlertCircle,
  HelpCircle,
  Volume2,
  Search,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Share2,
  FileCheck2,
} from 'lucide-react';
import { speakText } from '@/lib/audio-effects';

export default function DinulIslamMateri() {
  const [activeTopic, setActiveTopic] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const handleSpeak = (text: string) => {
    speakText(text, 'id-ID');
  };

  const topicsList = [
    { no: 1, label: 'Akhlaq Teman', icon: Users, badge: 'Sikap Bergaul' },
    { no: 2, label: 'Rukun Iman & Islam', icon: BookOpen, badge: '6 Iman & 5 Islam' },
    { no: 3, label: 'Sirah Nabi SAW', icon: Compass, badge: 'Riwayat Hidup' },
    { no: 4, label: '25 Nabi & Ulul Azmi', icon: Award, badge: 'MIMIN' },
    { no: 5, label: 'Akhlaq Mahmudah', icon: Heart, badge: 'Terpuji & Tercela' },
    { no: 6, label: 'Asmaul Husna & Hukum', icon: Sparkles, badge: '99 Asma & 5 Hukum' },
    { no: 7, label: 'Mengenal Al-Qur\'an', icon: Bookmark, badge: '30 Juz & Makkiyah' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner for Bab 01 */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-amber-300 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kurikulum Resmi Pembelajaran Santri TPA Al-Ikhlas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight text-white">
            Modul Pembelajaran Dinul Islam &amp; Akhlaq Santri
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
            Panduan lengkap 7 pokok pembelajaran Dinul Islam untuk ananda santri cilik. Disusun sistematis, mudah dipahami anak usia SD, lengkap dengan rujukan ayat Al-Qur&apos;an dan Hadits shahih.
          </p>
        </div>

        {/* Quick Search inside Bab 1 */}
        <div className="mt-6 pt-4 border-t border-emerald-700/50 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-emerald-300 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Cari topik (cth: Ulul Azmi, Sabar, Malaikat)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-600/60 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:border-amber-400"
            />
          </div>
          <span className="text-[11px] text-emerald-200">
            Pilih nomor tab 1 s/d 7 di bawah untuk membaca setiap pokok bahasan.
          </span>
        </div>
      </div>

      {/* 7 Quick Topic Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {topicsList.map((t) => {
          const Icon = t.icon;
          const isActive = activeTopic === t.no;

          return (
            <button
              key={t.no}
              onClick={() => setActiveTopic(t.no)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {t.no}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
              </div>
              <div className="mt-2">
                <p className="text-xs font-bold leading-tight line-clamp-2">{t.label}</p>
                <p
                  className={`text-[10px] mt-0.5 truncate ${
                    isActive ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {t.badge}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TOPIK 1: AKHLAQ KEPADA TEMAN                                              */}
      {/* ========================================================================= */}
      {(activeTopic === 1 || searchFilter.toLowerCase().includes('teman') || searchFilter.toLowerCase().includes('sahabat')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg">
                1
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-1
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Akhlaq Kepada Teman
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Akhlaq Kepada Teman. Hidup bersama teman sama halnya dengan tinggal di satu rumah dengan keluarga, sehingga harus diciptakan suasana penuh kasih sayang.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
              title="Dengarkan Uraian Suara"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* Inti Pokok */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed">
            <strong className="block text-emerald-900 font-bold mb-1">
              🌟 Kaidah Kehidupan Berteman:
            </strong>
            Hidup bersama teman sama halnya dengan tinggal di satu rumah dengan keluarga sendiri, sehingga harus senantiasa diciptakan suasana yang penuh kasih sayang, tolong-menolong, dan saling memaafkan.
          </div>

          {/* Contoh Sikap Baik Kepada Teman */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Contoh Sikap Baik Kepada Teman (Beserta Dalil Shahih):</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Point 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center text-[11px]">1</span>
                  <span>Memberi Perhatian terhadap Keadaan Teman</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Peka jika ada teman yang sedang sedih, sakit, atau mengalami kesulitan belajar mengaji.
                </p>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                  <p className="font-semibold text-emerald-900 mb-1">HR. Bukhari:</p>
                  <p className="italic text-slate-700">
                    &ldquo;Perumpamaan orang-orang mukmin dalam hal saling kasih mengasihi dan saling menyayangi sebagaimana satu badan; apabila salah satu anggota badan sakit, maka seluruh badan turut merasakan demam dan tidak bisa tidur.&rdquo;
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                  <span className="w-5 h-5 rounded-full bg-teal-200 text-teal-900 flex items-center justify-center text-[11px]">2</span>
                  <span>Selalu Membantu Keperluan Teman</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Suka meminjamkan alat tulis, berbagi makanan kecil, dan mengulurkan bantuan tanpa pamrih.
                </p>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                  <p className="font-semibold text-teal-900 mb-1">HR. Bukhari &amp; Muslim:</p>
                  <p className="italic text-slate-700">
                    &ldquo;Siapa saja yang meringankan keperluan sahabatnya dalam urusan dunia, maka dia akan mendapat keringanan atas keperluannya di akhirat kelak.&rdquo;
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center text-[11px]">3</span>
                  <span>Menjaga Kawan dari Gangguan Orang Lain</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tidak membiarkan teman dibully atau diganggu orang lain, melindunginya dengan berani dan santun.
                </p>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                  <p className="font-semibold text-amber-900 mb-1">HR. Ahmad:</p>
                  <p className="italic text-slate-700">
                    &ldquo;Siapa saja yang menjaga harta dan kewibawaan saudaranya sesama mukmin, maka Allah akan menjaganya dari siksa api neraka pada hari kiamat.&rdquo;
                  </p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-900">
                  <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-950 flex items-center justify-center text-[11px]">4</span>
                  <span>Mendamaikan jika Ada Teman Berselisih</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Segera menengahi, tidak mengadu domba atau memperkeruh suasana permusuhan.
                </p>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                  <p className="font-semibold text-sky-900 mb-1">QS. Al-Hujurat [49]: 9</p>
                  <p className="italic text-slate-700">
                    &ldquo;Dan apabila ada dua golongan orang mukmin berperang/berselisih, maka damaikanlah antara keduanya...&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Sikap Tambahan */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-xs space-y-1.5">
              <strong className="text-emerald-950">Sikap Mulia Lainnya:</strong>
              <p className="text-slate-700 leading-relaxed">
                Mendoakan kebaikan, menyayangi teman yang lebih kecil, menghormati teman yang lebih besar, tulus membantu saat belajar tilawah, serta tidak boleh sombong atau menghina kekurangan teman.
              </p>
            </div>
          </div>

          {/* Perbandingan: Akibat Buruk vs Tips Banyak Teman */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Akibat Akhlaq Buruk */}
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <h5 className="font-bold text-rose-950 text-xs sm:text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Akibat Memiliki Akhlaq Buruk kepada Teman:</span>
              </h5>
              <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside">
                <li>Tidak dicintai dan dijauhi oleh teman-teman bermain.</li>
                <li>Banyak memiliki musuh dan hidup menjadi tidak tenang.</li>
                <li>Tidak ada orang yang mau menolong saat diri sendiri tertimpa kesulitan.</li>
                <li>Terjadinya perpecahan dan pertengkaran sesama santri.</li>
                <li><strong>Dibenci oleh Allah SWT dan Rasul-Nya</strong>.</li>
              </ul>
            </div>

            {/* Tips Banyak Teman */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <h5 className="font-bold text-amber-950 text-xs sm:text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Tips Ceria Santri Disukai Banyak Teman:</span>
              </h5>
              <div className="grid grid-cols-1 gap-2 text-xs text-amber-950">
                <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-black">A</span>
                  <span><strong>Jangan Pelit:</strong> Senang berbagi bekal, alat mengaji, dan kebahagiaan.</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-black">B</span>
                  <span><strong>Jangan Menyakiti Hati:</strong> Tidak memanggil dengan ejekan atau memukul.</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-black">C</span>
                  <span><strong>Berbicara Sopan:</strong> Selalu menggunakan kata tolong, maaf, dan terima kasih.</span>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-amber-200 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center text-[10px] font-black">D</span>
                  <span><strong>Rajin Menasihati:</strong> Mengajak sholat berjamaah dan berbuat baik.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIK 2: MEMAHAMI RUKUN IMAN & RUKUN ISLAM                                */}
      {/* ========================================================================= */}
      {(activeTopic === 2 || searchFilter.toLowerCase().includes('iman') || searchFilter.toLowerCase().includes('islam') || searchFilter.toLowerCase().includes('malaikat') || searchFilter.toLowerCase().includes('sholat')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-lg">
                2
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-2
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Memahami Rukun Iman &amp; Rukun Islam
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Memahami Rukun Iman ada 6 perkara dan Rukun Islam ada 5 perkara. Iman artinya percaya di hati, diucapkan dengan lisan, dan diamalkan.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* SUB-BAGIAN A: RUKUN IMAN */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-700 text-white text-[11px] font-bold">
                BAGIAN A
              </span>
              <h4 className="text-lg font-bold text-teal-950 font-serif mt-2">
                Rukun Iman (Ada 6 Perkara)
              </h4>
              <p className="text-xs text-teal-900 mt-1 leading-relaxed">
                <strong>Iman artinya Percaya</strong> — yaitu membenarkan dengan keyakinan penuh dalam hati, mengucapkan dengan lisan, dan mengamalkannya dengan perbuatan anggota badan.
              </p>
              
              {/* Hadits Muslim */}
              <div className="mt-3 p-3.5 rounded-xl bg-white border border-teal-200 space-y-1">
                <p className="text-[11px] font-bold text-teal-800">Sabda Rasulullah SAW (HR. Muslim):</p>
                <p className="text-sm font-arabic text-emerald-950 leading-loose" dir="rtl">
                  الْإِيمَانُ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَبِالْقَدَرِ خَيْرِهِ وَشَرِّهِ
                </p>
                <p className="text-xs text-slate-600 italic">
                  &ldquo;Iman adalah hendaknya engkau percaya kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan takdir yang baik maupun yang buruk.&rdquo;
                </p>
              </div>
            </div>

            {/* 6 Rukun Iman Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* 1. Iman kpd Allah */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-800 text-sm">1. Iman kepada Allah SWT</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[10px]">Esa &amp; Khaliq</span>
                </div>
                <p className="text-slate-600">
                  Wajib percaya dan yakin bahwa Allah Maha Esa, tiada sekutu bagi-Nya, dan Maha Pencipta seluruh alam semesta.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <p className="font-semibold text-emerald-900">QS. Al-A&apos;raf: 54</p>
                  <p className="font-arabic text-slate-800 text-xs" dir="rtl">
                    إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    (Sesungguhnya Tuhan kamu ialah Allah yang telah menciptakan langit dan bumi dalam enam masa...)
                  </p>
                  <p className="font-semibold text-emerald-900 pt-1 border-t border-slate-100">QS. Al-Isra&apos;: 44</p>
                  <p className="text-[11px] text-slate-500 italic">
                    (Langit yang tujuh, bumi dan semua yang ada di dalamnya bertasbih kepada Allah...)
                  </p>
                </div>
              </div>

              {/* 2. Iman kpd Malaikat */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-800 text-sm">2. Iman kepada Malaikat Allah</span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-bold text-[10px]">Cahaya (Nur)</span>
                </div>
                <p className="text-slate-600">
                  Makhluk ciptaan Allah dari cahaya (nur) yang selalu patuh, tidak memiliki hawa nafsu, dan tidak pernah bermaksiat.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <p className="font-semibold text-teal-900">QS. Al-Anbiya&apos;: 26-27 &amp; QS. Fathir: 1</p>
                  <p className="text-[11px] text-slate-600">
                    <strong>10 Malaikat Wajib:</strong> Jibril (wahyu), Mikail (rezeki), Izrail (nyawa), Israfil (sangkakala), Munkar &amp; Nakir (kubur), Raqib (amal baik), Atid (amal buruk), Malik (neraka), Ridwan (surga).
                  </p>
                  <p className="text-[11px] text-teal-800 font-medium">
                    ✨ <strong>Al-Kiromul Katibun:</strong> Malaikat pencatat amal. <br />
                    ✨ <strong>Al-Mu&apos;aqqibat:</strong> Malaikat penjaga manusia dari depan &amp; belakang.
                  </p>
                </div>
              </div>

              {/* 3. Iman kpd Kitab */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-800 text-sm">3. Iman kepada Kitab-Kitab Allah</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">Wahyu Ilahi</span>
                </div>
                <p className="text-slate-600">
                  Percaya Allah menurunkan kitab suci dan shuhuf sebagai petunjuk hidup manusia (QS. An-Nisa&apos;: 136).
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <p className="font-semibold text-amber-900">Kitab &amp; Shuhuf yang Diturunkan:</p>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700">
                    <span>• 60 Shuhuf (Nabi Syits a.s.)</span>
                    <span>• 30 Shuhuf (Nabi Ibrahim a.s.)</span>
                    <span>• 10 Shuhuf (Nabi Musa a.s.)</span>
                    <span>• Kitab Taurat (Nabi Musa a.s.)</span>
                    <span>• Kitab Zabur (Nabi Daud a.s.)</span>
                    <span>• Kitab Injil (Nabi Isa a.s.)</span>
                  </div>
                  <p className="text-[11px] font-bold text-amber-900 pt-1">
                    📖 Al-Qur&apos;an: Diturunkan kepada Nabi Muhammad SAW sebagai kitab suci penyempurna.
                  </p>
                </div>
              </div>

              {/* 4. Iman kpd Nabi & Rasul */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-800 text-sm">4. Iman kepada Nabi &amp; Rasul</span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-bold text-[10px]">Ma&apos;shum</span>
                </div>
                <p className="text-slate-600">
                  Wajib percaya Allah mengutus nabi dan rasul yang bersifat <strong>ma&apos;shum</strong> (terjaga dan terpelihara dari dosa besar).
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <p className="font-semibold text-sky-900">QS. Al-Baqarah: 285</p>
                  <p className="font-arabic text-slate-800 text-xs" dir="rtl">
                    آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    (Rasul telah beriman kepada apa yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang yang beriman...)
                  </p>
                </div>
              </div>

              {/* 5. Iman kpd Hari Kiamat */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-800 text-sm">5. Iman kepada Hari Kiamat</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 font-bold text-[10px]">Hari Akhir</span>
                </div>
                <p className="text-slate-600">
                  Percaya dengan pasti akan datangnya hari kehancuran alam semesta dan hari kebangkitan/pembalasan seluruh amal manusia.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <p className="font-semibold text-rose-900">QS. Muhammad: 18</p>
                  <p className="font-arabic text-slate-800 text-xs" dir="rtl">
                    فَهَلْ يَنْظُرُونَ إِلَّا السَّاعَةَ أَنْ تَأْتِيَهُمْ بَغْتَةً فَقَدْ جَاءَ أَشْرَاطُهَا
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    (Maka tidaklah yang mereka tunggu-tunggu melainkan hari kiamat yang akan datang kepada mereka dengan tiba-tiba...)
                  </p>
                </div>
              </div>

              {/* 6. Iman kpd Qodho & Qodar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-800 text-sm">6. Iman kepada Qodho &amp; Qodar</span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-bold text-[10px]">Takdir Allah</span>
                </div>
                <p className="text-slate-600">
                  Percaya bahwa segala takdir baik maupun takdir buruk telah ditetapkan dengan ukuran yang sangat rapi dan adil oleh Allah SWT.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <p className="font-semibold text-indigo-900">QS. Al-Furqan: 2</p>
                  <p className="font-arabic text-slate-800 text-xs" dir="rtl">
                    وَخَلَقَ كُلَّ شَيْءٍ فَقَدَّرَهُ تَقْدِيرًا
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    &ldquo;Dan Dia telah menciptakan segala sesuatu, dan Dia menetapkan ukuran-ukurannya dengan serapi-rapinya.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SUB-BAGIAN B: RUKUN ISLAM */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[11px] font-bold">
                BAGIAN B
              </span>
              <h4 className="text-lg font-bold text-emerald-950 font-serif mt-2">
                Rukun Islam (Ada 5 Perkara)
              </h4>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                <strong>Islam artinya Berserah Diri</strong>, tunduk patuh kepada perintah Allah, serta selamat dan sejahtera di dunia maupun di akhirat.
              </p>

              {/* Hadits Buniya Al-Islam */}
              <div className="mt-3 p-3.5 rounded-xl bg-white border border-emerald-200 space-y-1">
                <p className="text-[11px] font-bold text-emerald-800">Sabda Rasulullah SAW:</p>
                <p className="text-sm font-arabic text-emerald-950 leading-loose" dir="rtl">
                  بُنِيَ الْإِسْلَامُ عَلَىٰ خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ وَإِقَامِ الصَّلَاةِ وَإِيتَاءِ الزَّكَاةِ وَحَجِّ الْبَيْتِ وَصَوْمِ رَمَضَانَ
                </p>
              </div>
            </div>

            {/* 5 Rukun Islam Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* 1. Syahadatain */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <span className="font-bold text-emerald-800 text-sm block">1. Mengucapkan Dua Kalimat Syahadat</span>
                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
                  <p className="font-semibold text-emerald-900 text-[11px]">Syahadat Tauhid:</p>
                  <p className="font-arabic text-xs" dir="rtl">أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ</p>
                  <p className="text-[11px] text-slate-600">(Saya bersaksi bahwa sesungguhnya tiada tuhan selain Allah)</p>
                  <p className="font-semibold text-emerald-900 text-[11px] pt-1">Syahadat Rasul:</p>
                  <p className="font-arabic text-xs" dir="rtl">وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ</p>
                  <p className="text-[11px] text-slate-600">(Dan saya bersaksi bahwa sesungguhnya Muhammad utusan Allah)</p>
                </div>
              </div>

              {/* 2. Sholat */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <span className="font-bold text-teal-800 text-sm block">2. Mendirikan Sholat 5 Waktu</span>
                <p className="text-slate-600">
                  Sholat fardhu 17 rakaat sehari semalam (Subuh 2, Dzuhur 4, Ashar 4, Maghrib 3, Isya 4). Tiang agama Islam.
                </p>
                <div className="p-2.5 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
                  <p className="font-semibold text-teal-900 text-[11px]">QS. An-Nisa&apos;: 103</p>
                  <p className="italic text-[11px] text-slate-600">&ldquo;Sesungguhnya sholat itu kewajiban yang ditentukan waktunya atas orang beriman.&rdquo;</p>
                  <p className="font-semibold text-teal-900 text-[11px] pt-1">QS. Al-Ankabut: 45</p>
                  <p className="italic text-[11px] text-slate-600">&ldquo;Sesungguhnya sholat itu mencegah dari perbuatan keji dan mungkar.&rdquo;</p>
                </div>
              </div>

              {/* 3. Zakat */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <span className="font-bold text-amber-800 text-sm block">3. Menunaikan Zakat</span>
                <p className="text-slate-600">
                  Mensucikan jiwa (<strong>Zakat Fitrah</strong>) dan membersihkan harta (<strong>Zakat Maal</strong>).
                </p>
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 space-y-1 text-[11px]">
                  <p><strong>Muzakki:</strong> Orang yang mengeluarkan zakat.</p>
                  <p><strong>Mustahiq:</strong> 8 golongan yang berhak menerima zakat.</p>
                  <p className="font-semibold text-amber-900 pt-1">QS. Al-Baqarah: 110</p>
                  <p className="italic text-slate-600">&ldquo;Dan dirikanlah sholat dan tunaikanlah zakat...&rdquo;</p>
                </div>
              </div>

              {/* 4. Puasa */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2">
                <span className="font-bold text-sky-800 text-sm block">4. Puasa di Bulan Ramadhan</span>
                <p className="text-slate-600">
                  Menahan diri dari makan, minum, dan hal yang membatalkan dari terbit fajar hingga maghrib untuk melatih ketaqwaan.
                </p>
                <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 space-y-1">
                  <p className="font-semibold text-sky-900 text-[11px]">QS. Al-Baqarah: 183</p>
                  <p className="italic text-[11px] text-slate-600">&ldquo;Wahai orang-orang yang beriman, diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang sebelum kamu agar kamu bertaqwa.&rdquo;</p>
                </div>
              </div>

              {/* 5. Haji */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-2xs space-y-2 lg:col-span-2">
                <span className="font-bold text-indigo-800 text-sm block">5. Haji bagi yang Mampu (Istitho&apos;ah)</span>
                <p className="text-slate-600">
                  Menziarahi Ka&apos;bah Baitullah di Makkah Al-Mukarramah pada bulan Dzulhijjah bagi yang mampu fisik, bekal, dan keamanan jalan.
                </p>
                <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1">
                  <p className="font-semibold text-indigo-900 text-[11px]">QS. Ali Imran: 97</p>
                  <p className="italic text-[11px] text-slate-600">&ldquo;Mengerjakan haji adalah kewajiban manusia terhadap Allah, yaitu bagi orang yang sanggup mengadakan perjalanan ke Baitullah...&rdquo;</p>
                  <p className="font-semibold text-indigo-900 text-[11px] pt-1">Peringatan bagi yang Sengaja Menolak Padahal Mampu (Hadits):</p>
                  <p className="font-arabic text-xs" dir="rtl">
                    مَنْ لَمْ تَحْبِسْهُ حَاجَةٌ ظَاهِرَةٌ أَوْ مَرَضٌ حَابِسٌ أَوْ سُلْطَانٌ جَائِرٌ وَلَمْ يَحُجَّ فَلْيَمُتْ إِنْ شَاءَ يَهُودِيًّا وَإِنْ شَاءَ نَصْرَانِيًّا
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIK 3: RIWAYAT SINGKAT NABI MUHAMMAD SAW                                */}
      {/* ========================================================================= */}
      {(activeTopic === 3 || searchFilter.toLowerCase().includes('muhammad') || searchFilter.toLowerCase().includes('nabi') || searchFilter.toLowerCase().includes('gajah') || searchFilter.toLowerCase().includes('khadijah')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 font-black flex items-center justify-center text-lg">
                3
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-3
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Riwayat Singkat Nabi Muhammad SAW
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Riwayat Singkat Nabi Muhammad SAW. Lahir di Makkah pada hari Senin 12 Rabiul Awwal Tahun Gajah.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* Timeline / Fase Kehidupan Nabi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* 1. Kelahiran */}
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
                Fase 1: Kelahiran Mulia
              </span>
              <h5 className="font-bold text-slate-900 text-sm font-serif">
                Senin, 12 Rabiul Awwal Tahun Gajah (20 April 570 M)
              </h5>
              <ul className="text-slate-700 space-y-1 list-disc list-inside">
                <li><strong>Tempat Lahir:</strong> Kota Makkah Al-Mukarramah.</li>
                <li><strong>Ayah:</strong> Abdullah (wafat sebelum Nabi lahir).</li>
                <li><strong>Ibu:</strong> Siti Aminah binti Wahb.</li>
                <li><strong>Kakek:</strong> Abdul Muththolib (pemimpin Quraisy).</li>
                <li><strong>Paman:</strong> Abu Thalib (yang merawat beliau).</li>
                <li>
                  <strong>Tahun Gajah:</strong> Penyerangan pasukan gajah Raja Abrahah dari Yaman yang dihancurkan Allah melalui kawanan burung <strong>Ababil</strong> pelempar batu sijjil (QS. Al-Fil).
                </li>
              </ul>
            </div>

            {/* 2. Masa Kecil & Remaja */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                Fase 2: Masa Kecil &amp; Remaja
              </span>
              <h5 className="font-bold text-slate-900 text-sm font-serif">
                Penyusuan, Yatim Piatu &amp; Gelar Al-Amin
              </h5>
              <ul className="text-slate-700 space-y-1 list-disc list-inside">
                <li>Disusui oleh <strong>Tsuwaibah</strong> lalu <strong>Halimah As-Sa&apos;diyah</strong> di Bani Sa&apos;ad (terjadi peristiwa pembersihan hati oleh malaikat).</li>
                <li>Ibu wafat di <strong>Abwa</strong> saat Nabi usia 6 tahun.</li>
                <li>Kakek wafat saat usia 8 tahun, lalu diasuh pamannya Abu Thalib.</li>
                <li>Usia 12 tahun: Berdagang ke Syam &amp; bertemu <strong>Pendeta Bahira</strong> yang mengenali tanda kenabian beliau.</li>
                <li>Diberi gelar <strong>Al-Amin</strong> (sangat terpercaya) karena kejujurannya.</li>
              </ul>
            </div>

            {/* 3. Pernikahan & Kerasulan */}
            <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
              <span className="px-2.5 py-1 rounded-full bg-teal-600 text-white font-bold text-[10px]">
                Fase 3: Pernikahan &amp; Kerasulan
              </span>
              <h5 className="font-bold text-slate-900 text-sm font-serif">
                Pernikahan Mulia &amp; Wahyu Pertama di Gua Hira
              </h5>
              <ul className="text-slate-700 space-y-1 list-disc list-inside">
                <li>Usia 25 tahun: Memperdagangkan barang Khadijah dibantu budaknya <strong>Maisarah</strong>.</li>
                <li>Menikah dengan <strong>Siti Khadijah r.a.</strong> (usia 40 tahun) dengan mahar <strong>20 ekor unta muda</strong>.</li>
                <li>Suka bertahannuts (menyendiri ibadah) di <strong>Gua Hira</strong>.</li>
                <li>Usia 40 tahun: Menerima wahyu pertama yaitu <strong>QS. Al-&apos;Alaq: 1-5</strong> melalui Malaikat Jibril.</li>
              </ul>
            </div>

            {/* 4. Wafatnya Baginda Nabi */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-700 text-white font-bold text-[10px]">
                Fase 4: Wafatnya Rasulullah SAW
              </span>
              <h5 className="font-bold text-slate-900 text-sm font-serif">
                Senin, 12 Rabiul Awwal 11 H (Usia 63 Tahun)
              </h5>
              <ul className="text-slate-700 space-y-1 list-disc list-inside">
                <li>Menderita demam tinggi sejak bulan Safar 11 Hijriyah.</li>
                <li>Saat berziarah beliau membaca <strong>QS. Al-Qashash: 83</strong>:</li>
              </ul>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-arabic text-xs leading-loose" dir="rtl">
                تِلْكَ الدَّارُ الْآخِرَةُ نَجْعَلُهَا لِلَّذِينَ لَا يُرِيدُونَ عُلُوًّا فِي الْأَرْضِ وَلَا فَسَادًا وَالْعَاقِبَةُ لِلْمُتَّقِينَ
              </div>
              <p className="text-[11px] text-slate-600">
                Wafat di pangkuan Siti Aisyah r.a. Dimandikan, dishalatkan, dan dimakamkan oleh Sayyidina Ali bin Abi Thalib beserta keluarga.
              </p>
            </div>
          </div>

          {/* Gelar-Gelar Mulia Nabi Muhammad SAW */}
          <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3">
            <h5 className="font-bold text-amber-300 text-sm font-serif">
              7 Gelar-Gelar Mulia Nabi Muhammad SAW:
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">1. Ahmad</strong>
                <span className="text-[10px] text-emerald-200">Yang Terpuji</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">2. Al-Mahi</strong>
                <span className="text-[10px] text-emerald-200">Penghapus Kekafiran</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">3. Al-A&apos;qib</strong>
                <span className="text-[10px] text-emerald-200">Penutup Para Nabi</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">4. Khatamul Anbiya</strong>
                <span className="text-[10px] text-emerald-200">Segel Kenabian</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">5. Al-Hasyir</strong>
                <span className="text-[10px] text-emerald-200">Pengumpul Manusia</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">6. Ar-Rahmah</strong>
                <span className="text-[10px] text-emerald-200">Pembawa Rahmat</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-900 border border-emerald-800">
                <strong className="block text-amber-300">7. Al-Malhamah</strong>
                <span className="text-[10px] text-emerald-200">Pemimpin Perjuangan</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIK 4: 25 NABI, RASUL, & ULUL AZMI                                      */}
      {/* ========================================================================= */}
      {(activeTopic === 4 || searchFilter.toLowerCase().includes('ulul azmi') || searchFilter.toLowerCase().includes('mimin') || searchFilter.toLowerCase().includes('25 nabi')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 font-black flex items-center justify-center text-lg">
                4
              </div>
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-4
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  25 Nabi, Rasul, &amp; Ulul Azmi (MIMIN)
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Perbedaan Nabi dan Rasul. Nabi menerima wahyu untuk diri sendiri, sedangkan Rasul wajib menyampaikannya kepada umatnya. Rasul Ulul Azmi disingkat MIMIN.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* Perbedaan Nabi vs Rasul */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs space-y-1">
              <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white font-bold text-[10px]">
                Nabi
              </span>
              <p className="font-bold text-slate-900 text-sm">Menerima Wahyu untuk Diri Sendiri</p>
              <p className="text-slate-600 leading-relaxed">
                Laki-laki pilihan Allah yang menerima wahyu syariat untuk diamalkan bagi dirinya sendiri dan tidak dibebani kewajiban menyampaikannya kepada suatu umat.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                Rasul
              </span>
              <p className="font-bold text-slate-900 text-sm">Wajib Menyampaikan kepada Umat</p>
              <p className="text-slate-600 leading-relaxed">
                Laki-laki pilihan Allah yang menerima wahyu syariat dan <strong>wajib menyampaikannya (tabligh)</strong> kepada seluruh umatnya.
              </p>
            </div>
          </div>

          {/* 25 Urutan Nabi & Rasul */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              25 Nabi &amp; Rasul yang Wajib Diketahui Berurutan:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                '1. Adam a.s.', '2. Idris a.s.', '3. Nuh a.s. 🌟', '4. Hud a.s.', '5. Shaleh a.s.',
                '6. Ibrahim a.s. 🌟', '7. Luth a.s.', '8. Ismail a.s.', '9. Ishaq a.s.', '10. Ya\'qub a.s.',
                '11. Yusuf a.s.', '12. Ayyub a.s.', '13. Dzulkifli a.s.', '14. Syu\'aib a.s.', '15. Musa a.s. 🌟',
                '16. Harun a.s.', '17. Daud a.s.', '18. Sulaiman a.s.', '19. Ilyas a.s.', '20. Ilyasa\' a.s.',
                '21. Yunus a.s.', '22. Zakariya a.s.', '23. Yahya a.s.', '24. Isa a.s. 🌟', '25. Muhammad SAW 🌟'
              ].map((nama, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-center font-semibold ${
                    nama.includes('🌟')
                      ? 'bg-amber-100/80 border-amber-300 text-amber-950 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {nama}
                </div>
              ))}
            </div>
          </div>

          {/* Rasul Ulul Azmi - MIMIN */}
          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-300 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Jembatan Keledai Penghafal Cepat Santri
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 font-serif">
                  5 Rasul Ulul Azmi (Disingkat: MIMIN)
                </h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                Singkatan: M - I - M - I - N
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Rasul Ulul Azmi adalah rasul-rasul yang memiliki ketabahan, kesabaran, dan keteguhan tekad yang sangat luar biasa dalam menghadapi rintangan dakwah:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
                <span className="w-8 h-8 mx-auto rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm mb-1">M</span>
                <p className="font-bold text-slate-900 text-xs">Muhammad SAW</p>
                <p className="text-[10px] text-slate-500">Khatamul Anbiya</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
                <span className="w-8 h-8 mx-auto rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm mb-1">I</span>
                <p className="font-bold text-slate-900 text-xs">Ibrahim a.s.</p>
                <p className="text-[10px] text-slate-500">Khalilullah</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
                <span className="w-8 h-8 mx-auto rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm mb-1">M</span>
                <p className="font-bold text-slate-900 text-xs">Musa a.s.</p>
                <p className="text-[10px] text-slate-500">Kalimullah</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
                <span className="w-8 h-8 mx-auto rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm mb-1">I</span>
                <p className="font-bold text-slate-900 text-xs">Isa a.s.</p>
                <p className="text-[10px] text-slate-500">Ruhullah</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-amber-200 shadow-2xs">
                <span className="w-8 h-8 mx-auto rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm mb-1">N</span>
                <p className="font-bold text-slate-900 text-xs">Nuh a.s.</p>
                <p className="text-[10px] text-slate-500">Najiyyullah</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs">
              <p className="font-semibold text-amber-900 mb-1">Dalil Al-Qur&apos;an (QS. Al-Ahqaf: 35):</p>
              <p className="font-arabic text-slate-800 text-xs" dir="rtl">
                فَاصْبِرْ كَمَا صَبَرَ أُولُو الْعَزْمِ مِنَ الرُّسُلِ وَلَا تَسْتَعْجِلْ لَهُمْ
              </p>
              <p className="text-[11px] text-slate-600 italic mt-1">
                &ldquo;Maka bersabarlah engkau (Muhammad) sebagaimana kesabaran rasul-rasul yang memiliki keteguhan hati (Ulul Azmi)...&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIK 5: AKHLAQ TERPUJI & AKHLAQ TERCELA                                 */}
      {/* ========================================================================= */}
      {(activeTopic === 5 || searchFilter.toLowerCase().includes('sabar') || searchFilter.toLowerCase().includes('hasud') || searchFilter.toLowerCase().includes('riya') || searchFilter.toLowerCase().includes('terpuji')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 font-black flex items-center justify-center text-lg">
                5
              </div>
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-5
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Akhlaq Terpuji (Mahmudah) dan Akhlaq Tercela (Mazmumah)
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Akhlaq Terpuji dan Tercela. Terpuji meliputi sabar, kasih sayang, ihsan, jujur, dan dermawan. Tercela meliputi dzalim, hasud, dan riya'.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* AKHLAQ TERPUJI (AKHLAQUL KARIMAH) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                5 Akhlaq Terpuji Utama (Mahmudah)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {/* 1. Sabar */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">1. Sabar (الصَّبْرُ)</span>
                <p className="text-slate-600">Tabah menghadapi cobaan hidup, konsisten beribadah, dan menahan diri dari maksiat.</p>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-[11px]">
                  <p><strong>QS. Al-Baqarah: 45:</strong> وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ</p>
                  <p><strong>QS. Luqman: 17:</strong> وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ</p>
                  <p><strong>HR. Muslim:</strong> الصَّبْرُ نُورٌ <em>(Sabar adalah cahaya)</em></p>
                  <p><strong>QS. Al-Anfal: 46:</strong> إِنَّ اللَّهَ مَعَ الصَّابِرِينَ <em>(Allah bersama orang yang sabar)</em></p>
                </div>
              </div>

              {/* 2. Kasih Sayang */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">2. Kasih Sayang (الرَّحْمَةُ)</span>
                <p className="text-slate-600">Saling menyayangi seluruh makhluk di muka bumi dengan tulus dan lemah lembut.</p>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-[11px]">
                  <p className="font-semibold text-emerald-900">HR. At-Thabrani &amp; Al-Hakim:</p>
                  <p className="font-arabic text-xs" dir="rtl">ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ</p>
                  <p className="italic text-slate-600">&ldquo;Sayangilah siapa yang di bumi, niscaya yang di langit akan menyayangimu.&rdquo;</p>
                  <p className="font-semibold text-emerald-900 pt-1">HR. Bukhari:</p>
                  <p className="font-arabic text-xs" dir="rtl">إِنَّمَا يَرْحَمُ اللَّهُ مِنْ عِبَادِهِ الرُّحَمَاءَ</p>
                </div>
              </div>

              {/* 3. Ihsan */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">3. Ihsan (الإِحْسَانُ)</span>
                <p className="text-slate-600">Beribadah seolah melihat Allah (atau yakin dilihat Allah) dan berbuat kebajikan terbaik.</p>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-[11px]">
                  <p className="font-semibold text-emerald-900">QS. An-Nahl: 90</p>
                  <p className="font-arabic text-xs" dir="rtl">إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ</p>
                  <p className="italic text-slate-600">&ldquo;Sesungguhnya Allah menyuruh (kamu) berlaku adil dan berbuat ihsan/kebajikan...&rdquo;</p>
                </div>
              </div>

              {/* 4. Jujur */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <span className="font-bold text-emerald-900 text-sm block">4. Jujur (الصِّدْقُ)</span>
                <p className="text-slate-600">Cinta kebenaran, lurus hati, serta kesesuaian antara perkataan dan kenyataan perbuatan.</p>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-[11px]">
                  <p className="font-semibold text-emerald-900">HR. Bukhari &amp; Muslim:</p>
                  <p className="font-arabic text-xs" dir="rtl">
                    عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ وَإِنَّ الْبِرَّ يَهْدِي إِلَى الْجَنَّةِ
                  </p>
                  <p className="italic text-slate-600">&ldquo;Wajib atas kalian jujur, karena kejujuran menuntun pada kebajikan, dan kebajikan menuntun ke surga.&rdquo;</p>
                </div>
              </div>

              {/* 5. Dermawan */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 lg:col-span-2">
                <span className="font-bold text-emerald-900 text-sm block">5. Dermawan (السَّخَاءُ)</span>
                <p className="text-slate-600">Suka berinfak, bersedekah, membantu kaum dhu&apos;afa, dan tidak kikir/bakhil.</p>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 space-y-1 text-[11px]">
                  <p className="font-semibold text-emerald-900">QS. Al-Hasyr: 9: وَمَنْ يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ</p>
                  <p className="font-semibold text-emerald-900 pt-1">Doa 2 Malaikat di Waktu Pagi (HR. Bukhari &amp; Muslim):</p>
                  <p className="font-arabic text-xs" dir="rtl">
                    اللَّهُمَّ أَعْطِ مُنْفِقًا خَلَفًا وَيَقُولُ الْآخَرُ: اللَّهُمَّ أَعْطِ مُمْسِكًا تَلَفًا
                  </p>
                  <p className="italic text-slate-600">&ldquo;Ya Allah, berikanlah ganti bagi orang yang berinfak, dan berikanlah kehancuran bagi orang yang kikir.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>

          {/* AKHLAQ TERCELA (AKHLAQUL MAZMUMAH) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold">
                3 Akhlaq Tercela yang Wajib Dihindari (Mazmumah)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Dzalim */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-950 text-sm block">1. Dzalim (الظُّلْمُ)</span>
                <p className="text-slate-600">Menaruh sesuatu tidak pada tempatnya, merugikan orang lain, berbuat maksiat atau syirik.</p>
                <div className="p-2.5 rounded-xl bg-white border border-rose-100 space-y-1 text-[11px]">
                  <p><strong>QS. Al-Baqarah: 279:</strong> لَا تَظْلِمُونَ وَلَا تُظْلَمُونَ</p>
                  <p><strong>QS. Al-Baqarah: 254:</strong> وَالْكَافِرُونَ هُمُ الظَّالِمُونَ</p>
                  <p className="font-semibold text-rose-900 pt-1">Hadits Qudsi (HR. Muslim):</p>
                  <p className="font-arabic text-xs" dir="rtl">
                    يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَىٰ نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا
                  </p>
                  <p className="italic text-slate-600">&ldquo;Wahai hamba-Ku, sesungguhnya Aku mengharamkan kezaliman atas diri-Ku dan menjadikannya haram di antara kalian, maka janganlah saling menzalimi.&rdquo;</p>
                </div>
              </div>

              {/* Hasud */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-950 text-sm block">2. Hasud (الْحَسَدُ)</span>
                <p className="text-slate-600">Iri dengki terhadap kenikmatan orang lain dan menginginkan nikmat tersebut hilang dari mereka.</p>
                <div className="p-2.5 rounded-xl bg-white border border-rose-100 space-y-1 text-[11px]">
                  <p><strong>QS. An-Nisa&apos;: 54:</strong> أَمْ يَحْسُدُونَ النَّاسَ عَلَىٰ مَا آتَاهُمُ اللَّهُ مِنْ فَضْلِهِ</p>
                  <p className="font-semibold text-rose-900 pt-1">HR. Abu Dawud:</p>
                  <p className="font-arabic text-xs" dir="rtl">
                    إِيَّاكُمْ وَالْحَسَدَ فَإِنَّ الْحَسَدَ يَأْكُلُ الْحَسَنَاتِ كَمَا تَأْكُلُ النَّارُ الْحَطَبَ
                  </p>
                  <p className="italic text-slate-600">&ldquo;Jauhilah hasad, karena hasad memakan kebaikan sebagaimana api membakar kayu bakar.&rdquo;</p>
                </div>
              </div>

              {/* Riya' */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <span className="font-bold text-rose-950 text-sm block">3. Riya&apos; (الرِّيَاءُ)</span>
                <p className="text-slate-600">Melakukan suatu amal ibadah agar dilihat, disanjung, dan dipuji oleh manusia lain.</p>
                <div className="p-2.5 rounded-xl bg-white border border-rose-100 space-y-1 text-[11px]">
                  <p className="font-semibold text-rose-900">QS. Al-Ma&apos;un: 4-7:</p>
                  <p className="font-arabic text-xs" dir="rtl">
                    فَوَيْلٌ لِلْمُصَلِّينَ ﴿٤﴾ الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ ﴿٥﴾ الَّذِينَ هُمْ يُرَاءُونَ ﴿٦﴾ وَيَمْنَعُونَ الْمَاعُونَ ﴿٧﴾
                  </p>
                  <p className="italic text-slate-600">&ldquo;Maka celakalah bagi orang-orang yang shalat, (yaitu) orang-orang yang lalai dari shalatnya, orang-orang yang berbuat riya&apos;...&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIK 6: ASMAUL HUSNA, KEISTIMEWAAN ISLAM, & HUKUM ISLAM                 */}
      {/* ========================================================================= */}
      {(activeTopic === 6 || searchFilter.toLowerCase().includes('asmaul husna') || searchFilter.toLowerCase().includes('hukum islam') || searchFilter.toLowerCase().includes('wajib') || searchFilter.toLowerCase().includes('ijma')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 font-black flex items-center justify-center text-lg">
                6
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-6
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Asmaul Husna, Keistimewaan Islam, &amp; 5 Hukum Islam
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Asmaul Husna 99 Nama Allah, Keistimewaan Agama Islam, Sumber Hukum Islam Al-Qur'an Hadits Ijma' Qiyas, dan 5 Hukum Islam.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* Bagian Asmaul Husna & Keistimewaan Islam */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Asmaul Husna */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs">
              <span className="font-bold text-amber-900 text-sm block">✨ 99 Asmaul Husna</span>
              <p className="text-slate-700 leading-relaxed">
                Asmaul Husna adalah 99 nama mulia, agung, dan sempurna milik Allah SWT. Kita dianjurkan berdoa menyebut asma-Nya.
              </p>
              <div className="p-3 rounded-xl bg-white border border-amber-200 space-y-1">
                <p className="font-semibold text-amber-900">QS. Al-A&apos;raf: 180:</p>
                <p className="font-arabic text-xs" dir="rtl">
                  وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا وَذَرُوا الَّذِينَ يُلْحِدُونَ فِي أَسْمَائِهِ
                </p>
                <p className="italic text-slate-600 text-[11px]">
                  &ldquo;Hanya milik Allah asma-ul husna, maka bermohonlah kepada-Nya dengan menyebut asma-ul husna itu...&rdquo;
                </p>
              </div>
            </div>

            {/* Keistimewaan Islam */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
              <span className="font-bold text-emerald-900 text-sm block">🕌 4 Keistimewaan Agama Islam</span>
              <div className="space-y-1.5 text-slate-700 text-[11px]">
                <p>• <strong>QS. Al-Ma&apos;idah: 3:</strong> وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا <em>(Agama yang diridhai Allah)</em></p>
                <p>• <strong>QS. Ali Imran: 85:</strong> وَمَنْ يَبْتَغِ غَيْرَ الْإِسْلَامِ دِينًا فَلَنْ يُقْبَلَ مِنْهُ <em>(Satu-satunya agama yang diterima di akhirat)</em></p>
                <p>• <strong>QS. An-Nisa&apos;: 125:</strong> وَمَنْ أَحْسَنُ دِينًا مِمَّنْ أَسْلَمَ وَجْهَهُ لِلَّهِ <em>(Agama kepasrahan &amp; kebaikan terbaik)</em></p>
                <p>• <strong>QS. An-Nisa&apos;: 36:</strong> وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا وَبِالْوَالِدَيْنِ إِحْسَانًا <em>(Tauhid murni &amp; bakti orang tua)</em></p>
              </div>
            </div>
          </div>

          {/* Sumber Hukum Islam */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <h5 className="font-bold text-slate-900 text-sm">Sumber-Sumber Hukum Islam:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-800 block mb-1">1. Al-Qur&apos;an (Utama)</span>
                <p className="text-[11px] text-slate-600">Kalamullah pedoman hidup utama manusia.</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">QS. Al-An&apos;am: 155</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-teal-800 block mb-1">2. Hadits / Sunnah (Utama)</span>
                <p className="text-[11px] text-slate-600">Sabda &amp; perbuatan Nabi penjelas Al-Qur&apos;an.</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">QS. An-Nahl: 44</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-amber-800 block mb-1">3. Ijma&apos; (Penunjang)</span>
                <p className="text-[11px] text-slate-600">Kesepakatan mujtahid umat Nabi SAW.</p>
                <p className="text-[10px] text-slate-500 font-arabic mt-1">لَا تَجْتَمِعُ أُمَّتِي عَلَى الضَّلَالَةِ</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-sky-800 block mb-1">4. Qiyas (Penunjang)</span>
                <p className="text-[11px] text-slate-600">Menyamakan hukum karena persamaan sebab/illat.</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">Analogi Hukum Syar&apos;i</p>
              </div>
            </div>
          </div>

          {/* 5 Kaidah Hukum Islam */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-sm">5 Hukum Islam (Al-Ahkam Al-Khamsah):</h5>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900 block text-sm">1. Wajib</span>
                <p className="text-[11px] text-slate-600">Dikerjakan berpahala, ditinggalkan berdosa.</p>
                <p className="text-[10px] font-semibold text-emerald-800">• Fardhu &apos;Ain &amp; Kifayah</p>
              </div>

              <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
                <span className="font-bold text-teal-900 block text-sm">2. Sunnah</span>
                <p className="text-[11px] text-slate-600">Dikerjakan berpahala, ditinggalkan tidak berdosa.</p>
                <p className="text-[10px] font-semibold text-teal-800">• Muakkadah &amp; Ghoiru Muakkadah</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block text-sm">3. Mubah</span>
                <p className="text-[11px] text-slate-600">Boleh dikerjakan, boleh ditinggalkan (bebas).</p>
                <p className="text-[10px] font-semibold text-slate-700">• Contoh: Makan, minum, bermain</p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block text-sm">4. Makruh</span>
                <p className="text-[11px] text-slate-600">Ditinggalkan berpahala, dikerjakan tidak berdosa.</p>
                <p className="text-[10px] font-semibold text-amber-800">• Tahrim &amp; Tanzih</p>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                <span className="font-bold text-rose-900 block text-sm">5. Haram</span>
                <p className="text-[11px] text-slate-600">Ditinggalkan berpahala, dikerjakan berdosa besar.</p>
                <p className="text-[10px] font-semibold text-rose-800">• Lidzatih &amp; Lighoirih</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIK 7: MEMAHAMI AL-QUR'AN                                               */}
      {/* ========================================================================= */}
      {(activeTopic === 7 || searchFilter.toLowerCase().includes('quran') || searchFilter.toLowerCase().includes('makkiyah') || searchFilter.toLowerCase().includes('madaniyah') || searchFilter.toLowerCase().includes('muhkam')) && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-lg">
                7
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Pokok Bahasan Ke-7
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  Memahami Al-Qur&apos;an Al-Karim
                </h3>
              </div>
            </div>
            <button
              onClick={() => handleSpeak("Memahami Al-Qur'an. Berisi 30 Juz, 114 Surah, dan 6.236 Ayat. Dibagi menjadi Makkiyah dan Madaniyah.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Dengarkan</span>
            </button>
          </div>

          {/* Statistik Dasar Al-Qur'an */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-3xl font-black text-emerald-900 block font-serif">30</span>
              <p className="text-xs font-bold text-emerald-800 mt-1">Juz Al-Qur&apos;an</p>
            </div>
            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200">
              <span className="text-3xl font-black text-teal-900 block font-serif">114</span>
              <p className="text-xs font-bold text-teal-800 mt-1">Surah Al-Qur&apos;an</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-3xl font-black text-amber-900 block font-serif">6.236</span>
              <p className="text-xs font-bold text-amber-800 mt-1">Ayat Al-Qur&apos;an</p>
            </div>
          </div>

          {/* Jenis Ayat: Makkiyah vs Madaniyah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-800 text-sm">1. Ayat Makkiyah</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-bold text-[10px]">86 Surah</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Ayat/Surah yang diturunkan <strong>sebelum Nabi SAW hijrah ke Madinah</strong>.
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600">
                <strong>Ciri Utama:</strong> Menekankan pokok akidah, ketauhidan kepada Allah, akhlaq mulia, bantahan kepada kaum musyrik, dan peringatan dahsyatnya hari kiamat.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-800 text-sm">2. Ayat Madaniyah</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-200 text-teal-950 font-bold text-[10px]">28 Surah</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Ayat/Surah yang diturunkan <strong>setelah Nabi SAW hijrah ke Madinah</strong>.
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600">
                <strong>Ciri Utama:</strong> Menekankan hukum syariat, tata aturan ibadah fardhu, muamalah sosial, hukum pernikahan, waris, dan aturan kemasyarakatan.
              </div>
            </div>
          </div>

          {/* Pembagian Surah Berdasarkan Jumlah Ayat */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-slate-900 text-sm">Pembagian Surah Berdasarkan Jumlah Ayat:</h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800 block text-xs">1. Ath-Thiwal (الطِّوَالُ)</span>
                <p className="text-[11px] text-slate-600">Surah-surah panjang berisikan lebih dari 100 ayat.</p>
                <p className="text-[10px] text-slate-500 font-semibold">• Contoh: Al-Baqarah, Ali Imran, An-Nisa&apos;</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-teal-800 block text-xs">2. Al-Matsani (الْمَثَانِي)</span>
                <p className="text-[11px] text-slate-600">Surah-surah sekitar 100 ayat yang berulang-ulang dibaca.</p>
                <p className="text-[10px] text-slate-500 font-semibold">• Contoh: Surah Yunus s/d Surah An-Naml</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-amber-800 block text-xs">3. Al-Mufashshol (الْمُفَصَّلُ)</span>
                <p className="text-[11px] text-slate-600">Surah-surah kurang dari 100 ayat yang sering diselingi basmalah.</p>
                <p className="text-[10px] text-slate-500 font-semibold">• Contoh: Surah Al-Qashash s/d Surah An-Nas</p>
              </div>
            </div>
          </div>

          {/* Ayat Muhkam & Mutasyabbih */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1.5">
              <span className="font-bold text-emerald-950 text-sm block">✨ Ayat Muhkam (الْمُحْكَمُ)</span>
              <p className="text-slate-700 leading-relaxed">
                Ayat-ayat yang maknanya sangat <strong>jelas, tegas, dan tidak ambigu</strong>. Dapat langsung dipahami dan diamalkan oleh kaum muslimin tanpa keraguan.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5">
              <span className="font-bold text-amber-950 text-sm block">🔍 Ayat Mutasyabbih (الْمُتَشَابِهُ)</span>
              <p className="text-slate-700 leading-relaxed">
                Ayat-ayat yang maknanya <strong>samar atau memiliki rahasia tertentu</strong> (seperti huruf muqaththa&apos;ah di awal surah: Alif Lam Mim). Membutuhkan keilmuan mendalam dan kepasrahan iman kepada Allah.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rangkuman Ceria Santri */}
      <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 text-center space-y-3">
        <span className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
          🌟
        </span>
        <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
          Alhamdulillah, Anda Telah Membuka Seluruh Pokok Dinul Islam!
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Semoga ananda santri TPA Al-Ikhlas Surabaya tumbuh menjadi anak yang sholeh/sholehah, berbakti kepada orang tua dan guru, serta mengamalkan akhlaqul karimah dalam pergaulan sehari-hari.
        </p>
      </div>
    </div>
  );
}
