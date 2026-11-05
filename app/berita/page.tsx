'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BeritaView from '@/components/BeritaView';
import Footer from '@/components/Footer';
import PendaftaranModal from '@/components/PendaftaranModal';
import AuthModal from '@/components/AuthModal';
import AbsensiModal from '@/components/AbsensiModal';
import IjazahModal from '@/components/IjazahModal';
import { useTpaData } from '@/lib/use-tpa-store';

export default function BeritaPage() {
  const {
    santriList,
    currentUser,
    waLogs,
    loginWithGoogle,
    loginWithCredentials,
    switchRole,
    registerSantriAccount,
    registerUstadzAccount,
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
        <BeritaView
          santriList={santriList}
          waLogs={waLogs}
          currentUser={currentUser}
          onOpenIjazah={() => setIsIjazahOpen(true)}
          onOpenRegister={handleOpenRegisterSantri}
          onOpenAbsensi={() => setIsAbsensiOpen(true)}
        />
      </main>

      <Footer
        onOpenRegister={handleOpenRegisterSantri}
        onOpenRegisterUstadz={handleOpenRegisterUstadz}
        onOpenAbsensi={() => setIsAbsensiOpen(true)}
        onOpenIjazah={() => setIsIjazahOpen(true)}
      />

      {/* Interactive Modals */}
      <PendaftaranModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        initialRole={registerRole}
        onRegisterSuccess={(formData) => registerSantriAccount(formData)}
        onRegisterUstadzSuccess={(formData) => registerUstadzAccount(formData)}
        onOpenPortal={() => handleOpenAuth('login')}
        onOpenIjazah={() => setIsIjazahOpen(true)}
      />

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
