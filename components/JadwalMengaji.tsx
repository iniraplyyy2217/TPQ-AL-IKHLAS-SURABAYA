'use client';

import React from 'react';
import { Clock, Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';

export default function JadwalMengaji() {
  const sessions = [
    {
      title: 'Sesi Sore Ceria (Kelas Dasar Iqro 1 - 3)',
      waktu: '15:30 - 17:00 WIB',
      hari: 'Senin, Selasa, Rabu & Kamis',
      fokus: 'Makharijul Huruf, Pengenalan Huruf Hijaiyah Tunggal & Sambung, Doa Harian dan Lagu 20 Sifat Wajib Allah.',
      pembimbing: 'Ustadzah Siti Fatimah, S.Pd & Ustadz Farhan',
      ruang: 'Ruang Marwah (Lantai 1)',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      title: 'Sesi Sore Mahir (Kelas Iqro 4 - 6 & Tajwid)',
      waktu: '16:00 - 17:30 WIB',
      hari: 'Senin s/d Jumat',
      fokus: 'Kelancaran Membaca Kalimat Panjang, Hukum Nun Mati & Tanwin, Qalqalah BA-JU-DI-TO-KO, serta Adab Santri.',
      pembimbing: 'Ustadz Muhammad Rizqi, S.Pd.I & Ustadzah Nurul',
      ruang: 'Ruang Shafa (Lantai 2)',
      tagColor: 'bg-teal-100 text-teal-800 border-teal-300',
    },
    {
      title: 'Sesi Ba’da Maghrib (Tahfidz Juz 30 & Sholat)',
      waktu: '18:15 - 19:45 WIB',
      hari: 'Senin, Rabu & Sabtu',
      fokus: 'Sholat Maghrib & Isya Berjamaah, Hafalan Surat An-Nas s/d Ad-Dhuha, Talaqqi Irama Tilawati, dan Fiqih Sholat Praktik.',
      pembimbing: 'Ustadz H. Ahmad Dahlan, S.Pd.I & Ustadz Bilal',
      ruang: 'Aula Utama Masjid Al-Ikhlas',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agenda Pembelajaran Terpadu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Jadwal Mengaji &amp; Kelas Santri
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Setiap sesi dirancang dengan durasi ideal santri SD (90 menit) dilengkapi jeda istirahat ringan dan ice breaking.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Lokasi: Kompleks Masjid Al-Ikhlas Wonokromo Surabaya</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((sesi, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${sesi.tagColor}`}>
                    {sesi.hari}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{sesi.waktu}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 font-serif">
                  {sesi.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {sesi.fokus}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Guru: <strong className="text-slate-800">{sesi.pembimbing}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{sesi.ruang}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
