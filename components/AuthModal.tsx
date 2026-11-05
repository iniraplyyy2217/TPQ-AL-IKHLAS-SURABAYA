'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  LogOut,
  Award,
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Sparkles,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  User,
  Phone,
  MapPin,
  Mail,
  Lock,
  Camera,
  QrCode,
  Download,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Santri } from '@/lib/tpa-data';
import PhotoUploadModal from './PhotoUploadModal';
import confetti from 'canvas-confetti';
import { playApplauseSound } from '@/lib/audio-effects';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  initialRegisterRole?: 'santri' | 'ustadzah';
  currentUser: Santri | null;
  onLoginWithGoogle: () => Promise<unknown>;
  onLoginWithCredentials: (
    identifier: string,
    password: string,
    roleTarget?: 'santri' | 'ustadzah'
  ) => Promise<Santri>;
  onRegisterAccount: (formData: {
    nama: string;
    namaPanggilan: string;
    email: string;
    alamat: string;
    namaWali: string;
    noHpWali: string;
    kelasSD: string;
    password: string;
    username?: string;
    photoURL?: string;
    tingkatJilid?: string;
    waktuMengaji?: string;
    jenisKelamin?: 'L' | 'P';
  }) => Promise<Santri>;
  onRegisterUstadz?: (formData: {
    nama: string;
    gelar?: string;
    username: string;
    password: string;
    email: string;
    noHp: string;
    bidang: string;
    alamat?: string;
    jenisKelamin: 'L' | 'P';
    photoURL?: string;
  }) => Promise<Santri>;
  onLogout: () => void;
  onOpenIjazah: () => void;
  onUpdateAttendance?: (
    santriId: string,
    status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa',
    keterangan?: string
  ) => void;
  onSavePhoto?: (photoURL: string) => Promise<void> | void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = 'login',
  initialRegisterRole = 'santri',
  currentUser,
  onLoginWithGoogle,
  onLoginWithCredentials,
  onRegisterAccount,
  onRegisterUstadz,
  onLogout,
  onOpenIjazah,
  onUpdateAttendance,
  onSavePhoto,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);
  if (initialTab !== prevInitialTab) {
    setPrevInitialTab(initialTab);
    setActiveTab(initialTab);
  }

  const [registerRole, setRegisterRole] = useState<'santri' | 'ustadzah'>(
    initialRegisterRole || 'santri'
  );
  const [prevInitRegRole, setPrevInitRegRole] = useState(initialRegisterRole);
  if (initialRegisterRole !== prevInitRegRole) {
    setPrevInitRegRole(initialRegisterRole);
    if (initialRegisterRole) setRegisterRole(initialRegisterRole);
  }

  const [loginRole, setLoginRole] = useState<'santri' | 'ustadzah'>('santri');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  // Register Santri Form States
  const [regNama, setRegNama] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNamaPanggilan, setRegNamaPanggilan] = useState('');
  const [regAlamat, setRegAlamat] = useState('');
  const [regNamaWali, setRegNamaWali] = useState('');
  const [regNoHp, setRegNoHp] = useState('');
  const [regKelas, setRegKelas] = useState('Kelas 3 SD');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhotoURL, setRegPhotoURL] = useState('');
  const [regError, setRegError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Register Ustadz / Ustadzah Form States
  const [ustadzNama, setUstadzNama] = useState('');
  const [ustadzGelar, setUstadzGelar] = useState('S.Pd.I');
  const [ustadzGender, setUstadzGender] = useState<'L' | 'P'>('P');
  const [ustadzUsername, setUstadzUsername] = useState('');
  const [ustadzEmail, setUstadzEmail] = useState('');
  const [ustadzNoHp, setUstadzNoHp] = useState('');
  const [ustadzBidang, setUstadzBidang] = useState('Koordinator Tahfidz & Tilawah Al-Qur’an');
  const [ustadzAlamat, setUstadzAlamat] = useState('');
  const [ustadzPassword, setUstadzPassword] = useState('');
  const [ustadzConfirmPassword, setUstadzConfirmPassword] = useState('');

  // Attendance feedback
  const [absenSuccess, setAbsenSuccess] = useState(false);

  if (!isOpen) return null;

  const isUstadzah = currentUser?.role === 'ustadzah';

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier || !loginPassword) {
      setLoginError(
        loginRole === 'ustadzah'
          ? 'Harap isi Username/Email Ustadzah dan Password!'
          : 'Harap isi Nama Santri / Username dan Password!'
      );
      return;
    }

    try {
      setIsLoggingIn(true);
      setLoginError('');
      await onLoginWithCredentials(loginIdentifier, loginPassword, loginRole);
      playApplauseSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      setLoginError(
        err instanceof Error
          ? err.message
          : 'Gagal masuk akun. Periksa kembali username dan password Anda.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Quick Demo Login helper
  const handleQuickLogin = (id: string, pass: string, role: 'santri' | 'ustadzah') => {
    setLoginRole(role);
    setLoginIdentifier(id);
    setLoginPassword(pass);
    onLoginWithCredentials(id, pass, role).catch((err) => {
      setLoginError(err instanceof Error ? err.message : 'Gagal login demo.');
    });
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !regNama ||
      !regEmail ||
      !regNamaPanggilan ||
      !regAlamat ||
      !regNamaWali ||
      !regNoHp ||
      !regKelas ||
      !regPassword ||
      !regConfirmPassword
    ) {
      setRegError('Semua kolom wajib diisi lengkap!');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password minimal 6 karakter demi keamanan akun santri.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Password dan Confirm Password tidak cocok!');
      return;
    }

    try {
      setIsRegistering(true);
      setRegError('');
      await onRegisterAccount({
        nama: regNama,
        namaPanggilan: regNamaPanggilan,
        email: regEmail,
        alamat: regAlamat,
        namaWali: regNamaWali,
        noHpWali: regNoHp,
        kelasSD: regKelas,
        password: regPassword,
        photoURL: regPhotoURL,
      });

      setRegSuccess(true);
      playApplauseSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      setRegError(err instanceof Error ? err.message : 'Gagal mendaftar akun santri.');
    } finally {
      setIsRegistering(false);
    }
  };

  // Handle Register Ustadz Submit
  const handleRegisterUstadzSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !ustadzNama.trim() ||
      !ustadzUsername.trim() ||
      !ustadzEmail.trim() ||
      !ustadzNoHp.trim() ||
      !ustadzPassword ||
      !ustadzConfirmPassword
    ) {
      setRegError('Semua kolom wajib diisi lengkap untuk pendaftaran Ustadz / Ustadzah!');
      return;
    }

    if (ustadzPassword.length < 6) {
      setRegError('Password minimal 6 karakter demi keamanan akun pendidik.');
      return;
    }

    if (ustadzPassword !== ustadzConfirmPassword) {
      setRegError('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    if (!onRegisterUstadz) {
      setRegError('Pendaftaran akun Ustadzah belum diaktifkan.');
      return;
    }

    try {
      setIsRegistering(true);
      setRegError('');
      await onRegisterUstadz({
        nama: ustadzNama,
        gelar: ustadzGelar,
        username: ustadzUsername,
        password: ustadzPassword,
        email: ustadzEmail,
        noHp: ustadzNoHp,
        bidang: ustadzBidang,
        alamat: ustadzAlamat,
        jenisKelamin: ustadzGender,
      });

      setRegSuccess(true);
      playApplauseSound();
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      setRegError(err instanceof Error ? err.message : 'Gagal mendaftar akun Ustadz/Ustadzah.');
    } finally {
      setIsRegistering(false);
    }
  };

  // Google Login Handler
  const handleGoogleClick = async () => {
    try {
      setLoadingGoogle(true);
      setLoginError('');
      await onLoginWithGoogle();
    } catch (err: unknown) {
      console.error(err);
      setLoginError('Gagal menghubungkan ke akun Google.');
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleQuickAbsen = () => {
    if (currentUser && onUpdateAttendance) {
      onUpdateAttendance(currentUser.id, 'Hadir', 'Presensi Santri Mandiri');
      setAbsenSuccess(true);
      setTimeout(() => setAbsenSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 sm:p-7 my-6 max-h-[92vh] overflow-y-auto animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser ? (
          /* =================================================================== */
          /* LOGGED IN: PROFILE & PREVIEW (ROLE-AWARE)                          */
          /* =================================================================== */
          <div className="space-y-6">
            {/* Header Profile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-slate-100 text-center sm:text-left">
              <div className="relative group shrink-0">
                <div
                  className={`w-20 h-20 rounded-2xl p-1 shadow-md flex items-center justify-center bg-white overflow-hidden bg-gradient-to-tr ${
                    isUstadzah
                      ? 'from-purple-500 via-indigo-500 to-purple-600'
                      : 'from-amber-400 via-emerald-500 to-teal-500'
                  }`}
                >
                  {currentUser.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.nama}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    <span
                      className={`text-3xl font-extrabold ${
                        isUstadzah ? 'text-purple-800' : 'text-emerald-800'
                      }`}
                    >
                      {currentUser.namaPanggilan.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsPhotoModalOpen(true)}
                  className={`absolute -bottom-1 -right-1 p-2 rounded-full text-white shadow-md transition-transform hover:scale-110 cursor-pointer ${
                    isUstadzah ? 'bg-purple-700 hover:bg-purple-800' : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                  title="Pasang / Ganti Foto Profil"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-slate-900 font-serif">{currentUser.nama}</h3>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                      isUstadzah
                        ? 'bg-purple-100 text-purple-900 border-purple-300'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    {isUstadzah ? 'Ustadzah / Dewan Asatidz' : 'Akun Santri'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  ID: <strong className="font-mono text-emerald-800">{currentUser.nis}</strong> · {currentUser.kelasSD}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                    {currentUser.tingkatJilid}
                  </span>
                  {!isUstadzah && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {currentUser.totalPoints || 0} Poin
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action: Pasang Foto Profil */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pasang &amp; Ubah Foto Profil</p>
                  <p className="text-[10px] text-slate-500">
                    {currentUser.photoURL ? 'Foto profil terpasang' : 'Belum memasang foto profil'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPhotoModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{currentUser.photoURL ? 'Ganti Foto' : 'Pasang Foto'}</span>
              </button>
            </div>

            {/* ROLE: USTADZAH EXCLUSIVE DASHBOARD TOOLS */}
            {isUstadzah ? (
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-3">
                <div className="flex items-center gap-2 text-purple-950">
                  <ShieldCheck className="w-5 h-5 text-purple-700" />
                  <h4 className="text-xs font-bold uppercase tracking-wider font-serif">
                    Hak Akses Pendidik &amp; Penguji (Ustadzah)
                  </h4>
                </div>
                <p className="text-xs text-purple-900 leading-relaxed">
                  Sebagai akun Ustadzah, Anda memiliki otoritas penuh untuk menambah nilai santri, menerbitkan dan mengirim ijazah resmi, mengelola bank soal serta memberikan konfirmasi undangan santri untuk mengerjakan soal, dan mengirimkan absensi WA ke wali santri.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenIjazah();
                    }}
                    className="p-3 rounded-xl bg-white border border-purple-300 hover:bg-purple-100 text-purple-950 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer text-left"
                  >
                    <GraduationCap className="w-4 h-4 text-purple-700 shrink-0" />
                    <div>
                      <p>Kelola Nilai &amp; Ijazah Santri</p>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Input nilai &amp; kirim file ijazah resmi
                      </span>
                    </div>
                  </button>

                  <a
                    href="/materi?tab=kuis"
                    onClick={onClose}
                    className="p-3 rounded-xl bg-white border border-purple-300 hover:bg-purple-100 text-purple-950 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer text-left"
                  >
                    <HelpCircle className="w-4 h-4 text-purple-700 shrink-0" />
                    <div>
                      <p>Bank Soal &amp; Undangan Santri</p>
                      <span className="text-[10px] text-slate-500 font-normal">
                        Tambah/kurang soal &amp; invite santri
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            ) : (
              /* ROLE: SANTRI VIEW */
              <div className="space-y-4">
                {/* Status Ijazah Sent by Ustadzah */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-700" />
                      <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                        Status Berkas Ijazah Resmi
                      </h4>
                    </div>
                    {currentUser.statusIjazah ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Ijazah Telah Dikirim ✓
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        Menunggu Ujian Asatidz
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentUser.statusIjazah ? (
                      <span>
                        Alhamdulillah! Ijazah resmi kelulusan telah diterbitkan dan dikirimkan oleh Ustadzah ke akun Anda. Anda dapat melihat dan mengunduh ijazah dalam format file PDF.
                      </span>
                    ) : (
                      <span>
                        Ijazah belum diterbitkan. Silakan ikuti ujian munaqasyah bersama Ustadz/Ustadzah agar nilai dan ijazah resmi dapat dikirimkan ke akun ini.
                      </span>
                    )}
                  </p>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenIjazah();
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {currentUser.statusIjazah ? (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Lihat &amp; Download Ijazah (PDF)</span>
                        </>
                      ) : (
                        <>
                          <Award className="w-3.5 h-3.5" />
                          <span>Cek Status Ijazah</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Status Undangan Bank Soal */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-emerald-950">Akses Pengerjaan Bank Soal</p>
                      <p className="text-[11px] text-slate-600">
                        {currentUser.kuisDiizinkan
                          ? 'Anda telah di-invite oleh Ustadzah untuk mengerjakan kuis!'
                          : 'Akses terkunci: Menunggu konfirmasi / undangan dari Ustadzah.'}
                      </p>
                    </div>
                  </div>

                  {currentUser.kuisDiizinkan ? (
                    <a
                      href="/materi?tab=kuis"
                      onClick={onClose}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Mulai Kerjakan Soal
                    </a>
                  ) : (
                    <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-bold text-[10px] border border-amber-300 whitespace-nowrap">
                      Menunggu Invite
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Logout button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Akun Anda tersimpan aman di database TPA Al-Ikhlas Surabaya.</span>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full sm:w-auto py-2 px-4 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun</span>
              </button>
            </div>
          </div>
        ) : (
          /* =================================================================== */
          /* NOT LOGGED IN: TABS "TOMBOL MASUK" & "TOMBOL DAFTAR"               */
          /* =================================================================== */
          <div className="space-y-5">
            {/* Header Tabs Selector */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                Portal Akun TPA Al-Ikhlas Surabaya
              </h3>
              <p className="text-xs text-slate-500">
                Pilih Akun Santri atau Akun Ustadzah untuk masuk, atau daftar sebagai santri baru.
              </p>
            </div>

            {/* Switcher Tab Buttons */}
            <div className="flex rounded-2xl bg-slate-100 p-1.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setLoginError('');
                  setRegError('');
                }}
                className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LogIn className="w-4 h-4 text-emerald-600" />
                <span>TOMBOL MASUK</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setLoginError('');
                  setRegError('');
                }}
                className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-4 h-4 text-emerald-600" />
                <span>TOMBOL DAFTAR</span>
              </button>
            </div>

            {/* TAB 1: FORM MASUK (LOGIN) */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fadeIn">
                {/* Role Switcher: Akun Santri vs Akun Ustadzah */}
                <div className="p-1 rounded-xl bg-slate-100 flex items-center gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole('santri');
                      setLoginIdentifier('');
                      setLoginPassword('');
                      setLoginError('');
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                      loginRole === 'santri'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Masuk Akun Santri
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginRole('ustadzah');
                      setLoginIdentifier('');
                      setLoginPassword('');
                      setLoginError('');
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                      loginRole === 'ustadzah'
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Masuk Akun Ustadzah / Ustadz
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {loginRole === 'ustadzah'
                        ? 'USERNAME / EMAIL USTADZAH :'
                        : 'NAMA SANTRI / USERNAME :'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder={
                          loginRole === 'ustadzah'
                            ? 'Contoh: ustadzah.maryam atau email...'
                            : 'Masukkan Nama Santri, Username, atau NIS...'
                        }
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PASSWORD :</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Masukkan Password..."
                        required
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {loginError && (
                  <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 ${
                    loginRole === 'ustadzah'
                      ? 'bg-purple-700 hover:bg-purple-800 shadow-purple-700/20'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {isLoggingIn
                      ? 'Memeriksa Akun...'
                      : loginRole === 'ustadzah'
                      ? 'Masuk ke Akun Ustadzah / Ustadz'
                      : 'Masuk ke Akun Santri'}
                  </span>
                </button>

                {/* Google Sign In option */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-400 font-bold">Atau Masuk dengan</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={loadingGoogle}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{loadingGoogle ? 'Menghubungkan...' : 'Akun Google'}</span>
                </button>

                <div className="text-center text-xs text-slate-500 pt-2 space-y-1">
                  <p>Belum memiliki akun?</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRegisterRole('santri');
                        setActiveTab('register');
                      }}
                      className="font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Daftar Santri
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRegisterRole('ustadzah');
                        setActiveTab('register');
                      }}
                      className="font-bold text-purple-700 hover:underline cursor-pointer"
                    >
                      Daftar Ustadz / Ustadzah
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* TAB 2: FORM DAFTAR (SANTRI ATAU USTADZ/USTADZAH) */}
            {activeTab === 'register' && (
              <div className="space-y-4 animate-fadeIn">
                {/* ROLE TOGGLE UNTUK REGISTRASI */}
                <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRegisterRole('santri');
                      setRegError('');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      registerRole === 'santri'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Daftar Santri Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRegisterRole('ustadzah');
                      setRegError('');
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      registerRole === 'ustadzah'
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Daftar Ustadz / Ustadzah</span>
                  </button>
                </div>

                {/* FORM SANTRI */}
                {registerRole === 'santri' ? (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* NAMA LENGKAP */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NAMA LENGKAP SANTRI :
                        </label>
                        <input
                          type="text"
                          value={regNama}
                          onChange={(e) => setRegNama(e.target.value)}
                          placeholder="Contoh: Muhammad Farhan Al-Ghifari"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">EMAIL :</label>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="Contoh: wali.farhan@gmail.com"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* NAMA PANGGILAN */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NAMA PANGGILAN :
                        </label>
                        <input
                          type="text"
                          value={regNamaPanggilan}
                          onChange={(e) => setRegNamaPanggilan(e.target.value)}
                          placeholder="Contoh: Farhan"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* NAMA ORANG TUA */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NAMA ORANG TUA / WALI :
                        </label>
                        <input
                          type="text"
                          value={regNamaWali}
                          onChange={(e) => setRegNamaWali(e.target.value)}
                          placeholder="Nama Ayah / Ibu / Wali"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* NOMOR WA */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">NOMOR WA WALI :</label>
                        <input
                          type="tel"
                          value={regNoHp}
                          onChange={(e) => setRegNoHp(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* KELAS / JENJANG */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          KELAS / JENJANG :
                        </label>
                        <select
                          value={regKelas}
                          onChange={(e) => setRegKelas(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden bg-white"
                        >
                          <option value="PAUD / TK">PAUD / TK (Pra-Sekolah)</option>
                          <option value="Kelas 1 SD">Kelas 1 SD / MI</option>
                          <option value="Kelas 2 SD">Kelas 2 SD / MI</option>
                          <option value="Kelas 3 SD">Kelas 3 SD / MI</option>
                          <option value="Kelas 4 SD">Kelas 4 SD / MI</option>
                          <option value="Kelas 5 SD">Kelas 5 SD / MI</option>
                          <option value="Kelas 6 SD">Kelas 6 SD / MI</option>
                          <option value="Tingkat SMP">Tingkat SMP / Remaja</option>
                        </select>
                      </div>

                      {/* ALAMAT */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">ALAMAT DOMISILI :</label>
                        <textarea
                          rows={2}
                          value={regAlamat}
                          onChange={(e) => setRegAlamat(e.target.value)}
                          placeholder="Alamat tempat tinggal / jalan di Surabaya..."
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* PASSWORD */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">PASSWORD :</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="Minimal 6 karakter..."
                            required
                            className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* CONFIRM PASSWORD */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          CONFIRM PASSWORD :
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="Ulangi password..."
                            required
                            className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {regError && (
                      <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                        {regError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isRegistering ? 'Mendaftarkan Akun...' : 'Daftar Akun Santri Baru'}</span>
                    </button>
                  </form>
                ) : (
                  /* FORM USTADZAH / USTADZ */
                  <form onSubmit={handleRegisterUstadzSubmit} className="space-y-3.5">
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                      <span>
                        Pendaftaran resmi Akun Dewan Pengajar Asatidz TPA Al-Ikhlas Surabaya.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* PANGGILAN / JENIS KELAMIN */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          GELAR KEHORMATAN / PANGGILAN :
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setUstadzGender('P')}
                            className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              ustadzGender === 'P'
                                ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span>Ustadzah (Perempuan)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setUstadzGender('L')}
                            className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                              ustadzGender === 'L'
                                ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <span>Ustadz (Laki-laki)</span>
                          </button>
                        </div>
                      </div>

                      {/* NAMA LENGKAP */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NAMA LENGKAP PENDIDIK :
                        </label>
                        <input
                          type="text"
                          value={ustadzNama}
                          onChange={(e) => setUstadzNama(e.target.value)}
                          placeholder="Contoh: Siti Maryam Sholiha"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* GELAR AKADEMIK */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          GELAR / PENDIDIKAN :
                        </label>
                        <input
                          type="text"
                          value={ustadzGelar}
                          onChange={(e) => setUstadzGelar(e.target.value)}
                          placeholder="Contoh: S.Pd.I / M.Pd / Lc. / Al-Hafizhah"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* USERNAME */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          USERNAME LOGIN :
                        </label>
                        <input
                          type="text"
                          value={ustadzUsername}
                          onChange={(e) => setUstadzUsername(e.target.value)}
                          placeholder="Contoh: ustadzah.maryam"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* EMAIL */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          EMAIL RESMI :
                        </label>
                        <input
                          type="email"
                          value={ustadzEmail}
                          onChange={(e) => setUstadzEmail(e.target.value)}
                          placeholder="Contoh: maryam@tpa-alikhlas.sch.id"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* NOMOR WA */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          NO. WHATSAPP PENGAJAR :
                        </label>
                        <input
                          type="tel"
                          value={ustadzNoHp}
                          onChange={(e) => setUstadzNoHp(e.target.value)}
                          placeholder="Contoh: 081234567890"
                          required
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* BIDANG SPESIALISASI */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          BIDANG TUGAS / MENGAJAR :
                        </label>
                        <select
                          value={ustadzBidang}
                          onChange={(e) => setUstadzBidang(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden bg-white"
                        >
                          <option value="Koordinator Tahfidz & Tilawah Al-Qur’an">
                            Tahfidz &amp; Tilawah Al-Qur&apos;an
                          </option>
                          <option value="Penguji Fiqih Sholat & Praktik Ibadah">
                            Fiqih Sholat &amp; Praktik Ibadah
                          </option>
                          <option value="Pembina Makharijul Huruf & Tajwid">
                            Makharijul Huruf &amp; Tajwid
                          </option>
                          <option value="Pengajar Adab & Doa Sehari-hari">
                            Adab &amp; Doa Harian Santri
                          </option>
                          <option value="Kepala TPA Al-Ikhlas Surabaya">
                            Kepala Lembaga / Pengasuh TPA
                          </option>
                        </select>
                      </div>

                      {/* ALAMAT */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ALAMAT DOMISILI :
                        </label>
                        <input
                          type="text"
                          value={ustadzAlamat}
                          onChange={(e) => setUstadzAlamat(e.target.value)}
                          placeholder="Alamat jalan / RT RW di Surabaya..."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                        />
                      </div>

                      {/* PASSWORD */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">PASSWORD :</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={ustadzPassword}
                            onChange={(e) => setUstadzPassword(e.target.value)}
                            placeholder="Minimal 6 karakter..."
                            required
                            className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* CONFIRM PASSWORD */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          CONFIRM PASSWORD :
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={ustadzConfirmPassword}
                            onChange={(e) => setUstadzConfirmPassword(e.target.value)}
                            placeholder="Ulangi password..."
                            required
                            className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-xs sm:text-sm outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {regError && (
                      <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                        {regError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md shadow-purple-700/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>
                        {isRegistering
                          ? 'Mendaftarkan Akun Ustadz...'
                          : 'Daftar Sebagai Ustadz / Ustadzah'}
                      </span>
                    </button>
                  </form>
                )}

                <p className="text-center text-xs text-slate-500 pt-1">
                  Sudah memiliki akun?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Masuk Disini
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Pasang Foto Profil */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoURL={currentUser?.photoURL}
        santriName={currentUser?.nama || 'Santri'}
        onSavePhoto={(newPhoto) => {
          if (onSavePhoto) onSavePhoto(newPhoto);
          setIsPhotoModalOpen(false);
        }}
      />
    </div>
  );
}
