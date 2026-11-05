'use client';

import React, { useState } from 'react';
import {
  Award,
  GraduationCap,
  Phone,
  MapPin,
  Share2,
  Calendar,
  BookOpen,
  Search,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  CheckSquare,
  MessageSquare,
  Clock,
  UserCheck,
  AlertCircle,
  Users,
  Send,
  Sparkles,
} from 'lucide-react';
import { PROFIL_TPA, PRESTASI_SANTRI, Santri } from '@/lib/tpa-data';
import { WALog } from '@/lib/use-tpa-store';

interface BeritaViewProps {
  santriList: Santri[];
  waLogs?: WALog[];
  onOpenIjazah: () => void;
  onOpenRegister: () => void;
  onOpenAbsensi?: () => void;
  currentUser?: Santri | null;
}

export default function BeritaView({
  santriList,
  waLogs = [],
  onOpenIjazah,
  onOpenRegister,
  onOpenAbsensi,
  currentUser,
}: BeritaViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<'Semua' | 'Hadir' | 'Izin' | 'Sakit' | 'Alpa'>('Semua');

  const isUstadzah = currentUser?.role === 'ustadzah';

  // Filter for Ijazah verification
  const filteredGraduates = santriList.filter(
    (s) =>
      s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter for Attendance Board
  const filteredAttendance = santriList.filter((s) => {
    if (attendanceFilter === 'Semua') return true;
    return s.statusKehadiran === attendanceFilter;
  });

  const totalHadir = santriList.filter((s) => s.statusKehadiran === 'Hadir').length;
  const totalIzin = santriList.filter((s) => s.statusKehadiran === 'Izin').length;
  const totalSakit = santriList.filter((s) => s.statusKehadiran === 'Sakit').length;
  const totalAlpa = santriList.filter((s) => s.statusKehadiran === 'Alpa').length;

  return (
    <div className="py-12 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
            <span>Kabar, Data Santri &amp; Lembaga</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Informasi Santri, Presensi &amp; Kontak TPA Al-Ikhlas
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Transparansi kehadiran santri realtime, laporan siaran notifikasi WhatsApp ke wali santri, prestasi gemilang, dan verifikasi sertifikat resmi.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: PAPAN PRESENSI SANTRI & LOG SIARAN WA WALI (REALTIME)          */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wider">
                  Update Otomatis Realtime
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-bold text-slate-600" suppressHydrationWarning>
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif mt-1">
                Papan Presensi Kehadiran Santri &amp; Log Notifikasi WhatsApp
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Setiap pesan notifikasi absensi yang dikirim Ustadzah ke WhatsApp wali santri otomatis tercatat di bawah ini agar santri dan wali santri dapat memantau siapa saja yang hadir.
              </p>
            </div>

            {isUstadzah && onOpenAbsensi && (
              <button
                onClick={onOpenAbsensi}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Kirim Presensi WA Wali</span>
              </button>
            )}
          </div>

          {/* Quick Stat Counter Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center">
              <p className="text-2xl font-extrabold text-emerald-900 font-sans">{totalHadir}</p>
              <p className="text-xs font-bold text-emerald-700">Santri Hadir (Aktif)</p>
              <span className="text-[10px] text-emerald-600/80 font-medium">Tercatat Hadir</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
              <p className="text-2xl font-extrabold text-amber-900 font-sans">{totalIzin}</p>
              <p className="text-xs font-bold text-amber-700">Santri Izin</p>
              <span className="text-[10px] text-amber-600/80 font-medium">Ada Keterangan</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200 text-center">
              <p className="text-2xl font-extrabold text-sky-900 font-sans">{totalSakit}</p>
              <p className="text-xs font-bold text-sky-700">Santri Sakit</p>
              <span className="text-[10px] text-sky-600/80 font-medium">Doa Kesembuhan</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-center">
              <p className="text-2xl font-extrabold text-rose-900 font-sans">{totalAlpa}</p>
              <p className="text-xs font-bold text-rose-700">Belum Hadir / Alpa</p>
              <span className="text-[10px] text-rose-600/80 font-medium">Perlu Konfirmasi</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 text-xs font-bold">
              {(['Semua', 'Hadir', 'Izin', 'Sakit', 'Alpa'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setAttendanceFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    attendanceFilter === tab
                      ? 'bg-white text-emerald-900 shadow-xs border border-emerald-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab === 'Semua' ? 'Semua Santri' : tab}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Menampilkan <strong>{filteredAttendance.length}</strong> dari {santriList.length} Santri
            </span>
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Santri</th>
                  <th className="p-3">NIS</th>
                  <th className="p-3">Kelas &amp; Jilid</th>
                  <th className="p-3 text-center">Status Hari Ini</th>
                  <th className="p-3">Terakhir Presensi</th>
                  <th className="p-3">Catatan / Keterangan</th>
                  <th className="p-3 text-center">Status Notifikasi WA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAttendance.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">
                      Tidak ada santri dengan status &quot;{attendanceFilter}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredAttendance.map((s) => {
                    const status = s.statusKehadiran || 'Hadir';
                    let badgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                    if (status === 'Izin') badgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
                    if (status === 'Sakit') badgeClass = 'bg-sky-100 text-sky-900 border-sky-300';
                    if (status === 'Alpa') badgeClass = 'bg-rose-100 text-rose-900 border-rose-300';

                    const lastLog = waLogs.find((l) => l.namaSantri === s.nama || l.nis === s.nis);

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden">
                              {s.photoURL ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={s.photoURL} alt={s.nama} className="w-full h-full object-cover" />
                              ) : (
                                s.namaPanggilan.charAt(0)
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{s.nama}</p>
                              <p className="text-[10px] text-slate-500">Wali: {s.namaWali}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-800">{s.nis}</td>
                        <td className="p-3 text-slate-600">
                          {s.kelasSD} · <span className="font-semibold text-slate-800">{s.tingkatJilid}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                            {status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-mono text-[11px]">
                          {s.terakhirAbsen || 'Hari Ini'}
                        </td>
                        <td className="p-3 text-slate-600 max-w-xs truncate">
                          {s.riwayatAbsensi && s.riwayatAbsensi.length > 0
                            ? s.riwayatAbsensi[0].keterangan
                            : 'Presensi harian tercatat'}
                        </td>
                        <td className="p-3 text-center">
                          {lastLog ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                              <MessageSquare className="w-2.5 h-2.5 text-teal-600" />
                              <span>Terkirim WA ({lastLog.waktu})</span>
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">Tersinkronisasi</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* LIVE FEED OF RECENT WHATSAPP MESSAGES DISPATCHED BY USTADZAH */}
          {waLogs.length > 0 && (
            <div className="mt-6 p-5 rounded-3xl bg-slate-50 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Log Pesan Notifikasi WhatsApp Terkirim ke Wali Santri:
                  </h4>
                </div>
                <span className="text-[11px] text-emerald-800 font-bold">
                  {waLogs.length} Pesan Terkirim
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {waLogs.slice(0, 6).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">{log.namaSantri}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {log.waktu}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      &quot;{log.text}&quot;
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>Wali: {log.noHp}</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Terkirim
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: JUMLAH SANTRI & STATISTIK LEMBAGA                              */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Statistik Lembaga
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                Data &amp; Jumlah Santri yang Belajar
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">Tahun Ajaran 2025/2026</span>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-sans">
                {santriList.length}
              </p>
              <p className="text-xs font-bold text-emerald-800">Total Santri Terdaftar</p>
              <p className="text-[11px] text-slate-500">Database Realtime</p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-teal-950 font-sans">
                {santriList.filter((s) => s.jenisKelamin === 'L').length}
              </p>
              <p className="text-xs font-bold text-teal-800">Santriwan (Putra)</p>
              <p className="text-[11px] text-slate-500">Akun Terverifikasi</p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-sans">
                {santriList.filter((s) => s.jenisKelamin === 'P').length}
              </p>
              <p className="text-xs font-bold text-rose-800">Santriwati (Putri)</p>
              <p className="text-[11px] text-slate-500">Akun Terverifikasi</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-sans">
                {santriList.filter((s) => s.statusIjazah).length}
              </p>
              <p className="text-xs font-bold text-amber-900">Wisuda &amp; Berijazah</p>
              <p className="text-[11px] text-slate-500">Siap Cetak Sertifikat</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: PRESTASI SANTRI                                                */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Torehan Prestasi Membanggakan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              Prestasi Santri TPA Al-Ikhlas Surabaya
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Deretan juara lomba MTQ, Da&apos;i Cilik, dan Cerdas Cermat Islam tingkat Surabaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESTASI_SANTRI.map((pres) => (
              <div
                key={pres.id}
                className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/50 via-white to-white border border-amber-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-4 shadow-xs">
                    <Award className="w-6 h-6 text-slate-900" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                    {pres.tingkat}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif mt-2 mb-1">
                    {pres.juara}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 mb-2">
                    Oleh: {pres.namaSantri}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {pres.deskripsi}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100 text-[11px] text-slate-500 space-y-1">
                  <p><strong>Penyelenggara:</strong> {pres.penyelenggara}</p>
                  <p><strong>Apresiasi:</strong> {pres.hadiah}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: VERIFIKASI IJAZAH SANTRI RESMI                                  */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Verifikasi Kelulusan Resmi
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                Ijazah &amp; Sertifikat Santri
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Cari nomor induk santri untuk memverifikasi keabsahan ijazah kelulusan Al-Qur&apos;an.
              </p>
            </div>

            <button
              onClick={onOpenIjazah}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>{isUstadzah ? 'Form Input Nilai & Cetak Ijazah' : 'Lihat Ijazah Saya (PDF)'}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Cari berdasarkan NIS atau Nama Santri..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Graduates List Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">NIS</th>
                  <th className="p-3.5">Nama Santri</th>
                  <th className="p-3.5">Asal Sekolah</th>
                  <th className="p-3.5">Nomor Ijazah</th>
                  <th className="p-3.5">Nilai Rata-rata</th>
                  <th className="p-3.5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGraduates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center bg-slate-50/50">
                      <GraduationCap className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                      <p className="font-bold text-slate-800 font-serif">Belum Ada Data Santri Ditemukan</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Silakan daftarkan santri baru atau masuk akun Anda untuk mengakses rapor nilai dan sertifikat kelulusan.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredGraduates.map((s) => {
                    const hasNilai = Boolean(s.nilai);
                    const avg = s.nilai
                      ? (
                          (s.nilai.tajwid + s.nilai.fiqihSholat + s.nilai.hafalanJuz30 + s.nilai.adabAkhlak) / 4
                        ).toFixed(1)
                      : null;
                    const isLulus = Boolean(s.statusIjazah && hasNilai);

                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-emerald-800">{s.nis}</td>
                        <td className="p-3.5 font-bold text-slate-900">{s.nama}</td>
                        <td className="p-3.5 text-slate-600">{s.kelasSD}</td>
                        <td className="p-3.5 font-mono">
                          {isLulus && s.nomorIjazah ? (
                            <span className="text-slate-700 font-bold">{s.nomorIjazah}</span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              Belum Terbit
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 font-medium">
                          {avg !== null ? (
                            <span className="font-bold text-emerald-700">
                              {avg} ({Number(avg) >= 90 ? 'Mumtaz' : 'Jayyid'})
                            </span>
                          ) : (
                            <span className="text-amber-800 text-xs italic font-medium">
                              Belum Ada Nilai (Menunggu Ujian Asatidz)
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={onOpenIjazah}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors ${
                              isLulus
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs'
                            }`}
                          >
                            {isLulus ? 'Lihat Ijazah (PDF)' : isUstadzah ? 'Input Nilai' : 'Cek Status'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: INFORMASI KONTAK, ALAMAT & SOSIAL MEDIA */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Layanan Komunikasi &amp; Lokasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif mt-1">
              Kontak, Alamat &amp; Media Sosial TPA Al-Ikhlas
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
              Bapak/Ibu wali santri dipersilakan menghubungi kami untuk pendaftaran, konsultasi perkembangan santri, ataupun berkunjung langsung ke lembaga kami di Surabaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone & WA */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-serif">Nomor Telepon &amp; WA</h3>
              <div className="text-xs text-emerald-100 space-y-1">
                <p>WhatsApp Hotline: <strong className="text-amber-300 font-mono">{PROFIL_TPA.telepon}</strong></p>
                <p>Kantor Kesekretariatan: <strong className="text-amber-300 font-mono">{PROFIL_TPA.teleponKantor}</strong></p>
                <p className="text-[11px] text-slate-300 pt-1">Melayani konsultasi setiap hari Senin - Sabtu pk 08.00 - 17.30 WIB</p>
              </div>
            </div>

            {/* Address */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-serif">Alamat TPA di Surabaya</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                {PROFIL_TPA.alamat}
              </p>
              <p className="text-[11px] text-slate-300">
                (Kompleks Masjid Jami’ Al-Ikhlas, Gayungan, Wonokromo, Surabaya)
              </p>
            </div>

            {/* Social Media */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-serif">Sosial Media Resmi</h3>
              <div className="text-xs text-emerald-100 space-y-1.5">
                <p>
                  Instagram:{' '}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 font-bold hover:underline"
                  >
                    {PROFIL_TPA.mediaSosial.instagram}
                  </a>
                </p>
                <p>
                  YouTube:{' '}
                  <span className="text-amber-300 font-bold">
                    {PROFIL_TPA.mediaSosial.youtube}
                  </span>
                </p>
                <p>
                  Facebook:{' '}
                  <span className="text-amber-300 font-bold">
                    {PROFIL_TPA.mediaSosial.facebook}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
