'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Printer,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  UserPlus,
  FileEdit,
  UserCheck,
  Check,
  BookOpen,
  Send,
  Download,
  AlertCircle,
  Users,
} from 'lucide-react';
import { Santri, PROFIL_TPA, DAFTAR_PENGUJI_ASATIDZ } from '@/lib/tpa-data';
import confetti from 'canvas-confetti';
import { playApplauseSound } from '@/lib/audio-effects';

interface IjazahModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: Santri | null;
  santriList: Santri[];
  onSaveNilai: (
    santriId: string,
    nilai: { tajwid: number; fiqihSholat: number; hafalanJuz30: number; adabAkhlak: number },
    lulus: boolean,
    kompetensi?: Partial<NonNullable<Santri['kompetensiBelajar']>>,
    extra?: {
      namaPenguji?: string;
      catatanUjian?: string;
      hafalanSelesai?: string[];
      kirimIjazahLangsung?: boolean;
    }
  ) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  initialExamMode?: boolean;
}

export default function IjazahModal({
  isOpen,
  onClose,
  currentUser,
  santriList,
  onSaveNilai,
  onOpenLogin,
  onOpenRegister,
  initialExamMode = false,
}: IjazahModalProps) {
  const isUstadzah = currentUser?.role === 'ustadzah';

  // Selected santri to view/grade
  const [selectedSantriId, setSelectedSantriId] = useState<string>(() => {
    if (currentUser?.role === 'ustadzah') {
      return santriList[0]?.id || '';
    }
    return currentUser?.id || santriList[0]?.id || '';
  });

  const activeSantri: Santri | null = isUstadzah
    ? santriList.find((s) => s.id === (selectedSantriId || santriList[0]?.id)) || santriList[0] || null
    : currentUser;

  // Exam Form States
  const [tajwid, setTajwid] = useState<number>(88);
  const [fiqihSholat, setFiqihSholat] = useState<number>(90);
  const [hafalanJuz30, setHafalanJuz30] = useState<number>(90);
  const [adabAkhlak, setAdabAkhlak] = useState<number>(95);
  const [isLulus, setIsLulus] = useState<boolean>(true);
  const [selectedPenguji, setSelectedPenguji] = useState<string>(
    currentUser?.nama || DAFTAR_PENGUJI_ASATIDZ[0]?.nama || 'Dewan Penguji Asatidz'
  );
  const [customPenguji, setCustomPenguji] = useState<string>('');
  const [catatanUjian, setCatatanUjian] = useState<string>('');
  const [isExamMode, setIsExamMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [sentAlert, setSentAlert] = useState(false);

  // Competency states
  const [kompMakhraj, setKompMakhraj] = useState<string>('Tuntas');
  const [kompTajwid, setKompTajwid] = useState<string>('Tuntas');
  const [kompSholat, setKompSholat] = useState<string>('Tuntas');
  const [kompTahfidz, setKompTahfidz] = useState<string>('Tuntas');
  const [kompAdab, setKompAdab] = useState<string>('Tuntas');
  const [kompKelancaran, setKompKelancaran] = useState<string>('Tuntas');

  // Surat list
  const defaultSuratList = [
    'An-Nas',
    'Al-Falaq',
    'Al-Ikhlas',
    'Al-Lahab',
    'An-Nashr',
    'Al-Kafirun',
    'Al-Kautsar',
    'Al-Ma’un',
    'Quraisy',
    'Al-Fil',
  ];
  const [selectedSurat, setSelectedSurat] = useState<string[]>([
    'An-Nas',
    'Al-Falaq',
    'Al-Ikhlas',
  ]);

  // Sync state whenever activeSantri changes
  const [prevActiveSantriId, setPrevActiveSantriId] = useState<string | null>(null);
  if (activeSantri && activeSantri.id !== prevActiveSantriId) {
    setPrevActiveSantriId(activeSantri.id);
    setTajwid(activeSantri.nilai?.tajwid || 88);
    setFiqihSholat(activeSantri.nilai?.fiqihSholat || 90);
    setHafalanJuz30(activeSantri.nilai?.hafalanJuz30 || 90);
    setAdabAkhlak(activeSantri.nilai?.adabAkhlak || 95);
    setIsLulus(activeSantri.statusIjazah ?? true);
    setSelectedPenguji(activeSantri.namaPenguji || currentUser?.nama || DAFTAR_PENGUJI_ASATIDZ[0]?.nama || 'Dewan Penguji Asatidz');
    setCatatanUjian(activeSantri.catatanUjian || '');
    setKompMakhraj(activeSantri.kompetensiBelajar?.makharijulHuruf || 'Tuntas');
    setKompTajwid(activeSantri.kompetensiBelajar?.hukumTajwid || 'Tuntas');
    setKompSholat(activeSantri.kompetensiBelajar?.gerakanBacaanSholat || 'Tuntas');
    setKompTahfidz(activeSantri.kompetensiBelajar?.tahfidzSuratPilihan || 'Tuntas');
    setKompAdab(activeSantri.kompetensiBelajar?.adabPenuntutIlmu || 'Tuntas');
    setKompKelancaran(activeSantri.kompetensiBelajar?.kelancaranMembaca || 'Tuntas');
    if (activeSantri.hafalanSelesai && activeSantri.hafalanSelesai.length > 0) {
      setSelectedSurat(activeSantri.hafalanSelesai);
    }
    setIsExamMode(!activeSantri.statusIjazah || initialExamMode);
  }

  if (!isOpen) return null;

  if (!activeSantri) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-6 sm:p-8 text-center space-y-5">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">Portal Nilai &amp; Ijazah Santri</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Silakan masuk ke akun Anda atau daftarkan santri baru untuk mengakses dokumen ijazah.
            </p>
          </div>
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Masuk Akun Sekarang
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Daftar Santri Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Average & Predicate
  const rataRata = Number(((tajwid + fiqihSholat + hafalanJuz30 + adabAkhlak) / 4).toFixed(1));
  let predikat = 'JAYYID (Baik)';
  let predikatArab = 'جَيِّدٌ';
  if (rataRata >= 90) {
    predikat = 'MUMTAZ (Istimewa / Amat Baik)';
    predikatArab = 'مُمْتَازٌ';
  } else if (rataRata >= 80) {
    predikat = 'JAYYID JIDDAN (Baik Sekali)';
    predikatArab = 'جَيِّدٌ جِدًّا';
  }

  const nomorIjazah =
    activeSantri.nomorIjazah ||
    `IJZ/TPA-IKHLAS/SBY/2026/${(activeSantri.nis || '001').replace('TPA-2026-', '')}`;
  const tanggalIjazah =
    activeSantri.tanggalLulus ||
    new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  // Handle Save Nilai & Dispatch Ijazah File to Santri
  const handleSaveAndSendIjazah = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUstadzah) return;

    setIsSaving(true);
    const examinerName =
      selectedPenguji === 'Lainnya' && customPenguji ? customPenguji : selectedPenguji;

    try {
      await onSaveNilai(
        activeSantri.id,
        {
          tajwid: Number(tajwid),
          fiqihSholat: Number(fiqihSholat),
          hafalanJuz30: Number(hafalanJuz30),
          adabAkhlak: Number(adabAkhlak),
        },
        isLulus,
        {
          makharijulHuruf: kompMakhraj,
          hukumTajwid: kompTajwid,
          gerakanBacaanSholat: kompSholat,
          tahfidzSuratPilihan: kompTahfidz,
          adabPenuntutIlmu: kompAdab,
          kelancaranMembaca: kompKelancaran,
        },
        {
          namaPenguji: examinerName,
          catatanUjian: catatanUjian || undefined,
          hafalanSelesai: selectedSurat,
          kirimIjazahLangsung: isLulus,
        }
      );

      setIsSaving(false);
      setSaveSuccessMsg(true);
      setSentAlert(isLulus);

      if (isLulus) {
        playApplauseSound();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      }

      setTimeout(() => {
        setSaveSuccessMsg(false);
        setIsExamMode(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleSurat = (surat: string) => {
    if (selectedSurat.includes(surat)) {
      setSelectedSurat(selectedSurat.filter((s) => s !== surat));
    } else {
      setSelectedSurat([...selectedSurat, surat]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-4 sm:p-7 max-h-[94vh] overflow-y-auto animate-fadeIn">
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 pr-10">
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isUstadzah
                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                {isUstadzah ? 'Panel Ustadzah / Dewan Asatidz' : 'Akun Santri'}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                {isUstadzah ? 'Kelola Nilai & Kirim Ijazah Santri' : 'Ijazah & Sertifikat Kelulusan'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {isUstadzah
                ? 'Pilih santri untuk memasukkan nilai munaqasyah dan mengirimkan berkas ijazah resmi.'
                : 'Ijazah resmi yang diterbitkan dan dikirimkan oleh dewan asatidz TPA Al-Ikhlas.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isUstadzah && (
              <button
                type="button"
                onClick={() => setIsExamMode(!isExamMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isExamMode
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <FileEdit className="w-3.5 h-3.5" />
                <span>{isExamMode ? 'Tampilkan Ijazah' : 'Form Input Nilai'}</span>
              </button>
            )}

            {/* Print / Download Button */}
            {activeSantri.statusIjazah && !isExamMode && (
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Download / Cetak Dokumen Ijazah dalam bentuk PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Ijazah (PDF)</span>
              </button>
            )}
          </div>
        </div>

        {/* USTADZAH SANTRI SELECTOR: Ustadzah can choose which student to grade/send certificate */}
        {isUstadzah && santriList.length > 0 && (
          <div className="mt-4 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-700" />
              <label className="text-xs font-bold text-purple-950">
                Pilih Santri yang Akan Dinilai / Dikirim Ijazah:
              </label>
            </div>
            <select
              value={selectedSantriId}
              onChange={(e) => setSelectedSantriId(e.target.value)}
              className="text-xs font-bold py-1.5 px-3 rounded-xl border border-purple-300 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-purple-400"
            >
              {santriList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nama} ({s.nis}) · {s.statusIjazah ? 'Ijazah Terkirim ✓' : 'Belum Ada Nilai'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="mt-3 p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Alhamdulillah! Data nilai berhasil disimpan dan file ijazah resmi telah dikirim ke akun{' '}
              <strong>{activeSantri.nama}</strong>!
            </span>
          </div>
        )}

        {/* SANTRI VIEW: Notification if Ijazah has NOT been issued yet */}
        {!isUstadzah && (!activeSantri.statusIjazah || !activeSantri.nilai) && (
          <div className="my-8 max-w-lg mx-auto p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-300 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                Ijazah Resmi Belum Dikirim oleh Ustadzah
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Assalamu&apos;alaikum Ananda <strong>{activeSantri.nama}</strong> ({activeSantri.nis}). Saat ini Anda belum memiliki nilai munaqasyah atau ijazah kelulusan belum diterbitkan oleh Ustadzah.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Silakan mengikuti ujian evaluasi munaqasyah tilawah dan hafalan bersama Ustadz/Ustadzah. Setelah ujian selesai, Ustadzah akan mengirimkan berkas ijazah resmi ke akun Anda dan Anda dapat mengunduhnya dalam bentuk file PDF.
              </p>
            </div>
          </div>
        )}

        {/* USTADZAH EXAM & GRADING FORM (Menambah nilai setiap santri & kirim ijazah) */}
        {isUstadzah && isExamMode ? (
          <form onSubmit={handleSaveAndSendIjazah} className="space-y-6 pt-4 animate-fadeIn">
            {/* Header Santri Being Graded */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg font-serif">
                  {activeSantri.namaPanggilan.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeSantri.nama}</h4>
                  <p className="text-xs text-slate-500">
                    NIS: <strong className="font-mono text-emerald-800">{activeSantri.nis}</strong> · {activeSantri.kelasSD} · {activeSantri.tingkatJilid}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-500">Status Saat Ini:</span>
                <p className="text-xs font-bold text-emerald-800">
                  {activeSantri.statusIjazah ? 'Sudah Terbit & Terkirim' : 'Belum Terbit'}
                </p>
              </div>
            </div>

            {/* Section A: Form Penguji */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Ustadz / Ustadzah Penguji:
                </label>
                <select
                  value={selectedPenguji}
                  onChange={(e) => setSelectedPenguji(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white font-medium"
                >
                  {DAFTAR_PENGUJI_ASATIDZ.map((p) => (
                    <option key={p.id} value={p.nama}>
                      {p.nama} ({p.bidang})
                    </option>
                  ))}
                  <option value="Lainnya">Penguji Lainnya (Tulis Sendiri)</option>
                </select>
                {selectedPenguji === 'Lainnya' && (
                  <input
                    type="text"
                    value={customPenguji}
                    onChange={(e) => setCustomPenguji(e.target.value)}
                    placeholder="Ketik Nama Lengkap & Gelar Penguji..."
                    required
                    className="w-full mt-2 p-2 rounded-xl border border-slate-300 text-xs"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Seri Ijazah:
                </label>
                <input
                  type="text"
                  readOnly
                  value={nomorIjazah}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-xs font-mono font-bold text-emerald-900"
                />
                <span className="text-[10px] text-slate-400">
                  Dihasilkan secara otomatis berdasarkan NIS resmi santri.
                </span>
              </div>
            </div>

            {/* Section B: 4 Nilai Utama Munaqasyah */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>1. Input Nilai Munaqasyah Santri (Skala 50 - 100)</span>
                </h4>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Rata-Rata: </span>
                  <strong className="text-sm font-mono text-emerald-800 font-extrabold">
                    {rataRata} / 100
                  </strong>
                  <span className="text-xs text-amber-700 font-bold ml-1.5">({predikat})</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tajwid */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Tilawah &amp; Ilmu Tajwid</span>
                    <span className="text-emerald-800 font-mono font-extrabold">{tajwid}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={tajwid}
                    onChange={(e) => setTajwid(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">Makharijul huruf, mad, dan ghunnah.</p>
                </div>

                {/* Fiqih Sholat */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Fiqih Ibadah &amp; Praktik Sholat</span>
                    <span className="text-teal-800 font-mono font-extrabold">{fiqihSholat}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={fiqihSholat}
                    onChange={(e) => setFiqihSholat(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">Wudhu, rukun sholat, dan doa ibadah.</p>
                </div>

                {/* Tahfidz Juz 30 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Tahfidz Surat Juz 30</span>
                    <span className="text-amber-800 font-mono font-extrabold">{hafalanJuz30}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={hafalanJuz30}
                    onChange={(e) => setHafalanJuz30(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">Kelancaran hafalan surat pendek Juz Amma.</p>
                </div>

                {/* Adab Akhlak */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Adab &amp; Budi Pekerti Islam</span>
                    <span className="text-emerald-900 font-mono font-extrabold">{adabAkhlak}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={adabAkhlak}
                    onChange={(e) => setAdabAkhlak(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-500">Sopan santun, birrul walidain, kedisiplinan.</p>
                </div>
              </div>
            </div>

            {/* Section C: Checklist Capaian Kompetensi */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>2. Checklist Capaian Kompetensi Belajar Santri</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  { label: 'Makharijul Huruf & Shifatul Huruf', state: kompMakhraj, set: setKompMakhraj },
                  { label: 'Hukum Tajwid (Nun/Mim Sukun & Mad)', state: kompTajwid, set: setKompTajwid },
                  { label: 'Praktik Gerakan & Bacaan Sholat Fardhu', state: kompSholat, set: setKompSholat },
                  { label: 'Tahfidz Hafalan Surat Juz 30', state: kompTahfidz, set: setKompTahfidz },
                  { label: 'Adab Penuntut Ilmu & Doa Harian', state: kompAdab, set: setKompAdab },
                  { label: 'Kelancaran Tartil Tilawati', state: kompKelancaran, set: setKompKelancaran },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <span className="font-semibold text-slate-800">{item.label}</span>
                    <select
                      value={item.state}
                      onChange={(e) => item.set(e.target.value)}
                      className={`text-xs font-bold rounded-lg px-2 py-1 border outline-none ${
                        item.state === 'Tuntas'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Tuntas">Tuntas</option>
                      <option value="Sedang Ditempuh">Sedang Ditempuh</option>
                      <option value="Perlu Bimbingan">Perlu Bimbingan</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Section D: Surat yang Diuji */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>3. Surat-Surat Juz 30 yang Dinyatakan Lancar</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {defaultSuratList.map((surat) => {
                  const isChecked = selectedSurat.includes(surat);
                  return (
                    <button
                      type="button"
                      key={surat}
                      onClick={() => toggleSurat(surat)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer font-medium ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked ? '✓ ' : ''}
                      {surat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section E: Keputusan Kelulusan & Catatan */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={isLulus}
                    onChange={() => setIsLulus(true)}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <span className="text-xs font-bold text-emerald-900">
                    LULUS MUNAQASYAH (Terbitkan &amp; Kirim File Ijazah)
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!isLulus}
                    onChange={() => setIsLulus(false)}
                    className="accent-rose-600 w-4 h-4"
                  />
                  <span className="text-xs font-bold text-rose-700">BELUM LULUS (Perlu Remidi)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Catatan Ujian &amp; Rekomendasi Asatidz:
                </label>
                <textarea
                  rows={2}
                  value={catatanUjian}
                  onChange={(e) => setCatatanUjian(e.target.value)}
                  placeholder="Contoh: Alhamdulillah, bacaan tartil makhraj huruf sangat baik. Direkomendasikan melanjutkan ke program Tahfidz Juz 29."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Submit Action: Simpan & Kirim Ijazah Berbentuk File ke Santri */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsExamMode(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSaving
                    ? 'Menyimpan & Mengirim File...'
                    : 'Simpan Nilai & Kirim Ijazah (File Resmi) ke Santri'}
                </span>
              </button>
            </div>
          </form>
        ) : (
          /* OFFICIAL SYAHADAH / IJAZAH CERTIFICATE (High-Fidelity Printable Document) */
          activeSantri.statusIjazah && (
            <div className="space-y-4 pt-4 animate-fadeIn">
              {/* Status Banner for Santri */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Ijazah resmi Ananda <strong>{activeSantri.nama}</strong> telah terbit dan dikirim oleh Ustadzah! Anda dapat mengunduh dokumen resmi berbentuk PDF di bawah ini.
                  </span>
                </div>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Ijazah (PDF)</span>
                </button>
              </div>

              {/* Printable Certificate Area */}
              <div
                id="ijazah-printable-area"
                className="relative bg-[#FFFDF7] p-6 sm:p-10 rounded-2xl border-8 border-double border-amber-600 shadow-lg text-slate-900 font-serif max-w-4xl mx-auto my-2"
              >
                {/* Ornate Islamic Border Accents */}
                <div className="absolute top-2 left-2 text-amber-600 text-2xl select-none">۞</div>
                <div className="absolute top-2 right-2 text-amber-600 text-2xl select-none">۞</div>
                <div className="absolute bottom-2 left-2 text-amber-600 text-2xl select-none">۞</div>
                <div className="absolute bottom-2 right-2 text-amber-600 text-2xl select-none">۞</div>

                {/* Inner Gold Frame Line */}
                <div className="border border-amber-400 p-5 sm:p-8 rounded-lg">
                  {/* Header Arabic & Emblem */}
                  <div className="text-center space-y-1 mb-5">
                    <p className="font-arabic text-2xl sm:text-3xl text-emerald-900">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    <div className="w-16 h-1 bg-amber-500 mx-auto my-2 rounded-full" />
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-wide uppercase text-emerald-950 font-serif">
                      TAMAN PENDIDIKAN AL-QUR&apos;AN AL-IKHLAS
                    </h2>
                    <p className="text-xs tracking-wider text-slate-600 font-sans uppercase">
                      KOTA SURABAYA · JAWA TIMUR
                    </p>
                    <p className="text-[11px] text-slate-500 font-sans italic">
                      Izin Operasional Kemenag RI No. 412/TPA-SBY/2018 · Wonokromo Surabaya
                    </p>
                  </div>

                  {/* Title of Certificate */}
                  <div className="text-center my-4">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-700 tracking-wider font-serif uppercase">
                      SYAHADAH / SERTIFIKAT SANTRI
                    </h1>
                    <p className="text-xs text-slate-600 font-mono mt-1 font-sans">
                      Nomor Seri: {nomorIjazah}
                    </p>
                  </div>

                  {/* Body Text */}
                  <div className="text-center space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans max-w-2xl mx-auto">
                    <p>
                      Dewan Pengasuh dan Penguji TPA Al-Ikhlas Surabaya menyatakan dengan penuh rasa syukur bahwa:
                    </p>

                    <div className="py-1.5 border-b-2 border-dashed border-amber-400 max-w-md mx-auto">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-900 font-serif">
                        {activeSantri.nama}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 max-w-sm mx-auto pt-1">
                      <p className="text-right">Nomor Induk Santri (NIS):</p>
                      <p className="text-left font-bold font-mono text-emerald-900">
                        {activeSantri.nis}
                      </p>
                      <p className="text-right">Tingkat / Asal Sekolah:</p>
                      <p className="text-left font-bold">{activeSantri.kelasSD}</p>
                    </div>

                    <p className="pt-2 text-xs leading-relaxed text-slate-700">
                      Telah menempuh ujian munaqasyah tilawah Al-Qur&apos;an, Fiqih Sholat Praktis, Hafalan Surat Juz 30, serta Budi Pekerti Islam yang diuji langsung oleh dewan asatidz dengan predikat:
                    </p>

                    <div className="inline-block px-5 py-1.5 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-900 font-bold text-sm sm:text-base font-serif">
                      {predikat} ({predikatArab})
                    </div>
                  </div>

                  {/* Grades Table & Competencies Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5 font-sans">
                    {/* Nilai Santri */}
                    <div className="md:col-span-7">
                      <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Rincian Hasil Ujian Munaqasyah:</span>
                      </h4>

                      <table className="w-full text-xs border border-slate-300">
                        <thead>
                          <tr className="bg-amber-100 text-slate-800 font-bold border-b border-slate-300">
                            <th className="p-2 text-left">Materi Pokok Munaqasyah</th>
                            <th className="p-2 text-center w-20">Nilai</th>
                            <th className="p-2 text-center w-24">Huruf</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr>
                            <td className="p-2">1. Tilawah Al-Qur&apos;an &amp; Kaidah Tajwid</td>
                            <td className="p-2 text-center font-bold font-mono">{tajwid}</td>
                            <td className="p-2 text-center">{tajwid >= 90 ? 'A' : 'B'}</td>
                          </tr>
                          <tr>
                            <td className="p-2">2. Fiqih Ibadah &amp; Praktik Sholat</td>
                            <td className="p-2 text-center font-bold font-mono">{fiqihSholat}</td>
                            <td className="p-2 text-center">{fiqihSholat >= 90 ? 'A' : 'B'}</td>
                          </tr>
                          <tr>
                            <td className="p-2">3. Tahfidz Surat Pendek Juz 30</td>
                            <td className="p-2 text-center font-bold font-mono">{hafalanJuz30}</td>
                            <td className="p-2 text-center">{hafalanJuz30 >= 90 ? 'A' : 'B'}</td>
                          </tr>
                          <tr>
                            <td className="p-2">4. Adab &amp; Akhlakul Karimah</td>
                            <td className="p-2 text-center font-bold font-mono">{adabAkhlak}</td>
                            <td className="p-2 text-center">{adabAkhlak >= 90 ? 'A' : 'B'}</td>
                          </tr>
                          <tr className="bg-slate-100 font-bold">
                            <td className="p-2">Rata-Rata Nilai Akhir</td>
                            <td className="p-2 text-center text-emerald-800 font-mono text-sm">
                              {rataRata}
                            </td>
                            <td className="p-2 text-center text-emerald-800">
                              {rataRata >= 90 ? 'Mumtaz' : 'Jayyid'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Competency & Surah List */}
                    <div className="md:col-span-5 space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          <span>Capaian Kompetensi Khusus:</span>
                        </h4>
                        <div className="space-y-1 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <p>• Makharijul Huruf: <strong className="text-emerald-800">{kompMakhraj}</strong></p>
                          <p>• Praktik Sholat: <strong className="text-emerald-800">{kompSholat}</strong></p>
                          <p>• Hukum Tajwid: <strong className="text-emerald-800">{kompTajwid}</strong></p>
                          <p>• Adab Penuntut Ilmu: <strong className="text-emerald-800">{kompAdab}</strong></p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Hafalan Surat Juz 30 Mutqin:</span>
                        </h4>
                        <p className="text-[11px] text-slate-600 italic bg-amber-50/50 p-2 rounded-lg border border-amber-200">
                          {selectedSurat.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Signatures & Seal */}
                  <div className="grid grid-cols-2 gap-6 mt-8 pt-4 border-t border-amber-200 font-sans text-xs text-center">
                    <div>
                      <p className="text-slate-600">
                        Surabaya, {tanggalIjazah}<br />Dewan Penguji Munaqasyah
                      </p>
                      <div className="h-16 flex items-end justify-center">
                        <p className="font-bold underline text-slate-900">
                          {activeSantri.namaPenguji || selectedPenguji}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-500">Koordinator Ujian Munaqasyah</p>
                    </div>

                    <div className="relative">
                      {/* Official Green Stamp Seal */}
                      <div className="absolute top-2 left-1/4 w-20 h-20 rounded-full border-4 border-dashed border-emerald-600/70 rotate-[-12deg] flex flex-col items-center justify-center text-emerald-700/80 pointer-events-none p-1">
                        <span className="text-[7px] font-bold uppercase">TPA AL-IKHLAS</span>
                        <span className="text-[9px] font-extrabold">TERAKREDITASI</span>
                        <span className="text-[6px] font-bold">SURABAYA</span>
                      </div>

                      <p className="text-slate-600">
                        Mengetahui,<br />Kepala TPA Al-Ikhlas Surabaya
                      </p>
                      <div className="h-16 flex items-end justify-center">
                        <p className="font-bold underline text-slate-900">{PROFIL_TPA.kepalaTpa}</p>
                      </div>
                      <p className="text-[10px] text-slate-500">NIP. 19780415-2018-01</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
