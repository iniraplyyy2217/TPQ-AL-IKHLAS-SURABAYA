// Data model and content store for TPA Al-Ikhlas Surabaya

export interface Santri {
  id: string;
  userId: string;
  role?: 'santri' | 'ustadzah';
  username?: string;
  password?: string;
  email?: string;
  photoURL?: string;
  nis: string; // e.g. TPA-2026-001
  nama: string;
  namaPanggilan: string;
  kelasSD: string; // e.g. "Kelas 3 SD"
  tingkatJilid: string; // "Iqro 3", "Iqro 5", "Al-Qur'an Juz 30"
  namaWali: string;
  noHpWali: string; // e.g. "6281234567890"
  alamat: string;
  jenisKelamin: 'L' | 'P';
  totalPoints: number;
  statusKehadiran: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  totalHadir: number;
  totalIzin: number;
  totalSakit: number;
  totalAlpa: number;
  waktuMengaji: string;
  terakhirAbsen?: string;
  riwayatAbsensi?: {
    tanggal: string;
    status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
    keterangan?: string;
  }[];
  nilai?: {
    tajwid: number;
    fiqihSholat: number;
    hafalanJuz30: number;
    adabAkhlak: number;
  } | null;
  kompetensiBelajar?: {
    makharijulHuruf: string;
    hukumTajwid: string;
    kelancaranMembaca: string;
    gerakanBacaanSholat: string;
    adabPenuntutIlmu: string;
    tahfidzSuratPilihan: string;
  } | null;
  statusIjazah: boolean;
  nomorIjazah?: string;
  tanggalLulus?: string;
  namaPenguji?: string;
  catatanUjian?: string;
  tanggalUjian?: string;
  statusUjian?: 'Belum Ujian' | 'Lulus Munaqasyah' | 'Perlu Remidi';
  hafalanSelesai: string[];
  ijazahFileSent?: boolean;
  ijazahSentAt?: string;
  ijazahSentBy?: string;
  kuisDiizinkan?: boolean;
  kuisInviteDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UstadzProfile {
  id: string;
  nama: string;
  gelar: string;
  username: string;
  password?: string;
  email: string;
  role: 'ustadzah';
  bidang: string;
  photoURL?: string;
}

export const DEFAULT_ASATIDZ: UstadzProfile[] = [];

export const DAFTAR_PENGUJI_ASATIDZ: { id: string; nama: string; bidang: string }[] = [];

export interface QuizScoreRecord {
  id: string;
  nis: string;
  nama: string;
  skor: number;
  jawabanBenar: number;
  totalSoal: number;
  waktu: string;
}

export interface BukuRujukan {
  judul: string;
  pengarang: string;
  deskripsi: string;
  topik: string;
  kutipanPenting: string;
  penerbit?: string;
}

export interface SurahShort {
  nomor: number;
  nama: string;
  namaArab: string;
  arti: string;
  jumlahAyat: number;
  ayat: {
    no: number;
    arab: string;
    latin: string;
    terjemah: string;
  }[];
  tipsHafalan: string;
}

export interface SholatStep {
  step: number;
  judul: string;
  gerakan: string;
  arab: string;
  latin: string;
  terjemahan: string;
  tipsGerakan: string;
  iconType: string;
}

// Initial Santri List - Kosong & Belum Ada yang Mendaftar (Sesuai Permintaan)
export const INITIAL_SANTRI: Santri[] = [];


// Islamic Books Reference (Rujukan Kitab Klasik & Kontemporer)
export const BUKU_RUJUKAN: BukuRujukan[] = [
  {
    judul: "Mabadi'ul Fiqhiyyah (Juz 1 & 2)",
    pengarang: 'Syaikh Umar Abdul Jabbar',
    topik: 'Fiqih Ibadah & Praktik Sholat',
    deskripsi: 'Kitab dasar fiqih bermazhab Syafi’i yang sangat populer di pesantren dan madrasah diniyah untuk anak-anak, menguraikan wudhu, rukun sholat, serta thaharah dengan bahasa yang mudah dipahami santri cilik.',
    kutipanPenting: 'الصَّلَاةُ هِيَ أَقْوَالٌ وَأَفْعَالٌ مَخْصُوصَةٌ مُفْتَتَحَةٌ بِالتَّكْبِيرِ مُخْتَتَمَةٌ بِالتَّسْلِيمِ (Sholat adalah ucapan dan perbuatan khusus yang diawali dengan takbir dan diakhiri dengan salam).'
  },
  {
    judul: 'Aqidatul Awwam',
    pengarang: 'Syaikh Al-Imam Ahmad Al-Marzuqi Al-Maliki',
    topik: 'Aqidah Islam & Sifat 20 Allah',
    deskripsi: 'Kitab nadham (syair) indah yang diajarkan kepada santri dasar untuk mengenal 20 sifat wajib Allah, 20 sifat mustahil, 1 sifat jaiz, nama 25 Nabi dan Rasul, serta para malaikat Allah.',
    kutipanPenting: 'أَبْدَأُ بِاسْمِ اللهِ وَالرَّحْمَنِ * وَبِالرَّحِيمِ دَائِمِ الإِحْسَانِ (Kuberpaling memulai dengan menyebut asma Allah Yang Maha Pengasih lagi Maha Penyayang yang senantiasa memberi kebaikan).'
  },
  {
    judul: 'Taisirul Khalaq fi Ilmil Akhlaq',
    pengarang: 'Syaikh Hafizh Hasan Al-Mas’udi',
    topik: 'Adab & Budi Pekerti Anak Sholeh',
    deskripsi: 'Pedoman adab santri dalam bergaul dengan orang tua, ustadz, teman sebaya, adab berbicara santun, adab makan, dan menjaga kebersihan.',
    kutipanPenting: 'حُسْنُ الخُلُقِ هُوَ طَلَاقَةُ الوَجْهِ وَبَذْلُ النَّدَى وَكَفُّ الأَذَى (Akhlak mulia adalah wajah yang ceria tersenyum, gemar menolong sesama, dan menahan diri dari menyakiti orang lain).'
  },
  {
    judul: 'Hidayatush Shibyan fi Tajwidil Qur’an',
    pengarang: 'Syaikh Sa’id ibn Sa’ad Nabhan Al-Hadhrami',
    topik: 'Ilmu Tajwid Praktis',
    deskripsi: 'Nadham tajwid praktis 40 bait untuk pemula tingkat dasar (anak-anak SD) yang mencakup hukum nun mati/tanwin, mim mati, hukum mad, dan makharijul huruf.',
    kutipanPenting: 'أَحْكَامُ تَنْوِينٍ وَنُونٍ تَسْكُنُ * عِنْدَ الهِجَاءِ خَمْسَةٌ تُبَيَّنُ (Hukum tanwin dan nun mati ketika bertemu huruf hijaiyah ada 5 ketentuan yang dijelaskan).'
  },
  {
    judul: "Juz 'Amma & Buku Panduan Tilawati Kemenag RI",
    pengarang: 'Kementerian Agama Republik Indonesia',
    topik: 'Tartil & Tahfidz Al-Qur’an Anak',
    deskripsi: 'Standarisasi nasional baca tulis Al-Qur’an yang memadukan lagu rast, nahawand, dan bayati agar santri menghafal dengan senang dan tajwid yang tepat.',
    kutipanPenting: 'خَيْرُكُمْ مَنْ تَعَلَّمَ القُرْآنَ وَعَلَّمَهُ (Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya - HR. Bukhari).'
  }
];

// Surat-surat Pendek Juz 30
export const SURAT_JUZ_30: SurahShort[] = [
  {
    nomor: 114,
    nama: 'An-Nas',
    namaArab: 'الناس',
    arti: 'Manusia',
    jumlahAyat: 6,
    tipsHafalan: 'Ingat 3 kata kunci pelindung: Robbinnas (Tuhan), Malikin-nas (Raja), Ilahin-nas (Sembahan). Dibaca sebelum tidur!',
    ayat: [
      { no: 1, arab: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', latin: "Qul a'udzu birabbin-nas", terjemah: 'Katakanlah: "Aku berlindung kepada Tuhan (yang memelihara dan menguasai) manusia.' },
      { no: 2, arab: 'مَلِكِ النَّاسِ', latin: 'Malikin-nas', terjemah: 'Raja manusia.' },
      { no: 3, arab: 'إِلَٰهِ النَّاسِ', latin: 'Ilahin-nas', terjemah: 'Sembahan manusia.' },
      { no: 4, arab: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', latin: 'Min syarril-waswasil-khannas', terjemah: 'Dari kejahatan (bisikan) syaitan yang biasa bersembunyi,' },
      { no: 5, arab: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', latin: 'Alladzi yuwaswisu fi shudurinnas', terjemah: 'Yang membisikkan (kejahatan) ke dalam dada manusia,' },
      { no: 6, arab: 'مِنَ الْجِنَّةِ وَالنَّاسِ', latin: 'Minal jinnati wan-nas', terjemah: 'Dari (golongan) jin dan manusia.' }
    ]
  },
  {
    nomor: 113,
    nama: 'Al-Falaq',
    namaArab: 'الفلق',
    arti: 'Waktu Subuh',
    jumlahAyat: 5,
    tipsHafalan: 'Perhatikan bunyi Qalqalah di akhir setiap ayat (falaq, khalaq, waqab, ‘uqad, hasad). Pantulkan dengan jelas!',
    ayat: [
      { no: 1, arab: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', latin: "Qul a'udzu birabbil-falaq", terjemah: 'Katakanlah: "Aku berlindung kepada Tuhan yang menguasai subuh,' },
      { no: 2, arab: 'مِنْ شَرِّ مَا خَلَقَ', latin: 'Min syarri ma khalaq', terjemah: 'Dari kejahatan makhluk-Nya,' },
      { no: 3, arab: 'وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ', latin: 'Wa min syarri ghasiqin idza waqab', terjemah: 'Dan dari kejahatan malam apabila telah gelap gulita,' },
      { no: 4, arab: 'وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', latin: 'Wa min syarrin-naffatsati fil-‘uqad', terjemah: 'Dan dari kejahatan wanita-wanita tukang sihir yang meniup pada buhul-buhul,' },
      { no: 5, arab: 'وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ', latin: 'Wa min syarri hasidin idza hasad', terjemah: 'Dan dari kejahatan pendengki bila ia dengki."' }
    ]
  },
  {
    nomor: 112,
    nama: 'Al-Ikhlas',
    namaArab: 'الإخلاص',
    arti: 'Memurnikan Keesaan Allah',
    jumlahAyat: 4,
    tipsHafalan: 'Surat identitas TPA kita! Menjelaskan Allah itu Esa (Satu) dan tempat bergantung semua makhluk.',
    ayat: [
      { no: 1, arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ', latin: 'Qul huwallahu ahad', terjemah: 'Katakanlah: "Dialah Allah, Yang Maha Esa.' },
      { no: 2, arab: 'اللَّهُ الصَّمَدُ', latin: 'Allahus-samad', terjemah: 'Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu.' },
      { no: 3, arab: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', latin: 'Lam yalid wa lam yulad', terjemah: 'Dia tiada beranak dan tidak pula diperanakkan,' },
      { no: 4, arab: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', latin: 'Wa lam yakul-lahu kufuwan ahad', terjemah: 'Dan tidak ada seorangpun yang setara dengan Dia."' }
    ]
  },
  {
    nomor: 108,
    nama: 'Al-Kautsar',
    namaArab: 'الكوثر',
    arti: 'Nikmat yang Berlimpah',
    jumlahAyat: 3,
    tipsHafalan: 'Surat terpendek dalam Al-Qur’an! Kuncinya: syukuri nikmat dengan mendirikan sholat dan berqurban.',
    ayat: [
      { no: 1, arab: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', latin: "Inna a'thainakal-kautsar", terjemah: 'Sesungguhnya Kami telah memberikan kepadamu nikmat yang banyak.' },
      { no: 2, arab: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ', latin: 'Fa shalli lirabbika wanhar', terjemah: 'Maka dirikanlah sholat karena Tuhanmu; dan berkorbanlah.' },
      { no: 3, arab: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', latin: "Inna syani'aka huwal-abtar", terjemah: 'Sesungguhnya orang-orang yang membenci kamu dialah yang terputus.' }
    ]
  }
];

// Materi Praktik Sholat Lengkap
export const PRAKTIK_SHOLAT: SholatStep[] = [
  {
    step: 1,
    judul: 'Niat Sholat',
    gerakan: 'Berdiri tegak menghadap kiblat dengan khusyuk, hati berniat ikhlas karena Allah Ta’ala.',
    arab: 'أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى',
    latin: "Ushalli fardhadh-dhuhri arba'a raka'atin mustaqbilal qiblati adaa-an lillahi Ta'ala",
    terjemahan: 'Aku berniat sholat fardhu Dzuhur empat rakaat menghadap kiblat tunai karena Allah Ta’ala.',
    tipsGerakan: 'Badan lurus, pandangan tertuju ke tempat sujud, tangan di samping badan.',
    iconType: 'stand'
  },
  {
    step: 2,
    judul: 'Takbiratul Ihram',
    gerakan: 'Mengangkat kedua telapak tangan sejajar daun telinga (bagi putra) atau dada (bagi putri) seraya mengucap Takbir.',
    arab: 'اللهُ أَكْبَرُ',
    latin: 'Allahu Akbar',
    terjemahan: 'Allah Maha Besar.',
    tipsGerakan: 'Jari-jari tangan sedikit renggang, telapak tangan menghadap arah kiblat.',
    iconType: 'takbir'
  },
  {
    step: 3,
    judul: 'Bersedekap & Membaca Doa Iftitah',
    gerakan: 'Meletakkan tangan kanan di atas pergelangan tangan kiri di antara pusar dan dada.',
    arab: 'اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيلاً...',
    latin: "Allahu akbar kabiraa walhamdulillahi katsiraa wa subhaanallahi bukrataw-wa-ashiilaa...",
    terjemahan: 'Allah Maha Besar sebesar-besarnya, puji syukur kepada Allah sebanyak-banyaknya, Maha Suci Allah pagi dan petang...',
    tipsGerakan: 'Pandangan tetap tertuju ke tempat sujud, tidak melirik ke kanan atau kiri.',
    iconType: 'sedekap'
  },
  {
    step: 4,
    judul: 'Membaca Al-Fatihah & Surat Pendek',
    gerakan: 'Membaca Ummul Kitab Surat Al-Fatihah secara tartil dengan memfasihkan tajwid dan makharijul huruf.',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ ...',
    latin: "Bismillahir-rahmanir-rahim. Alhamdu lillahi rabbil-'alamin...",
    terjemahan: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam...',
    tipsGerakan: 'Wajib dibaca pada setiap rakaat sholat. Diakhiri membaca Aamiin.',
    iconType: 'read'
  },
  {
    step: 5,
    judul: 'Ruku’ dengan Thuma’ninah',
    gerakan: 'Membungkukkan badan hingga punggung dan kepala sejajar lurus, kedua telapak tangan mencengkeram lutut.',
    arab: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ (٣×)',
    latin: "Subhana rabbiyal-'adhimi wa bihamdih (3x)",
    terjemahan: 'Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya (dibaca 3 kali).',
    tipsGerakan: 'Punggung lurus mendatar bagaikan papan sehingga bila diletakkan segelas air tidak tumpah.',
    iconType: 'ruku'
  },
  {
    step: 6,
    judul: 'I’tidal (Bangkit dari Ruku’)',
    gerakan: 'Bangkit dari ruku’ berdiri tegak kembali sambil mengangkat kedua tangan seraya membaca tasmi’ lalu tahmid.',
    arab: 'سَمِعَ اللهُ لِمَنْ حَمِدَهُ ، رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الأَرْضِ...',
    latin: "Sami'allahu liman hamidah. Rabbana lakal hamdu mil'us-samawati wa mil'ul-ardh...",
    terjemahan: 'Allah mendengar orang yang memuji-Nya. Wahai Tuhan kami, bagi-Mu segala puji sepenuh langit dan bumi...',
    tipsGerakan: 'Berdiri tegak diam sejenak (thuma’ninah) sebelum bersiap untuk sujud.',
    iconType: 'itidal'
  },
  {
    step: 7,
    judul: 'Sujud Pertama',
    gerakan: 'Menempelkan 7 anggota badan ke sajadah: dahi & hidung, 2 telapak tangan, 2 lutut, serta ujung jari 2 kaki.',
    arab: 'سُبْحَانَ رَبِّيَ الأَعْلَى وَبِحَمْدِهِ (٣×)',
    latin: "Subhana rabbiyal-a'la wa bihamdih (3x)",
    terjemahan: 'Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya (dibaca 3 kali).',
    tipsGerakan: 'Kedua siku tidak ditempelkan ke lantai (direnggangkan bagi putra, dirapatkan bagi putri).',
    iconType: 'sujud'
  },
  {
    step: 8,
    judul: 'Duduk di Antara Dua Sujud (Iftirasy)',
    gerakan: 'Bangkit dari sujud pertama dan duduk di atas telapak kaki kiri, sedangkan telapak kaki kanan ditegakkan.',
    arab: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي',
    latin: "Rabbighfirli warhamni wajburni warfa'ni warzuqni wahdini wa'afini wa'fu 'anni",
    terjemahan: 'Ya Tuhanku ampunilah aku, sayangilah aku, cukupkanlah kekuranganku, tinggikan derajatku, berilah rezeki, tunjukilah aku...',
    tipsGerakan: 'Kedua telapak tangan diletakkan di atas paha dekat lutut dengan jari menghadap kiblat.',
    iconType: 'duduk'
  },
  {
    step: 9,
    judul: 'Sujud Kedua & Rakaat Berikutnya',
    gerakan: 'Melakukan sujud kedua persis sebagaimana sujud pertama dengan thuma’ninah dan bacaan tasbih 3 kali.',
    arab: 'سُبْحَانَ رَبِّيَ الأَعْلَى وَبِحَمْدِهِ (٣×)',
    latin: "Subhana rabbiyal-a'la wa bihamdih (3x)",
    terjemahan: 'Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya.',
    tipsGerakan: 'Setelah sujud kedua rakaat pertama, berdiri bertakbir untuk melanjutkan rakaat kedua.',
    iconType: 'sujud'
  },
  {
    step: 10,
    judul: 'Tasyahud Awal',
    gerakan: 'Duduk iftirasy pada rakaat kedua sholat yang lebih dari 2 rakaat, telunjuk kanan diangkat saat syahadat.',
    arab: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ...',
    latin: "Attahiyyatul-mubarakatush-shalawatuth-thayyibatu lillah. Assalamu'alaika ayyuhan-nabiyyu...",
    terjemahan: 'Segala kehormatan, keberkahan, sholawat dan kebaikan adalah milik Allah. Salam sejahtera atasmu wahai Nabi...',
    tipsGerakan: 'Jari telunjuk tangan kanan diangkat lurus condong ke arah kiblat saat membaca "Asyhadu alla ilaha illallah".',
    iconType: 'tasyahud'
  },
  {
    step: 11,
    judul: 'Tasyahud Akhir & Sholawat',
    gerakan: 'Duduk tawarruk (pantat menempel ke lantai, kaki kiri keluar di bawah betis kanan) pada rakaat terakhir.',
    arab: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ...',
    latin: "Allahumma shalli 'ala sayyidina Muhammad wa 'ala ali sayyidina Muhammad, kama shallaita 'ala sayyidina Ibrahim...",
    terjemahan: 'Ya Allah limpahkanlah rahmat kepada junjungan kami Nabi Muhammad beserta keluarganya, sebagaimana Engkau limpahkan kepada Nabi Ibrahim...',
    tipsGerakan: 'Duduk dengan tenang dan membaca doa perlindungan dari siksa neraka dan fitnah dajjal.',
    iconType: 'tasyahud_akhir'
  },
  {
    step: 12,
    judul: 'Salam ke Kanan dan Kiri',
    gerakan: 'Memalingkan muka ke kanan hingga pipi terlihat dari belakang seraya mengucapkan salam, lalu memalingkan ke kiri.',
    arab: 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ',
    latin: "Assalamu'alaikum wa rahmatullahi wa barakatuh",
    terjemahan: 'Semoga keselamatan dan rahmat Allah serta berkah-Nya tercurah untuk kalian.',
    tipsGerakan: 'Salam pertama adalah rukun sholat yang menjadi penutup ibadah sholat.',
    iconType: 'salam'
  }
];

// Materi Tajwid Praktis untuk Anak SD
export const MATERI_TAJWID = [
  {
    kategori: 'Hukum Nun Mati (نْ) & Tanwin (ــًــٍــٌ)',
    pembahasan: [
      {
        nama: '1. Idzhar Halqi (إظهار حلقي)',
        arti: 'Jelas dan Terang di Tenggorokan',
        penjelasan: 'Jika Nun Mati (نْ) atau Tanwin bertemu dengan salah satu dari 6 huruf halq (tenggorokan), maka dibaca terang tanpa mendengung.',
        huruf: 'ء (Hamzah), هـ (Ha), ع (‘Ain), ح (Ha), غ (Ghain), خ (Kha)',
        contoh: [
          { kata: 'مَنْ آمَنَ', bacaan: 'Man aamana', ket: 'Nun mati bertemu Hamzah dibaca jelas' },
          { kata: 'عَذَابٌ أَلِيمٌ', bacaan: "'Adzaabun aliim", ket: 'Tanwin bertemu Hamzah' },
          { kata: 'مِنْ حَكِيمٍ', bacaan: 'Min hakiim', ket: 'Nun mati bertemu Ha (ح)' }
        ],
        tipsSantri: 'Trik Cepat: Bayangkan 6 huruf ini keluar dari tenggorokan, tidak boleh berdengung seperti lebah!'
      },
      {
        nama: '2. Idgham Bighunnah (إدغام بغنة)',
        arti: 'Melebur Disertai Dengung 2 Harakat',
        penjelasan: 'Jika Nun Mati atau Tanwin bertemu salah satu dari 4 huruf: Ya, Nun, Mim, Wawu. Cara bacanya dimasukkan ke huruf berikutnya sambil mendengung.',
        huruf: 'ي (Ya), ن (Nun), م (Mim), و (Wawu) - Disingkat: YA-N-MU (يَنْمُو)',
        contoh: [
          { kata: 'مَنْ يَقُولُ', bacaan: 'May-yaquulu (didengungkan)', ket: 'Nun mati melebur ke huruf Ya' },
          { kata: 'مِنْ نِعْمَةٍ', bacaan: 'Min-ni’matih', ket: 'Nun mati melebur ke Nun' },
          { kata: 'مِنْ مَالٍ', bacaan: 'Mim-maalin', ket: 'Nun mati melebur ke Mim' }
        ],
        tipsSantri: 'Trik Cepat: Ingat kata singkatan "YAN-MU"! Dengungkan di hidung selama 2 ketukan.'
      },
      {
        nama: '3. Idgham Bilaghunnah (إدغام بلا غنة)',
        arti: 'Melebur Tanpa Dengung',
        penjelasan: 'Jika Nun Mati atau Tanwin bertemu huruf Lam (ل) atau Ra (ر). Bunyi nun/tanwin langsung lebur hilang tanpa dengung.',
        huruf: 'ل (Lam) dan ر (Ra)',
        contoh: [
          { kata: 'مِنْ لَدُنْهُ', bacaan: 'Mil-ladunhu (langsung masuk ke Lam)', ket: 'Tanpa ditahan di hidung' },
          { kata: 'مِنْ رَبِّهِمْ', bacaan: 'Mir-rabbihim', ket: 'Langsung masuk ke huruf Ra' }
        ],
        tipsSantri: 'Trik Cepat: Hurufnya cuma 2 (L & R). Langsung loncat ke huruf berikutnya tanpa dengung!'
      },
      {
        nama: '4. Iqlab (إقلاب)',
        arti: 'Mengganti Bunyi Menjadi Huruf Mim (م)',
        penjelasan: 'Jika Nun Mati atau Tanwin bertemu huruf Ba (ب), suaranya berganti seperti huruf Mim mati disertai dengung. Di mushaf biasanya ada tanda huruf mim kecil (م).',
        huruf: 'ب (Ba)',
        contoh: [
          { kata: 'مِنْ بَعْدِ', bacaan: 'Mim-ba’di (bibir merapat lembut)', ket: 'Nun mati berubah jadi Mim' },
          { kata: 'سَمِيعٌ بَصِيرٌ', bacaan: 'Samii’um-bashiir', ket: 'Tanwin berubah jadi Mim' }
        ],
        tipsSantri: 'Trik Cepat: Hurufnya paling spesial hanya SATU yaitu Ba (ب). Katupkan bibir dengan lembut!'
      },
      {
        nama: '5. Ikhfa’ Haqiqi (إخفاء حقيقي)',
        arti: 'Samar-samar Antara Jelas dan Melebur Disertai Dengung',
        penjelasan: 'Jika Nun Mati atau Tanwin bertemu salah satu dari 15 huruf hijaiyah selain Idzhar, Idgham, dan Iqlab. Lidah disiapkan ke makhraj huruf berikutnya.',
        huruf: 'ت، ث، ج، د، ذ، ز، س، ش، ص، ض، ط، ظ، ف، ق، ك (15 Huruf)',
        contoh: [
          { kata: 'مِنْ قَبْلُ', bacaan: 'Ming-qablu', ket: 'Samar tebal siap membunyikan Qaf' },
          { kata: 'أَنْفُسَكُمْ', bacaan: 'Am-fusakum / An-fusakum', ket: 'Samar siap membunyikan Fa' },
          { kata: 'مِنْ دُونِ', bacaan: 'Min-duuni', ket: 'Samar siap membunyikan Dal' }
        ],
        tipsSantri: 'Trik Cepat: Samar dan berdengung seperti bunyi "ng" halus sambil mulut siap mengucapkan huruf berikutnya.'
      }
    ]
  },
  {
    kategori: 'Hukum Qalqalah (Memantul)',
    pembahasan: [
      {
        nama: 'Qalqalah (قلقلة)',
        arti: 'Getaran / Pantulan Suara',
        penjelasan: 'Huruf-huruf qalqalah jika bersukun (mati) atau diwaqafkan (berhenti di akhir ayat) harus dibaca memantul dengan mantap.',
        huruf: 'ب (Ba), ج (Jim), د (Dal), ط (Tha), ق (Qaf) - Disingkat: BA-JU-DI-TO-KO (بَجَدْتَقْ)',
        contoh: [
          { kata: 'قُلْ هُوَ اللَّهُ أَحَدْ', bacaan: 'Ahad(e)', ket: 'Qalqalah Kubra di akhir ayat pantulan kuat' },
          { kata: 'يَجْعَلُونَ', bacaan: 'Yaj(e)-‘aluun', ket: 'Qalqalah Sughra di tengah kata pantulan ringan' },
          { kata: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكْ', bacaan: 'Shad(e)-rak', ket: 'Dal sukun memantul renyah' }
        ],
        tipsSantri: 'Trik Cepat: Hafalkan rumus "BA-JU-DI-TO-KO". Seperti bola bekel yang dipantulkan ke lantai!'
      }
    ]
  }
];

// Soal Online Bank Soal untuk Santri SD
export interface SoalKuis {
  id: number;
  kategori: string;
  pertanyaan: string;
  pilihan: string[];
  kunciJawaban: number; // index 0-3
  pembahasan: string;
  poin: number;
}

export const BANK_SOAL: SoalKuis[] = [
  {
    id: 1,
    kategori: 'Dinul Islam',
    pertanyaan: 'Rukun Islam yang kedua bagi setiap muslim yang baligh dan berakal adalah...',
    pilihan: ['Membayar Zakat', 'Mendirikan Sholat 5 Waktu', 'Berpuasa Ramadhan', 'Menunaikan Ibadah Haji'],
    kunciJawaban: 1,
    pembahasan: 'Benar sekali! Rukun Islam: 1. Syahadat, 2. Sholat, 3. Zakat, 4. Puasa Ramadhan, 5. Haji bagi yang mampu.',
    poin: 10
  },
  {
    id: 2,
    kategori: 'Tajwid Mudah',
    pertanyaan: 'Huruf-huruf Qalqalah (memantul) disingkat agar mudah diingat menjadi kata...',
    pilihan: ['ROTI-MANIS', 'BA-JU-DI-TO-KO', 'BU-KU-TU-LIS', 'SA-TU-DU-A-TI-GA'],
    kunciJawaban: 1,
    pembahasan: 'Hebat! Huruf Qalqalah adalah Ba, Jim, Dal, Tha, Qaf (ب - ج - د - ط - ق), disingkat BA-JU-DI-TO-KO.',
    poin: 10
  },
  {
    id: 3,
    kategori: 'Praktik Sholat',
    pertanyaan: 'Ketika sedang Ruku’ dalam sholat, bacaan tasbih yang kita baca sebanyak 3 kali adalah...',
    pilihan: [
      'Subhana rabbiyal-a’la wa bihamdih',
      'Subhana rabbiyal-‘adhimi wa bihamdih',
      'Rabbighfirli warhamni',
      'Allahu akbar kabiraa'
    ],
    kunciJawaban: 1,
    pembahasan: 'Maa syaa Allah! Saat ruku’ membaca Subhana rabbiyal-‘adhimi wa bihamdih, sedangkan saat sujud membaca Subhana rabbiyal-a’la wa bihamdih.',
    poin: 10
  },
  {
    id: 4,
    kategori: 'Hafalan Juz 30',
    pertanyaan: 'Surat Al-Ikhlas yang menjadi nama TPA kita terdiri dari berapa ayat?',
    pilihan: ['3 Ayat', '4 Ayat', '5 Ayat', '6 Ayat'],
    kunciJawaban: 1,
    pembahasan: 'Tepat sekali! Surat Al-Ikhlas memiliki 4 ayat yang agung tentang kemurnian keesaan Allah Ta’ala.',
    poin: 10
  },
  {
    id: 5,
    kategori: 'Pendidikan Aqidah',
    pertanyaan: 'Sifat Wajib bagi Allah yang artinya "Ada" (Maha Ada) adalah...',
    pilihan: ['Qidam', 'Baqa’', 'Wujud', 'Wahdaniyah'],
    kunciJawaban: 2,
    pembahasan: 'Pintar! Wujud artinya Ada. Allah itu Maha Ada menciptakan langit, bumi, dan seluruh alam semesta.',
    poin: 10
  },
  {
    id: 6,
    kategori: 'Tajwid Mudah',
    pertanyaan: 'Hukum bacaan Iqlab (mengganti bunyi nun mati menjadi suara mim) terjadi apabila bertemu huruf...',
    pilihan: ['Huruf Ba (ب)', 'Huruf Nun (ن)', 'Huruf Lam (ل)', 'Huruf Mim (م)'],
    kunciJawaban: 0,
    pembahasan: 'Benar! Huruf Iqlab hanya ada satu yaitu Ba (ب). Misalnya bacaan "Min ba’di" dibaca "Mim-ba’di".',
    poin: 10
  },
  {
    id: 7,
    kategori: 'Dinul Islam & Adab',
    pertanyaan: 'Doa yang dibaca sebelum kita menyantap makanan yang berkah adalah...',
    pilihan: [
      'Bismillahi tawakkaltu ‘alallah',
      'Allahumma barik lana fima razaqtana waqina ‘adzaban-nar',
      'Alhamdulillahilladzi ahyana ba’da ma amatana',
      'Rabbi zidni ‘ilma warzuqni fahma'
    ],
    kunciJawaban: 1,
    pembahasan: 'Alhamdulillah! Makan menggunakan tangan kanan dan membaca doa keberkahan rezeki.',
    poin: 10
  },
  {
    id: 8,
    kategori: 'Hafalan Juz 30',
    pertanyaan: 'Lanjutan ayat: "Qul a’udzu birabbin-nas..." ayat keduanya berbunyi...',
    pilihan: ['Ilahin-nas', 'Malikin-nas', 'Min syarril-waswas', 'Minal jinnati wan-nas'],
    kunciJawaban: 1,
    pembahasan: 'MasyaAllah! Ayat ke-2 surat An-Nas adalah "Malikin-nas" (Raja manusia).',
    poin: 10
  }
];

// Prestasi Santri TPA Al-Ikhlas Surabaya
export const PRESTASI_SANTRI = [
  {
    id: 1,
    juara: 'Juara 1 MTQ Santri Anak-Anak',
    tingkat: 'Tingkat Kota Surabaya 2025/2026',
    namaSantri: 'Aisyah Humaira Azzahra (Kelas 4 SD)',
    penyelenggara: 'Lembaga Pengembangan Tilawatil Qur’an (LPTQ) Surabaya',
    hadiah: 'Piala Walikota, Piagam Penghargaan & Tabungan Pendidikan',
    deskripsi: 'Berhasil melantunkan Surat Al-Baqarah dengan irama Nahawand dan tajwid mutqin tanpa kesalahan.'
  },
  {
    id: 2,
    juara: 'Juara 2 Da’i Cilik Santri Hebat',
    tingkat: 'Tingkat Karesidenan Surabaya & Sidoarjo',
    namaSantri: 'Muhammad Rayyan Al-Ghifari (Kelas 3 SD)',
    penyelenggara: 'Kemenag Kota Surabaya & Majelis Ulama Indonesia',
    hadiah: 'Piala Bergilir, Sertifikat & Bingkisan Kitab Islam',
    deskripsi: 'Membawakan tausiyah bertema "Birrul Walidain: Berbakti kepada Ayah Bunda Kunci Surga" dengan santun dan bersemangat.'
  },
  {
    id: 3,
    juara: 'Juara 1 Lomba Cerdas Cermat Islam (LCCI)',
    tingkat: 'FASI (Festival Anak Sholeh Indonesia) Surabaya',
    namaSantri: 'Regu TPA Al-Ikhlas (Fatih, Bilal, dan Rina)',
    penyelenggara: 'BKPRMI Surabaya',
    hadiah: 'Trophy Emas, Medali & Piagam Juara Umum',
    deskripsi: 'Menyapu bersih babak rebutan materi aqidah 20 sifat wajib Allah, tajwid nun mati, dan hafalan juz 30.'
  }
];

// Data Kontak dan Profil Lembaga TPA Al-Ikhlas
export const PROFIL_TPA = {
  nama: 'TPA Al-Ikhlas Surabaya',
  namaLengkap: 'Taman Pendidikan Al-Qur’an (TPA) Al-Ikhlas Wonokromo Surabaya',
  motto: 'Mencetak Generasi Qur’ani Cilik yang Ceria, Berakhlak Mulia, dan Hafidz Al-Qur’an',
  izinOperasional: 'SK Kemenag No. 412/TPA-SBY/2018',
  alamat: 'Jl. Gayungsari Timur No. 45, RT 03 / RW 02, Gayungan, Wonokromo, Kota Surabaya, Jawa Timur 60235',
  telepon: '0812-3456-7890',
  teleponKantor: '(031) 8976543',
  email: 'info@tpa-alikhlas-surabaya.sch.id',
  mediaSosial: {
    instagram: '@tpa_alikhlas_sby',
    youtube: 'TPA Al-Ikhlas TV Surabaya',
    facebook: 'TPA Al-Ikhlas Surabaya Official',
    whatsapp: '6281234567890'
  },
  statistik: {
    totalSantri: 0,
    santriPutra: 0,
    santriPutri: 0,
    santriWisudaTahunIni: 0,
    ustadzPengajar: 12,
    kelasBelajar: 6
  },
  kepalaTpa: 'Ustadz H. Ahmad Dahlan, S.Pd.I',
  ketuaKurikulum: 'Ustadzah Hj. Maryam Sholiha, M.Pd'
};

export interface BabMateri {
  id: string;
  nomor: number;
  tagCategory: string;
  judulBesar: string;
  subJudul: string;
  gambar: string;
  altGambar: string;
  badgeLabel: string;
  rujukanKitab: string;
  deskripsiSingkat: string;
  targetSantri: string;
}

export const DAFTAR_BAB_MATERI: BabMateri[] = [
  {
    id: 'dinul-islam',
    nomor: 1,
    tagCategory: 'BAB 01 · DINUL ISLAM',
    judulBesar: 'Pendidikan Dinul Islam & Akhlaq',
    subJudul: 'Akhlaq Teman, Rukun Iman & Islam, Sirah Nabi, 25 Nabi, & Al-Qur\'an',
    gambar: '/images/materi_dinul_islam_1790649515445.jpg',
    altGambar: 'Belajar Pendidikan Dinul Islam dan Akhlaq Santri TPA Al-Ikhlas',
    badgeLabel: 'Modul 1 (7 Topik Lengkap)',
    rujukanKitab: 'Kitab Mabadi’ul Fiqhiyyah & Taisirul Khalaq',
    deskripsiSingkat: 'Kajian lengkap 7 topik: Akhlaq Sesama Teman, Rukun Iman & Islam, Riwayat Nabi Muhammad SAW, 25 Nabi & Rasul Ulul Azmi, Akhlaq Terpuji & Tercela, Asmaul Husna & Hukum Islam, serta Memahami Al-Qur\'an.',
    targetSantri: 'Semua Santri TPA Al-Ikhlas',
  },
  {
    id: 'aqidah',
    nomor: 2,
    tagCategory: 'BAB 02 · PENDIDIKAN AQIDAH',
    judulBesar: '20 Sifat Wajib bagi Allah',
    subJudul: 'Mengenal Keesaan, Sifat Mustahil & 25 Nabi Rasul',
    gambar: '/images/materi_aqidah_tauhid_1790649527029.jpg',
    altGambar: 'Pendidikan Aqidah dan Sifat Wajib Allah',
    badgeLabel: 'Modul 2',
    rujukanKitab: 'Kitab Nadham Aqidatul Awwam',
    deskripsiSingkat: 'Menanamkan tauhid sedari dini dengan menghafal 20 sifat wajib Allah dan silsilah 25 Nabi utusan Allah.',
    targetSantri: 'Tingkat Iqro 2 - 4 / Santri SD',
  },
  {
    id: 'sholat',
    nomor: 3,
    tagCategory: 'BAB 03 · PRAKTIK SHOLAT',
    judulBesar: 'Panduan Sholat Sempurna',
    subJudul: 'Tata Cara Wudhu, Niat, Gerakan & Thuma’ninah Sholat',
    gambar: '/images/sholat_guide_overview_1790576871175.jpg',
    altGambar: 'Panduan Praktik Wudhu dan Sholat Santri',
    badgeLabel: 'Modul 3',
    rujukanKitab: 'Kitab Safinatun Najah & Fasholatan',
    deskripsiSingkat: 'Praktik wudhu yang sah, rukun sholat 5 waktu, bacaan iftitah, ruku, i’tidal, sujud hingga salam.',
    targetSantri: 'Semua Jenjang Santri TPA',
  },
  {
    id: 'tajwid',
    nomor: 4,
    tagCategory: 'BAB 04 · ILMU TAJWID',
    judulBesar: 'Belajar Tajwid Berwarna',
    subJudul: 'Hukum Nun Mati, Tanwin, Mim Sukun, Mad & Qalqalah',
    gambar: '/images/materi_tajwid_quran_1790649540504.jpg',
    altGambar: 'Belajar Tajwid Al-Quran Ceria TPA',
    badgeLabel: 'Modul 4',
    rujukanKitab: 'Kitab Tuhfatul Athfal & Hidayatush Shibyan',
    deskripsiSingkat: 'Panduan membaca tartil dengan hukum ikhfa, idgham, iqlab, izhar, mad thabi’i dan makhraj huruf.',
    targetSantri: 'Tingkat Iqro 4 - 6 & Al-Qur’an',
  },
  {
    id: 'juz-30',
    nomor: 5,
    tagCategory: 'BAB 05 · TAHFIDZ JUZ 30',
    judulBesar: 'Hafalan Surat Pendek Ceria',
    subJudul: 'Murottal, Teks Mushaf & Talaqqi Surat An-Nas s/d Ad-Dhuha',
    gambar: '/images/materi_tahfidz_juz30_1790649554020.jpg',
    altGambar: 'Hafalan Surat Pendek Juz Amma TPA',
    badgeLabel: 'Modul 5',
    rujukanKitab: 'Metode Tilawati & Talaqqi Masyaikh',
    deskripsiSingkat: 'Bimbingan setor hafalan juz 30 disertai terjemahan ringkas dan tips mudah menghafal ayat.',
    targetSantri: 'Kelas Tahfidz Cilik TPA',
  },
  {
    id: 'adab-doa',
    nomor: 6,
    tagCategory: 'BAB 06 · ADAB & DOA HARIAN',
    judulBesar: 'Buku Hafalan Doa & Adab Harian Santri',
    subJudul: 'Wudhu, Adzan, Shalat, Adab Belajar, Doa Harian A-Q, Tahlil, Rotib & Asmaul Husna',
    gambar: '/images/materi_adab_santri_1790649569148.jpg',
    altGambar: 'Buku Materi Hafalan TPQ Adab dan Doa Harian Santri Cilik',
    badgeLabel: 'Buku Hafalan TPQ (10 Bab Lengkap)',
    rujukanKitab: 'Buku Hafalan TPQ Team Asâtidz Wal Asâtidzah',
    deskripsiSingkat: 'Buku materi hafalan lengkap 10 bab: Bacaan Wudhu & Adzan, Niat Shalat 5 Waktu, Bacaan Shalat Lengkap, Doa & 17 Adab Belajar, Doa & Adab Harian A-Q, 22 Surat Pendek, Ayat Pilihan, Tahlil, Rotibul Haddad, dan 99 Asmaul Husna.',
    targetSantri: 'Semua Santri TPA & TPQ Al-Ikhlas',
  },
];

