// Data Lanjutan Buku Materi Hafalan TPQ:
// IV. Doa & Adab Belajar, V. Doa & Adab Harian (A-Q), VI-X Surat, Tahlil, Rotib & Asmaul Husna
import { DoaItem } from './materi-hafalan-tpq-data';

// IV. DOA DAN ADAB BELAJAR
export const ADAB_BERDOA_LIST = [
  'Dalam keadaan suci (berwudhu) dari hadats kecil dan besar.',
  'Menghadap kiblat dengan tenang dan khusyuk.',
  'Mengangkat kedua telapak tangan setinggi dada dan menengadahkannya.',
  'Memulai dengan memuji Allah (Alhamdulillah) dan bershalawat kepada Nabi Muhammad SAW.',
  'Berdoa dengan suara lembut, tawadhu’ (rendah hati), dan penuh harap (raja’).',
  'Yakin dalam hati bahwa Allah pasti mengabulkan doa seorang hamba yang beriman.',
  'Tidak tergesa-gesa dalam berdoa dan mengusap wajah dengan kedua telapak tangan saat mengakhiri doa.'
];

export const DOA_ADAB_BELAJAR: DoaItem[] = [
  {
    id: 'belajar-mulai',
    nomor: '1',
    judul: 'Do’a Memulai Belajar',
    arab: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا، وَاجْعَلْنِي مِنَ الصَّالِحِينَ. رَضِيْتُ بِاللهِ رَبًّا وَبِالإِسْلَامِ دِيْنًا وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولاً',
    latin: "Rabbi zidni 'ilman warzuqni fahman, waj'alni minash-shalihin. Radhitu billahi rabba, wa bil islami dina, wa bi Muhammadin nabiyyaw wa rasula.",
    arti: 'Ya Allah, tambahkanlah aku ilmu dan anugerahilah aku pemahaman yang baik, serta jadikanlah aku termasuk golongan orang-orang yang sholeh. Aku rela Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai Nabi dan Rasul utusan-Nya.',
    adabList: [
      'Niat lillahi ta’ala semata-mata menghilangkan kebodohan diri.',
      'Sudah dalam keadaan berwudhu dan suci saat berangkat mengaji.',
      'Mengenakan busana muslim/muslimah rapi, bersih, dan harum.',
      'Duduk tenang, bersila sopan, tidak bergurau di halaqah.',
      'Mengucapkan salam dengan ramah dan mencium tangan Ustadz/Ustadzah.',
      'Meletakkan Al-Qur’an/Iqro di atas rekal/meja yang tinggi dan bersih.'
    ],
    tipsSantri: 'Awali setiap pelajaran dengan doa ini agar ilmu melekat kuat di hati dan mudah dipahami.',
    kategori: 'Doa & Adab Belajar'
  },
  {
    id: 'belajar-akhir',
    nomor: '2',
    judul: 'Do’a Mengakhiri Belajar & Kafaratul Majelis',
    arab: 'اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ، وَأَرِنَا الْبَاطِلَ بَاطِلاً وَارْزُقْنَا اجْتِنَابَهُ.\nسُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    latin: "Allahumma arinal haqqa haqqaw warzuqnat tiba'ah, wa arinal bathila bathilaw warzuqnaj tinabah. Subhanakallahumma wa bihamdika asyhadu alla ilaha illa anta astaghfiruka wa atubu ilaik.",
    arti: 'Ya Allah, tunjukkanlah kepada kami kebenaran sebagai kebenaran dan anugerahkan kami kekuatan untuk mengikutinya, dan tunjukkanlah kepada kami kebatilan sebagai kebatilan dan anugerahkan kami kekuatan untuk menjauhinya. Maha Suci Engkau Ya Allah, dan dengan memuji-Mu aku bersaksi bahwa tiada Tuhan selain Engkau, aku memohon ampun dan bertaubat kepada-Mu.',
    adabList: [
      'Menutup kitab/Iqro dengan rapi dan tidak melipat halaman.',
      'Mengucapkan Alhamdulillah bersama teman-teman sekelas.',
      'Mengucapkan jazakumullah khairan kepada guru pengajar.',
      'Berpamitan santun dan bersalaman sebelum keluar kelas.',
      'Keluar ruangan secara tertib mendahulukan yang di depan.'
    ],
    tipsSantri: 'Doa kafaratul majelis menghapus kekhilafan kata atau canda yang tidak sengaja terjadi selama halaqah.',
    kategori: 'Doa & Adab Belajar'
  }
];

// V. DOA DAN ADAB HARIAN (A - Q)
export const DOA_ADAB_HARIAN: DoaItem[] = [
  {
    id: 'harian-a-tidur',
    nomor: 'A',
    judul: 'Do’a & Adab Akan Tidur',
    arab: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَبِاسْمِكَ أَمُوتُ',
    latin: "Bismikallahumma ahya wa bismika amut.",
    arti: 'Dengan nama-Mu ya Allah aku hidup, dan dengan nama-Mu aku mati.',
    adabList: [
      'Berwudhu sebelum tidur malam.',
      'Mengibaskan sprei/kasur 3 kali sebelum berbaring.',
      'Tidur miring ke arah kanan menghadap kiblat.',
      'Meletakkan telapak tangan kanan di bawah pipi kanan.',
      'Membaca Ayat Kursi dan 3 Surat Qul (Al-Ikhlas, Al-Falaq, An-Nas).'
    ],
    tipsSantri: 'Tidur cepat di awal malam agar mudah bangun untuk sholat Shubuh berjamaah.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-b-bangun',
    nomor: 'B',
    judul: 'Do’a & Adab Bangun Tidur',
    arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    latin: "Alhamdulillahilladzi ahyana ba'da ma amatana wa ilaihin nusyur.",
    arti: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami (tidur), dan hanya kepada-Nya kami dibangkitkan.',
    adabList: [
      'Mengusap bekas kantuk dari wajah dengan kedua telapak tangan.',
      'Membaca doa syukur bangun tidur.',
      'Mencuci kedua tangan sebelum menyentuh wadah air.',
      'Membersihkan tempat tidur dan merapikan selimut sendiri.'
    ],
    tipsSantri: 'Segera bangun begitu azan Shubuh terdengar dan tidak menunda-nunda waktu shalat.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-c-sebelum-makan',
    nomor: 'C',
    judul: 'Do’a & Adab Sebelum Makan',
    arab: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ، بِسْمِ اللهِ',
    latin: "Allahumma barik lana fima razaqtana wa qina 'adzaban nar, bismillah.",
    arti: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka. Dengan nama Allah.',
    adabList: [
      'Mencuci kedua tangan hingga bersih dengan sabun.',
      'Duduk tenang, tegak, dan tidak bersandar.',
      'Menggunakan tangan kanan yang bersih.',
      'Mengambil makanan yang paling dekat dari jangkauan.',
      'Tidak mencela makanan; jika suka dimakan, jika tidak ditinggalkan dengan sopan.'
    ],
    tipsSantri: 'Jika lupa membaca doa di awal, segera ucapkan: "Bismillahi awwalahu wa akhirahu".',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-d-setelah-makan',
    nomor: 'D',
    judul: 'Do’a & Adab Setelah Makan',
    arab: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    latin: "Alhamdulillahilladzi ath'amana wa saqana wa ja'alana muslimin.",
    arti: 'Segala puji bagi Allah yang telah memberi kami makan dan minum, serta telah menjadikan kami orang-orang muslim.',
    adabList: [
      'Menghabiskan makanan di piring tanpa menyisakan butiran nasi.',
      'Menjilat jari jemari atau mengelapnya sebelum dicuci.',
      'Membaca doa syukur setelah makan.',
      'Membawa piring dan gelas kotor ke tempat cucian.',
      'Mencuci kedua tangan dan berkumur.'
    ],
    tipsSantri: 'Makan tidak berlebih-lebihan; sepertiga untuk makanan, sepertiga air, dan sepertiga nafas.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-e-orangtua',
    nomor: 'E',
    judul: 'Do’a & Adab Untuk Kedua Orangtua',
    arab: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: "Rabbighfirli wa liwalidayya warhamhuma kama rabbayani shaghira.",
    arti: 'Wahai Tuhanku, ampunilah dosaku dan dosa kedua orang tuaku, dan sayangilah mereka berdua sebagaimana mereka telah mendidik dan menyayangiku di waktu kecil.',
    adabList: [
      'Menaati perintah ayah dan ibu dalam hal kebaikan.',
      'Berbicara lemah lembut, tidak membentak, dan tidak berkata "ah/cih".',
      'Mencium tangan ayah dan ibu saat berangkat dan pulang.',
      'Membantu pekerjaan rumah tangga dengan ceria.',
      'Senantiasa mendoakan kedua orang tua setiap selesai shalat fardhu.'
    ],
    tipsSantri: 'Ridho Allah terletak pada ridho kedua orang tua, dan murka Allah ada pada murka kedua orang tua.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-f-masuk-wc',
    nomor: 'F',
    judul: 'Do’a & Adab Masuk Kamar Kecil (Toilet/WC)',
    arab: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    latin: "Allahumma inni a'udzubika minal khubutsi wal khaba'its.",
    arti: 'Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan syaitan laki-laki dan syaitan perempuan.',
    adabList: [
      'Masuk mendahulukan kaki kiri.',
      'Memakai sandal atau alas kaki.',
      'Menutup kepala (disunnahkan).',
      'Tidak membawa mushaf atau benda bertuliskan asma Allah.',
      'Tidak berbicara, menyanyi, atau berlama-lama di dalam toilet.'
    ],
    tipsSantri: 'Syaitan menyukai tempat kotor, maka bentengi diri dengan membaca doa sebelum melangkah masuk.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-g-keluar-wc',
    nomor: 'G',
    judul: 'Do’a & Adab Keluar Kamar Kecil',
    arab: 'غُفْرَانَكَ ، الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَى وَعَافَانِي',
    latin: "Ghufranaka, Alhamdulillahilladzi adzhaba 'annil adza wa 'afani.",
    arti: 'Aku memohon ampunan-Mu. Segala puji bagi Allah yang telah menghilangkan kotoran/penyakit dariku dan menyehatkan diriku.',
    adabList: [
      'Keluar mendahulukan kaki kanan.',
      'Menyiram kloset hingga bersih sempurna.',
      'Beristinja dengan air mengalir menggunakan tangan kiri.',
      'Mencuci tangan dengan air dan sabun hingga wangi.'
    ],
    tipsSantri: 'Islam mengajarkan kebersihan lahir dan batin, kebersihan sebagian dari iman.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-h-masuk-masjid',
    nomor: 'H',
    judul: 'Do’a & Adab Masuk Masjid',
    arab: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: "Allahummaftah li abwaba rahmatik.",
    arti: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    adabList: [
      'Masuk mendahulukan kaki kanan.',
      'Membaca shalawat kepada Rasulullah SAW.',
      'Berniat i’tikaf di dalam masjid.',
      'Mendirikan shalat sunnah Tahiyyatul Masjid 2 rakaat sebelum duduk.',
      'Menjaga ketenangan, tidak berlari-larian atau membuat gaduh di masjid.'
    ],
    tipsSantri: 'Masjid adalah rumah Allah di muka bumi, tempat paling mulia dan dicintai Allah.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-i-keluar-masjid',
    nomor: 'I',
    judul: 'Do’a & Adab Keluar Masjid',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: "Allahumma inni as'aluka min fadhlik.",
    arti: 'Ya Allah, sesungguhnya aku memohon kepada-Mu bagian dari karunia-Mu.',
    adabList: [
      'Keluar mendahulukan kaki kiri.',
      'Berjalan tenang tidak berdesak-desakan di pintu.',
      'Memakai sandal/sepatu dimulai dari kaki sebelah kanan.',
      'Menjaga adab kesopanan di halaman masjid.'
    ],
    tipsSantri: 'Bawalah suasana hati yang suci dari dalam masjid ke kehidupan sehari-hari di rumah dan sekolah.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-j-bercermin',
    nomor: 'J',
    judul: 'Do’a & Adab Bercermin',
    arab: 'اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
    latin: "Allahumma kama hassanta khalqi fahassin khuluqi.",
    arti: 'Ya Allah, sebagaimana Engkau telah membaguskan rupa penciptaanku, maka baguskanlah pula akhlaq budi pekertiku.',
    adabList: [
      'Bersyukur atas anugerah fisik yang sempurna ciptaan Allah.',
      'Menyisir rambut dengan rapi dan merawat kebersihan wajah.',
      'Tidak berlaku sombong (ujub) atau merendahkan paras orang lain.',
      'Tidak berlama-lama bersolek secara berlebihan.'
    ],
    tipsSantri: 'Kecantikan akhlak dan hati jauh lebih mulia di sisi Allah daripada sekadar paras fisik semata.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-k-masuk-rumah',
    nomor: 'K',
    judul: 'Do’a & Adab Masuk Rumah',
    arab: 'بِسْمِ اللهِ وَلَجْنَا وَبِسْمِ اللهِ خَرَجْنَا وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا',
    latin: "Bismillahi walajna wa bismillahi kharajna wa 'alallahi rabbina tawakkalna.",
    arti: 'Dengan nama Allah kami masuk, dengan nama Allah kami keluar, dan hanya kepada Allah Tuhan kami, kami berserah diri.',
    adabList: [
      'Mengetuk pintu rumah dengan ketukan yang wajar dan sopan.',
      'Mengucapkan salam: "Assalamu’alaikum warahmatullahi wabarakatuh".',
      'Melepas alas kaki dan menaruhnya rapi di rak sepatu.',
      'Menyapa dan menyalami anggota keluarga di rumah.'
    ],
    tipsSantri: 'Mengucapkan salam saat masuk rumah membuat syaitan lari dan tidak bisa ikut bermalam di rumah kita.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-l-keluar-rumah',
    nomor: 'L',
    judul: 'Do’a & Adab Keluar Rumah',
    arab: 'بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
    latin: "Bismillahi tawakkaltu 'alallah, la haula wa la quwwata illa billah.",
    arti: 'Dengan nama Allah, aku berserah diri kepada Allah. Tiada daya dan kekuatan melainkan dengan pertolongan Allah.',
    adabList: [
      'Berpamitan dan meminta izin serta doa restu orang tua.',
      'Mencium tangan kedua orang tua sebelum melangkah.',
      'Memastikan pintu dan jendela rumah terkunci aman.',
      'Menundukkan pandangan dan menjaga tata tertib di perjalanan.'
    ],
    tipsSantri: 'Malaikat akan mendampingi dan melindungi anak sholeh yang membaca doa ini di setiap perjalanannya.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-m-pakai-baju',
    nomor: 'M',
    judul: 'Do’a & Adab Memakai Pakaian',
    arab: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    latin: "Alhamdulillahilladzi kasani hadza (ats-tsauba) wa razaqanihi min ghairi hawlim minni wa la quwwah.",
    arti: 'Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan mengaruniakannya tanpa daya dan kekuatan dariku.',
    adabList: [
      'Memulai memakai dari bagian anggota tubuh sebelah kanan.',
      'Pakaian menutup aurat secara sempurna dan longgar (tidak ketat).',
      'Pakaian bersih, suci dari najis, dan sopan.',
      'Tidak memakai pakaian dengan niat pamer atau kesombongan.'
    ],
    tipsSantri: 'Pakaian adalah karunia nikmat dari Allah untuk menutup aurat dan menghiasi diri penuntut ilmu.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-n-lepas-baju',
    nomor: 'N',
    judul: 'Do’a & Adab Melepas Pakaian',
    arab: 'بِسْمِ اللهِ الَّذِي لَا إِلَهَ إِلَّا هُوَ',
    latin: "Bismillahilladzi la ilaha illa huwa.",
    arti: 'Dengan nama Allah yang tiada Tuhan yang berhak disembah selain Dia.',
    adabList: [
      'Membaca bismillah agar pandangan jin dan syaitan terhijab dari aurat kita.',
      'Memulai melepas dari anggota tubuh sebelah kiri.',
      'Meletakkan atau melipat pakaian di tempat yang semestinya.',
      'Segera menutup aurat kembali dengan handuk atau kain.'
    ],
    tipsSantri: 'Kalimat basmalah adalah penutup tabir tak terlihat antara aurat manusia dengan mata jin.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-o-naik-kendaraan',
    nomor: 'O',
    judul: 'Do’a & Adab Naik Kendaraan',
    arab: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    latin: "Subhanalladzi sakh-khara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun.",
    arti: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal sebelumnya kami tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.',
    adabList: [
      'Melangkah naik dengan mendahulukan kaki kanan seraya membaca bismillah.',
      'Duduk tenang, mengenakan helm/sabuk pengaman.',
      'Tidak bergurau berlebihan yang membahayakan pengendara.',
      'Bersikap santun kepada sesama pengguna jalan.'
    ],
    tipsSantri: 'Setiap perjalanan yang diiringi doa senantiasa diliputi berkah dan keselamatan dari Allah.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-p-ketika-sakit',
    nomor: 'P',
    judul: 'Do’a & Adab Ketika Sakit',
    arab: 'بِسْمِ اللهِ (٣×)\nأَعُوذُ بِاللهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ (٧×)',
    latin: "Bismillah (3x). A'udzu billahi wa qudratihi min syarri ma ajidu wa uhadziru (7x).",
    arti: 'Dengan nama Allah (3 kali). Aku berlindung kepada Allah dan kekuasaan-Nya dari keburukan apa yang aku rasakan dan aku khawatirkan (7 kali).',
    adabList: [
      'Meletakkan tangan kanan pada bagian tubuh yang terasa sakit.',
      'Bersabar dan berbaik sangka kepada Allah bahwa sakit adalah pelebur dosa.',
      'Berikhtiar minum obat halal dan beristirahat yang cukup.',
      'Tetap menjaga sholat lima waktu sesuai kemampuan (bisa dengan duduk atau berbaring).'
    ],
    tipsSantri: 'Sakit adalah teguran kasih sayang Allah yang mengangkat derajat hamba yang sabar.',
    kategori: 'Doa Harian A-Q'
  },
  {
    id: 'harian-q-jenguk-sakit',
    nomor: 'Q',
    judul: 'Do’a & Adab Menjenguk Orang Sakit',
    arab: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ. أَسْأَلُ اللهَ الْعَظِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَشْفِيَكَ (٧×)',
    latin: "La ba'sa thahurun in sya'allah. As'alullahal 'azhima rabbal 'arsyil 'azhimi an yasyfiyaka (7x).",
    arti: 'Tidak mengapa, semoga sakitmu ini menjadi pembersih dosa insya Allah. Aku memohon kepada Allah Yang Maha Agung, Tuhan pemilik ‘Arsy yang agung, agar menyembuhkanmu (7 kali).',
    adabList: [
      'Memberikan kata-kata penghiburan dan semangat kesembuhan.',
      'Membawakan bingkisan/makanan sehat yang bermanfaat.',
      'Mendoakan dengan doa di atas sambil tersenyum tulus.',
      'Tidak berlama-lama berkunjung agar si sakit dapat istirahat tenang.'
    ],
    tipsSantri: 'Menjenguk saudara muslim yang sakit mengalirkan doa dari 70.000 malaikat yang memohonkan ampunan baginya.',
    kategori: 'Doa Harian A-Q'
  }
];

// VI. BACAAN SURAT-SURAT PENDEK TPQ
export const DAFTAR_SURAT_PENDEK_TPQ = [
  { no: 114, nama: 'An-Nas', ayat: 6, arti: 'Manusia' },
  { no: 113, nama: 'Al-Falaq', ayat: 5, arti: 'Waktu Subuh' },
  { no: 112, nama: 'Al-Ikhlas', ayat: 4, arti: 'Keesaan Allah' },
  { no: 111, nama: 'Al-Lahab', ayat: 5, arti: 'Gejolak Api' },
  { no: 110, nama: 'An-Nasr', ayat: 3, arti: 'Pertolongan' },
  { no: 109, nama: 'Al-Kafirun', ayat: 6, arti: 'Orang-Orang Kafir' },
  { no: 108, nama: 'Al-Kautsar', ayat: 3, arti: 'Nikmat yang Berlimpah' },
  { no: 107, nama: 'Al-Ma’un', ayat: 7, arti: 'Barang-Barang Berguna' },
  { no: 106, nama: 'Quraisy', ayat: 4, arti: 'Suku Quraisy' },
  { no: 105, nama: 'Al-Fil', ayat: 5, arti: 'Gajah' },
  { no: 104, nama: 'Al-Humazah', ayat: 9, arti: 'Pengumpat' },
  { no: 103, nama: 'Al-‘Ashr', ayat: 3, arti: 'Demi Masa' },
  { no: 102, nama: 'At-Takatsur', ayat: 8, arti: 'Bermegah-megahan' },
  { no: 101, nama: 'Al-Qari’ah', ayat: 11, arti: 'Hari Kiamat' },
  { no: 100, nama: 'Al-‘Adiyat', ayat: 11, arti: 'Kuda Perang yang Berlari Kencang' },
  { no: 99, nama: 'Az-Zalzalah', ayat: 8, arti: 'Guncangan Dahsyat' },
  { no: 98, nama: 'Al-Bayyinah', ayat: 8, arti: 'Bukti Nyata' },
  { no: 97, nama: 'Al-Qadr', ayat: 5, arti: 'Kemuliaan Malam Lailatul Qadr' },
  { no: 96, nama: 'Al-‘Alaq', ayat: 19, arti: 'Segumpal Darah' },
  { no: 95, nama: 'At-Tin', ayat: 8, arti: 'Buah Tin' },
  { no: 94, nama: 'Al-Insyirah', ayat: 8, arti: 'Kelapangan Dada' },
  { no: 93, nama: 'Ad-Dhuha', ayat: 11, arti: 'Waktu Dhuha' }
];

// VII. AYAT-AYAT PILIHAN
export const AYAT_PILIHAN_DATA: DoaItem[] = [
  {
    id: 'ayat-kursi',
    nomor: '1',
    judul: 'Ayat Kursi (QS. Al-Baqarah: 255)',
    arab: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    latin: "Allahu la ilaha illa huwal hayyul qayyum, la ta'khudzuhu sinatuw wa la naum, lahu ma fis-samawati wa ma fil ardh, man dzalladzi yasyfa'u 'indahu illa bi idznih, ya'lamu ma baina aidihim wa ma khalfahum, wa la yuhithuna bi syai-im min 'ilmihi illa bi ma sya', wasi'a kursiyyuhus-samawati wal ardh, wa la ya'uduhu hifzhuhuma, wa huwal 'aliyyul 'azhim.",
    arti: 'Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur. Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tiada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya...',
    tipsSantri: 'Ayat paling agung dalam Al-Qur’an. Siapa membacanya setiap selesai shalat fardhu, tiada yang menghalanginya masuk surga kecuali kematian.',
    kategori: 'Ayat Pilihan'
  },
  {
    id: 'akhir-baqarah',
    nomor: '2',
    judul: 'Akhir Surat Al-Baqarah (Ayat 285-286)',
    arab: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    latin: "Amanar-rasulu bima unzila ilaihi mir-rabbihi wal mu'minun...",
    arti: 'Rasul (Muhammad) telah beriman kepada apa yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang yang beriman. Semuanya beriman kepada Allah, malaikat-malaikat-Nya, kitab-kitab-Nya, dan rasul-rasul-Nya...',
    tipsSantri: 'Dua ayat di akhir surat Al-Baqarah bila dibaca di waktu malam akan mencukupi dan melindunginya dari segala marabahaya.',
    kategori: 'Ayat Pilihan'
  },
  {
    id: 'sayyidul-istighfar',
    nomor: '3',
    judul: 'Sayyidul Istighfar (Raja Istighfar)',
    arab: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    latin: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastatha'tu, a'udzubika min syarri ma shana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidzanbi faghfirli fa innahu la yaghfirudz-dzunuba illa anta.",
    arti: 'Ya Allah, Engkaulah Tuhanku, tiada Tuhan selain Engkau. Engkaulah yang menciptakanku dan aku adalah hamba-Mu. Aku senantiasa setia pada janji-Mu semampuku. Aku berlindung kepada-Mu dari keburukan perbuatanku...',
    tipsSantri: 'Doa istighfar terbaik! Barangsiapa membacanya di waktu pagi atau petang dengan penuh keyakinan lalu meninggal, ia termasuk ahli surga.',
    kategori: 'Ayat Pilihan'
  }
];

// VIII. BACAAN TAHLIL SANTRI
export const TAHLIL_SECTIONS = [
  {
    judul: '1. Tawassul & Al-Fatihah',
    arab: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَآلِهِ وَصَحْبِهِ أَجْمَعِينَ، شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةُ...',
    latin: "Ila hadhratin nabiyyil musthafa Muhammadin shallallahu 'alaihi wa sallam wa alihi wa shahbihi ajma'in, syai-un lillahi lahumul Fatihah.",
    ket: 'Membaca surat Al-Fatihah untuk Rasulullah SAW, para sahabat, tabi’in, alim ulama, serta orang tua dan leluhur muslimin.'
  },
  {
    judul: '2. Membaca Tiga Surat Suci & Tahlil',
    arab: 'قُلْ هُوَ اللَّهُ أَحَدٌ (٣×) - لَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (١×) - لَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ (١×) - لَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
    latin: 'Surat Al-Ikhlas (3x), Tahlil & Takbir, Surat Al-Falaq (1x), Tahlil & Takbir, Surat An-Nas (1x), Tahlil & Takbir.',
    ket: 'Membaca Al-Ikhlas tiga kali setara dengan pahala membaca khatam Al-Qur’an.'
  },
  {
    judul: '3. Kalimah Thayyibah & Dzikir Puncak',
    arab: 'أَفْضَلُ الذِّكْرِ فَاعْلَمْ أَنَّهُ: لَا إِلَهَ إِلَّا اللهُ (٣٣× atau ١٠٠×)\nلَا إِلَهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ',
    latin: "Afdhaludz-dzikri fa'lam annahu: La ilaha illallah (33x / 100x). La ilaha illallahu Muhammadur rasulullah shallallahu 'alaihi wa sallam.",
    ket: 'Dzikir utama yang mengokohkan iman di hati dan menjernihkan jiwa anak sholeh.'
  }
];

// IX. BACAAN ROTIBUL HADDAD
export const ROTIB_HADDAD_HIGHLIGHTS = [
  {
    bacaan: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (٣×)',
    latin: "La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu yuhyi wa yumitu wa huwa 'ala kulli syai-in qadir (3x)",
    arti: 'Tiada Tuhan selain Allah Yang Maha Esa, tiada sekutu bagi-Nya. Bagi-Nya segala kerajaan dan bagi-Nya segala pujian, Dia yang menghidupkan dan mematikan, dan Dia Maha Kuasa atas segala sesuatu.'
  },
  {
    bacaan: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ (٣×)',
    latin: 'Subhanallah walhamdulillah wa la ilaha illallahu wallahu akbar (3x)',
    arti: 'Maha Suci Allah, segala puji bagi Allah, tiada Tuhan selain Allah, dan Allah Maha Besar.'
  },
  {
    bacaan: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيمِ (٣×)',
    latin: "Subhanallahi wa bihamdihi subhanallahil 'azhim (3x)",
    arti: 'Maha Suci Allah dan dengan memuji-Nya, Maha Suci Allah Yang Maha Agung.'
  },
  {
    bacaan: 'رَبَّنَا اغْفِرْ لَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ (٣×)',
    latin: "Rabbanaghfir lana wa tub 'alaina innaka antat-tawwabur-rahim (3x)",
    arti: 'Wahai Tuhan kami ampunilah kami dan terimalah taubat kami, sesungguhnya Engkau Maha Penerima Taubat lagi Maha Penyayang.'
  },
  {
    bacaan: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ (٣×)',
    latin: "Bismillahilladzi la yadhurru ma'asmihi syai-un fil ardhi wa la fis-sama-i wa huwas-sami'ul 'alim (3x)",
    arti: 'Dengan nama Allah yang bersama nama-Nya tidak ada sesuatu pun yang dapat membahayakan di bumi maupun di langit, dan Dialah Yang Maha Mendengar lagi Maha Mengetahui.'
  }
];

// X. BACAAN ASMA'UL HUSNA (Highlight 99 Nama Allah)
export const ASMAUL_HUSNA_ITEMS = [
  { no: 1, arab: 'الرَّحْمَنُ', latin: 'Ar-Rahman', arti: 'Yang Maha Pengasih' },
  { no: 2, arab: 'الرَّحِيمُ', latin: 'Ar-Rahim', arti: 'Yang Maha Penyayang' },
  { no: 3, arab: 'الْمَلِكُ', latin: 'Al-Malik', arti: 'Yang Maha Merajai' },
  { no: 4, arab: 'الْقُدُّوسُ', latin: 'Al-Quddus', arti: 'Yang Maha Suci' },
  { no: 5, arab: 'السَّلَامُ', latin: 'As-Salam', arti: 'Yang Maha Memberi Kesejahteraan' },
  { no: 6, arab: 'الْمُؤْمِنُ', latin: 'Al-Mu’min', arti: 'Yang Maha Memberi Keamanan' },
  { no: 7, arab: 'الْمُهَيْمِنُ', latin: 'Al-Muhaymin', arti: 'Yang Maha Pemelihara' },
  { no: 8, arab: 'الْعَزِيزُ', latin: 'Al-‘Aziz', arti: 'Yang Maha Gagah Perkasa' },
  { no: 9, arab: 'الْجَبَّارُ', latin: 'Al-Jabbar', arti: 'Yang Maha Memaksa / Berkehendak' },
  { no: 10, arab: 'الْمُتَكَبِّرُ', latin: 'Al-Mutakabbir', arti: 'Yang Maha Memiliki Kebesaran' },
  { no: 11, arab: 'الْخَالِقُ', latin: 'Al-Khaliq', arti: 'Yang Maha Pencipta' },
  { no: 12, arab: 'الْبَارِئُ', latin: 'Al-Bari’', arti: 'Yang Maha Melepaskan / Merancang' },
  { no: 13, arab: 'الْمُصَوِّرُ', latin: 'Al-Mushawwir', arti: 'Yang Maha Membentuk Rupa' },
  { no: 14, arab: 'الْغَفَّارُ', latin: 'Al-Ghaffar', arti: 'Yang Maha Pengampun' },
  { no: 15, arab: 'الْقَهَّارُ', latin: 'Al-Qahhar', arti: 'Yang Maha Menundukkan' },
  { no: 16, arab: 'الْوَهَّابُ', latin: 'Al-Wahhab', arti: 'Yang Maha Pemberi Karunia' },
  { no: 17, arab: 'الرَّزَّاقُ', latin: 'Ar-Razzaq', arti: 'Yang Maha Pemberi Rezeki' },
  { no: 18, arab: 'الْفَتَّاحُ', latin: 'Al-Fattah', arti: 'Yang Maha Pembuka Rahmat' },
  { no: 19, arab: 'الْعَلِيمُ', latin: 'Al-‘Alim', arti: 'Yang Maha Mengetahui' },
  { no: 20, arab: 'الْقَابِضُ', latin: 'Al-Qabidh', arti: 'Yang Maha Menyempitkan' },
  { no: 21, arab: 'الْبَاسِطُ', latin: 'Al-Basith', arti: 'Yang Maha Melapangkan' },
  { no: 22, arab: 'الْخَافِضُ', latin: 'Al-Khafidh', arti: 'Yang Maha Merendahkan' },
  { no: 23, arab: 'الرَّافِعُ', latin: 'Ar-Rafi’', arti: 'Yang Maha Meninggikan' },
  { no: 24, arab: 'الْمُعِزُّ', latin: 'Al-Mu’izz', arti: 'Yang Maha Memuliakan' },
  { no: 25, arab: 'الْمُذِلُّ', latin: 'Al-Mudzill', arti: 'Yang Maha Menghinakan' },
  { no: 26, arab: 'السَّمِيعُ', latin: 'As-Sami’', arti: 'Yang Maha Mendengar' },
  { no: 27, arab: 'الْبَصِيرُ', latin: 'Al-Bashir', arti: 'Yang Maha Melihat' },
  { no: 28, arab: 'الْحَكَمُ', latin: 'Al-Hakam', arti: 'Yang Maha Menetapkan Hukum' },
  { no: 29, arab: 'الْعَدْلُ', latin: 'Al-‘Adl', arti: 'Yang Maha Adil' },
  { no: 30, arab: 'اللَّطِيفُ', latin: 'Al-Lathif', arti: 'Yang Maha Lembut' },
  { no: 31, arab: 'الْخَبِيرُ', latin: 'Al-Khabir', arti: 'Yang Maha Mengetahui Rahasia' },
  { no: 32, arab: 'الْحَلِيمُ', latin: 'Al-Halim', arti: 'Yang Maha Penyantun' },
  { no: 33, arab: 'الْعَظِيمُ', latin: 'Al-‘Azhim', arti: 'Yang Maha Agung' },
  { no: 34, arab: 'الْغَفُورُ', latin: 'Al-Ghafur', arti: 'Yang Maha Memberi Ampunan' },
  { no: 35, arab: 'الشَّكُورُ', latin: 'Asy-Syakur', arti: 'Yang Maha Menghargai' },
  { no: 36, arab: 'الْعَلِيُّ', latin: 'Al-‘Aliyy', arti: 'Yang Maha Tinggi' },
  { no: 37, arab: 'الْكَبِيرُ', latin: 'Al-Kabir', arti: 'Yang Maha Besar' },
  { no: 38, arab: 'الْحَفِيظُ', latin: 'Al-Hafizh', arti: 'Yang Maha Menjaga' },
  { no: 39, arab: 'الْمُقِيتُ', latin: 'Al-Muqit', arti: 'Yang Maha Memberi Kekuatan' },
  { no: 40, arab: 'الْحَسِيبُ', latin: 'Al-Hasib', arti: 'Yang Maha Menghitung' },
  { no: 41, arab: 'الْجَلِيلُ', latin: 'Al-Jalil', arti: 'Yang Maha Luhur' },
  { no: 42, arab: 'الْكَرِيمُ', latin: 'Al-Karim', arti: 'Yang Maha Mulia' },
  { no: 43, arab: 'الرَّقِيبُ', latin: 'Ar-Raqib', arti: 'Yang Maha Mengawasi' },
  { no: 44, arab: 'الْمُجِيبُ', latin: 'Al-Mujib', arti: 'Yang Maha Mengabulkan Doa' },
  { no: 45, arab: 'الْوَاسِعُ', latin: 'Al-Wasi’', arti: 'Yang Maha Luas Rahmat-Nya' }
];
