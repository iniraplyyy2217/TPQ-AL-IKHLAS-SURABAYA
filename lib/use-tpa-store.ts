'use client';

import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, signInWithGoogle, logOutUser, testConnection } from './firebase';
import { handleFirestoreError, OperationType } from './firebase-error';
import { Santri, QuizScoreRecord, SoalKuis, BANK_SOAL } from './tpa-data';

export interface WALog {
  id: string;
  namaSantri: string;
  nis?: string;
  noHp: string;
  waktu: string;
  tanggal: string;
  statusPresensi?: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  text: string;
  sender?: string;
  status: 'Terkirim' | 'Gagal';
}

const LOCAL_ACCOUNTS_KEY = 'tpa_santri_accounts_db';
const LOCAL_USTADZ_ACCOUNTS_KEY = 'tpa_ustadz_accounts_db';
const ACTIVE_SANTRI_KEY = 'tpa_active_santri_id';
const ACTIVE_ROLE_KEY = 'tpa_active_role';
const BANK_SOAL_KEY = 'tpa_bank_soal_db';
const WA_LOGS_KEY = 'tpa_wa_attendance_broadcasts';
const CLEAN_WIPE_VERSION_KEY = 'tpa_clean_wipe_v10_reset_all_data';

// Initial Santri List - Dikosongkan sesuai permintaan (0 data)
export const SEED_SANTRI_LIST: Santri[] = [];

// Initial Ustadzah/Ustadz List - Dikosongkan sesuai permintaan (0 data)
export const DEFAULT_USTADZAH_ACCOUNTS: Santri[] = [];

// Sample WA logs - Dikosongkan sesuai permintaan (0 data)
const SAMPLE_WA_LOGS: WALog[] = [];

function purgeAllStoredDataIfOutdated() {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(CLEAN_WIPE_VERSION_KEY) !== 'true') {
      localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify([]));
      localStorage.setItem(LOCAL_USTADZ_ACCOUNTS_KEY, JSON.stringify([]));
      localStorage.setItem(WA_LOGS_KEY, JSON.stringify([]));
      localStorage.removeItem(ACTIVE_SANTRI_KEY);
      localStorage.removeItem(ACTIVE_ROLE_KEY);
      localStorage.setItem(CLEAN_WIPE_VERSION_KEY, 'true');
    }
  } catch {}
}

export function getStoredUstadzAccounts(): Santri[] {
  if (typeof window === 'undefined') return [];
  try {
    purgeAllStoredDataIfOutdated();
    const data = localStorage.getItem(LOCAL_USTADZ_ACCOUNTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredUstadzAccounts(accounts: Santri[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_USTADZ_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {}
}

function getStoredAccounts(): Santri[] {
  if (typeof window === 'undefined') return [];
  try {
    purgeAllStoredDataIfOutdated();
    const data = localStorage.getItem(LOCAL_ACCOUNTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredAccounts(accounts: Santri[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {}
}

function getStoredBankSoal(): SoalKuis[] {
  if (typeof window === 'undefined') return BANK_SOAL;
  try {
    const data = localStorage.getItem(BANK_SOAL_KEY);
    if (!data) {
      localStorage.setItem(BANK_SOAL_KEY, JSON.stringify(BANK_SOAL));
      return BANK_SOAL;
    }
    return JSON.parse(data);
  } catch {
    return BANK_SOAL;
  }
}

function saveStoredBankSoal(soal: SoalKuis[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BANK_SOAL_KEY, JSON.stringify(soal));
  } catch {}
}

function getStoredWALogs(): WALog[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(WA_LOGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStoredWALogs(logs: WALog[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WA_LOGS_KEY, JSON.stringify(logs));
  } catch {}
}

export function useTpaData() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  // Initial states are strictly empty and identical between SSR and client
  const [allSantriAccounts, setAllSantriAccounts] = useState<Santri[]>([]);
  const [ustadzList, setUstadzList] = useState<Santri[]>([]);
  const [bankSoalList, setBankSoalList] = useState<SoalKuis[]>(BANK_SOAL);
  const [quizScores, setQuizScores] = useState<QuizScoreRecord[]>([]);
  const [waLogs, setWaLogs] = useState<WALog[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<Santri | null>(null);
  const [santriList, setSantriList] = useState<Santri[]>([]);

  // Sync state with localStorage asynchronously after client mount
  useEffect(() => {
    testConnection();

    const timer = setTimeout(() => {
      if (typeof window === 'undefined') return;

      const storedAccounts = getStoredAccounts();
      const storedUstadz = getStoredUstadzAccounts();
      const storedBankSoal = getStoredBankSoal();
      const storedLogs = getStoredWALogs();

      setAllSantriAccounts(storedAccounts);
      setUstadzList(storedUstadz);
      setBankSoalList(storedBankSoal);
      setWaLogs(storedLogs);

      const activeId = localStorage.getItem(ACTIVE_SANTRI_KEY);
      const activeRole = localStorage.getItem(ACTIVE_ROLE_KEY);

      if (activeRole === 'ustadzah' || activeId?.startsWith('ustadz')) {
        const ustadz = storedUstadz.find((u) => u.id === activeId || u.username === activeId);
        if (ustadz) {
          setCurrentUser(ustadz);
          setSantriList(storedAccounts);
        } else {
          setCurrentUser(null);
          setSantriList(storedAccounts);
        }
      } else if (activeId) {
        const found = storedAccounts.find(
          (s) => s.id === activeId || s.nis === activeId || s.username === activeId
        );
        if (found) {
          setCurrentUser(found);
          setSantriList([found]);
        } else {
          setCurrentUser(null);
          setSantriList(storedAccounts);
        }
      } else {
        setCurrentUser(null);
        setSantriList(storedAccounts);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    let unsubscribeDoc: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);

      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (user) {
        const santriDocRef = doc(db, 'santri', user.uid);
        unsubscribeDoc = onSnapshot(
          santriDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data() as Santri;
              setCurrentUser(data);
              setSantriList([data]);
              if (typeof window !== 'undefined') {
                localStorage.setItem(ACTIVE_SANTRI_KEY, data.id);
                localStorage.setItem(ACTIVE_ROLE_KEY, 'santri');
              }
            }
          },
          (error) => {
            console.warn('Firestore snapshot error:', error);
          }
        );
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  // Google Login
  const loginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout
  const logoutSantri = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(ACTIVE_SANTRI_KEY);
        localStorage.removeItem(ACTIVE_ROLE_KEY);
      }
      await logOutUser();
      setCurrentUser(null);
      const accounts = getStoredAccounts();
      setSantriList(accounts);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Login with Username / NIS / Email & Password
  const loginWithCredentials = async (
    identifier: string,
    password: string,
    roleTarget?: 'santri' | 'ustadzah'
  ): Promise<Santri> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    const storedUstadz = getStoredUstadzAccounts();
    const storedSantri = getStoredAccounts();

    // 1. If roleTarget is ustadzah or id implies ustadz, search ustadz list first
    if (roleTarget === 'ustadzah' || cleanId.includes('ustadz')) {
      const foundUstadz = storedUstadz.find(
        (u) =>
          u.username?.toLowerCase() === cleanId ||
          u.email?.toLowerCase() === cleanId ||
          u.nis?.toLowerCase() === cleanId ||
          u.nama.toLowerCase().includes(cleanId) ||
          u.id === cleanId
      );

      if (foundUstadz) {
        if (cleanPass && foundUstadz.password && foundUstadz.password !== cleanPass) {
          throw new Error('Password Ustadz/Ustadzah salah. Silakan periksa kembali kata sandi.');
        }
        setCurrentUser(foundUstadz);
        setSantriList(storedSantri);
        if (typeof window !== 'undefined') {
          localStorage.setItem(ACTIVE_SANTRI_KEY, foundUstadz.id);
          localStorage.setItem(ACTIVE_ROLE_KEY, 'ustadzah');
        }
        return foundUstadz;
      }
    }

    // 2. Search Santri list
    const foundSantri = storedSantri.find(
      (s) =>
        (s.username && s.username.toLowerCase() === cleanId) ||
        (s.nama && s.nama.toLowerCase() === cleanId) ||
        (s.namaPanggilan && s.namaPanggilan.toLowerCase() === cleanId) ||
        (s.email && s.email.toLowerCase() === cleanId) ||
        (s.nis && s.nis.toLowerCase() === cleanId)
    );

    if (foundSantri) {
      if (cleanPass && foundSantri.password && foundSantri.password !== cleanPass) {
        throw new Error('Password santri salah. Mohon periksa kembali password akun Anda.');
      }
      setCurrentUser(foundSantri);
      setSantriList([foundSantri]);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_SANTRI_KEY, foundSantri.id);
        localStorage.setItem(ACTIVE_ROLE_KEY, 'santri');
      }
      return foundSantri;
    }

    // 3. Fallback: check Ustadz list if roleTarget wasn't specified
    const foundAnyUstadz = storedUstadz.find(
      (u) =>
        u.username?.toLowerCase() === cleanId ||
        u.email?.toLowerCase() === cleanId ||
        u.nis?.toLowerCase() === cleanId ||
        u.id === cleanId
    );

    if (foundAnyUstadz) {
      if (cleanPass && foundAnyUstadz.password && foundAnyUstadz.password !== cleanPass) {
        throw new Error('Password Ustadz/Ustadzah salah.');
      }
      setCurrentUser(foundAnyUstadz);
      setSantriList(storedSantri);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_SANTRI_KEY, foundAnyUstadz.id);
        localStorage.setItem(ACTIVE_ROLE_KEY, 'ustadzah');
      }
      return foundAnyUstadz;
    }

    throw new Error(
      'Akun tidak ditemukan. Pastikan Username, Email, atau NIS Anda telah terdaftar. Silakan lakukan pendaftaran terlebih dahulu.'
    );
  };

  // Switch role seamlessly
  const switchRole = (role: 'ustadzah' | 'santri', specificId?: string) => {
    const accounts = getStoredAccounts();
    const ustadzAccounts = getStoredUstadzAccounts();

    if (role === 'ustadzah') {
      const ustadz = (specificId && ustadzAccounts.find((u) => u.id === specificId)) || ustadzAccounts[0];
      if (!ustadz) {
        throw new Error('Belum ada akun Ustadz / Ustadzah terdaftar. Silakan klik tombol "Daftar Ustadz / Ustadzah" terlebih dahulu.');
      }
      setCurrentUser(ustadz);
      setSantriList(accounts);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_SANTRI_KEY, ustadz.id);
        localStorage.setItem(ACTIVE_ROLE_KEY, 'ustadzah');
      }
    } else {
      const target = (specificId && accounts.find((s) => s.id === specificId)) || accounts[0];
      if (!target) {
        throw new Error('Belum ada akun Santri terdaftar. Silakan klik tombol "Pendaftaran Santri Baru" terlebih dahulu.');
      }
      setCurrentUser(target);
      setSantriList([target]);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_SANTRI_KEY, target.id);
        localStorage.setItem(ACTIVE_ROLE_KEY, 'santri');
      }
    }
  };

  // Register New Santri
  const registerSantriAccount = async (formData: {
    nama: string;
    namaPanggilan: string;
    email: string;
    alamat: string;
    namaWali: string;
    noHpWali: string;
    kelasSD: string;
    password: string;
    username?: string;
    photoURL?: string;
    tingkatJilid?: string;
    waktuMengaji?: string;
    jenisKelamin?: 'L' | 'P';
  }): Promise<Santri> => {
    const accounts = getStoredAccounts();
    const generatedUsername =
      formData.username ||
      formData.namaPanggilan.toLowerCase().replace(/[^a-z0-9]/g, '') +
        Math.floor(10 + Math.random() * 89);

    const randomSuffix = Math.floor(100 + Math.random() * 899);
    const newNis = `TPA-2026-${randomSuffix}`;
    const newId = `santri_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const isoDate = new Date().toISOString().split('T')[0];

    const newSantri: Santri = {
      id: newId,
      userId: auth.currentUser?.uid || newId,
      role: 'santri',
      username: generatedUsername,
      password: formData.password,
      email: formData.email,
      photoURL: formData.photoURL || '',
      nis: newNis,
      nama: formData.nama,
      namaPanggilan: formData.namaPanggilan,
      kelasSD: formData.kelasSD,
      tingkatJilid: formData.tingkatJilid || 'Iqro Jilid 1',
      waktuMengaji: formData.waktuMengaji || 'Sore (15:30 - 17:00 WIB)',
      namaWali: formData.namaWali,
      noHpWali: formData.noHpWali,
      alamat: formData.alamat || 'Surabaya, Jawa Timur',
      jenisKelamin: formData.jenisKelamin || 'L',
      totalPoints: 50,
      statusKehadiran: 'Hadir',
      totalHadir: 1,
      totalIzin: 0,
      totalSakit: 0,
      totalAlpa: 0,
      terakhirAbsen: isoDate,
      riwayatAbsensi: [
        {
          tanggal: isoDate,
          status: 'Hadir',
          keterangan: 'Pendaftaran Akun Santri Baru & Orientasi Awal',
        },
      ],
      nilai: null,
      kompetensiBelajar: null,
      statusIjazah: false,
      nomorIjazah: undefined,
      tanggalLulus: undefined,
      namaPenguji: undefined,
      catatanUjian: undefined,
      tanggalUjian: undefined,
      statusUjian: 'Belum Ujian',
      hafalanSelesai: [],
      ijazahFileSent: false,
      kuisDiizinkan: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedAccounts = [newSantri, ...accounts];
    saveStoredAccounts(updatedAccounts);
    setAllSantriAccounts(updatedAccounts);

    if (currentUser?.role === 'ustadzah') {
      setSantriList(updatedAccounts);
    } else {
      setCurrentUser(newSantri);
      setSantriList([newSantri]);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ACTIVE_SANTRI_KEY, newSantri.id);
        localStorage.setItem(ACTIVE_ROLE_KEY, 'santri');
      }
    }

    if (auth.currentUser) {
      try {
        const santriDocRef = doc(db, 'santri', auth.currentUser.uid);
        await setDoc(santriDocRef, { ...newSantri, userId: auth.currentUser.uid });
      } catch (err) {
        console.warn('Firestore sync note:', err);
      }
    }

    return newSantri;
  };

  // Register New Ustadzah / Ustadz
  const registerUstadzAccount = async (formData: {
    nama: string;
    gelar?: string;
    username: string;
    password: string;
    email: string;
    noHp: string;
    bidang: string;
    alamat?: string;
    jenisKelamin: 'L' | 'P';
    photoURL?: string;
  }): Promise<Santri> => {
    const ustadzAccounts = getStoredUstadzAccounts();
    const cleanUsername = formData.username.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    const cleanEmail = formData.email.trim().toLowerCase();

    // Check duplicate
    const exists = ustadzAccounts.some(
      (u) => u.username?.toLowerCase() === cleanUsername || u.email?.toLowerCase() === cleanEmail
    );
    if (exists) {
      throw new Error('Username atau Email Ustadz/Ustadzah sudah terdaftar. Silakan gunakan yang lain.');
    }

    const newId = `ustadz_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const randomNip = Math.floor(100 + Math.random() * 899);
    const gelarStr = formData.gelar && formData.gelar.trim() ? `, ${formData.gelar.trim()}` : '';
    const prefixTitle = formData.jenisKelamin === 'P' ? 'Ustadzah' : 'Ustadz';
    const rawNama = formData.nama.trim();
    const namaFormatted = rawNama.toLowerCase().startsWith('ustadz') ? rawNama : `${prefixTitle} ${rawNama}${gelarStr}`;

    const newUstadz: Santri = {
      id: newId,
      userId: auth.currentUser?.uid || newId,
      role: 'ustadzah',
      username: cleanUsername,
      password: formData.password,
      email: formData.email,
      photoURL: formData.photoURL || '',
      nis: `GURU-${randomNip}`,
      nama: namaFormatted,
      namaPanggilan: rawNama.replace(/^(ustadz|ustadzah)\s+/i, ''),
      kelasSD: 'Dewan Asatidz / Pengajar',
      tingkatJilid: formData.bidang || 'Koordinator Tahfidz & Tilawah Al-Qur’an',
      namaWali: 'Pengurus Yayasan TPA Al-Ikhlas',
      noHpWali: formData.noHp,
      alamat: formData.alamat || 'Wonokromo, Surabaya',
      jenisKelamin: formData.jenisKelamin,
      totalPoints: 999,
      statusKehadiran: 'Hadir',
      totalHadir: 0,
      totalIzin: 0,
      totalSakit: 0,
      totalAlpa: 0,
      waktuMengaji: 'Senin - Sabtu (15:30 - 17:30 WIB)',
      statusIjazah: true,
      hafalanSelesai: ['30 Juz'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedUstadz = [newUstadz, ...ustadzAccounts];
    saveStoredUstadzAccounts(updatedUstadz);
    setUstadzList(updatedUstadz);

    // Save to Firestore if available
    try {
      await setDoc(doc(db, 'asatidz', newId), {
        ...newUstadz,
        createdAt: new Date().toISOString(),
      });
    } catch {}

    setCurrentUser(newUstadz);
    const currentSantriList = getStoredAccounts();
    setSantriList(currentSantriList);

    if (typeof window !== 'undefined') {
      localStorage.setItem(ACTIVE_SANTRI_KEY, newUstadz.id);
      localStorage.setItem(ACTIVE_ROLE_KEY, 'ustadzah');
    }

    return newUstadz;
  };

  // Clear all data (Santri and Asatidz)
  const clearAllData = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify([]));
      localStorage.setItem(LOCAL_USTADZ_ACCOUNTS_KEY, JSON.stringify([]));
      localStorage.setItem(WA_LOGS_KEY, JSON.stringify([]));
      localStorage.removeItem(ACTIVE_SANTRI_KEY);
      localStorage.removeItem(ACTIVE_ROLE_KEY);
    }
    setAllSantriAccounts([]);
    setUstadzList([]);
    setSantriList([]);
    setWaLogs([]);
    setCurrentUser(null);
  };

  // Update profile photo
  const updateSantriPhoto = async (photoURL: string) => {
    if (!currentUser) return;
    const updated: Santri = {
      ...currentUser,
      photoURL,
      updatedAt: new Date().toISOString(),
    };

    setCurrentUser(updated);

    if (currentUser.role === 'ustadzah') {
      const ustadzAccounts = getStoredUstadzAccounts();
      const updatedU = ustadzAccounts.map((u) => (u.id === updated.id ? updated : u));
      saveStoredUstadzAccounts(updatedU);
      setUstadzList(updatedU);
    } else {
      const accounts = getStoredAccounts();
      const updatedAccounts = accounts.map((a) => (a.id === updated.id ? updated : a));
      saveStoredAccounts(updatedAccounts);
      setAllSantriAccounts(updatedAccounts);
      setSantriList([updated]);
    }
  };

  // Ustadzah feature: Menambah / Memperbarui Nilai Santri & Kirim Ijazah Berbentuk File
  const updateSantriNilai = async (
    santriId: string,
    nilai: { tajwid: number; fiqihSholat: number; hafalanJuz30: number; adabAkhlak: number },
    lulus: boolean,
    kompetensi?: Partial<NonNullable<Santri['kompetensiBelajar']>>,
    extra?: {
      namaPenguji?: string;
      catatanUjian?: string;
      hafalanSelesai?: string[];
      kirimIjazahLangsung?: boolean;
    }
  ) => {
    const accounts = getStoredAccounts();
    const targetSantri = accounts.find((s) => s.id === santriId);
    if (!targetSantri) return;

    const nisSuffix = (targetSantri.nis || '001').replace('TPA-2026-', '');
    const nomorIjazah = lulus
      ? targetSantri.nomorIjazah || `IJZ/TPA-IKHLAS/SBY/2026/${nisSuffix}`
      : undefined;
    const tanggalLulus = lulus
      ? targetSantri.tanggalLulus ||
        new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : undefined;

    const baseKompetensi = targetSantri.kompetensiBelajar || {
      makharijulHuruf: lulus ? 'Tuntas' : 'Perlu Bimbingan',
      hukumTajwid: lulus ? 'Tuntas' : 'Perlu Bimbingan',
      kelancaranMembaca: lulus ? 'Tuntas' : 'Sedang Ditempuh',
      gerakanBacaanSholat: lulus ? 'Tuntas' : 'Perlu Bimbingan',
      adabPenuntutIlmu: lulus ? 'Tuntas' : 'Perlu Bimbingan',
      tahfidzSuratPilihan: lulus ? 'Tuntas' : 'Sedang Ditempuh',
    };

    const isKirim = extra?.kirimIjazahLangsung ?? lulus;

    const updatedSantri: Santri = {
      ...targetSantri,
      nilai,
      statusIjazah: lulus,
      statusUjian: lulus ? 'Lulus Munaqasyah' : 'Perlu Remidi',
      namaPenguji: extra?.namaPenguji || currentUser?.nama || 'Dewan Asatidz TPA Al-Ikhlas',
      catatanUjian:
        extra?.catatanUjian ||
        (lulus
          ? 'Alhamdulillah, santri dinyatakan Lulus Ujian Munaqasyah dan berhak menerima Ijazah/Sertifikat Resmi.'
          : 'Santri telah mengikuti ujian munaqasyah, namun masih perlu pemantapan makhraj huruf dan kelancaran bacaan.'),
      tanggalUjian: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      nomorIjazah: lulus ? nomorIjazah : undefined,
      tanggalLulus: lulus ? tanggalLulus : undefined,
      hafalanSelesai: extra?.hafalanSelesai || targetSantri.hafalanSelesai,
      kompetensiBelajar: {
        ...baseKompetensi,
        ...(kompetensi || {}),
      },
      ijazahFileSent: isKirim,
      ijazahSentAt: isKirim ? new Date().toISOString() : targetSantri.ijazahSentAt,
      ijazahSentBy: isKirim ? (currentUser?.nama || 'Dewan Asatidz') : targetSantri.ijazahSentBy,
      updatedAt: new Date().toISOString(),
    };

    const newAccounts = accounts.map((a) => (a.id === santriId ? updatedSantri : a));
    saveStoredAccounts(newAccounts);
    setAllSantriAccounts(newAccounts);

    if (currentUser?.role === 'ustadzah') {
      setSantriList(newAccounts);
    } else if (currentUser?.id === santriId) {
      setCurrentUser(updatedSantri);
      setSantriList([updatedSantri]);
    }
  };

  // Ustadzah feature: Mengirim Ijazah Resmi ke Santri
  const sendIjazahFileToSantri = (santriId: string, ustadzahNama?: string) => {
    const accounts = getStoredAccounts();
    const updatedAccounts = accounts.map((s) => {
      if (s.id === santriId) {
        return {
          ...s,
          statusIjazah: true,
          ijazahFileSent: true,
          ijazahSentAt: new Date().toISOString(),
          ijazahSentBy: ustadzahNama || currentUser?.nama || 'Dewan Asatidz TPA Al-Ikhlas',
          updatedAt: new Date().toISOString(),
        };
      }
      return s;
    });

    saveStoredAccounts(updatedAccounts);
    setAllSantriAccounts(updatedAccounts);

    if (currentUser?.role === 'ustadzah') {
      setSantriList(updatedAccounts);
    }
  };

  // Ustadzah feature: Bank Soal Management (Tambah & Kurangi Soal)
  const addBankSoal = (newSoal: Omit<SoalKuis, 'id'>) => {
    const newId = bankSoalList.length > 0 ? Math.max(...bankSoalList.map((s) => s.id)) + 1 : 1;
    const item: SoalKuis = { ...newSoal, id: newId };
    const updated = [...bankSoalList, item];
    setBankSoalList(updated);
    saveStoredBankSoal(updated);
  };

  const deleteBankSoal = (soalId: number) => {
    const updated = bankSoalList.filter((s) => s.id !== soalId);
    setBankSoalList(updated);
    saveStoredBankSoal(updated);
  };

  // Ustadzah feature: Invite / Izinkan Santri Mengerjakan Bank Soal
  const toggleInviteSantriQuiz = (santriId: string, allow: boolean) => {
    const accounts = getStoredAccounts();
    const updated = accounts.map((s) => {
      if (s.id === santriId) {
        return {
          ...s,
          kuisDiizinkan: allow,
          kuisInviteDate: allow ? new Date().toISOString().split('T')[0] : undefined,
          updatedAt: new Date().toISOString(),
        };
      }
      return s;
    });

    saveStoredAccounts(updated);
    setAllSantriAccounts(updated);

    if (currentUser?.role === 'ustadzah') {
      setSantriList(updated);
    } else if (currentUser?.id === santriId) {
      const self = updated.find((s) => s.id === santriId);
      if (self) setCurrentUser(self);
    }
  };

  // Ustadzah feature: Kirim Absensi WA ke Wali Santri & Otomatis Muncul di Papan Berita & Santri
  const sendWhatsAppAttendance = (
    santriId: string,
    statusPresensi: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa' = 'Hadir',
    customPesan?: string
  ) => {
    const accounts = getStoredAccounts();
    const targetSantri = accounts.find((s) => s.id === santriId);
    if (!targetSantri) return;

    const todayIso = new Date().toISOString().split('T')[0];
    const jamSekarang = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const tanggalFormat = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // 1. Update Santri attendance record
    const prevHistory = targetSantri.riwayatAbsensi || [];
    const newHistory = [
      {
        tanggal: todayIso,
        status: statusPresensi,
        keterangan: `Presensi ${statusPresensi} oleh ${currentUser?.nama || 'Ustadzah'} (${jamSekarang})`,
      },
      ...prevHistory,
    ];

    const currentTotalHadir = targetSantri.totalHadir ?? 0;
    const currentTotalIzin = targetSantri.totalIzin ?? 0;
    const currentTotalSakit = targetSantri.totalSakit ?? 0;
    const currentTotalAlpa = targetSantri.totalAlpa ?? 0;

    const updatedSantri: Santri = {
      ...targetSantri,
      statusKehadiran: statusPresensi,
      terakhirAbsen: todayIso,
      totalHadir: statusPresensi === 'Hadir' ? currentTotalHadir + 1 : currentTotalHadir,
      totalIzin: statusPresensi === 'Izin' ? currentTotalIzin + 1 : currentTotalIzin,
      totalSakit: statusPresensi === 'Sakit' ? currentTotalSakit + 1 : currentTotalSakit,
      totalAlpa: statusPresensi === 'Alpa' ? currentTotalAlpa + 1 : currentTotalAlpa,
      riwayatAbsensi: newHistory,
      updatedAt: new Date().toISOString(),
    };

    const newAccounts = accounts.map((s) => (s.id === santriId ? updatedSantri : s));
    saveStoredAccounts(newAccounts);
    setAllSantriAccounts(newAccounts);

    if (currentUser?.role === 'ustadzah') {
      setSantriList(newAccounts);
    } else if (currentUser?.id === santriId) {
      setCurrentUser(updatedSantri);
      setSantriList([updatedSantri]);
    }

    // 2. Generate WhatsApp Log & Broadcast
    const defaultText = customPesan || `Assalamualaikum Wr.Wb, Bapak/Ibu wali santri Ananda *${targetSantri.nama}*. Diinformasikan bahwa ananda pada hari ini telah berstatus *${statusPresensi.toUpperCase()}* dalam kegiatan belajar mengaji di TPA Al-Ikhlas Surabaya. Semoga ananda selalu istiqamah dan diberkahi Allah. Terima kasih.`;

    const newLog: WALog = {
      id: `wa-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      namaSantri: targetSantri.nama,
      nis: targetSantri.nis,
      noHp: targetSantri.noHpWali,
      waktu: jamSekarang,
      tanggal: tanggalFormat,
      statusPresensi,
      text: defaultText,
      sender: currentUser?.nama || 'Dewan Asatidz TPA Al-Ikhlas',
      status: 'Terkirim',
    };

    const updatedLogs = [newLog, ...waLogs];
    setWaLogs(updatedLogs);
    saveStoredWALogs(updatedLogs);

    return newLog;
  };

  // Backward compatible addWALog
  const addWALog = (namaSantri: string, noHp: string, text: string) => {
    const jamSekarang = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const tanggalFormat = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const newLog: WALog = {
      id: `log-${Date.now()}`,
      namaSantri,
      noHp,
      waktu: jamSekarang,
      tanggal: tanggalFormat,
      statusPresensi: 'Hadir',
      text,
      sender: currentUser?.nama || 'Dewan Asatidz',
      status: 'Terkirim',
    };
    const updated = [newLog, ...waLogs];
    setWaLogs(updated);
    saveStoredWALogs(updated);
  };

  // Backward compatible updateAttendance
  const updateAttendance = async (
    santriId: string,
    status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa',
    keterangan?: string
  ) => {
    sendWhatsAppAttendance(santriId, status, keterangan);
  };

  // Add points
  const addPointsToSantri = async (nis: string, pointsToAdd: number) => {
    const accounts = getStoredAccounts();
    const updated = accounts.map((s) => {
      if (s.nis === nis || s.id === nis) {
        return {
          ...s,
          totalPoints: (s.totalPoints || 0) + pointsToAdd,
        };
      }
      return s;
    });
    saveStoredAccounts(updated);
    setAllSantriAccounts(updated);

    if (currentUser?.nis === nis || currentUser?.id === nis) {
      setCurrentUser({
        ...currentUser,
        totalPoints: (currentUser.totalPoints || 0) + pointsToAdd,
      });
    }
  };

  // Record Quiz Score
  const recordQuizScore = (
    nis: string,
    nama: string,
    skor: number,
    jawabanBenar: number,
    totalSoal: number
  ) => {
    const newRecord: QuizScoreRecord = {
      id: `score-${Date.now()}`,
      nis,
      nama,
      skor,
      jawabanBenar,
      totalSoal,
      waktu:
        new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) +
        ' WIB, ' +
        new Date().toLocaleDateString('id-ID'),
    };

    setQuizScores((prev) => [newRecord, ...prev]);
    addPointsToSantri(nis, skor);
  };

  const loginSantri = (identifier: string): Santri | null => {
    return currentUser;
  };

  const isUstadzah = currentUser?.role === 'ustadzah';

  return {
    firebaseUser,
    currentUser,
    isUstadzah,
    santriList,
    ustadzList,
    allSantriAccounts,
    bankSoalList,
    quizScores,
    waLogs,
    isLoaded,
    authLoading,
    loginWithGoogle,
    loginWithCredentials,
    switchRole,
    registerSantriAccount,
    registerUstadzAccount,
    clearAllData,
    updateSantriPhoto,
    registerNewSantri: registerSantriAccount,
    loginSantri,
    logoutSantri,
    updateAttendance,
    sendWhatsAppAttendance,
    addPointsToSantri,
    recordQuizScore,
    addWALog,
    updateSantriNilai,
    sendIjazahFileToSantri,
    addBankSoal,
    deleteBankSoal,
    toggleInviteSantriQuiz,
  };
}
