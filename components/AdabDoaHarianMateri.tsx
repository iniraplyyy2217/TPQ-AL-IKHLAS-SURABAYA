'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  CheckCircle2,
  Sparkles,
  Heart,
  Search,
  Star,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Award,
  Sun,
  Moon,
  Clock,
  Home,
  Compass,
  Smile,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { speakText, playApplauseSound } from '@/lib/audio-effects';
import confetti from 'canvas-confetti';
import {
  BACAAN_WUDHU_ADZAN,
  BACAAN_NIAT_SHALAT,
  BACAAN_DALAM_SHALAT,
  DoaItem
} from '@/lib/materi-hafalan-tpq-data';
import {
  ADAB_BERDOA_LIST,
  DOA_ADAB_BELAJAR,
  DOA_ADAB_HARIAN,
  DAFTAR_SURAT_PENDEK_TPQ,
  AYAT_PILIHAN_DATA,
  TAHLIL_SECTIONS,
  ROTIB_HADDAD_HIGHLIGHTS,
  ASMAUL_HUSNA_ITEMS
} from '@/lib/materi-hafalan-tpq-adab';

export default function AdabDoaHarianMateri() {
  const [activeBab, setActiveBab] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [hafalMap, setHafalMap] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem('tpa_alikhlas_hafalan_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  const toggleHafal = (id: string, judul: string) => {
    const updated = { ...hafalMap, [id]: !hafalMap[id] };
    setHafalMap(updated);
    try {
      localStorage.setItem('tpa_alikhlas_hafalan_progress', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (!hafalMap[id]) {
      playApplauseSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const babTabs = [
    { no: 1, title: 'I. Wudhu & Adzan', count: '8 Materi' },
    { no: 2, title: 'II. Niat Shalat', count: '5 Waktu' },
    { no: 3, title: 'III. Bacaan Shalat', count: '11 Bacaan' },
    { no: 4, title: 'IV. Doa & Adab Belajar', count: 'Adab & Doa' },
    { no: 5, title: 'V. Doa Harian (A-Q)', count: '17 Doa' },
    { no: 6, title: 'VI. Surat Pendek', count: '22 Surat' },
    { no: 7, title: 'VII. Ayat Pilihan', count: 'Kursi & Baqarah' },
    { no: 8, title: 'VIII. Bacaan Tahlil', count: 'Tawassul & Dzikir' },
    { no: 9, title: 'IX. Rotibul Haddad', count: 'Wirid Harian' },
    { no: 10, title: 'X. Asma’ul Husna', count: '99 Nama Allah' }
  ];

  const totalHafalCount = Object.values(hafalMap).filter(Boolean).length;

  const handleSpeak = (text: string) => {
    speakText(text, 'id-ID');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/40 text-amber-300 text-xs font-bold shadow-xs">
              BUKU MATERI HAFALAN TPQ
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-emerald-200 text-xs font-semibold">
              Team Asâtidz Wal Asâtidzah
            </span>
            {totalHafalCount > 0 && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{totalHafalCount} Hafalan Selesai</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight text-white">
            Bab 06 · Adab &amp; Doa Harian Santri
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
            Panduan lengkap materi hafalan untuk anak-anak Taman Pendidikan Al-Qur’an (TPQ) mulai dari wudhu, shalat, doa harian, adab belajar, surat-surat pendek, tahlil hingga Asma’ul Husna dengan bahasa yang mudah dipahami.
          </p>
        </div>
      </div>

      {/* Search Bar & Progress Overview */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari doa, wudhu, shalat, makan, tidur..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 w-full md:w-auto justify-end">
          <BookmarkCheck className="w-4 h-4 text-emerald-600" />
          <span>Klik tanda centang <strong>“Sudah Hafal”</strong> untuk menandai hafalanmu</span>
        </div>
      </div>

      {/* 10 Bab Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
        {babTabs.map((tab) => (
          <button
            key={tab.no}
            onClick={() => {
              setActiveBab(tab.no);
              setSearchQuery('');
            }}
            className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
              activeBab === tab.no && !searchQuery
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-[1.02]'
                : 'bg-white hover:bg-emerald-50/70 text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <p className="text-[11px] font-bold line-clamp-1">{tab.title}</p>
            <p className={`text-[10px] mt-0.5 ${activeBab === tab.no && !searchQuery ? 'text-emerald-100' : 'text-slate-400'}`}>
              {tab.count}
            </p>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* SECTION CONTENT DISPLAY                                             */}
      {/* =================================================================== */}
      <div className="space-y-6">

        {/* BAB I: BACAAN WUDHU, ADZAN DAN SHALAT */}
        {(activeBab === 1 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                I
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  I. Bacaan Wudhu, Adzan dan Shalat
                </h3>
                <p className="text-xs text-slate-500">
                  Panduan bersuci wudhu, seruan adzan, doa setelah adzan, serta lafadz iqomah.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {BACAAN_WUDHU_ADZAN.filter(item => 
                !searchQuery || 
                item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.arti.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <DoaCard
                  key={item.id}
                  item={item}
                  isHafal={!!hafalMap[item.id]}
                  onToggleHafal={() => toggleHafal(item.id, item.judul)}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          </div>
        )}

        {/* BAB II: BACAAN NIAT SHALAT */}
        {(activeBab === 2 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                II
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  II. Bacaan Niat Shalat 5 Waktu
                </h3>
                <p className="text-xs text-slate-500">
                  Niat shalat Dhuhur, Ashar, Maghrib, Isya’, dan Shubuh (sendiri, makmum, atau imam).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BACAAN_NIAT_SHALAT.filter(item => 
                !searchQuery || 
                item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.arti.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <DoaCard
                  key={item.id}
                  item={item}
                  isHafal={!!hafalMap[item.id]}
                  onToggleHafal={() => toggleHafal(item.id, item.judul)}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          </div>
        )}

        {/* BAB III: BACAAN DI DALAM SHALAT */}
        {(activeBab === 3 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                III
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  III. Bacaan di Dalam Shalat Lengkap
                </h3>
                <p className="text-xs text-slate-500">
                  Takbir, iftitah, fatihah, ruku’, i’tidal, qunut shubuh, sujud, tahiyyat, dzikir, dan sujud tilawah.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {BACAAN_DALAM_SHALAT.filter(item => 
                !searchQuery || 
                item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.arti.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <DoaCard
                  key={item.id}
                  item={item}
                  isHafal={!!hafalMap[item.id]}
                  onToggleHafal={() => toggleHafal(item.id, item.judul)}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          </div>
        )}

        {/* BAB IV: DOA DAN ADAB BELAJAR */}
        {(activeBab === 4 || searchQuery) && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                IV
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  IV. Doa dan Adab Belajar Santri TPQ
                </h3>
                <p className="text-xs text-slate-500">
                  Adab berdoa yang baik, doa mulai belajar, serta doa kafaratul majelis.
                </p>
              </div>
            </div>

            {/* Kotak Khusus Adab Berdoa */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>A. 7 Adab Berdoa yang Dicintai Allah SWT:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {ADAB_BERDOA_LIST.map((adab, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-100">
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{adab}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* List Doa Belajar */}
            <div className="grid grid-cols-1 gap-4">
              {DOA_ADAB_BELAJAR.filter(item => 
                !searchQuery || 
                item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.arti.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <DoaCard
                  key={item.id}
                  item={item}
                  isHafal={!!hafalMap[item.id]}
                  onToggleHafal={() => toggleHafal(item.id, item.judul)}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          </div>
        )}

        {/* BAB V: DOA DAN ADAB HARIAN (A - Q) */}
        {(activeBab === 5 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                V
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  V. Doa dan Adab Harian (A s/d Q)
                </h3>
                <p className="text-xs text-slate-500">
                  17 Doa sehari-hari: Tidur, Makan, Orang Tua, Masjid, Toilet, Rumah, Pakaian, Kendaraan hingga Sakit.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DOA_ADAB_HARIAN.filter(item => 
                !searchQuery || 
                item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.arti.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((item) => (
                <DoaCard
                  key={item.id}
                  item={item}
                  isHafal={!!hafalMap[item.id]}
                  onToggleHafal={() => toggleHafal(item.id, item.judul)}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          </div>
        )}

        {/* BAB VI: BACAAN SURAT-SURAT PENDEK */}
        {(activeBab === 6 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                VI
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  VI. Bacaan 22 Surat-Surat Pendek TPQ
                </h3>
                <p className="text-xs text-slate-500">
                  Target hafalan Juz ‘Amma dari Surat An-Nas sampai Surat Ad-Dhuha.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {DAFTAR_SURAT_PENDEK_TPQ.map((surah) => (
                <div
                  key={surah.no}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center">
                      {surah.no}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                      {surah.ayat} Ayat
                    </span>
                  </div>
                  <div className="mt-2">
                    <h4 className="font-bold text-sm text-slate-900">Surat {surah.nama}</h4>
                    <p className="text-[11px] text-slate-500 italic">{surah.arti}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(`Surat ${surah.nama}, ${surah.ayat} ayat. Artinya ${surah.arti}`)}
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengarkan Nama</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BAB VII: AYAT-AYAT PILIHAN */}
        {(activeBab === 7 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                VII
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  VII. Bacaan Ayat-Ayat Pilihan
                </h3>
                <p className="text-xs text-slate-500">
                  Ayat Kursi, Akhir Surat Al-Baqarah, serta Sayyidul Istighfar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {AYAT_PILIHAN_DATA.map((item) => (
                <DoaCard
                  key={item.id}
                  item={item}
                  isHafal={!!hafalMap[item.id]}
                  onToggleHafal={() => toggleHafal(item.id, item.judul)}
                  onSpeak={handleSpeak}
                />
              ))}
            </div>
          </div>
        )}

        {/* BAB VIII: BACAAN TAHLIL */}
        {(activeBab === 8 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                VIII
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  VIII. Bacaan Tahlil Santri
                </h3>
                <p className="text-xs text-slate-500">
                  Susunan bacaan tahlil, hadharah fatihah, serta kalimah thayyibah.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {TAHLIL_SECTIONS.map((sec, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h4 className="font-bold text-sm text-emerald-800">{sec.judul}</h4>
                  <p className="text-right text-base sm:text-lg font-serif text-slate-800 leading-loose py-1" dir="rtl">
                    {sec.arab}
                  </p>
                  <p className="text-xs text-emerald-900 italic font-medium">{sec.latin}</p>
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    💡 <strong>Keterangan:</strong> {sec.ket}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BAB IX: BACAAN ROTIBUL HADDAD */}
        {(activeBab === 9 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                IX
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  IX. Bacaan Rotibul Haddad
                </h3>
                <p className="text-xs text-slate-500">
                  Wirid harian Al-Habib Abdullah bin Alawi Al-Haddad untuk ketenangan hati dan perlindungan diri.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {ROTIB_HADDAD_HIGHLIGHTS.map((rotib, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <p className="text-right text-base sm:text-lg font-serif text-slate-800 leading-loose" dir="rtl">
                    {rotib.bacaan}
                  </p>
                  <p className="text-xs text-emerald-900 font-medium italic">{rotib.latin}</p>
                  <p className="text-xs text-slate-600">{rotib.arti}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BAB X: ASMA'UL HUSNA */}
        {(activeBab === 10 || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                X
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  X. Bacaan 99 Asma’ul Husna
                </h3>
                <p className="text-xs text-slate-500">
                  Nama-nama agung dan indah Allah SWT. Siapa yang menghafal dan mengamalkannya dijamin masuk surga.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {ASMAUL_HUSNA_ITEMS.map((item) => (
                <div
                  key={item.no}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center hover:border-emerald-300 hover:shadow-xs transition-all space-y-1.5"
                >
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                    #{item.no}
                  </span>
                  <p className="text-xl font-serif text-slate-900" dir="rtl">{item.arab}</p>
                  <p className="text-xs font-bold text-emerald-900">{item.latin}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{item.arti}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

interface DoaCardProps {
  item: DoaItem;
  isHafal: boolean;
  onToggleHafal: () => void;
  onSpeak: (text: string) => void;
}

function DoaCard({ item, isHafal, onToggleHafal, onSpeak }: DoaCardProps) {
  const [showAdab, setShowAdab] = useState(false);

  return (
    <div className={`p-5 rounded-3xl border transition-all ${
      isHafal ? 'bg-emerald-50/50 border-emerald-300' : 'bg-white border-slate-200'
    } shadow-xs space-y-3`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              {item.nomor}
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {item.kategori}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
            {item.judul}
          </h4>
        </div>

        <button
          onClick={onToggleHafal}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            isHafal
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200'
          }`}
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${isHafal ? 'text-white' : 'text-slate-400'}`} />
          <span>{isHafal ? 'Hafal ✓' : 'Belum'}</span>
        </button>
      </div>

      {/* Teks Arab Berharakat Jelas */}
      <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 text-right">
        <p className="text-xl sm:text-2xl font-serif text-slate-900 leading-loose" dir="rtl">
          {item.arab}
        </p>
      </div>

      {/* Latin & Artinya */}
      <div className="space-y-1.5">
        <p className="text-xs sm:text-sm font-medium text-emerald-900 italic leading-relaxed">
          {item.latin}
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="font-semibold text-slate-900">Artinya:</strong> &ldquo;{item.arti}&rdquo;
        </p>
      </div>

      {/* Keterangan Tambahan jika ada */}
      {item.keterangan && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
          {item.keterangan}
        </div>
      )}

      {/* Adab List jika ada */}
      {item.adabList && item.adabList.length > 0 && (
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setShowAdab(!showAdab)}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-900 cursor-pointer"
          >
            <span>{showAdab ? 'Tutup Adab' : `Lihat ${item.adabList.length} Adab Penting`}</span>
            {showAdab ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdab && (
            <ul className="space-y-1 pl-2 border-l-2 border-amber-300 text-xs text-slate-700 animate-fadeIn">
              {item.adabList.map((adab, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{adab}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Footer Tips & Audio Button */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        {item.tipsSantri ? (
          <p className="text-[11px] text-slate-500 italic max-w-md">
            💡 <strong>Tips Santri:</strong> {item.tipsSantri}
          </p>
        ) : <div />}

        <button
          onClick={() => onSpeak(`${item.judul}. ${item.arti}`)}
          className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-bold cursor-pointer transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Dengarkan</span>
        </button>
      </div>
    </div>
  );
}
