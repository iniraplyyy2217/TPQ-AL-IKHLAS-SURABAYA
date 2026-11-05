'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SantriAccountPreview from '@/components/SantriAccountPreview';
import ProfileLembaga from '@/components/ProfileLembaga';
import JadwalMengaji from '@/components/JadwalMengaji';
import Footer from '@/components/Footer';
import PendaftaranModal from '@/components/PendaftaranModal';
import AuthModal from '@/components/AuthModal';
import AbsensiModal from '@/components/AbsensiModal';
import IjazahModal from '@/components/IjazahModal';
import { useTpaData } from '@/lib/use-tpa-store';

export default function HomePage() {
  const {
    santriList,
    currentUser,
    loginWithGoogle,
    loginWithCredentials,
    switchRole,
    registerSantriAccount,
    registerUstadzAccount,
    clearAllData,
    updateSantriPhoto,
    logoutSantri,
    updateAttendance,
    sendWhatsAppAttendance,
    addWALog,
    updateSantriNilai,
  } = useTpaData();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [registerRole, setRegisterRole] = useState<'santri' | 'ustadzah'>('santri');
  const [isAbsensiOpen, setIsAbsensiOpen] = useState(false);
  const [isIjazahOpen, setIsIjazahOpen] = useState(false);

  const handleOpenAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const handleOpenRegisterSantri = () => {
    setRegisterRole('santri');
    setAuthTab('register');
    setIsAuthOpen(true);
  };

  const handleOpenRegisterUstadz = () => {
    setRegisterRole('ustadzah');
    setAuthTab('register');
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        currentUser={currentUser}
        onOpenRegister={handleOpenRegisterSantri}
        onOpenRegisterUstadz={handleOpenRegisterUstadz}
        onOpenAuth={handleOpenAuth}
        onOpenAbsensi={() => setIsAbsensiOpen(true)}
        onOpenIjazah={() => setIsIjazahOpen(true)}
        onSwitchRole={switchRole}
      />

      <main className="flex-1">
        <HeroSection
          onOpenRegister={handleOpenRegisterSantri}
          onOpenRegisterUstadz={handleOpenRegisterUstadz}
          onOpenAbsensi={() => setIsAbsensiOpen(true)}
        />

        {/* PREVIEW AKUN SANTRI / USTADZAH & PASANG FOTO PROFIL */}
        <SantriAccountPreview
          currentUser={currentUser}
          santriList={santriList}
          onOpenLogin={() => handleOpenAuth('login')}
          onOpenRegister={handleOpenRegisterSantri}
          onOpenRegisterUstadz={handleOpenRegisterUstadz}
          onOpenIjazah={() => setIsIjazahOpen(true)}
          onOpenAbsensi={() => setIsAbsensiOpen(true)}
          onSavePhoto={updateSantriPhoto}
          onClearAllData={clearAllData}
        />

        <ProfileLembaga />

        <JadwalMengaji />
      </main>

      <Footer
        onOpenRegister={handleOpenRegisterSantri}
        onOpenRegisterUstadz={handleOpenRegisterUstadz}
        onOpenAbsensi={() => setIsAbsensiOpen(true)}
        onOpenIjazah={() => setIsIjazahOpen(true)}
      />

      {/* Pendaftaran Modal (Stand-alone Form) */}
      <PendaftaranModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialRole={registerRole}
        onRegisterSuccess={(formData) => registerSantriAccount(formData)}
        onRegisterUstadzSuccess={(formData) => registerUstadzAccount(formData)}
        onOpenPortal={() => handleOpenAuth('login')}
        onOpenIjazah={() => setIsIjazahOpen(true)}
      />

      {/* Auth Modal with Tombol Masuk & Tombol Daftar */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        initialRegisterRole={registerRole}
        currentUser={currentUser}
        onLoginWithGoogle={loginWithGoogle}
        onLoginWithCredentials={loginWithCredentials}
        onRegisterAccount={registerSantriAccount}
        onRegisterUstadz={registerUstadzAccount}
        onLogout={logoutSantri}
        onOpenIjazah={() => {
          setIsAuthOpen(false);
          setIsIjazahOpen(true);
        }}
        onUpdateAttendance={updateAttendance}
        onSavePhoto={updateSantriPhoto}
      />

      <AbsensiModal
        isOpen={isAbsensiOpen}
        onClose={() => setIsAbsensiOpen(false)}
        currentUser={currentUser}
        santriList={santriList}
        onUpdateAttendance={updateAttendance}
        onAddWALog={addWALog}
        onSendAttendanceWA={sendWhatsAppAttendance}
      />

      <IjazahModal
        isOpen={isIjazahOpen}
        onClose={() => setIsIjazahOpen(false)}
        currentUser={currentUser}
        santriList={santriList}
        onSaveNilai={updateSantriNilai}
        onOpenLogin={() => handleOpenAuth('login')}
        onOpenRegister={handleOpenRegisterSantri}
      />
    </div>
  );
}
