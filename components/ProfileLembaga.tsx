'use client';

import React from 'react';
import Image from 'next/image';
import { PROFIL_TPA, BUKU_RUJUKAN } from '@/lib/tpa-data';
import { BookOpen, CheckCircle, Heart, Star, Smile, Building2 } from 'lucide-react';

export default function ProfileLembaga() {
  return (
    <section className="py-16 bg-slate-50/70 border-y border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Greeting from Kepala TPA */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-emerald-100">
              <Image
                src="/images/tpa_masjid_surabaya.jpg"
                alt="Gedung TPA Al-Ikhlas Surabaya"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-4">
                <div className="text-white text-xs">
                  <p className="font-bold flex items-center gap-1.5 text-amber-300">
                    <Building2 className="w-3.5 h-3.5" />
                    Pusat Belajar TPA Al-Ikhlas
                  </p>
                  <p className="text-[11px] text-slate-200">Wonokromo, Kota Surabaya</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Sambutan Hangat Kepala TPA</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                Selamat Datang di Rumah Belajar Al-Qur&apos;an Santri Cilik
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                &ldquo;Assalamu&apos;alaikum Warahmatullahi Wabarakatuh. Puji syukur kehadirat Allah SWT. TPA Al-Ikhlas Surabaya hadir dengan cinta dan dedikasi untuk membimbing anak-anak usia sekolah dasar agar mencintai Al-Qur&apos;an, tertib mendirikan sholat fardhu, serta memiliki akhlakul karimah yang mengharumkan keluarga dan nusa bangsa.&rdquo;
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-900">{PROFIL_TPA.kepalaTpa}</p>
                  <p className="text-xs text-emerald-700 font-medium">Kepala TPA Al-Ikhlas Surabaya · {PROFIL_TPA.izinOperasional}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-slate-500">Sejak 2018 di Gayungan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars for Elementary Students */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-2xs text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Smile className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-serif">Ceria &amp; Bahagia</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Metode bermain sambil belajar, lagu sifat 20, tepuk anak sholeh, dan kuis berpoint membangkitkan antusiasme santri.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-2xs text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-serif">Tartil &amp; Fashih</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bimbingan makharijul huruf dan tajwid bertahap dari Iqro 1 hingga Al-Qur&apos;an Juz 30 berpedoman Tilawati resmi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-2xs text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <CheckCircle className="w-6 h-6 text-teal-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-serif">Sholat Sempurna</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Praktik wudhu dan gerakan sholat fardhu dari niat, ruku&apos;, sujud hingga salam dengan thuma&apos;ninah yang benar.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-2xs text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Star className="w-6 h-6 text-sky-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-serif">Karakter Adab</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pembiasaan cium tangan orang tua, doa harian, tutur kata santun, dan saling tolong-menolong sesama kawan.
            </p>
          </div>
        </div>

        {/* Rujukan Kitab-Kitab Islam */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-800 text-amber-300 border border-emerald-700">
              Rujukan Kurikulum Mu&apos;tabar
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-3 font-serif">
              Belajar Berdasarkan Rujukan Kitab-Kitab Islam
            </h3>
            <p className="text-emerald-200 text-sm mt-2 leading-relaxed">
              Pembelajaran di TPA Al-Ikhlas tidak sembarang materi, melainkan bersandar pada literatur kitab klasik pesantren yang disederhanakan secara ramah untuk pemahaman santri SD.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUKU_RUJUKAN.slice(0, 3).map((buku, idx) => (
              <div
                key={idx}
                className="bg-emerald-900/60 rounded-2xl p-5 border border-emerald-800/80 hover:border-amber-400/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-amber-300 font-bold mb-2">
                  <span>{buku.topik}</span>
                  <span className="text-emerald-400">Kitab {idx + 1}</span>
                </div>
                <h4 className="text-base font-bold text-white font-serif mb-1">
                  {buku.judul}
                </h4>
                <p className="text-xs text-emerald-300 mb-3 font-medium">
                  Karya: {buku.pengarang}
                </p>
                <p className="text-xs text-emerald-100/80 leading-relaxed mb-4">
                  {buku.deskripsi}
                </p>
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800/60 text-[11px] text-amber-200/90 font-arabic italic">
                  {buku.kutipanPenting}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
