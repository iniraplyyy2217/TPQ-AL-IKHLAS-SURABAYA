'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Star, Award, CheckCircle2, ChevronRight, MessageSquare, HeartHandshake, UserPlus, GraduationCap } from 'lucide-react';

interface HeroSectionProps {
  onOpenRegister: () => void;
  onOpenRegisterUstadz?: () => void;
  onOpenAbsensi: () => void;
}

export default function HeroSection({ onOpenRegister, onOpenRegisterUstadz, onOpenAbsensi }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-teal-50/20 to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative cheerful background elements */}
      <div className="absolute top-10 left-5 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-60 h-60 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-semibold border border-emerald-300 shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>TPA Ramah Anak SD di Wonokromo, Surabaya</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] font-serif text-balance">
              Belajar Mengaji <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-2">Ceria & Bahagia</span> Bersama TPA Al-Ikhlas
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Mendidik ananda dengan metode membaca tartil, rujukan kitab-kitab Islam mu&apos;tabar, hafalan Juz 30 ceria, kuis berhadiah poin &amp; tepuk tangan, serta laporan absensi otomatis terkirim langsung ke WhatsApp Bapak/Ibu di rumah.
            </p>

            {/* Quick Badges / Feature List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-700 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Absensi WA Otomatis</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Kuis Berpoint & Tepuk Tangan</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-emerald-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Cetak Ijazah Resmi</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                href="/materi"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Mulai Belajar Materi</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <button
                onClick={onOpenRegister}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-sm shadow-md shadow-amber-400/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-slate-900" />
                <span>Daftar Santri Baru</span>
              </button>

              <button
                onClick={onOpenRegisterUstadz || onOpenRegister}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm shadow-md shadow-purple-700/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border border-purple-500/30"
              >
                <GraduationCap className="w-4 h-4 text-purple-200" />
                <span>Daftar Ustadz / Ustadzah</span>
              </button>

              <button
                onClick={onOpenAbsensi}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-2xs transition-all hover:border-emerald-300 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Absensi Ustadz</span>
              </button>
            </div>

            {/* Quick Proof */}
            <div className="pt-2 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-4">
              <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                Binaan Ustadz &amp; Ustadzah Surabaya
              </span>
              <span>·</span>
              <span className="font-medium text-slate-600">Terbuka untuk Usia 6 - 12 Tahun (SD)</span>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Joyful frame with soft background card */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-400 rounded-3xl blur-md opacity-40 -rotate-1" />
              
              <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-emerald-100">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-50">
                  <Image
                    src="/images/hero_tpa_kids.jpg"
                    alt="Santri Cilik Belajar Al-Quran di TPA Al-Ikhlas Surabaya"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    priority
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-4 text-white">
                    <p className="text-xs font-semibold text-amber-300">Kelas Santri Ceria 2026</p>
                    <p className="text-sm font-bold">Suasana Mengaji &amp; Belajar di Masjid Al-Ikhlas</p>
                  </div>
                </div>

                {/* Floating Achievement Card */}
                <div className="mt-3 bg-amber-50/80 rounded-2xl p-3 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-900 shadow-2xs font-bold">
                      <Award className="w-5 h-5 text-slate-900" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Wisuda Tahfidz &amp; Ijazah</p>
                      <p className="text-[11px] text-slate-600">42 Santri Lulus Mumtaz Tahun Ini</p>
                    </div>
                  </div>
                  <Link
                    href="/berita"
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline px-2 py-1"
                  >
                    Lihat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
