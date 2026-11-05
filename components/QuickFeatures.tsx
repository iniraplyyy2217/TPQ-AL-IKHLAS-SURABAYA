'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  HelpCircle,
  Award,
  CheckSquare,
  Calendar,
  UserPlus,
  Star,
  ChevronRight,
  BookMarked,
  Volume2,
} from 'lucide-react';

interface QuickFeaturesProps {
  onOpenRegister: () => void;
  onOpenAbsensi: () => void;
  onOpenIjazah: () => void;
}

export default function QuickFeatures({
  onOpenRegister,
  onOpenAbsensi,
  onOpenIjazah,
}: QuickFeaturesProps) {
  const features = [
    {
      title: 'Belajar & Rujukan Kitab',
      desc: 'Materi Dinul Islam, Aqidah, Tajwid, dan Sholat bersumber dari kitab Mabadi’ul Fiqhiyyah & Aqidatul Awwam.',
      icon: BookMarked,
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50/70 border-emerald-200',
      badge: '5 Materi Utama',
      actionType: 'link',
      href: '/materi',
      btnText: 'Buka Materi',
    },
    {
      title: 'Bank Soal & Kuis Berpoint',
      desc: 'Jawab soal online, kumpulkan poin bintang, dan nikmati animasi efek suara tepuk tangan meriah!',
      icon: HelpCircle,
      color: 'from-amber-400 to-amber-600',
      bgLight: 'bg-amber-50/70 border-amber-200',
      badge: 'Suara Tepuk Tangan 👏',
      actionType: 'link',
      href: '/materi?tab=bank-soal',
      btnText: 'Mulai Kuis Ceria',
    },
    {
      title: 'Absensi Manual & WA Ortu',
      desc: 'Ustadz mencatat kehadiran santri dan langsung mengirim format pesan resmi ke WhatsApp orang tua.',
      icon: CheckSquare,
      color: 'from-teal-500 to-cyan-600',
      bgLight: 'bg-teal-50/70 border-teal-200',
      badge: 'Format Khusus WA',
      actionType: 'modal',
      onClick: onOpenAbsensi,
      btnText: 'Buka Absensi WA',
    },
    {
      title: 'Ujian & Ijazah Santri',
      desc: 'Ustadzah & Ustadz menguji tajwid, fiqih sholat, dan hafalan. Ijazah resmi terbit otomatis setelah disahkan dewan penguji.',
      icon: Award,
      color: 'from-yellow-500 to-amber-600',
      bgLight: 'bg-yellow-50/70 border-yellow-200',
      badge: 'Ujian Munaqasyah Asatidz',
      actionType: 'modal',
      onClick: onOpenIjazah,
      btnText: 'Ujian & Ijazah Santri',
    },
    {
      title: 'Pendaftaran Santri Baru',
      desc: 'Pendaftaran online mudah dan cepat untuk santri cilik SD se-Surabaya dengan Nomor Induk Santri instan.',
      icon: UserPlus,
      color: 'from-sky-500 to-blue-600',
      bgLight: 'bg-sky-50/70 border-sky-200',
      badge: 'Bonus 50 Poin Awal',
      actionType: 'modal',
      onClick: onOpenRegister,
      btnText: 'Daftar Sekarang',
    },
    {
      title: 'Jadwal & Info Santri',
      desc: 'Pantau jadwal mengaji sore/malam, statistik jumlah santri, serta torehan prestasi santri TPA Al-Ikhlas.',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-600',
      bgLight: 'bg-indigo-50/70 border-indigo-200',
      badge: 'Sore & Ba’da Maghrib',
      actionType: 'link',
      href: '/berita',
      btnText: 'Lihat Info & Prestasi',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Fitur Unggulan TPA Al-Ikhlas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            Akses Cepat Fasilitas Santri Cilik
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Semua kebutuhan belajar mengaji, evaluasi, hingga komunikasi wali santri terintegrasi dalam satu platform ceria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${item.bgLight}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-700 shadow-2xs border border-slate-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div>
                  {item.actionType === 'link' ? (
                    <Link
                      href={item.href || '#'}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors group cursor-pointer"
                    >
                      <span>{item.btnText}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-emerald-600" />
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors group cursor-pointer"
                    >
                      <span>{item.btnText}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-emerald-600" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
