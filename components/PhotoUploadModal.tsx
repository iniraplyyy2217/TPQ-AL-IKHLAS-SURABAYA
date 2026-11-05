'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, Camera, Check, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import { AVATAR_PRESETS, resizeImageToBase64 } from '@/lib/avatar-presets';
import { playApplauseSound } from '@/lib/audio-effects';
import confetti from 'canvas-confetti';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoURL?: string;
  santriName: string;
  onSavePhoto: (photoURL: string) => Promise<void> | void;
}

export default function PhotoUploadModal({
  isOpen,
  onClose,
  currentPhotoURL,
  santriName,
  onSavePhoto,
}: PhotoUploadModalProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(currentPhotoURL || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tab, setTab] = useState<'upload' | 'avatar'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Harap pilih file gambar (JPG, PNG, WEBP).');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage('');
      const base64 = await resizeImageToBase64(file, 360);
      setSelectedPhoto(base64);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Gagal memproses gambar foto.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPhoto) {
      setErrorMessage('Pilih foto terlebih dahulu sebelum menyimpan.');
      return;
    }

    try {
      setIsProcessing(true);
      await onSavePhoto(selectedPhoto);
      playApplauseSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      onClose();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Gagal menyimpan foto profil.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-100 p-5 sm:p-6 my-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-serif">
            Pasang Foto Profil Santri
          </h3>
          <p className="text-xs text-slate-500">
            Pilih foto santri untuk {santriName}. Foto akan tampil di akun, kartu santri, dan ijazah resmi.
          </p>
        </div>

        {/* Current / Preview Circular Frame */}
        <div className="my-5 flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-emerald-500 to-teal-500 shadow-lg">
            <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
              {selectedPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedPhoto}
                  alt={santriName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-extrabold text-emerald-800">
                  {santriName ? santriName.charAt(0).toUpperCase() : 'S'}
                </span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
              title="Upload dari file"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">Pratinjau Foto Profil</p>
        </div>

        {/* Method Tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-4 text-xs font-bold">
          <button
            onClick={() => setTab('upload')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === 'upload' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Foto Sendiri</span>
          </button>
          <button
            onClick={() => setTab('avatar')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === 'avatar' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pilih Avatar Santri</span>
          </button>
        </div>

        {/* Tab 1: Upload from local file */}
        {tab === 'upload' && (
          <div className="space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 rounded-2xl p-5 text-center cursor-pointer transition-all space-y-2"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Klik untuk Memilih Foto dari HP / Komputer
                </p>
                <p className="text-[11px] text-slate-500">
                  Format JPG, PNG, WEBP (Otomatis dioptimasi)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Preset Avatars */}
        {tab === 'avatar' && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-slate-600">
              Pilih karakter kartun santri sholeh / sholehah:
            </p>
            <div className="grid grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1">
              {AVATAR_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPhoto(preset.svgDataUri)}
                  className={`p-1.5 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedPhoto === preset.svgDataUri
                      ? 'border-emerald-600 bg-emerald-50 shadow-xs scale-105'
                      : 'border-slate-200 hover:border-emerald-300 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preset.svgDataUri} alt={preset.name} className="w-full h-full" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 text-center leading-tight line-clamp-1">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {errorMessage && (
          <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200 mt-3">
            {errorMessage}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isProcessing || !selectedPhoto}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Simpan Foto Profil</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
