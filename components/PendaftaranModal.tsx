'use client';

import React, { useState } from 'react';
import {
  X,
  UserPlus,
  Star,
  CheckCircle2,
  ShieldCheck,
  Printer,
  User,
  Award,
  Lock,
  Eye,
  EyeOff,
  Camera,
  GraduationCap,
} from 'lucide-react';
import { Santri } from '@/lib/tpa-data';
import confetti from 'canvas-confetti';
import { playApplauseSound } from '@/lib/audio-effects';
import { auth } from '@/lib/firebase';
import PhotoUploadModal from './PhotoUploadModal';

interface PendaftaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'santri' | 'ustadzah';
  onRegisterSuccess: (formData: {
    nama: string;
    namaPanggilan: string;
    email: string;
    alamat: string;
    namaWali: string;
    noHpWali: string;
    kelasSD: string;
    password: string;
    photoURL?: string;
    tingkatJilid?: string;
    waktuMengaji?: string;
    jenisKelamin?: 'L' | 'P';
  }) => Promise<Santri | undefined>;
  onRegisterUstadzSuccess?: (formData: {
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
  }) => Promise<Santri | undefined>;
  onOpenPortal?: () => void;
  onOpenIjazah?: () => void;
}

export default function PendaftaranModal({
  isOpen,
  onClose,
  initialRole = 'santri',
  onRegisterSuccess,
  onRegisterUstadzSuccess,
  onOpenPortal,
  onOpenIjazah,
}: PendaftaranModalProps) {
  const [activeRole, setActiveRole] = useState<'santri' | 'ustadzah'>(initialRole);
  const [prevInitRole, setPrevInitRole] = useState(initialRole);
  if (initialRole !== prevInitRole) {
    setPrevInitRole(initialRole);
    setActiveRole(initialRole);
  }

  // Required 9 fields from user brief for Santri
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [namaPanggilan, setNamaPanggilan] = useState('');
  const [alamat, setAlamat] = useState('');
  const [namaWali, setNamaWali] = useState('');
  const [noHpWali, setNoHpWali] = useState('');
  const [kelasSD, setKelasSD] = useState('Kelas 3 SD');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  // Additional supporting fields for Santri
  const [tingkatJilid, setTingkatJilid] = useState('Iqro Jilid 1');
  const [waktuMengaji, setWaktuMengaji] = useState('Sore (15:30 - 17:00 WIB)');
  const [jenisKelamin, setJenisKelamin] = useState<'L' | 'P'>('L');

  // Fields for Ustadz / Ustadzah
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const [registeredResult, setRegisteredResult] = useState<Santri | null>(null);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !nama ||
      !email ||
      !namaPanggilan ||
      !alamat ||
      !namaWali ||
      !noHpWali ||
      !kelasSD ||
      !password ||
      !confirmPassword
    ) {
      setFormError('Mohon lengkapi semua kolom yang bertanda bintang (*)!');
      return;
    }

    if (password.length < 6) {
      setFormError('Password minimal 6 karakter demi keamanan akun santri.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Password dan Confirm Password tidak cocok!');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const res = await onRegisterSuccess({
        nama,
        namaPanggilan,
        email,
        alamat,
        namaWali,
        noHpWali,
        kelasSD,
        password,
        photoURL,
        tingkatJilid,
        waktuMengaji,
        jenisKelamin,
      });

      if (res) {
        setRegisteredResult(res);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          playApplauseSound();
        } catch {}
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menyimpan data akun santri.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUstadzSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !ustadzNama.trim() ||
      !ustadzUsername.trim() ||
      !ustadzEmail.trim() ||
      !ustadzNoHp.trim() ||
      !ustadzPassword ||
      !ustadzConfirmPassword
    ) {
      setFormError('Harap lengkapi semua kolom wajib pendaftaran Ustadz / Ustadzah!');
      return;
    }

    if (ustadzPassword.length < 6) {
      setFormError('Password minimal 6 karakter demi keamanan akun pengajar.');
      return;
    }

    if (ustadzPassword !== ustadzConfirmPassword) {
      setFormError('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      if (!onRegisterUstadzSuccess) {
        throw new Error('Fitur pendaftaran Ustadz/Ustadzah belum terhubung.');
      }

      const res = await onRegisterUstadzSuccess({
        nama: ustadzNama,
        gelar: ustadzGelar,
        username: ustadzUsername,
        password: ustadzPassword,
        email: ustadzEmail,
        noHp: ustadzNoHp,
        bidang: ustadzBidang,
        alamat: ustadzAlamat,
        jenisKelamin: ustadzGender,
        photoURL,
      });

      if (res) {
        setRegisteredResult(res);
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
          });
          playApplauseSound();
        } catch {}
      }
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mendaftarkan akun pengajar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setRegisteredResult(null);
    setNama('');
    setEmail('');
    setNamaPanggilan('');
    setNamaWali('');
    setNoHpWali('');
    setAlamat('');
    setPassword('');
    setConfirmPassword('');
    setUstadzNama('');
    setUstadzUsername('');
    setUstadzEmail('');
    setUstadzNoHp('');
    setUstadzAlamat('');
    setUstadzPassword('');
    setUstadzConfirmPassword('');
    setPhotoURL('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 sm:p-7 my-6 max-h-[92vh] overflow-y-auto animate-fadeIn">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!registeredResult ? (
          <div>
            {/* ROLE TAB SWITCHER */}
            <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveRole('santri');
                  setFormError('');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRole === 'santri'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Pendaftaran Santri Baru</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveRole('ustadzah');
                  setFormError('');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeRole === 'ustadzah'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Pendaftaran Ustadz / Ustadzah</span>
              </button>
            </div>

            <div className="text-center mb-5">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                  activeRole === 'ustadzah'
                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {activeRole === 'ustadzah' ? (
                  <>
                    <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                    <span>TOMBOL DAFTAR PENDIDIK &amp; ASATIDZ</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
                    <span>TOMBOL DAFTAR SANTRI BARU</span>
                  </>
                )}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-serif">
                {activeRole === 'ustadzah'
                  ? 'Pendaftaran Akun Ustadz / Ustadzah'
                  : 'Pendaftaran Akun Santri'}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                {activeRole === 'ustadzah'
                  ? 'Daftarkan akun pendidik / dewan asatidz untuk mengelola nilai santri, menerbitkan ijazah PDF, dan menyiarkan absensi ke WhatsApp.'
                  : 'Lengkapi formulir pendaftaran santri di bawah ini untuk mendapatkan Kartu Tanda Santri resmi dan akses materi pembelajaran.'}
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {formError}
              </div>
            )}

            {/* FORM SANTRI */}
            {activeRole === 'santri' ? (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. NAMA LENGKAP */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    NAMA LENGKAP <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Farhan Al-Ghifari"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                {/* 2. NAMA PANGGILAN */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    NAMA PANGGILAN <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Farhan"
                    value={namaPanggilan}
                    onChange={(e) => setNamaPanggilan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                {/* 3. EMAIL */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    EMAIL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Contoh: wali.farhan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                {/* 4. NAMA ORANG TUA */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    NAMA ORANG TUA <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Ayah / Ibu / Wali"
                    value={namaWali}
                    onChange={(e) => setNamaWali(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                {/* 5. NOMOR WA */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    NOMOR WA <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={noHpWali}
                    onChange={(e) => setNoHpWali(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                {/* 6. KELAS / JENJANG */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    KELAS / JENJANG <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={kelasSD}
                    onChange={(e) => setKelasSD(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 font-medium bg-white"
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

                {/* TINGKAT JILID */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tingkat Belajar</label>
                  <select
                    value={tingkatJilid}
                    onChange={(e) => setTingkatJilid(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900 font-medium bg-white"
                  >
                    <option value="Iqro Jilid 1">Iqro Jilid 1 (Pemula)</option>
                    <option value="Iqro Jilid 2">Iqro Jilid 2</option>
                    <option value="Iqro Jilid 3">Iqro Jilid 3</option>
                    <option value="Iqro Jilid 4">Iqro Jilid 4</option>
                    <option value="Iqro Jilid 5">Iqro Jilid 5</option>
                    <option value="Iqro Jilid 6">Iqro Jilid 6</option>
                    <option value="Al-Qur'an Juz 30">Al-Qur&apos;an Juz 30</option>
                  </select>
                </div>

                {/* 7. ALAMAT */}
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    ALAMAT <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Contoh: Jl. Wonokromo No. 42, Surabaya"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />
                </div>

                {/* 8. PASSWORD */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    PASSWORD <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Minimal 6 karakter..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 9. CONFIRM PASSWORD */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    CONFIRM PASSWORD <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="Ulangi password..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* PASANG FOTO PROFIL */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white border border-emerald-300 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                    {photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photoURL} alt="Foto Profil" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Pasang Foto Profil Santri</p>
                    <p className="text-[10px] text-slate-500">
                      {photoURL ? 'Foto profil terpasang' : 'Pilih avatar atau upload foto sendiri'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs cursor-pointer shadow-2xs"
                >
                  {photoURL ? 'Ganti Foto' : 'Pasang Foto'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mendaftarkan Santri...' : 'Daftar Akun Santri Sekarang'}</span>
                </button>
              </div>
            </form>
            ) : (
              /* FORM USTADZ / USTADZAH */
              <form onSubmit={handleUstadzSubmit} className="space-y-3.5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 1. NAMA LENGKAP PENDIDIK */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">
                      NAMA LENGKAP PENDIDIK / USTADZ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Maryam Sholiha atau Ahmad Dahlan"
                      value={ustadzNama}
                      onChange={(e) => setUstadzNama(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                    />
                  </div>

                  {/* 2. JENIS KELAMIN & GELAR */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      KATEGORI PENGAJAR <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={ustadzGender}
                      onChange={(e) => setUstadzGender(e.target.value as 'L' | 'P')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900 font-medium bg-white"
                    >
                      <option value="P">Ustadzah (Pengajar Putri)</option>
                      <option value="L">Ustadz (Pengajar Putra)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GELAR AKADEMIK</label>
                    <select
                      value={ustadzGelar}
                      onChange={(e) => setUstadzGelar(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900 font-medium bg-white"
                    >
                      <option value="S.Pd.I">S.Pd.I (Sarjana Pendidikan Islam)</option>
                      <option value="M.Pd">M.Pd (Magister Pendidikan)</option>
                      <option value="Lc.">Lc. (Licentiate)</option>
                      <option value="S.Ag">S.Ag (Sarjana Agama)</option>
                      <option value="M.Ag">M.Ag (Magister Agama)</option>
                      <option value="Al-Hafizh">Al-Hafizh / Al-Hafizhah (30 Juz)</option>
                      <option value="">Tanpa Gelar</option>
                    </select>
                  </div>

                  {/* 3. USERNAME */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      USERNAME LOGIN <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: ustadzah.maryam"
                      value={ustadzUsername}
                      onChange={(e) => setUstadzUsername(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                    />
                  </div>

                  {/* 4. EMAIL */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      EMAIL AKTIF <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Contoh: ustadzah.maryam@gmail.com"
                      value={ustadzEmail}
                      onChange={(e) => setUstadzEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                    />
                  </div>

                  {/* 5. NO WHATSAPP */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      NOMOR WHATSAPP <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 081234567890"
                      value={ustadzNoHp}
                      onChange={(e) => setUstadzNoHp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                    />
                  </div>

                  {/* 6. BIDANG / MATA PELAJARAN */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      BIDANG BIMBINGAN <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={ustadzBidang}
                      onChange={(e) => setUstadzBidang(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900 font-medium bg-white"
                    >
                      <option value="Koordinator Tahfidz & Tilawah Al-Qur’an">Koordinator Tahfidz &amp; Tilawah</option>
                      <option value="Guru Fiqih Ibadah & Praktik Shalat">Guru Fiqih Ibadah &amp; Praktik Shalat</option>
                      <option value="Pengajar Tajwid & Makharijul Huruf">Pengajar Tajwid &amp; Makharijul Huruf</option>
                      <option value="Pembina Adab, Doa & Akhlak Santri">Pembina Adab, Doa &amp; Akhlak Santri</option>
                      <option value="Dewan Penguji Munaqasyah Ijazah">Dewan Penguji Munaqasyah Ijazah</option>
                    </select>
                  </div>

                  {/* 7. ALAMAT DOMISILI */}
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">DOMISILI / ALAMAT</label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Wonokromo, Surabaya"
                      value={ustadzAlamat}
                      onChange={(e) => setUstadzAlamat(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                    />
                  </div>

                  {/* 8. PASSWORD */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      PASSWORD <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Minimal 6 karakter..."
                        value={ustadzPassword}
                        onChange={(e) => setUstadzPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 9. CONFIRM PASSWORD */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      KONFIRMASI PASSWORD <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Ulangi password..."
                        value={ustadzConfirmPassword}
                        onChange={(e) => setUstadzConfirmPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 text-slate-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* PASANG FOTO PROFIL */}
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white border border-purple-300 overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                      {photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photoURL} alt="Foto Profil" className="w-full h-full object-cover" />
                      ) : (
                        <GraduationCap className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Foto Profil Ustadz / Ustadzah</p>
                      <p className="text-[10px] text-slate-500">
                        {photoURL ? 'Foto profil terpasang' : 'Pilih avatar atau upload foto sendiri'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-100 border border-purple-300 text-purple-900 font-bold text-xs cursor-pointer shadow-2xs"
                  >
                    {photoURL ? 'Ganti Foto' : 'Pasang Foto'}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-purple-700/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{isSubmitting ? 'Mendaftarkan Akun Ustadz...' : 'Daftar Akun Ustadz / Ustadzah Sekarang'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
                registeredResult.role === 'ustadzah'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-emerald-100 text-emerald-600'
              }`}
            >
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Pendaftaran Berhasil!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Selamat datang di TPA Al-Ikhlas Surabaya,{' '}
                <strong className={registeredResult.role === 'ustadzah' ? 'text-purple-800' : 'text-emerald-800'}>
                  {registeredResult.nama}
                </strong>.
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border text-left max-w-sm mx-auto space-y-2 text-xs ${
                registeredResult.role === 'ustadzah'
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {registeredResult.role === 'ustadzah' ? 'NIP / ID Pendidik:' : 'Nomor Induk Santri (NIS):'}
                </span>
                <span
                  className={`font-mono font-bold ${
                    registeredResult.role === 'ustadzah' ? 'text-purple-900' : 'text-emerald-900'
                  }`}
                >
                  {registeredResult.nis}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Username Login:</span>
                <span className="font-bold text-slate-800">{registeredResult.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-medium text-slate-700">{registeredResult.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  {registeredResult.role === 'ustadzah' ? 'Bidang Pengajaran:' : 'Jenjang / Kelas:'}
                </span>
                <span className="font-semibold text-slate-800">
                  {registeredResult.role === 'ustadzah' ? registeredResult.tingkatJilid : registeredResult.kelasSD}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hak Akses:</span>
                <span
                  className={`font-bold ${
                    registeredResult.role === 'ustadzah' ? 'text-purple-800' : 'text-emerald-800'
                  }`}
                >
                  {registeredResult.role === 'ustadzah' ? 'Pengajar & Penguji Ijazah' : 'Santri Binaan'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenPortal) onOpenPortal();
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-colors cursor-pointer ${
                  registeredResult.role === 'ustadzah'
                    ? 'bg-purple-700 hover:bg-purple-800'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {registeredResult.role === 'ustadzah' ? 'Buka Dashboard Ustadzah' : 'Lihat Portal Santri'}
              </button>

              <button
                onClick={handleResetAndClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Pasang Foto */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        currentPhotoURL={photoURL}
        santriName={nama || 'Santri'}
        onSavePhoto={(url) => setPhotoURL(url)}
      />
    </div>
  );
}
