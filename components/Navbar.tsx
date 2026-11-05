'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Award,
  CheckSquare,
  BookOpen,
  GraduationCap,
  LogIn,
  Star,
  UserPlus,
  ShieldCheck,
  Sparkles,
  ArrowRightLeft,
} from 'lucide-react';
import { Santri } from '@/lib/tpa-data';

interface NavbarProps {
  currentUser: Santri | null;
  onOpenRegister: () => void;
  onOpenRegisterUstadz?: () => void;
  onOpenAuth: (initialTab?: 'login' | 'register') => void;
  onOpenAbsensi: () => void;
  onOpenIjazah: () => void;
  onSwitchRole?: (role: 'ustadzah' | 'santri') => void;
}

export default function Navbar({
  currentUser,
  onOpenRegister,
  onOpenRegisterUstadz,
  onOpenAuth,
  onOpenAbsensi,
  onOpenIjazah,
  onSwitchRole,
}: NavbarProps) {
  const pathname = usePathname();
  const isUstadzah = currentUser?.role === 'ustadzah';

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Materi Belajar', href: '/materi' },
    { label: 'Berita & Santri', href: '/berita' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-200 transition-transform group-hover:scale-105">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-emerald-950 font-serif">
              TPA Al-Ikhlas
            </span>
            <span className="hidden sm:inline-block text-xs text-emerald-600 font-medium ml-1.5 px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">
              Surabaya
            </span>
          </div>
        </Link>

        {/* Zone 2: Nav links with role-specific tools */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600" suppressHydrationWarning>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-emerald-700 font-semibold'
                    : 'hover:text-emerald-700 text-slate-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Quick Tools based on Role */}
          {isUstadzah ? (
            <>
              <button
                onClick={onOpenAbsensi}
                className="flex items-center gap-1.5 hover:text-emerald-700 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors whitespace-nowrap cursor-pointer text-xs font-bold"
                title="Kirim Presensi WA ke Wali Santri & Terbit Otomatis di Berita"
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>Presensi WA Wali</span>
              </button>

              <button
                onClick={onOpenIjazah}
                className="flex items-center gap-1.5 hover:text-amber-800 text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 transition-colors whitespace-nowrap cursor-pointer text-xs font-bold"
                title="Tambah Nilai & Kirim Ijazah Berbentuk File ke Santri"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>Kelola Nilai &amp; Ijazah</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenIjazah}
                className="flex items-center gap-1.5 hover:text-emerald-700 text-slate-600 transition-colors py-1 whitespace-nowrap cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>{currentUser?.statusIjazah ? 'Ijazah Saya (PDF)' : 'Status Ijazah'}</span>
              </button>
            </>
          )}

          {/* Role Switcher Pill for Easy Testing */}
          {onSwitchRole && currentUser && (
            <button
              onClick={() => onSwitchRole(isUstadzah ? 'santri' : 'ustadzah')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100"
              title={isUstadzah ? 'Beralih ke Tampilan Santri' : 'Beralih ke Tampilan Ustadzah'}
            >
              <ArrowRightLeft className="w-3 h-3 text-emerald-600" />
              <span>{isUstadzah ? 'Ganti ke Akun Santri' : 'Ganti ke Akun Ustadzah'}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Masuk & Daftar / Akun Profile Actions */}
        <div className="flex items-center gap-2" suppressHydrationWarning>
          {currentUser ? (
            <button
              onClick={() => onOpenAuth('login')}
              className={`flex items-center gap-2.5 rounded-2xl px-3 py-1.5 transition-all cursor-pointer text-left shadow-xs border ${
                isUstadzah
                  ? 'bg-purple-50 hover:bg-purple-100/90 border-purple-300'
                  : 'bg-emerald-50 hover:bg-emerald-100/90 border-emerald-300'
              }`}
              title="Buka Menu Akun & Profil"
            >
              <div
                className={`relative w-8 h-8 rounded-full p-0.5 overflow-hidden shrink-0 shadow-xs bg-gradient-to-tr ${
                  isUstadzah
                    ? 'from-purple-500 to-indigo-600'
                    : 'from-amber-400 to-emerald-500'
                }`}
              >
                <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
                  {currentUser.photoURL ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.nama}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span
                      className={`text-xs font-extrabold ${
                        isUstadzah ? 'text-purple-800' : 'text-emerald-800'
                      }`}
                    >
                      {currentUser.namaPanggilan.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.namaPanggilan}
                </p>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                      isUstadzah
                        ? 'bg-purple-200 text-purple-900 border border-purple-300'
                        : 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                    }`}
                  >
                    {isUstadzah ? 'Ustadzah' : 'Santri'}
                  </span>
                  {!isUstadzah && (
                    <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      {currentUser.totalPoints || 0} P
                    </span>
                  )}
                </div>
              </div>
              <User className="w-3.5 h-3.5 text-slate-600 ml-0.5 hidden sm:block" />
            </button>
          ) : (
            <>
              {/* TOMBOL MASUK */}
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-300 transition-colors whitespace-nowrap cursor-pointer shadow-xs active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-700" />
                <span>Masuk</span>
              </button>

              {/* TOMBOL DAFTAR SANTRI */}
              <button
                onClick={onOpenRegister}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-xs shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
                title="Pendaftaran Santri Baru"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Santri</span>
              </button>

              {/* TOMBOL DAFTAR USTADZ / USTADZAH */}
              <button
                onClick={onOpenRegisterUstadz || onOpenRegister}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 rounded-xl shadow-xs shadow-purple-700/20 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer border border-purple-500/30"
                title="Pendaftaran Akun Pengajar Ustadz & Ustadzah"
              >
                <GraduationCap className="w-3.5 h-3.5 text-purple-200" />
                <span>Daftar Ustadz/ah</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Secondary Bar */}
      <div className="md:hidden flex items-center justify-around py-2 px-2 bg-emerald-50/70 border-t border-emerald-100 text-xs gap-1">
        <Link href="/" className={`py-1 px-1.5 ${pathname === '/' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}>
          Beranda
        </Link>
        <Link href="/materi" className={`py-1 px-1.5 ${pathname === '/materi' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}>
          Materi
        </Link>
        <Link href="/berita" className={`py-1 px-1.5 ${pathname === '/berita' ? 'font-bold text-emerald-700' : 'text-slate-600'}`}>
          Berita
        </Link>
        {currentUser ? (
          isUstadzah ? (
            <>
              <button onClick={onOpenAbsensi} className="py-1 px-1 text-emerald-700 font-bold flex items-center gap-1">
                <CheckSquare className="w-3 h-3" />
                <span>Absensi</span>
              </button>
              <button onClick={onOpenIjazah} className="py-1 px-1 text-amber-800 font-bold flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>Ijazah</span>
              </button>
            </>
          ) : (
            <button onClick={onOpenIjazah} className="py-1 px-1 text-amber-700 font-medium flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>Ijazah</span>
            </button>
          )
        ) : (
          <>
            <button
              onClick={onOpenRegister}
              className="py-1 px-2 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1"
            >
              <UserPlus className="w-3 h-3" />
              <span>Santri</span>
            </button>
            <button
              onClick={onOpenRegisterUstadz || onOpenRegister}
              className="py-1 px-2 rounded-lg bg-purple-700 text-white font-bold text-[11px] flex items-center gap-1"
            >
              <GraduationCap className="w-3 h-3" />
              <span>Ustadz</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
