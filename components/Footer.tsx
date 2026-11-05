'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { PROFIL_TPA } from '@/lib/tpa-data';

interface FooterProps {
  onOpenRegister: () => void;
  onOpenRegisterUstadz?: () => void;
  onOpenAbsensi: () => void;
  onOpenIjazah: () => void;
}

export default function Footer({
  onOpenRegister,
  onOpenRegisterUstadz,
  onOpenAbsensi,
  onOpenIjazah,
}: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-serif">
                TPA Al-Ikhlas Surabaya
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Taman Pendidikan Al-Qur&apos;an Al-Ikhlas Wonokromo Surabaya berdedikasi membina generasi santri cilik usia sekolah dasar agar cinta Al-Qur&apos;an, tertib mendirikan sholat fardhu, dan berakhlakul karimah.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              SK Kemenag RI: {PROFIL_TPA.izinOperasional}
            </p>
          </div>

          {/* Col 2: Nav Links */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Halaman Utama</p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Beranda &amp; Profil
                </Link>
              </li>
              <li>
                <Link href="/materi" className="hover:text-emerald-400 transition-colors">
                  Materi Belajar &amp; Kuis
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-emerald-400 transition-colors">
                  Data Santri &amp; Berita
                </Link>
              </li>
              <li>
                <button onClick={onOpenRegister} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Pendaftaran Santri Baru
                </button>
              </li>
              <li>
                <button onClick={onOpenRegisterUstadz || onOpenRegister} className="hover:text-purple-400 transition-colors text-left cursor-pointer">
                  Daftar Ustadz / Ustadzah
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Tools */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Layanan Terpadu</p>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={onOpenAbsensi} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Absensi Manual WA Ustadz
                </button>
              </li>
              <li>
                <button onClick={onOpenIjazah} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">
                  Cetak Ijazah &amp; Nilai
                </button>
              </li>
              <li>
                <span className="text-slate-400">Hotline WA: {PROFIL_TPA.telepon}</span>
              </li>
              <li>
                <span className="text-slate-400">Surabaya, Jawa Timur</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TPA Al-Ikhlas Surabaya. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Didedikasikan untuk santri cilik Qur&apos;ani di Surabaya</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
