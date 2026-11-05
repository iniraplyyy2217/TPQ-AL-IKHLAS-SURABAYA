'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import MateriView from '@/components/MateriView';
import Footer from '@/components/Footer';
import PendaftaranModal from '@/components/PendaftaranModal';
import AuthModal from '@/components/AuthModal';
import AbsensiModal from '@/components/AbsensiModal';
import IjazahModal from '@/components/IjazahModal';
import { useTpaData } from '@/lib/use-tpa-store';

function MateriContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'dinul-islam';

  const {
    santriList,
    currentUser,
    bankSoalList,
    loginWithGoogle,
    loginWithCredentials,
    switchRole,
    registerSantriAccount,
    registerUstadzAccount,
    updateSantriPhoto,
    logoutSantri,
    recordQuizScore,
    updateAttendance,
    sendWhatsAppAttendance,
    addWALog,
    updateSantriNilai,
    addBankSoal,
    deleteBankSoal,
    toggleInviteSantriQuiz,
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
        <MateriView
          currentUser={currentUser}
          santriList={santriList}
          bankSoalList={bankSoalList}
          onAddBankSoal={addBankSoal}
          onDeleteBankSoal={deleteBankSoal}
          onToggleInviteSantriQuiz={toggleInviteSantriQuiz}
          onRecordQuizScore={recordQuizScore}
          initialTab={initialTab}
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

export default function MateriPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold">Memuat Materi Belajar TPA Al-Ikhlas...</div>}>
      <MateriContent />
    </Suspense>
  );
}
