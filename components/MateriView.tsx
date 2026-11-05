'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Award,
  Volume2,
  VolumeX,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Star,
  ChevronRight,
  ArrowLeft,
  Edit3,
  Save,
  Trash2,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  Layers,
  HelpCircle,
  Plus,
  Users,
  Lock,
  Unlock,
  Send,
  Check,
} from 'lucide-react';
import {
  SURAT_JUZ_30,
  PRAKTIK_SHOLAT,
  MATERI_TAJWID,
  BANK_SOAL,
  Santri,
  SoalKuis,
  DAFTAR_BAB_MATERI,
  BabMateri,
} from '@/lib/tpa-data';
import { playApplauseSound, playTryAgainSound, speakText } from '@/lib/audio-effects';
import confetti from 'canvas-confetti';
import DinulIslamMateri from '@/components/DinulIslamMateri';
import AdabDoaHarianMateri from '@/components/AdabDoaHarianMateri';

interface MateriViewProps {
  currentUser: Santri | null;
  santriList?: Santri[];
  bankSoalList?: SoalKuis[];
  onAddBankSoal?: (newSoal: Omit<SoalKuis, 'id'>) => void;
  onDeleteBankSoal?: (id: number) => void;
  onToggleInviteSantriQuiz?: (santriId: string, allow: boolean) => void;
  onRecordQuizScore: (nis: string, nama: string, skor: number, jawabanBenar: number, totalSoal: number) => void;
  initialTab?: string;
}

interface CustomMateriItem {
  judul: string;
  isi: string;
  ayatRujukan?: string;
  tugasSantri?: string;
  terakhirDiubah?: string;
}

export default function MateriView({
  currentUser,
  santriList = [],
  bankSoalList = [],
  onAddBankSoal,
  onDeleteBankSoal,
  onToggleInviteSantriQuiz,
  onRecordQuizScore,
  initialTab = 'grid',
}: MateriViewProps) {
  // Navigation: 'grid' (BBC cards) or 'bank-soal'
  const [mainView, setMainView] = useState<'grid' | 'bank-soal'>(
    initialTab === 'bank-soal' ? 'bank-soal' : 'grid'
  );

  // Selected Bab (null means user is browsing the BBC-style grid cards)
  const [selectedBabId, setSelectedBabId] = useState<string | null>(() => {
    if (initialTab && initialTab !== 'grid' && initialTab !== 'bank-soal') {
      const found = DAFTAR_BAB_MATERI.find((b) => b.id === initialTab);
      return found ? found.id : null;
    }
    return null;
  });

  // Custom Materi stored per Bab (stored in localStorage)
  const [customMateriMap, setCustomMateriMap] = useState<Record<string, CustomMateriItem>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const loaded: Record<string, CustomMateriItem> = {};
      DAFTAR_BAB_MATERI.forEach((bab) => {
        const stored = localStorage.getItem(`tpa_custom_materi_${bab.id}`);
        if (stored) {
          loaded[bab.id] = JSON.parse(stored);
        }
      });
      return loaded;
    } catch {
      return {};
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editJudul, setEditJudul] = useState('');
  const [editIsi, setEditIsi] = useState('');
  const [editAyat, setEditAyat] = useState('');
  const [editTugas, setEditTugas] = useState('');

  // Expandable standard reference material inside a Bab
  const [showRujukanBawaan, setShowRujukanBawaan] = useState(false);

  // Bank Soal States
  const [typedNis, setTypedNis] = useState<string | null>(null);
  const [typedNama, setTypedNama] = useState<string | null>(null);
  const santriNis = typedNis !== null ? typedNis : (currentUser?.nis || '');
  const santriNama = typedNama !== null ? typedNama : (currentUser?.nama || '');

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [accumulatedPoints, setAccumulatedPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Audio reciter state
  const [playingSurahNo, setPlayingSurahNo] = useState<number | null>(null);

  // Active Sholat Step filter
  const [activeSholatStep, setActiveSholatStep] = useState(1);

  // Sifat 20 & Rukun
  const sifat20 = [
    { no: 1, nama: 'Wujud', arab: 'وُجُود', arti: 'Ada' },
    { no: 2, nama: 'Qidam', arab: 'قِدَم', arti: 'Terdahulu / Tanpa Permulaan' },
    { no: 3, nama: 'Baqa’', arab: 'بَقَاء', arti: 'Kekal / Tanpa Akhir' },
    { no: 4, nama: 'Mukhalafatu lil hawaditsi', arab: 'مُخَالَفَةٌ لِلْحَوَادِثِ', arti: 'Berbeda dengan makhluk-Nya' },
    { no: 5, nama: 'Qiyamuhu binafsihi', arab: 'قِيَامُهُ بِنَفْسِهِ', arti: 'Berdiri sendiri tanpa butuh bantuan' },
    { no: 6, nama: 'Wahdaniyah', arab: 'وَحْدَانِيَّة', arti: 'Esa / Tunggal' },
    { no: 7, nama: 'Qudrat', arab: 'قُدْرَة', arti: 'Berkuasa atas segala sesuatu' },
    { no: 8, nama: 'Iradat', arab: 'إِرَادَة', arti: 'Berkehendak' },
    { no: 9, nama: '‘Ilmun', arab: 'عِلْم', arti: 'Mengetahui segalanya' },
    { no: 10, nama: 'Hayat', arab: 'حَيَاة', arti: 'Maha Hidup' },
    { no: 11, nama: 'Sama’', arab: 'سَمْع', arti: 'Maha Mendengar' },
    { no: 12, nama: 'Bashar', arab: 'بَصَر', arti: 'Maha Melihat' },
    { no: 13, nama: 'Kalam', arab: 'كَلَام', arti: 'Maha Berfirman' },
    { no: 14, nama: 'Qadiran', arab: 'قَادِرًا', arti: 'Keadaan-Nya Maha Kuasa' },
    { no: 15, nama: 'Muridan', arab: 'مُرِيدًا', arti: 'Keadaan-Nya Maha Berkehendak' },
    { no: 16, nama: '‘Aliman', arab: 'عَالِمًا', arti: 'Keadaan-Nya Maha Mengetahui' },
    { no: 17, nama: 'Hayyan', arab: 'حَيًّا', arti: 'Keadaan-Nya Maha Hidup' },
    { no: 18, nama: 'Sami’an', arab: 'سَمِيعًا', arti: 'Keadaan-Nya Maha Mendengar' },
    { no: 19, nama: 'Bashiran', arab: 'بَصِيرًا', arti: 'Keadaan-Nya Maha Melihat' },
    { no: 20, nama: 'Mutakalliman', arab: 'مُتَكَلِّمًا', arti: 'Keadaan-Nya Maha Berfirman' },
  ];

  const rukunIslam = [
    { no: 1, judul: 'Mengucapkan Dua Kalimat Syahadat', arab: 'أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ' },
    { no: 2, judul: 'Mendirikan Sholat 5 Waktu Sehari Semalam', arab: 'إِقَامُ الصَّلَاةِ' },
    { no: 3, judul: 'Menunaikan Zakat Fitrah & Mal', arab: 'إِيتَاءُ الزَّكَاةِ' },
    { no: 4, judul: 'Menjalankan Ibadah Puasa di Bulan Ramadhan', arab: 'صَوْمُ رَمَضَانَ' },
    { no: 5, judul: 'Melaksanakan Ibadah Haji ke Baitullah bagi yang Mampu', arab: 'حَجُّ البَيْتِ' },
  ];

  const rukunIman = [
    { no: 1, judul: 'Iman kepada Allah SWT' },
    { no: 2, judul: 'Iman kepada Malaikat-Malaikat Allah' },
    { no: 3, judul: 'Iman kepada Kitab-Kitab Suci Allah' },
    { no: 4, judul: 'Iman kepada Para Nabi & Rasul Utusan Allah' },
    { no: 5, judul: 'Iman kepada Hari Akhir (Kiamat)' },
    { no: 6, judul: 'Iman kepada Qadha dan Qadar (Takdir Baik & Buruk)' },
  ];

  // When a Bab is selected, populate the edit fields if custom materi exists
  const selectedBab = DAFTAR_BAB_MATERI.find((b) => b.id === selectedBabId) || null;

  const handleOpenBab = (babId: string) => {
    setSelectedBabId(babId);
    setMainView('grid');
    setShowRujukanBawaan(false);
    const existing = customMateriMap[babId];
    if (existing) {
      setEditJudul(existing.judul);
      setEditIsi(existing.isi);
      setEditAyat(existing.ayatRujukan || '');
      setEditTugas(existing.tugasSantri || '');
      setIsEditing(false);
    } else {
      setEditJudul('');
      setEditIsi('');
      setEditAyat('');
      setEditTugas('');
      setIsEditing(false);
    }
    // Scroll to top of content smoothly
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSaveCustomMateri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBabId) return;

    if (!editJudul.trim() && !editIsi.trim()) {
      alert('Mohon isi setidaknya Judul Pelajaran atau Penjelasan Materi!');
      return;
    }

    const item: CustomMateriItem = {
      judul: editJudul.trim() || `Materi ${selectedBab?.judulBesar}`,
      isi: editIsi.trim(),
      ayatRujukan: editAyat.trim(),
      tugasSantri: editTugas.trim(),
      terakhirDiubah: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    const updated = { ...customMateriMap, [selectedBabId]: item };
    setCustomMateriMap(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`tpa_custom_materi_${selectedBabId}`, JSON.stringify(item));
      } catch {}
    }
    setIsEditing(false);
  };

  const handleResetCustomMateri = () => {
    if (!selectedBabId) return;
    const confirmReset = window.confirm(
      'Apakah Anda yakin ingin mengosongkan kembali materi bab ini?'
    );
    if (!confirmReset) return;

    const updated = { ...customMateriMap };
    delete updated[selectedBabId];
    setCustomMateriMap(updated);
    setEditJudul('');
    setEditIsi('');
    setEditAyat('');
    setEditTugas('');
    setIsEditing(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`tpa_custom_materi_${selectedBabId}`);
      } catch {}
    }
  };

  // Audio recitation helper for Juz 30
  const handlePlaySurahAudio = (surah: typeof SURAT_JUZ_30[0]) => {
    if (playingSurahNo === surah.nomor) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingSurahNo(null);
      return;
    }

    setPlayingSurahNo(surah.nomor);
    const textToRead = `${surah.nama}. ${surah.ayat.map((a) => a.latin).join('. ')}`;
    speakText(textToRead, 'id-ID');
  };

  // Questions source (from props or default)
  const questions: SoalKuis[] = bankSoalList && bankSoalList.length > 0 ? bankSoalList : BANK_SOAL;
  const isUstadzah = currentUser?.role === 'ustadzah';

  // Bank Soal subtabs for Ustadzah
  const [bankSubTab, setBankSubTab] = useState<'kelola' | 'undangan' | 'kuis'>('kelola');
  const [showAddModal, setShowAddModal] = useState(false);

  // New question form state
  const [newKat, setNewKat] = useState('Dinul Islam');
  const [newTanya, setNewTanya] = useState('');
  const [newPilA, setNewPilA] = useState('');
  const [newPilB, setNewPilB] = useState('');
  const [newPilC, setNewPilC] = useState('');
  const [newPilD, setNewPilD] = useState('');
  const [newKunci, setNewKunci] = useState(0);
  const [newBahas, setNewBahas] = useState('');
  const [newPoin, setNewPoin] = useState(10);
  const [addMsg, setAddMsg] = useState(false);

  // Quiz Handling
  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!santriNis.trim() || !santriNama.trim()) {
      alert('Mohon isi Nomor Santri dan Nama Santri terlebih dahulu!');
      return;
    }
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setAccumulatedPoints(0);
    setQuizFinished(false);
  };

  const currentQ: SoalKuis = questions[currentQuestionIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered || !currentQ) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.kunciJawaban;

    if (isCorrect) {
      playApplauseSound();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.65 },
        });
      } catch {}

      setCorrectCount((prev) => prev + 1);
      setAccumulatedPoints((prev) => prev + currentQ.poin);
    } else {
      playTryAgainSound();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const totalPointsWon = (correctCount + (selectedAnswer === currentQ.kunciJawaban ? 0 : 0)) * 10;
      onRecordQuizScore(santriNis, santriNama, totalPointsWon, correctCount, questions.length);

      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 },
        });
        playApplauseSound();
      } catch {}
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setAccumulatedPoints(0);
    setQuizFinished(false);
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTanya || !newPilA || !newPilB || !newPilC || !newPilD) {
      alert('Harap lengkapi pertanyaan dan seluruh pilihan jawaban A, B, C, D!');
      return;
    }

    if (onAddBankSoal) {
      onAddBankSoal({
        kategori: newKat,
        pertanyaan: newTanya,
        pilihan: [newPilA, newPilB, newPilC, newPilD],
        kunciJawaban: Number(newKunci),
        pembahasan: newBahas || 'Jawaban benar telah dikonfirmasi oleh Asatidz.',
        poin: Number(newPoin) || 10,
      });

      setNewTanya('');
      setNewPilA('');
      setNewPilB('');
      setNewPilC('');
      setNewPilD('');
      setNewBahas('');
      setAddMsg(true);
      setShowAddModal(false);
      setTimeout(() => setAddMsg(false), 3000);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Switcher: Pilihan Bab Materi vs Bank Soal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMainView('grid');
                setSelectedBabId(null);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                mainView === 'grid' && selectedBabId === null
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Kotak Pilihan Bab Materi (6 Bab)</span>
            </button>

            <button
              onClick={() => {
                setMainView('bank-soal');
                setSelectedBabId(null);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                mainView === 'bank-soal'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Bank Soal &amp; Kuis Berpoint 👏</span>
            </button>
          </div>

          {selectedBabId !== null && (
            <button
              onClick={() => setSelectedBabId(null)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Pilihan Bab</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: KOTAK-KOTAK PILIHAN BAB (TAMPILAN GRID SESUAI GAMBAR YANG DIUNGGAH) */}
        {/* ========================================================================= */}
        {mainView === 'grid' && selectedBabId === null && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Title & Description */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>Kurikulum Pembelajaran TPA Al-Ikhlas</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-serif tracking-tight">
                Materi Belajar Santri
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                Pilih kotak bab materi di bawah ini untuk membuka dan mempelajari modul pembelajaran santri. Klik salah satu bab untuk melihat isinya.
              </p>
            </div>

            {/* The 2-Column Responsive Grid of Bab Cards (Matching BBC Learning English Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {DAFTAR_BAB_MATERI.map((bab) => {
                const hasCustomMateri = !!customMateriMap[bab.id];

                return (
                  <div
                    key={bab.id}
                    onClick={() => handleOpenBab(bab.id)}
                    className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 aspect-[16/10] sm:aspect-[16/9] border border-slate-200/80 bg-slate-900 select-none"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleOpenBab(bab.id);
                      }
                    }}
                  >
                    {/* Background Banner Image for this specific Bab */}
                    <Image
                      src={bab.gambar}
                      alt={bab.altGambar}
                      fill
                      sizes="(max-width: 768px) 100vw, 650px"
                      priority={bab.nomor <= 2}
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />

                    {/* Dark gradient overlay for ultra-crisp white text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/55 group-hover:via-black/50 transition-colors" />

                    {/* Top Tag Category (e.g. "BAB 01 · DINUL ISLAM" - matches "REAL EASY ENGLISH") */}
                    <div className="absolute top-4 left-5 sm:top-5 sm:left-6 z-10">
                      <span className="text-white font-black text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {bab.tagCategory}
                      </span>
                    </div>

                    {/* Top Right Module Tag */}
                    <div className="absolute top-4 right-5 sm:top-5 sm:right-6 z-10 flex items-center gap-2">
                      {hasCustomMateri && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-sm backdrop-blur-md">
                          Materi Tersimpan
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-white/20 shadow-sm">
                        Bab 0{bab.nomor}
                      </span>
                    </div>

                    {/* Center Huge Bold Title (e.g. "Talking about drinks" - bold white headline) */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 text-center z-10 pointer-events-none">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] font-serif max-w-md group-hover:text-amber-300 transition-colors">
                        {bab.judulBesar}
                      </h3>
                    </div>

                    {/* Arched Sticker Badge on bottom right (matches the Podcast sticker in BBC layout) */}
                    <div className="absolute bottom-11 sm:bottom-12 right-4 sm:right-6 z-10 bg-amber-400 text-slate-950 px-3 py-1.5 rounded-t-xl rounded-bl-sm text-xs font-black shadow-lg flex items-center gap-1.5 border border-amber-300 transform group-hover:-translate-y-1 transition-transform">
                      <BookOpen className="w-3.5 h-3.5 text-slate-950" />
                      <span>Buka Materi</span>
                    </div>

                    {/* Bottom Dark Bar Strip (matches the black horizontal bottom bar in BBC layout) */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/85 backdrop-blur-sm py-2.5 px-4 sm:py-3 sm:px-6 flex items-center justify-between z-10 border-t border-white/10">
                      <span className="text-white text-xs sm:text-sm font-semibold truncate mr-3 drop-shadow-xs">
                        {bab.subJudul}
                      </span>
                      <span className="shrink-0 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                        {bab.badgeLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Banner */}
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-800 text-amber-300 border border-emerald-700">
                  Uji Pemahaman Santri
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif pt-1">
                  Bank Soal &amp; Kuis Berhadiah Poin
                </h4>
                <p className="text-emerald-200 text-xs sm:text-sm max-w-xl">
                  Santri dapat mengerjakan kuis interaktif dengan efek suara tepuk tangan meriah dan perolehan poin prestasi.
                </p>
              </div>

              <button
                onClick={() => setMainView('bank-soal')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>Buka Bank Soal Sekarang</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: ISI MATERI BAB (SAAT KOTAK DIBUKA, SEMENTARA DIBUAT KOSONG)       */}
        {/* ========================================================================= */}
        {mainView === 'grid' && selectedBabId !== null && selectedBab && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedBabId(null)}
                  className="hover:text-emerald-700 font-medium cursor-pointer"
                >
                  Pilihan Bab
                </button>
                <span>/</span>
                <span className="font-bold text-slate-800">
                  Bab 0{selectedBab.nomor}: {selectedBab.judulBesar}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedBabId(null)}
                  className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Kotak Pilihan</span>
                </button>
              </div>
            </div>

            {/* Chapter Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
              <div className="relative aspect-[21/9] min-h-[180px] sm:min-h-[220px] w-full">
                <Image
                  src={selectedBab.gambar}
                  alt={selectedBab.altGambar}
                  fill
                  priority
                  referrerPolicy="no-referrer"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-900/60" />

                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-xs">
                      {selectedBab.tagCategory}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
                      Rujukan: {selectedBab.rujukanKitab}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif tracking-tight text-white drop-shadow-md">
                    {selectedBab.judulBesar}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                    {selectedBab.subJudul} · <strong className="text-amber-300 font-semibold">{selectedBab.targetSantri}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* CONTENT AREA: SEMENTARA KOSONG DULU, BISA DIISI DENGAN MATERI SENDIRI */}
            {/* ===================================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
              
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1 border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ruang Konten Pembelajaran Santri</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    Materi Bab 0{selectedBab.nomor}: {selectedBab.judulBesar}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{customMateriMap[selectedBab.id] ? 'Edit Materi' : 'Tulis Materi Saya Sendiri'}</span>
                    </button>
                  )}

                  {customMateriMap[selectedBab.id] && !isEditing && (
                    <button
                      onClick={handleResetCustomMateri}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Kosongkan</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Case 1: Editing / Writing Custom Material */}
              {isEditing ? (
                <form onSubmit={handleSaveCustomMateri} className="space-y-5 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900">
                    <p className="font-bold flex items-center gap-1.5">
                      <Edit3 className="w-4 h-4 text-emerald-700" />
                      Formulir Pengisian Materi Bab 0{selectedBab.nomor}
                    </p>
                    <p className="mt-1 text-slate-600">
                      Silakan ketikkan materi pembelajaran yang ingin Anda sampaikan kepada santri. Materi yang Anda simpan akan langsung tersimpan dan ditampilkan di modul bab ini.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Judul / Pokok Pelajaran:
                    </label>
                    <input
                      type="text"
                      value={editJudul}
                      onChange={(e) => setEditJudul(e.target.value)}
                      placeholder={`Contoh: Pelajaran 1 - Inti Pokok ${selectedBab.judulBesar}`}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm font-semibold outline-hidden"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Teks Penjelasan Materi yang Dipelajari Santri:
                    </label>
                    <textarea
                      rows={8}
                      value={editIsi}
                      onChange={(e) => setEditIsi(e.target.value)}
                      placeholder="Tuliskan rangkuman materi, bacaan, penjelasan poin-poin pelajaran, atau tata cara ibadah yang dipelajari santri di sini..."
                      className="w-full p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm leading-relaxed outline-hidden"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Ayat / Hadits Rujukan (Opsional):
                      </label>
                      <input
                        type="text"
                        value={editAyat}
                        onChange={(e) => setEditAyat(e.target.value)}
                        placeholder="Contoh: QS. Al-Baqarah: 183 atau HR. Bukhari"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Tugas / Latihan Santri (Opsional):
                      </label>
                      <input
                        type="text"
                        value={editTugas}
                        onChange={(e) => setEditTugas(e.target.value)}
                        placeholder="Contoh: Hafalkan 5 poin pertama di rumah bersama orang tua"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 text-xs outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Materi Bab Ini</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : selectedBab.id === 'dinul-islam' ? (
                /* Bab 01: Dinul Islam - Materi Lengkap 7 Pokok Bahasan Sesuai Permintaan */
                <div className="space-y-6 animate-fadeIn">
                  {customMateriMap['dinul-islam'] && (
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                      <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
                        <span>📝 Catatan Tambahan Anda: {customMateriMap['dinul-islam'].judul}</span>
                        <span>Diperbarui: {customMateriMap['dinul-islam'].terakhirDiubah}</span>
                      </div>
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                        {customMateriMap['dinul-islam'].isi}
                      </p>
                      {customMateriMap['dinul-islam'].ayatRujukan && (
                        <p className="text-xs text-amber-950 font-semibold">
                          Rujukan: {customMateriMap['dinul-islam'].ayatRujukan}
                        </p>
                      )}
                    </div>
                  )}

                  <DinulIslamMateri />
                </div>
              ) : selectedBab.id === 'adab-doa' ? (
                /* Bab 06: Adab & Doa Harian - Buku Materi Hafalan TPQ Team Asatidz Wal Asatidzah */
                <div className="space-y-6 animate-fadeIn">
                  {customMateriMap['adab-doa'] && (
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                      <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
                        <span>📝 Catatan Tambahan Anda: {customMateriMap['adab-doa'].judul}</span>
                        <span>Diperbarui: {customMateriMap['adab-doa'].terakhirDiubah}</span>
                      </div>
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                        {customMateriMap['adab-doa'].isi}
                      </p>
                      {customMateriMap['adab-doa'].ayatRujukan && (
                        <p className="text-xs text-amber-950 font-semibold">
                          Rujukan: {customMateriMap['adab-doa'].ayatRujukan}
                        </p>
                      )}
                    </div>
                  )}

                  <AdabDoaHarianMateri />
                </div>
              ) : customMateriMap[selectedBab.id] ? (
                /* Case 2: Custom Material is filled by the user for other bab */
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-200">
                      <span className="font-bold text-emerald-800">
                        Materi Disusun Mandiri · TPA Al-Ikhlas
                      </span>
                      <span>Diperbarui: {customMateriMap[selectedBab.id].terakhirDiubah}</span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                      {customMateriMap[selectedBab.id].judul}
                    </h4>

                    <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                      {customMateriMap[selectedBab.id].isi}
                    </div>

                    {customMateriMap[selectedBab.id].ayatRujukan && (
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium">
                        <strong>Dalil / Rujukan:</strong> {customMateriMap[selectedBab.id].ayatRujukan}
                      </div>
                    )}

                    {customMateriMap[selectedBab.id].tugasSantri && (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
                        <strong>Latihan / Tugas Santri:</strong> {customMateriMap[selectedBab.id].tugasSantri}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Case 3: Empty State (Default as requested by user for Bab 2 s/d 6) */
                <div className="py-14 sm:py-20 text-center max-w-xl mx-auto space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs">
                    <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                      Konten Sementara Masih Kosong
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                      Materi Bab Ini Sedang Disiapkan
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Sesuai arahan Anda, isi materi untuk <strong>{selectedBab.judulBesar}</strong> saat ini sementara dibuat kosong. Anda dapat segera mengisinya dengan materi pembelajaran buatan Anda sendiri kapan pun Anda siap.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Mulai Tulis Materi Bab Ini</span>
                    </button>
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* COLLAPSIBLE REFERENCE ACCORDION: STANDARD TPA CURRICULUM (OPTIONAL) */}
              {/* =================================================================== */}
              {selectedBab.id !== 'dinul-islam' && (
                <div className="pt-6 border-t border-slate-200">
                  <button
                    onClick={() => setShowRujukanBawaan(!showRujukanBawaan)}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          Lihat Rujukan Kitab &amp; Materi Bawaan TPA (Opsional Sebagai Pedoman)
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Klik untuk membuka teks kurikulum standar {selectedBab.judulBesar}
                        </p>
                      </div>
                    </div>
                    {showRujukanBawaan ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  {showRujukanBawaan && (
                    <div className="mt-6 pt-2 space-y-6 animate-fadeIn">
                      {/* Bab 2 Reference: Aqidah 20 Sifat */}
                      {selectedBab.id === 'aqidah' && (
                        <div className="space-y-4">
                          <h5 className="font-bold text-slate-900 text-sm">20 Sifat Wajib bagi Allah:</h5>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                            {sifat20.map((s) => (
                              <div key={s.no} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <p className="font-arabic text-emerald-950 font-bold text-sm">{s.arab}</p>
                                <p className="font-bold text-slate-900">{s.no}. {s.nama}</p>
                                <p className="text-[11px] text-slate-500">{s.arti}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bab 3 Reference: Praktik Sholat */}
                      {selectedBab.id === 'sholat' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-slate-900 text-sm">Langkah Praktik Sholat Lengkap:</h5>
                            <span className="text-xs text-slate-500">12 Langkah Fardhu</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
                            {PRAKTIK_SHOLAT.map((step) => (
                              <div key={step.step} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <span className="text-[10px] font-bold text-emerald-700">Langkah {step.step}</span>
                                <p className="font-bold text-slate-900 truncate">{step.judul}</p>
                                <p className="text-[11px] text-slate-500 truncate">{step.gerakan}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bab 4 Reference: Tajwid */}
                      {selectedBab.id === 'tajwid' && (
                        <div className="space-y-4">
                          <h5 className="font-bold text-slate-900 text-sm">Hukum Bacaan Tajwid Ceria:</h5>
                          <div className="space-y-3">
                            {MATERI_TAJWID.slice(0, 2).map((k, kIdx) => (
                              <div key={kIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                                <strong className="text-emerald-800 text-sm">{k.kategori}</strong>
                                <p className="text-slate-600 mt-1">{k.pembahasan.map((p) => p.nama).join(' · ')}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bab 5 Reference: Tahfidz Juz 30 */}
                      {selectedBab.id === 'juz-30' && (
                        <div className="space-y-4">
                          <h5 className="font-bold text-slate-900 text-sm">Daftar Surat Pendek Juz 30:</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            {SURAT_JUZ_30.map((s) => (
                              <div key={s.nomor} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                                <div>
                                  <span className="font-bold text-slate-900">Surat {s.nama} ({s.jumlahAyat} Ayat)</span>
                                  <p className="text-[11px] text-slate-500">Arti: {s.arti}</p>
                                </div>
                                <button
                                  onClick={() => handlePlaySurahAudio(s)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                                >
                                  {playingSurahNo === s.nomor ? <VolumeX className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                  <span>{playingSurahNo === s.nomor ? 'Stop' : 'Putar'}</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bab 6 Reference: Adab & Doa */}
                      {selectedBab.id === 'adab-doa' && (
                        <div className="space-y-4">
                          <h5 className="font-bold text-slate-900 text-sm">Adab &amp; Doa Harian Santri:</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                              <strong className="text-emerald-900">Adab kepada Orang Tua</strong>
                              <p className="text-slate-600 mt-1">Mencium tangan sebelum berangkat mengaji, bertutur kata santun dan mendoakan ampunan.</p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                              <strong className="text-emerald-900">Adab kepada Guru / Ustadz</strong>
                              <p className="text-slate-600 mt-1">Duduk rapi, menyimak materi, memberi salam dan tidak memotong penjelasan guru.</p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                              <strong className="text-emerald-900">Adab terhadap Al-Qur&apos;an</strong>
                              <p className="text-slate-600 mt-1">Berwudhu sebelum menyentuh mushaf, meletakkan di atas rehal atau meja yang bersih.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Quick Navigation Between Chapters */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                {selectedBab.nomor > 1 ? (
                  <button
                    onClick={() => {
                      const prevBab = DAFTAR_BAB_MATERI.find((b) => b.nomor === selectedBab.nomor - 1);
                      if (prevBab) handleOpenBab(prevBab.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Bab Sebelumnya (Bab 0{selectedBab.nomor - 1})</span>
                  </button>
                ) : <div />}

                <button
                  onClick={() => setSelectedBabId(null)}
                  className="px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  Lihat Semua Bab
                </button>

                {selectedBab.nomor < DAFTAR_BAB_MATERI.length ? (
                  <button
                    onClick={() => {
                      const nextBab = DAFTAR_BAB_MATERI.find((b) => b.nomor === selectedBab.nomor + 1);
                      if (nextBab) handleOpenBab(nextBab.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Bab Selanjutnya (Bab 0{selectedBab.nomor + 1})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : <div />}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: BANK SOAL & KUIS SANTRI BERHADIAH POIN + TEPUK TANGAN MERIAH     */}
        {/* ========================================================================= */}
        {mainView === 'bank-soal' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                        isUstadzah
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      {isUstadzah ? 'Panel Ustadzah' : 'Akun Santri'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                      Bank Soal &amp; Evaluasi Santri Al-Ikhlas
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {isUstadzah
                      ? 'Kelola daftar bank soal (tambah & kurangi), serta undang/konfirmasi santri yang sudah siap mengerjakan soal.'
                      : 'Kuis evaluasi pemahaman materi Dinul Islam, Aqidah, Sholat, dan Tajwid santri.'}
                  </p>
                </div>

                {/* Subtabs for Ustadzah */}
                {isUstadzah && (
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
                    <button
                      onClick={() => setBankSubTab('kelola')}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        bankSubTab === 'kelola'
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Kelola Soal ({questions.length})
                    </button>
                    <button
                      onClick={() => setBankSubTab('undangan')}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        bankSubTab === 'undangan'
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Undang Santri
                    </button>
                    <button
                      onClick={() => setBankSubTab('kuis')}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                        bankSubTab === 'kuis'
                          ? 'bg-purple-700 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Simulasi Pengerjaan
                    </button>
                  </div>
                )}
              </div>

              {/* Notification Banner */}
              {addMsg && (
                <div className="mb-6 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Alhamdulillah! Soal baru berhasil ditambahkan ke Bank Soal TPA.</span>
                </div>
              )}

              {/* ================================================================= */}
              {/* USTADZAH SUBTAB 1: KELOLA SOAL (TAMBAH & KURANGI SOAL)            */}
              {/* ================================================================= */}
              {isUstadzah && bankSubTab === 'kelola' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                    <div>
                      <h3 className="text-sm font-bold text-purple-950 font-serif">
                        Pengelolaan Bank Soal Ustadz / Ustadzah
                      </h3>
                      <p className="text-xs text-purple-800">
                        Total saat ini: <strong>{questions.length} Soal</strong> di database kuis santri.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddModal(!showAddModal)}
                      className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddModal ? 'Tutup Form' : 'Tambah Soal Baru'}</span>
                    </button>
                  </div>

                  {/* FORM TAMBAH SOAL BARU */}
                  {showAddModal && (
                    <form
                      onSubmit={handleAddQuestionSubmit}
                      className="p-5 rounded-3xl bg-slate-50 border border-purple-200 shadow-sm space-y-4 animate-fadeIn"
                    >
                      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <Plus className="w-4 h-4 text-purple-700" />
                          <span>Input Pertanyaan Baru ke Bank Soal</span>
                        </h4>
                        <span className="text-[11px] text-slate-500">Pilihan Ganda 4 Opsi (A, B, C, D)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">
                            Kategori Materi:
                          </label>
                          <select
                            value={newKat}
                            onChange={(e) => setNewKat(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium outline-none"
                          >
                            <option value="Dinul Islam">Dinul Islam &amp; Akhlaq</option>
                            <option value="Pendidikan Aqidah">Pendidikan Aqidah (20 Sifat Allah)</option>
                            <option value="Praktik Sholat">Praktik Sholat &amp; Wudhu</option>
                            <option value="Tajwid Mudah">Tajwid Mudah &amp; Makharijul Huruf</option>
                            <option value="Hafalan Juz 30">Tahfidz Juz 30 (Surat Pendek)</option>
                            <option value="Adab &amp; Doa Harian">Adab &amp; Doa Harian</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Bobot Poin:</label>
                          <input
                            type="number"
                            min="5"
                            max="50"
                            value={newPoin}
                            onChange={(e) => setNewPoin(Number(e.target.value))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teks Pertanyaan / Soal :
                        </label>
                        <textarea
                          rows={2}
                          value={newTanya}
                          onChange={(e) => setNewTanya(e.target.value)}
                          placeholder="Ketik soal kuis di sini..."
                          required
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-purple-400 outline-none bg-white"
                        />
                      </div>

                      {/* 4 Pilihan Jawaban */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Pilihan A :</label>
                          <input
                            type="text"
                            required
                            value={newPilA}
                            onChange={(e) => setNewPilA(e.target.value)}
                            placeholder="Teks opsi A..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Pilihan B :</label>
                          <input
                            type="text"
                            required
                            value={newPilB}
                            onChange={(e) => setNewPilB(e.target.value)}
                            placeholder="Teks opsi B..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Pilihan C :</label>
                          <input
                            type="text"
                            required
                            value={newPilC}
                            onChange={(e) => setNewPilC(e.target.value)}
                            placeholder="Teks opsi C..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Pilihan D :</label>
                          <input
                            type="text"
                            required
                            value={newPilD}
                            onChange={(e) => setNewPilD(e.target.value)}
                            placeholder="Teks opsi D..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white outline-none"
                          />
                        </div>
                      </div>

                      {/* Kunci Jawaban & Pembahasan */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Kunci Jawaban Benar :
                          </label>
                          <select
                            value={newKunci}
                            onChange={(e) => setNewKunci(Number(e.target.value))}
                            className="w-full p-2.5 rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-950 font-bold outline-none"
                          >
                            <option value={0}>Opsi A ({newPilA || 'Pilihan A'})</option>
                            <option value={1}>Opsi B ({newPilB || 'Pilihan B'})</option>
                            <option value={2}>Opsi C ({newPilC || 'Pilihan C'})</option>
                            <option value={3}>Opsi D ({newPilD || 'Pilihan D'})</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block font-bold text-slate-700 mb-1">
                            Pembahasan &amp; Penjelasan Jawaban :
                          </label>
                          <input
                            type="text"
                            value={newBahas}
                            onChange={(e) => setNewBahas(e.target.value)}
                            placeholder="Contoh: Benar sekali! Rukun Islam yang kedua adalah Sholat 5 waktu..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddModal(false)}
                          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                        >
                          Simpan ke Bank Soal
                        </button>
                      </div>
                    </form>
                  )}

                  {/* DAFTAR SOAL DALAM BANK SOAL */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      Daftar Pertanyaan dalam Bank Soal ({questions.length} Soal):
                    </h4>

                    {questions.map((q, idx) => (
                      <div
                        key={q.id || idx}
                        className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 transition-all shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 font-extrabold flex items-center justify-center text-[11px] shrink-0 font-mono">
                              {idx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                              {q.kategori}
                            </span>
                            <span className="text-[10px] text-amber-700 font-bold font-mono">
                              +{q.poin} Poin
                            </span>
                          </div>

                          <h5 className="font-bold text-slate-900 text-sm">{q.pertanyaan}</h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-600 pt-1">
                            {q.pilihan.map((pil, pIdx) => (
                              <div
                                key={pIdx}
                                className={`p-1.5 px-2.5 rounded-lg border text-[11px] flex items-center justify-between ${
                                  pIdx === q.kunciJawaban
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                    : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <span>
                                  <strong>{String.fromCharCode(65 + pIdx)}.</strong> {pil}
                                </span>
                                {pIdx === q.kunciJawaban && (
                                  <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                                    Kunci ✓
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          {q.pembahasan && (
                            <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-200">
                              💡 <strong>Pembahasan:</strong> {q.pembahasan}
                            </p>
                          )}
                        </div>

                        {/* HAPUS SOAL (KURANGI SOAL) */}
                        <div className="shrink-0 pt-1 sm:pt-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Hapus soal nomor ${idx + 1} dari Bank Soal?`)) {
                                if (onDeleteBankSoal) onDeleteBankSoal(q.id);
                              }
                            }}
                            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                            title="Hapus soal ini dari Bank Soal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Soal</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* USTADZAH SUBTAB 2: UNDANG / IZINKAN SANTRI MENGERJAKAN SOAL       */}
              {/* ================================================================= */}
              {isUstadzah && bankSubTab === 'undangan' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                    <h3 className="text-sm font-bold text-purple-950 font-serif">
                      Daftar Undangan &amp; Konfirmasi Pengerjaan Bank Soal
                    </h3>
                    <p className="text-xs text-purple-900 mt-0.5">
                      Santri hanya dapat mengakses pengerjaan bank soal apabila telah diberikan konfirmasi atau undangan pengerjaan oleh Ustadz/Ustadzah.
                    </p>
                  </div>

                  {/* List of santri with invite toggle */}
                  <div className="space-y-2.5">
                    {(santriList || []).map((s) => {
                      const isInvited = Boolean(s.kuisDiizinkan);
                      return (
                        <div
                          key={s.id}
                          className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-sm">
                              {s.namaPanggilan.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="font-bold text-slate-900 text-sm">{s.nama}</h5>
                                <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                  {s.nis}
                                </span>
                              </div>
                              <p className="text-slate-500 text-[11px]">
                                {s.kelasSD} · {s.tingkatJilid} · Wali: {s.namaWali}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 justify-between sm:justify-end">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                                isInvited
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}
                            >
                              {isInvited ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-700" />
                                  <span>Siap Mengerjakan (Di-Invite ✓)</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-slate-400" />
                                  <span>Belum Di-Invite</span>
                                </>
                              )}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                if (onToggleInviteSantriQuiz) {
                                  onToggleInviteSantriQuiz(s.id, !isInvited);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                                isInvited
                                  ? 'border border-rose-200 text-rose-600 hover:bg-rose-50'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              }`}
                            >
                              {isInvited ? (
                                <span>Batalkan Izin</span>
                              ) : (
                                <>
                                  <Send className="w-3 h-3" />
                                  <span>Izinkan &amp; Undang Santri</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* SANTRI VIEW: CHECK IF INVITED TO QUIZ                             */}
              {/* ================================================================= */}
              {!isUstadzah && currentUser && !currentUser.kuisDiizinkan && (
                <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-300 text-center space-y-4 my-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">
                      Akses Bank Soal Terkunci
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      Assalamu&apos;alaikum Ananda <strong>{currentUser.nama}</strong> ({currentUser.nis}). Saat ini Anda belum mendapatkan undangan / konfirmasi pengerjaan dari Ustadz atau Ustadzah.
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Silakan memberi tahu Ustadzah Anda bahwa Anda sudah siap mengerjakan bank soal ini agar akun Anda di-invite dan diizinkan mengakses soal.
                    </p>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* QUIZ PLAY AREA (Accessible when Invited OR when Teacher testing)  */}
              {/* ================================================================= */}
              {(!isUstadzah && currentUser?.kuisDiizinkan || (isUstadzah && bankSubTab === 'kuis') || (!currentUser)) && (
                <div className="pt-2 animate-fadeIn">
                  {!quizStarted && !quizFinished ? (
                    <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-center space-y-5">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs text-2xl">
                        👏
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-serif">
                          Siap Mengikuti Kuis Ceria?
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          Total {questions.length} soal pilihan ganda dari Bank Soal. Poin tersimpan otomatis!
                        </p>
                      </div>

                      <form onSubmit={handleStartQuiz} className="space-y-3 text-left text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Nomor Induk Santri (NIS):
                          </label>
                          <input
                            type="text"
                            required
                            value={santriNis}
                            onChange={(e) => setTypedNis(e.target.value)}
                            placeholder="Contoh: TPA-2026-001"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:border-emerald-500 focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Nama Lengkap Santri:
                          </label>
                          <input
                            type="text"
                            required
                            value={santriNama}
                            onChange={(e) => setTypedNama(e.target.value)}
                            placeholder="Contoh: Muhammad Fatih"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:border-emerald-500 focus:outline-hidden"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                        >
                          Mulai Kuis Ceria Sekarang 🚀
                        </button>
                      </form>
                    </div>
                  ) : quizFinished ? (
                    <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-200 text-center space-y-5 animate-fadeIn">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
                        <Award className="w-8 h-8" />
                      </div>

                      <div>
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                          Alhamdulillah, Kuis Selesai!
                        </span>
                        <h3 className="text-2xl font-extrabold text-slate-900 font-serif mt-1">
                          Selamat, {santriNama}! 👏
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          Kamu telah menyelesaikan seluruh soal pembelajaran TPA Al-Ikhlas Surabaya.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-amber-200 grid grid-cols-2 gap-3 text-center">
                        <div>
                          <p className="text-[11px] text-slate-500 font-semibold">Jawaban Benar</p>
                          <p className="text-2xl font-extrabold text-emerald-700 font-sans">
                            {correctCount} / {questions.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-500 font-semibold">Total Poin Diperoleh</p>
                          <p className="text-2xl font-extrabold text-amber-500 font-sans">
                            +{accumulatedPoints} Pts
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleRestartQuiz}
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all cursor-pointer shadow-md"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Ulangi Kuis Lagi</span>
                      </button>
                    </div>
                  ) : (
                    /* Ongoing Quiz */
                    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
                      {/* Progress Header */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-b border-slate-100 pb-3">
                        <span className="text-emerald-700">
                          Soal Ke-{currentQuestionIndex + 1} dari {questions.length}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-amber-800">Poin: +{accumulatedPoints}</span>
                          <span className="text-slate-400">Santri: {santriNama}</span>
                        </div>
                      </div>

                      {/* Question Box */}
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{currentQ.kategori} · Nilai: +{currentQ.poin} Poin</span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-relaxed">
                          {currentQ.pertanyaan}
                        </h4>
                      </div>

                      {/* Options */}
                      <div className="space-y-3">
                        {currentQ.pilihan.map((pil, idx) => {
                          let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:border-emerald-300';

                          if (isAnswered) {
                            if (idx === currentQ.kunciJawaban) {
                              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                            } else if (selectedAnswer === idx) {
                              btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                            } else {
                              btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={isAnswered}
                              onClick={() => handleSelectOption(idx)}
                              className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer ${btnStyle}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span>{pil}</span>
                              </div>

                              {isAnswered && idx === currentQ.kunciJawaban && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}

                              {isAnswered && selectedAnswer === idx && idx !== currentQ.kunciJawaban && (
                                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Answer Explanation & Next Button */}
                      {isAnswered && (
                        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-3 animate-fadeIn">
                          <div className="text-xs text-amber-950 leading-relaxed">
                            <strong className="block mb-1">
                              {selectedAnswer === currentQ.kunciJawaban ? '👏 Hebat! Jawaban Benar:' : '💡 Penjelasan Jawaban:'}
                            </strong>
                            {currentQ.pembahasan}
                          </div>

                          <button
                            onClick={handleNextQuestion}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                          >
                            <span>
                              {currentQuestionIndex + 1 < questions.length ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
