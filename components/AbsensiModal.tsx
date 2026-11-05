'use client';

import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  CheckCircle,
  Clock,
  Phone,
  Send,
  Users,
  AlertCircle,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Santri } from '@/lib/tpa-data';
import {
  formatWhatsAppMessage,
  createWhatsAppWebUrl,
  sendWhatsAppAttendanceAPI,
} from '@/lib/whatsapp-api';

interface AbsensiModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: Santri | null;
  santriList: Santri[];
  onUpdateAttendance: (id: string, status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa') => void;
  onAddWALog: (namaSantri: string, noHp: string, text: string) => void;
  onSendAttendanceWA?: (
    santriId: string,
    status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa',
    customPesan?: string
  ) => void;
}

export default function AbsensiModal({
  isOpen,
  onClose,
  currentUser,
  santriList,
  onUpdateAttendance,
  onAddWALog,
  onSendAttendanceWA,
}: AbsensiModalProps) {
  const [selectedWaktu, setSelectedWaktu] = useState('Sore (15:30 - 17:00 WIB)');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [activePreviewSantri, setActivePreviewSantri] = useState<Santri | null>(
    santriList[0] || null
  );
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);
  const [broadcastLoading, setBroadcastLoading] = useState(false);

  if (!isOpen) return null;

  // Role check: Only Ustadzah/Ustadz can send WhatsApp and alter attendance
  const isSantri = currentUser?.role === 'santri';
  const isUstadzah = currentUser?.role === 'ustadzah' || !currentUser; // Demo mode allows test

  const currentPreviewText = activePreviewSantri
    ? formatWhatsAppMessage(activePreviewSantri.nama, selectedWaktu)
    : '';

  // Send single WhatsApp notification
  const handleSendWA = async (santri: Santri) => {
    if (isSantri) {
      setDispatchStatus('Akses Terbatas: Hanya akun Ustadz / Ustadzah yang dapat mengirimkan notifikasi WA ke wali santri.');
      setTimeout(() => setDispatchStatus(null), 4000);
      return;
    }

    setSendingId(santri.id);
    const message = formatWhatsAppMessage(santri.nama, selectedWaktu);

    try {
      // 1. Dispatch via API backend route
      await sendWhatsAppAttendanceAPI(santri.noHpWali, santri.nama, selectedWaktu);

      // 2. Save log and update status in store so it appears automatically in Berita & Santri
      if (onSendAttendanceWA) {
        onSendAttendanceWA(santri.id, (santri.statusKehadiran as any) || 'Hadir', message);
      } else {
        onUpdateAttendance(santri.id, (santri.statusKehadiran as any) || 'Hadir');
        onAddWALog(santri.nama, santri.noHpWali, message);
      }

      // 3. Open WhatsApp Web / App safely
      const waUrl = createWhatsAppWebUrl(santri.noHpWali, santri.nama, selectedWaktu);
      try {
        if (typeof window !== 'undefined') {
          const a = document.createElement('a');
          a.href = waUrl;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.click();
        }
      } catch {}

      setDispatchStatus(`Alhamdulillah! Pesan WhatsApp terkirim ke wali Ananda ${santri.namaPanggilan}. Otomatis tertampil di Halaman Berita & Santri!`);
      setTimeout(() => setDispatchStatus(null), 5000);
    } catch {
      setDispatchStatus(`Gagal mengirim WA ke ${santri.nama}`);
    } finally {
      setSendingId(null);
    }
  };

  // Broadcast to all attended santri
  const handleBroadcastAllPresent = async () => {
    if (isSantri) {
      setDispatchStatus('Akses Terbatas: Hanya akun Ustadz / Ustadzah yang dapat menyiarkan presensi WA.');
      setTimeout(() => setDispatchStatus(null), 4000);
      return;
    }

    const presentSantri = santriList.filter((s) => s.statusKehadiran === 'Hadir');
    if (presentSantri.length === 0) {
      setDispatchStatus('Tidak ada santri dengan status "Hadir" saat ini.');
      setTimeout(() => setDispatchStatus(null), 3000);
      return;
    }

    setBroadcastLoading(true);
    let sentCount = 0;

    for (const santri of presentSantri) {
      const msg = formatWhatsAppMessage(santri.nama, selectedWaktu);
      await sendWhatsAppAttendanceAPI(santri.noHpWali, santri.nama, selectedWaktu);

      if (onSendAttendanceWA) {
        onSendAttendanceWA(santri.id, 'Hadir', msg);
      } else {
        onAddWALog(santri.nama, santri.noHpWali, msg);
      }
      sentCount++;
    }

    setBroadcastLoading(false);
    setDispatchStatus(`Alhamdulillah! Berhasil mengirim notifikasi WA ke ${sentCount} wali santri hadir. Data otomatis tertampil di Papan Berita & Rekap Santri!`);
    setTimeout(() => setDispatchStatus(null), 5000);
  };

  const handleCopyTemplate = () => {
    if (currentPreviewText) {
      navigator.clipboard.writeText(currentPreviewText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalHadir = santriList.filter((s) => s.statusKehadiran === 'Hadir').length;
  const totalIzin = santriList.filter((s) => s.statusKehadiran === 'Izin').length;
  const totalSakit = santriList.filter((s) => s.statusKehadiran === 'Sakit').length;
  const totalAlpa = santriList.filter((s) => s.statusKehadiran === 'Alpa').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 sm:p-7 my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {isSantri
                  ? 'Portal Rekap Kehadiran Santri'
                  : 'Portal Absensi & Penyiaran WA Dewan Asatidz'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
              Absensi Mengaji &amp; WhatsApp Wali Santri
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isSantri
                ? 'Informasi kehadiran santri harian. Rekap langsung terhubung dengan laporan resmi pengajar.'
                : 'Tandai kehadiran santri dan kirim pesan terstandarisasi ke WhatsApp wali santri. Pesan otomatis tertampil di halaman Berita & Santri.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice for Santri Account (Restricted features) */}
        {isSantri && (
          <div className="my-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">Perhatian Akun Santri ({currentUser?.nama}):</p>
              <p className="text-amber-800">
                Fitur mencatat absensi dan mengirim pesan WhatsApp hanya dapat dioperasikan oleh akun <strong>Ustadz / Ustadzah</strong>. Santri dapat melihat status kehadiran teman-teman yang hadir dan belum hadir di halaman Berita &amp; Santri.
              </p>
              <div className="pt-1">
                <Link
                  href="/berita"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 hover:bg-emerald-50 transition-colors"
                >
                  <span>Buka Papan Kehadiran Berita &amp; Santri</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Status Toast */}
        {dispatchStatus && (
          <div className="my-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{dispatchStatus}</span>
          </div>
        )}

        {/* Controls Bar: Date & Session Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tanggal Mengaji</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Waktu Mengaji</label>
            <select
              value={selectedWaktu}
              onChange={(e) => setSelectedWaktu(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium"
            >
              <option value="Sore (15:30 - 17:00 WIB)">Sore (15:30 - 17:00 WIB)</option>
              <option value="Sore (16:30 - 17:45 WIB)">Sore (16:30 - 17:45 WIB)</option>
              <option value="Ba'da Maghrib (18:15 - 19:45 WIB)">Ba&apos;da Maghrib (18:15 - 19:45 WIB)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleBroadcastAllPresent}
              disabled={broadcastLoading || isSantri}
              className={`w-full py-2.5 px-3 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                isSantri
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {broadcastLoading
                  ? 'Mengirim...'
                  : isSantri
                  ? 'Kirim WA (Khusus Ustadzah)'
                  : `Kirim WA ke Semua Hadir (${totalHadir})`}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Area: Split List & Template Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 overflow-y-auto pr-1">
          {/* Santri Attendance List */}
          <div className="lg:col-span-7 space-y-2.5 overflow-y-auto max-h-[48vh] pr-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
              <span>DAFTAR SANTRI ({santriList.length})</span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-700">Hadir: {totalHadir}</span>
                <span className="text-amber-700">Izin: {totalIzin}</span>
                <span className="text-sky-700">Sakit: {totalSakit}</span>
                <span className="text-rose-700">Alpa: {totalAlpa}</span>
              </div>
            </div>

            {santriList.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                <Users className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-sm font-bold text-slate-800 font-serif">Belum Ada Santri Terdaftar di Database</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Data santri bersifat privat. Silakan masuk akun santri dengan Google atau daftarkan santri baru untuk mengelola absensi.
                </p>
              </div>
            ) : (
              santriList.map((santri) => (
                <div
                  key={santri.id}
                  onClick={() => setActivePreviewSantri(santri)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activePreviewSantri?.id === santri.id
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{santri.nama}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                          {santri.nis}
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {santri.kelasSD} · {santri.tingkatJilid}
                      </p>
                    </div>

                    {/* Send WA Button (Disabled for santri) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSendWA(santri);
                      }}
                      disabled={sendingId === santri.id || isSantri}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-xs transition-colors shrink-0 ${
                        isSantri
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                      }`}
                      title={isSantri ? 'Hanya Ustadzah yang dapat mengirim WA' : 'Kirim notifikasi WA'}
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>{sendingId === santri.id ? 'Mengirim...' : 'Kirim WA'}</span>
                    </button>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5 text-xs">
                    {(['Hadir', 'Izin', 'Sakit', 'Alpa'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        disabled={isSantri}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isSantri) {
                            onUpdateAttendance(santri.id, status);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                          isSantri
                            ? santri.statusKehadiran === status
                              ? 'bg-slate-700 text-white'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : santri.statusKehadiran === status
                            ? status === 'Hadir'
                              ? 'bg-emerald-600 text-white shadow-2xs cursor-pointer'
                              : status === 'Izin'
                              ? 'bg-amber-500 text-white shadow-2xs cursor-pointer'
                              : status === 'Sakit'
                              ? 'bg-sky-500 text-white shadow-2xs cursor-pointer'
                              : 'bg-rose-500 text-white shadow-2xs cursor-pointer'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    <span className="ml-auto text-[10px] text-slate-400 font-mono">
                      WA: {santri.noHpWali}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* WhatsApp Message Preview Column */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  Format Teks Resmi WhatsApp
                </span>
                <button
                  onClick={handleCopyTemplate}
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                </button>
              </div>

              {/* Chat Bubble Presentation */}
              <div className="bg-[#E7F8EE] rounded-2xl p-4 border border-emerald-200 shadow-2xs text-xs text-slate-800 leading-relaxed font-sans relative">
                <div className="absolute top-2 right-2 text-[10px] text-emerald-700 font-mono">
                  TPA Al-Ikhlas API
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs text-slate-800 selection:bg-emerald-200">
                  {currentPreviewText}
                </pre>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Target Wali Santri:</p>
                <p>Nama: <strong className="text-slate-900">{activePreviewSantri?.namaWali || 'Orang Tua Santri'}</strong></p>
                <p>No. WhatsApp: <strong className="text-slate-900 font-mono">{activePreviewSantri?.noHpWali}</strong></p>
                <p>Waktu Mengaji: <strong className="text-slate-900">{selectedWaktu}</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 mt-4 space-y-2">
              <Link
                href="/berita"
                onClick={onClose}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Lihat Live Papan Berita &amp; Santri</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
