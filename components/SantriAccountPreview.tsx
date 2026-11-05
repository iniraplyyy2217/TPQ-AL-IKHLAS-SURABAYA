'use client';

import React, { useState } from 'react';
import {
  User,
  Star,
  Camera,
  Printer,
  Award,
  CheckCircle2,
  Calendar,
  BookOpen,
  Clock,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  LogIn,
  UserPlus,
  QrCode,
  Download,
  Users,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Santri } from '@/lib/tpa-data';
import PhotoUploadModal from './PhotoUploadModal';

interface SantriAccountPreviewProps {
  currentUser: Santri | null;
  santriList?: Santri[];
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenRegisterUstadz?: () => void;
  onOpenIjazah: () => void;
  onOpenAbsensi?: () => void;
  onSavePhoto: (photoURL: string) => Promise<void> | void;
  onClearAllData?: () => void;
}

export default function SantriAccountPreview({
  currentUser,
  santriList = [],
  onOpenLogin,
  onOpenRegister,
  onOpenRegisterUstadz,
  onOpenIjazah,
  onOpenAbsensi,
  onSavePhoto,
  onClearAllData,
}: SantriAccountPreviewProps) {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const isUstadzah = currentUser?.role === 'ustadzah';
  const isDataEmpty = !currentUser && santriList.length === 0;
  const isDemo = !currentUser;

  // Empty placeholder santri when database is cleaned
  const emptySantri: Santri = {
    id: 'empty-santri',
    userId: 'empty',
    nis: 'TPA-2026-000',
    nama: 'Belum Ada Santri Terdaftar',
    namaPanggilan: 'Santri',
    username: '-',
    email: '-',
    kelasSD: 'Belum Terdaftar',
    tingkatJilid: 'Belum Ada Jilid',
    namaWali: 'Belum Diisi',
    noHpWali: '-',
    alamat: 'Wonokromo, Surabaya, Jawa Timur',
    jenisKelamin: 'L',
    totalPoints: 0,
    statusKehadiran: 'Hadir',
    totalHadir: 0,
    totalIzin: 0,
    totalSakit: 0,
    totalAlpa: 0,
    waktuMengaji: 'Sore (15:30 - 17:00 WIB)',
    statusIjazah: false,
    hafalanSelesai: [],
    nilai: null,
  };

  const santri: Santri = currentUser || (santriList.length > 0 ? santriList[0] : emptySantri);

  const handlePrintCard = () => {
    window.print();
  };

  // Nilai stats
  const hasNilai = Boolean(santri.nilai);
  const avgNilai =
    hasNilai && santri.nilai
      ? Math.round(
          (santri.nilai.tajwid +
            santri.nilai.fiqihSholat +
            santri.nilai.hafalanJuz30 +
            santri.nilai.adabAkhlak) /
            4
        )
      : 0;

  const totalAbsen = santri.totalHadir + santri.totalIzin + santri.totalSakit + santri.totalAlpa;
  const persenHadir = totalAbsen > 0 ? Math.round((santri.totalHadir / totalAbsen) * 100) : 100;

  return (
    <section className="py-12 bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/20 border-t border-emerald-100 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>
              {isUstadzah ? 'PORTAL DEWAN ASATIDZ & GURU' : 'KARTU IDENTITAS & PORTOFOLIO SANTRI DIGITAL'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            {isUstadzah ? 'Dashboard & Profil Pengajar Ustadzah' : 'Preview Akun Santri TPA Al-Ikhlas'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isUstadzah
              ? `Selamat datang ${currentUser.nama}. Anda memiliki hak akses penuh untuk mengelola nilai santri, menerbitkan & mengirim berkas ijazah, mengelola bank soal & undangan kuis, serta menyiarkan absensi ke nomor WhatsApp wali santri.`
              : currentUser
              ? `Pratinjau profil akun santri aktif Ananda ${currentUser.nama}. Anda dapat memasang foto profil, memantau absensi, melihat ijazah kelulusan dan mengunduhnya dalam bentuk PDF.`
              : 'Setiap santri yang terdaftar memiliki kartu identitas digital resmi dengan foto profil, NIS unik, rekap kehadiran, dan catatan prestasi pembelajaran.'}
          </p>

          {isDataEmpty ? (
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-950 text-xs sm:text-sm font-medium space-y-3 max-w-xl mx-auto">
              <p>
                💡 <strong>Data Masih Kosong:</strong> Seluruh data santri dan asatidz telah dikosongkan. Silakan gunakan tombol daftar di bawah untuk mendaftarkan akun baru:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Daftar Santri Baru</span>
                </button>
                <button
                  onClick={onOpenRegisterUstadz || onOpenRegister}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Daftar Ustadz / Ustadzah</span>
                </button>
                <button
                  onClick={onOpenLogin}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk Akun</span>
                </button>
              </div>
            </div>
          ) : !currentUser ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold">
              <span>
                💡 Pratinjau akun santri terdaftar. Silakan <strong>Masuk</strong> atau <strong>Daftar Akun Baru</strong> untuk mengakses fitur Anda.
              </span>
            </div>
          ) : null}
        </div>

        {/* Card Container & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Digital Student / Teacher ID Card */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The Physical Card Replica */}
            <div
              className={`w-full max-w-lg rounded-3xl text-white p-6 sm:p-7 shadow-2xl border-2 relative overflow-hidden transition-all hover:scale-[1.01] ${
                isUstadzah
                  ? 'bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 border-purple-500/40 shadow-purple-900/20'
                  : 'bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 border-emerald-500/40 shadow-emerald-900/20'
              }`}
            >
              {/* Card Hologram Ribbon Accent */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />

              {/* Card Header */}
              <div
                className={`flex items-center justify-between pb-4 relative z-10 border-b ${
                  isUstadzah ? 'border-purple-700/60' : 'border-emerald-700/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-md ${
                      isUstadzah
                        ? 'bg-gradient-to-tr from-purple-400 to-amber-400 text-purple-950 shadow-purple-500/20'
                        : 'bg-gradient-to-tr from-amber-400 to-amber-500 text-emerald-950 shadow-amber-500/20'
                    }`}
                  >
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base font-serif tracking-tight text-white">
                      TPA AL-IKHLAS SURABAYA
                    </h3>
                    <p
                      className={`text-[10px] tracking-wider uppercase font-semibold ${
                        isUstadzah ? 'text-purple-200' : 'text-emerald-200'
                      }`}
                    >
                      {isUstadzah ? 'Kartu Identitas Dewan Asatidz / Penguji' : 'Kartu Tanda Santri (KTS) Digital Resmi'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isUstadzah
                        ? 'bg-purple-800/80 text-amber-300 border-purple-500/50'
                        : 'bg-emerald-700/80 text-amber-300 border-emerald-500/50'
                    }`}
                  >
                    2026 / 1447 H
                  </span>
                </div>
              </div>

              {/* Card Body: Photo & Profile Info */}
              <div className="py-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
                {/* Photo Frame with Change Button */}
                <div className="relative group shrink-0">
                  <div
                    className={`w-24 h-28 sm:w-28 sm:h-32 rounded-2xl p-1 shadow-xl overflow-hidden flex items-center justify-center bg-white ${
                      isUstadzah
                        ? 'bg-gradient-to-b from-purple-400 to-amber-400'
                        : 'bg-gradient-to-b from-amber-400 to-emerald-400'
                    }`}
                  >
                    {santri.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={santri.photoURL}
                        alt={santri.nama}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 rounded-xl flex flex-col items-center justify-center text-emerald-800">
                        <User className="w-10 h-10 opacity-40 mb-1" />
                        <span className="text-[10px] font-bold text-emerald-700">Pasang Foto</span>
                      </div>
                    )}
                  </div>

                  {/* Camera overlay button */}
                  <button
                    onClick={() => {
                      if (currentUser) {
                        setIsPhotoModalOpen(true);
                      } else {
                        onOpenLogin();
                      }
                    }}
                    className={`absolute -bottom-2 -right-2 p-2 rounded-full font-bold shadow-lg transition-transform hover:scale-110 cursor-pointer ${
                      isUstadzah ? 'bg-amber-400 hover:bg-amber-500 text-purple-950' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    }`}
                    title="Pasang / Ganti Foto Profil"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Profile Data Fields */}
                <div className="flex-1 text-center sm:text-left space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-base sm:text-lg font-bold font-serif text-white truncate max-w-full">
                      {santri.nama}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        isUstadzah
                          ? 'bg-purple-500/30 text-purple-200 border-purple-400/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                      }`}
                    >
                      {isUstadzah ? 'Dewan Asatidz' : santri.namaPanggilan}
                    </span>
                  </div>

                  <p
                    className={`text-xs font-mono font-bold ${
                      isUstadzah ? 'text-purple-300' : 'text-emerald-300'
                    }`}
                  >
                    {isUstadzah ? `NIP/ID: ${santri.nis}` : `NIS: ${santri.nis}`}
                  </p>

                  <div className="text-xs space-y-1 pt-1 text-slate-200">
                    <p className="flex items-center justify-center sm:justify-start gap-1.5 truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{santri.kelasSD}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                      <span>{isUstadzah ? 'Bidang Pengujian' : 'Tingkat'}: <strong className="text-white">{santri.tingkatJilid}</strong></span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Jadwal: {santri.waktuMengaji}</span>
                    </p>
                    <p className="flex items-center justify-center sm:justify-start gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{isUstadzah ? 'Yayasan' : 'Wali'}: {santri.namaWali}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Barcode & Badges */}
              <div
                className={`pt-3 flex items-center justify-between text-[11px] relative z-10 border-t ${
                  isUstadzah ? 'border-purple-700/60 text-purple-200' : 'border-emerald-700/60 text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-amber-300 font-bold">
                      {isUstadzah ? 'STATUS: PENGAJAR AKTIF' : 'STATUS: SANTRI AKTIF'}
                    </p>
                    <p className="text-[9px] text-slate-300">TPA Al-Ikhlas Surabaya</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{isUstadzah ? 'Penguji Utama' : `${santri.totalPoints || 0} Poin`}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions under Card */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
              <button
                onClick={() => {
                  if (currentUser) {
                    setIsPhotoModalOpen(true);
                  } else {
                    onOpenLogin();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Pasang / Ganti Foto Profil</span>
              </button>

              <button
                onClick={handlePrintCard}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Cetak Kartu Digital</span>
              </button>

              {isDemo && (
                <button
                  onClick={onOpenLogin}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk Akun Saya</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Role Features Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            {isUstadzah ? (
              /* USTADZAH MANAGEMENT CARDS */
              <div className="space-y-4 animate-fadeIn">
                <div className="p-5 rounded-3xl bg-purple-50/80 border border-purple-200 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-purple-950">
                    <ShieldCheck className="w-5 h-5 text-purple-700" />
                    <h3 className="text-sm font-extrabold font-serif">Fitur Khusus Akun Ustadzah</h3>
                  </div>
                  <p className="text-xs text-purple-900 leading-relaxed">
                    Anda dapat mengakses fitur pengajaran dan pengujian yang tidak dapat diakses oleh akun santri:
                  </p>

                  <div className="space-y-2 pt-1">
                    {/* Feature 1: Tambah Nilai & Kirim Ijazah */}
                    <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900">1. Tambah Nilai &amp; Kirim Ijazah</p>
                        <p className="text-[11px] text-slate-500">
                          Input nilai setiap santri dan kirim berkas file ijazah resmi ke akun santri.
                        </p>
                      </div>
                      <button
                        onClick={onOpenIjazah}
                        className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Buka Nilai
                      </button>
                    </div>

                    {/* Feature 2: Bank Soal & Undangan Santri */}
                    <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-slate-900">2. Bank Soal &amp; Undangan Santri</p>
                        <p className="text-[11px] text-slate-500">
                          Tambah/kurangi bank soal &amp; invite santri yang sudah siap mengerjakan.
                        </p>
                      </div>
                      <a
                        href="/materi?tab=kuis"
                        className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
                      >
                        Bank Soal
                      </a>
                    </div>

                    {/* Feature 3: Kirim Absensi WA */}
                    {onOpenAbsensi && (
                      <div className="p-3.5 rounded-2xl bg-white border border-purple-200 shadow-2xs flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold text-slate-900">3. Kirim Presensi WA ke Wali Santri</p>
                          <p className="text-[11px] text-slate-500">
                            Pesan otomatis tertampil di halaman Berita &amp; Santri secara realtime.
                          </p>
                        </div>
                        <button
                          onClick={onOpenAbsensi}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
                        >
                          Absensi WA
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Santri Stats for Teacher */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 border-b pb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Data Santri Bimbingan:</span>
                    </span>
                    <span className="text-emerald-700">{santriList.length} Santri Terdaftar</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center pt-1">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                      <p className="font-extrabold text-lg">{santriList.filter((s) => s.statusIjazah).length}</p>
                      <p className="text-[10px]">Telah Berijazah</p>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-200">
                      <p className="font-extrabold text-lg">{santriList.filter((s) => s.kuisDiizinkan).length}</p>
                      <p className="text-[10px]">Di-Invite Bank Soal</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* SANTRI ACADEMIC REPORT & DIPLOMA DOWNLOAD CARD */
              <div className="space-y-4">
                {/* Ijazah Download Box */}
                <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-300 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-700" />
                      <h3 className="text-sm font-extrabold text-amber-950 font-serif">
                        Ijazah &amp; Sertifikat Resmi
                      </h3>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        santri.statusIjazah
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {santri.statusIjazah ? 'Telah Diterbitkan ✓' : 'Belum Diterbitkan'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {santri.statusIjazah ? (
                      <span>
                        Maa syaa Allah! Ustadzah telah menerbitkan dan mengirimkan berkas ijazah resmi ke akun Ananda <strong>{santri.nama}</strong>. Dokumen dapat diunduh dan dicetak dalam format PDF.
                      </span>
                    ) : (
                      <span>
                        Ijazah resmi diterbitkan oleh Ustadzah setelah santri menempuh ujian evaluasi munaqasyah tilawah dan hafalan surat Juz 30.
                      </span>
                    )}
                  </p>

                  <div className="pt-1">
                    <button
                      onClick={onOpenIjazah}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {santri.statusIjazah ? (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Lihat &amp; Download Ijazah (PDF)</span>
                        </>
                      ) : (
                        <>
                          <Award className="w-4 h-4" />
                          <span>Cek Lembar Ujian &amp; Status Ijazah</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Bank Soal Invitation Status */}
                <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-700" />
                      <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Akses Pengerjaan Bank Soal
                      </h4>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        santri.kuisDiizinkan
                          ? 'bg-emerald-200 text-emerald-900 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {santri.kuisDiizinkan ? 'Di-Invite Ustadzah ✓' : 'Menunggu Undangan'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {santri.kuisDiizinkan ? (
                      <span>
                        Ustadzah telah mengonfirmasi bahwa Anda siap mengerjakan bank soal. Silakan masuk ke modul Bank Soal untuk mulai mengumpulkan poin!
                      </span>
                    ) : (
                      <span>
                        Pengerjaan bank soal memerlukan konfirmasi dari Ustadzah. Silakan hubungi Ustadzah agar akun Anda di-invite.
                      </span>
                    )}
                  </p>

                  {santri.kuisDiizinkan && (
                    <div className="pt-1">
                      <a
                        href="/materi?tab=kuis"
                        className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                      >
                        Buka Bank Soal Sekarang
                      </a>
                    </div>
                  )}
                </div>

                {/* Attendance Summary */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>Presensi &amp; Kehadiran:</span>
                    </span>
                    <span className="text-emerald-700">{persenHadir}% Kehadiran</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 text-center text-xs pt-1">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <p className="font-bold text-sm">{santri.totalHadir}</p>
                      <p className="text-[10px]">Hadir</p>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                      <p className="font-bold text-sm">{santri.totalIzin}</p>
                      <p className="text-[10px]">Izin</p>
                    </div>
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-800 border border-sky-200">
                      <p className="font-bold text-sm">{santri.totalSakit}</p>
                      <p className="text-[10px]">Sakit</p>
                    </div>
                    <div className="p-2 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
                      <p className="font-bold text-sm">{santri.totalAlpa}</p>
                      <p className="text-[10px]">Alpa</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Photo Modal */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoURL={currentUser?.photoURL}
        santriName={santri.nama || 'Santri'}
        onSavePhoto={(photoURL) => {
          onSavePhoto(photoURL);
          setIsPhotoModalOpen(false);
        }}
      />
    </section>
  );
}
