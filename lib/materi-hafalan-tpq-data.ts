// Data Lengkap Buku Materi Hafalan TPQ Team Asatidz Wal Asatidzah
// Khusus Bab 06: Adab & Doa Harian Santri TPA Al-Ikhlas

export interface DoaItem {
  id: string;
  nomor: string;
  judul: string;
  subjudul?: string;
  arab: string;
  latin: string;
  arti: string;
  keterangan?: string;
  adabList?: string[];
  tipsSantri?: string;
  kategori: string;
}

// I. BACAAN WUDHU, ADZAN DAN SHALAT
export const BACAAN_WUDHU_ADZAN: DoaItem[] = [
  {
    id: 'wudhu-sebelum',
    nomor: 'a',
    judul: 'Doa Sebelum Wudhu',
    arab: 'بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ - رَبِّ أَعُوْذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَعُوْذُ بِكَ رَبِّ أَنْ يَحْضُرُوْنِ',
    latin: "Bismillahir-rahmanir-rahim - Rabbi a'udzubika min hamazatisy-syayathini wa a'udzubika rabbi an yahdhurun.",
    arti: 'Ya Tuhanku, aku berlindung kepada Engkau dari bisikan-bisikan syaitan. Dan aku berlindung (pula) kepada Engkau Ya Tuhanku, dari kedatangan mereka kepadaku.',
    tipsSantri: 'Awali wudhu dengan membaca basmalah dan doa ini agar wudhu terhindar dari godaan syaitan pengganggu sholat.',
    kategori: 'Wudhu & Adzan'
  },
  {
    id: 'wudhu-cuci-tangan',
    nomor: 'b',
    judul: 'Doa Mencuci Tangan Ketika Wudhu',
    arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْيُمْنَ وَالْبَرَكَةَ وَأَعُوْذُ بِكَ مِنَ النَّؤْمِ وَالْهَلَكَةِ',
    latin: "Allahumma inni as'alukal yumna wal barakata wa a'udzubika minan-nau'mi wal halakah.",
    arti: 'Ya Allah, aku memohon kepada-Mu keberuntungan dan keberkahan, dan aku berlindung kepada-Mu dari keburukan dan kerusakan.',
    tipsSantri: 'Cuci kedua telapak tangan hingga pergelangan dan sela-sela jari tangan sebanyak 3 kali.',
    kategori: 'Wudhu & Adzan'
  },
  {
    id: 'wudhu-niat',
    nomor: 'c',
    judul: 'Niat Berwudhu',
    arab: 'نَوَيْتُ الوُضُوءَ لِرَفْعِ الْحَدَثِ الْأَصْغَرِ فَرْضًا لِلَّهِ تَعَالَى',
    latin: "Nawaitul wudhu'a liraf'il hadatsil ashghari fardhal lillahi ta'ala.",
    arti: "Aku niat untuk berwudhu mengangkat (menghilangkan) hadats kecil fardhu karena Allah Ta'ala.",
    tipsSantri: 'Niat diucapkan dalam hati berbarengan saat membasuh muka pertama kali.',
    kategori: 'Wudhu & Adzan'
  },
  {
    id: 'wudhu-sesudah',
    nomor: 'd',
    judul: "Do'a Sesudah Wudhu",
    arab: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ وَاجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ. سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    latin: "Asyhadu alla ilaha illallahu wahdahu la syarika lah, wa asyhadu anna sayyidana Muhammadan 'abduhu wa rasuluh. Allahummaj'alni minat-tawwabina waj'alni minal mutathahhirina waj'alni min 'ibadikas-shalihin. Subhanakallahumma wa bihamdika asyhadu alla ilaha illa anta astaghfiruka wa atubu ilaik.",
    arti: 'Aku bersaksi bahwasanya tiada tuhan selain Allah Yang Satu, tiada sekutu bagi-Nya. Dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya. Ya Allah, jadikanlah aku bagian dari orang-orang yang bertaubat, bersuci, dan hamba-hamba-Mu yang sholeh.',
    tipsSantri: 'Membaca doa ini sambil berdiri menghadap kiblat dan menengadahkan kedua telapak tangan ke langit.',
    kategori: 'Wudhu & Adzan'
  },
  {
    id: 'adzan-lafadz',
    nomor: 'e',
    judul: 'Lafadz (Bacaan) Adzan & Menjawab Adzan',
    arab: 'اللهُ أَكْبَرُ اللهُ أَكْبَرُ (٢×)\nأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ (٢×)\nأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ (٢×)\nحَيَّ عَلَى الصَّلَاةِ (٢×)\nحَيَّ عَلَى الْفَلَاحِ (٢×)\nاللهُ أَكْبَرُ اللهُ أَكْبَرُ (١×)\nلَا إِلَهَ إِلَّا اللهُ (١×)',
    latin: "Allahu Akbar (2x), Asyhadu alla ilaha illallah (2x), Asyhadu anna Muhammadar Rasulullah (2x), Hayya 'alash-shalah (2x), Hayya 'alal-falah (2x), Allahu Akbar (1x), La ilaha illallah (1x)",
    arti: 'Seruan panggilan agung menghadap Allah Sang Maha Pencipta saat waktu shalat telah tiba.',
    keterangan: "Jawaban: Semua lafadz ditirukan sama persis, KECUALI saat 'Hayya 'alash-shalah' dan 'Hayya 'alal-falah' dijawab: 'Lā haula wa lā quwwata illā billāhil 'aliyyil 'azhīm'. Khusus adzan Subuh ada tambahan: 'Ash-shalātu khairum minan naum' (2x), dijawab: 'Shadaqta wa bararta wa ana 'alā dzālika minasy syāhidīn'.",
    tipsSantri: 'Ketika mendengar adzan, santri diam, menghentikan bicara dan bermain, lalu menirukan suara muadzin dengan khusyuk.',
    kategori: 'Wudhu & Adzan'
  },
  {
    id: 'adzan-doa-setelah',
    nomor: 'g',
    judul: 'Doa Setelah Adzan',
    arab: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ سَيِّدَنَا مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَالشَّرَفَ وَالدَّرَجَةَ الْعَالِيَةَ الرَّفِيعَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ',
    latin: "Allahumma rabba hadzihid da'watit tammah wash-shalatil qa'imah, ati sayyidana Muhammadanil wasilata wal fadhilah wasy-syarafa wad-darajatal 'aliyatar rafi'ah, wab'atshu maqamam mahmudalladzi wa'adtah, innaka la tukhliful mi'ad.",
    arti: 'Ya Allah, Tuhan pemilik seruan yang sempurna ini dan shalat yang senantiasa didirikan, berikanlah kepada junjungan kami Nabi Muhammad washilah dan keutamaan, kemuliaan dan derajat yang tinggi, serta bangkitkanlah beliau pada kedudukan terpuji yang telah Engkau janjikan. Sesungguhnya Engkau tidak menyalahi janji.',
    tipsSantri: 'Barang siapa membaca doa ini setelah adzan, ia berhak mendapat syafaat Nabi Muhammad SAW di hari kiamat.',
    kategori: 'Wudhu & Adzan'
  },
  {
    id: 'iqomah-lafadz',
    nomor: 'h',
    judul: 'Lafadz Iqomah dan Jawabannya',
    arab: 'اللهُ أَكْبَرُ اللهُ أَكْبَرُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ، أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ، حَيَّ عَلَى الصَّلَاةِ، حَيَّ عَلَى الْفَلَاحِ، قَدْ قَامَتِ الصَّلَاةُ قَدْ قَامَتِ الصَّلَاةُ، اللهُ أَكْبَرُ اللهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللهُ',
    latin: "Allahu Akbar (2x), Asyhadu alla ilaha illallah, Asyhadu anna Muhammadar Rasulullah, Hayya 'alash shalah, Hayya 'alal falah, Qad qamatish shalah (2x), Allahu Akbar (2x), La ilaha illallah.",
    arti: 'Seruan penanda bahwa barisan shalat berjamaah segera didirikan.',
    keterangan: "Saat muadzin membaca 'Qad qāmatish shalāh', kita menjawab: 'Aqāmahāllāhu wa adāmahā wa ja'alanī min shālihī ahlihā' (Semoga Allah senantiasa mendirikan dan mengekalkannya, serta menjadikanku orang yang sholeh dalam menunaikannya).",
    tipsSantri: 'Saat iqomah dikumandangkan, langsung berdiri merapatkan dan meluruskan shaf shalat.',
    kategori: 'Wudhu & Adzan'
  }
];

// II. BACAAN NIAT SHALAT 5 WAKTU
export const BACAAN_NIAT_SHALAT: DoaItem[] = [
  {
    id: 'niat-dhuhur',
    nomor: 'A',
    judul: 'Niat Shalat Dhuhur (4 Rakaat)',
    arab: 'أُصَلِّي فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
    latin: "Ushalli fardhadh-dhuhri arba'a raka'atim mustaqbilal qiblati adaa-an (ma'muman / imaman) lillahi ta'ala.",
    arti: 'Aku niat shalat fardhu Dhuhur empat rakaat menghadap kiblat tunai (sebagai makmum / imam) karena Allah Ta’ala.',
    kategori: 'Niat Shalat'
  },
  {
    id: 'niat-ashar',
    nomor: 'B',
    judul: 'Niat Shalat Ashar (4 Rakaat)',
    arab: 'أُصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
    latin: "Ushalli fardhal 'ashri arba'a raka'atim mustaqbilal qiblati adaa-an (ma'muman / imaman) lillahi ta'ala.",
    arti: 'Aku niat shalat fardhu Ashar empat rakaat menghadap kiblat tunai (sebagai makmum / imam) karena Allah Ta’ala.',
    kategori: 'Niat Shalat'
  },
  {
    id: 'niat-maghrib',
    nomor: 'C',
    judul: 'Niat Shalat Maghrib (3 Rakaat)',
    arab: 'أُصَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
    latin: "Ushalli fardhal maghribi tsalatsa raka'atim mustaqbilal qiblati adaa-an (ma'muman / imaman) lillahi ta'ala.",
    arti: 'Aku niat shalat fardhu Maghrib tiga rakaat menghadap kiblat tunai (sebagai makmum / imam) karena Allah Ta’ala.',
    kategori: 'Niat Shalat'
  },
  {
    id: 'niat-isya',
    nomor: 'D',
    judul: "Niat Shalat Isya' (4 Rakaat)",
    arab: 'أُصَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
    latin: "Ushalli fardhal 'isyaa-i arba'a raka'atim mustaqbilal qiblati adaa-an (ma'muman / imaman) lillahi ta'ala.",
    arti: 'Aku niat shalat fardhu Isya empat rakaat menghadap kiblat tunai (sebagai makmum / imam) karena Allah Ta’ala.',
    kategori: 'Niat Shalat'
  },
  {
    id: 'niat-shubuh',
    nomor: 'E',
    judul: 'Niat Shalat Shubuh (2 Rakaat)',
    arab: 'أُصَلِّي فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً (مَأْمُومًا / إِمَامًا) لِلَّهِ تَعَالَى',
    latin: "Ushalli fardhash-shubhi rak'ataini mustaqbilal qiblati adaa-an (ma'muman / imaman) lillahi ta'ala.",
    arti: 'Aku niat shalat fardhu Shubuh dua rakaat menghadap kiblat tunai (sebagai makmum / imam) karena Allah Ta’ala.',
    kategori: 'Niat Shalat'
  }
];

// III. BACAAN DI DALAM SHALAT
export const BACAAN_DALAM_SHALAT: DoaItem[] = [
  {
    id: 'sholat-takbir',
    nomor: 'A',
    judul: 'Bacaan Takbiratul Ihram',
    arab: 'اللهُ أَكْبَرُ',
    latin: 'Allāhu Akbar.',
    arti: 'Allah Maha Besar.',
    tipsSantri: 'Mengangkat kedua telapak tangan sejajar daun telinga/pundak, jari-jari sedikit direnggangkan menghadap kiblat.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-iftitah',
    nomor: 'B',
    judul: "Bacaan Do'a Iftitah",
    arab: 'اللهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللهِ بُكْرَةً وَأَصِيلاً. إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا مُسْلِمًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ. لَا شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ',
    latin: "Allahu akbar kabira walhamdulillahi katsira wa subhanallahi bukrataw wa ashila. Inni wajjahtu wajhiya lilladzi fatharas samawati wal ardha hanifam muslimaw wa ma ana minal musyrikin. Inna shalati wa nusuki wa mahyaya wa mamati lillahi rabbil 'alamin. La syarika lahu wa bidzalika umirtu wa ana minal muslimin.",
    arti: 'Allah Maha Besar sebesar-besarnya. Segala puji bagi Allah sebanyak-banyaknya. Maha Suci Allah pada pagi dan petang. Sesungguhnya aku hadapkan wajahku kepada Dzat yang menciptakan langit dan bumi dengan lurus dan berserah diri...',
    tipsSantri: 'Dibaca pelan (sirr) setelah takbiratul ihram sebelum membaca surat Al-Fatihah pada rakaat pertama.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-fatihah',
    nomor: 'C',
    judul: 'Surat Al-Fatihah (Ummul Qur’an)',
    arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَٰنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ۝ آمِيْنَ',
    latin: "Bismillahir-rahmanir-rahim. Alhamdu lillahi rabbil 'alamin. Ar-rahmanir-rahim. Maliki yawmid-din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinash-shirathal mustaqim. Shirathalladzina an'amta 'alaihim ghairil maghdhubi 'alaihim waladh-dhallin. Aamiin.",
    arti: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah Tuhan semesta alam...',
    tipsSantri: 'Rukun shalat yang wajib dibaca di setiap rakaat. Harus tartil dan jelas makhrajnya.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-ruku',
    nomor: 'D',
    judul: "Bacaan Ruku'",
    arab: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ (٣×)',
    latin: "Subhana rabbiyal 'adhimi wa bihamdih (3x)",
    arti: 'Maha Suci Tuhanku Yang Maha Agung dan dengan memuji-Nya (dibaca 3 kali).',
    tipsSantri: 'Punggung lurus rata bagai papan, pandangan ke tempat sujud dan tangan memegang lutut.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-itidal',
    nomor: 'E',
    judul: "Bacaan I'tidal",
    arab: 'سَمِعَ اللهُ لِمَنْ حَمِدَهُ ، رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَاوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ',
    latin: "Sami'allahu liman hamidah. Rabbana lakal hamdu mil'us-samawati wa mil'ul ardhi wa mil'u ma syi'ta min syai'in ba'du.",
    arti: 'Allah mendengar orang yang memuji-Nya. Wahai Tuhan kami, bagi-Mu segala puji sepenuh langit dan bumi serta apa saja yang Engkau kehendaki sesudah itu.',
    tipsSantri: 'Berdiri tegak diam sejenak (thuma’ninah) sebelum bersiap untuk sujud.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-qunut',
    nomor: 'F',
    judul: "Bacaan Do'a Qunut Shubuh",
    arab: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ، فَلَكَ الْحَمْدُ عَلَى مَا قَضَيْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ، وَصَلَّى اللهُ عَلَى سَيِّدِنَا مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ',
    latin: "Allahummahdini fi man hadait, wa 'afini fi man 'afait, wa tawallani fi man tawallait, wa barik li fima a'thait, wa qini syarra ma qadhait, fa innaka taqdhi wa la yuqdha 'alaik, wa innahu la yadzillu maw walait, wa la ya'izzu man 'adait, tabarakta rabbana wa ta'alait, fa lakal hamdu 'ala ma qadhait, astaghfiruka wa atubu ilaik, wa shallallahu 'ala sayyidina Muhammadin nabiyyil ummiyyi wa 'ala alihi wa shahbihi wa sallam.",
    arti: 'Ya Allah, berilah aku petunjuk sebagaimana orang yang telah Engkau beri petunjuk. Berilah aku kesehatan sebagaimana orang yang telah Engkau beri kesehatan...',
    tipsSantri: 'Dibaca pada rakaat kedua shalat Shubuh saat I’tidal dengan menadahkan kedua telapak tangan ke atas dada.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-sujud',
    nomor: 'G',
    judul: 'Bacaan Sujud',
    arab: 'سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ (٣×)',
    latin: "Subhana rabbiyal a'la wa bihamdih (3x)",
    arti: 'Maha Suci Tuhanku Yang Maha Tinggi dan dengan memuji-Nya (dibaca 3 kali).',
    tipsSantri: 'Tujuh anggota badan menempel ke lantai: dahi dan hidung, kedua telapak tangan, kedua lutut, dan ujung jari jemari kedua kaki.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-duduk-dua-sujud',
    nomor: 'H',
    judul: 'Bacaan Duduk di Antara Dua Sujud',
    arab: 'رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاجْبُرْنِي وَارْفَعْنِي وَارْزُقْنِي وَاهْدِنِي وَعَافِنِي وَاعْفُ عَنِّي',
    latin: "Rabbighfirli warhamni wajburni warfa'ni warzuqni wahdini wa'afini wa'fu 'anni.",
    arti: 'Ya Tuhanku ampunilah aku, sayangilah aku, tutuplah aibku, tinggikanlah derajatku, berilah aku rezeki, tunjukilah aku, selamatkanlah aku, dan maafkanlah kesalahanku.',
    tipsSantri: 'Duduk iftirasy (duduk di atas kaki kiri, kaki kanan ditegakkan) dan rasakan permohonan 8 kebaikan hidup ini.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-tahiyyat',
    nomor: 'I',
    judul: 'Bacaan Tahiyyat Akhir',
    arab: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا رَسُولُ اللهِ.\nاللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ، وَبَارِكْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى سَيِّدِنَا إِبْرَاهِيمَ وَعَلَى آلِ سَيِّدِنَا إِبْرَاهِيمَ، فِي الْعَالَمِينَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    latin: "Attahiyyatul mubarakatush shalawatuth thayyibatu lillah. Assalamu 'alaika ayyuhan nabiyyu wa rahmatullahi wa barakatuh. Assalamu 'alaina wa 'ala 'ibadillahis shalihin. Asyhadu alla ilaha illallah wa asyhadu anna sayyidana Muhammadar rasulullah. Allahumma shalli 'ala sayyidina Muhammad wa 'ala ali sayyidina Muhammad, kama shallaita 'ala sayyidina Ibrahim wa 'ala ali sayyidina Ibrahim, wa barik 'ala sayyidina Muhammad wa 'ala ali sayyidina Muhammad, kama barakta 'ala sayyidina Ibrahim wa 'ala ali sayyidina Ibrahim, fil 'alamina innaka hamidum majid.",
    arti: 'Segala kehormatan, keberkahan, shalawat dan kebaikan adalah milik Allah. Salam sejahtera atasmu wahai Nabi beserta rahmat Allah dan berkah-Nya...',
    tipsSantri: 'Duduk tawarruk (kaki kiri dimasukkan di bawah kaki kanan). Angkat jari telunjuk kanan saat membaca kalimat syahadat.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-dzikir',
    nomor: 'J',
    judul: 'Bacaan Dzikir Setelah Shalat',
    arab: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ (٣×)\nاللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ\nسُبْحَانَ اللهِ (٣٣×) ، الْحَمْدُ لِلَّهِ (٣٣×) ، اللهُ أَكْبَرُ (٣٣×)\nلَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    latin: "Astaghfirullahal 'adzim (3x). Allahumma antas salam wa minkas salam tabarakta ya dzal jalali wal ikram. Subhanallah (33x), Alhamdulillah (33x), Allahu Akbar (33x). La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu wa huwa 'ala kulli syai'in qadir.",
    arti: 'Aku mohon ampun kepada Allah Yang Maha Agung. Ya Allah, Engkau adalah Dzat Pemberi Keselamatan...',
    tipsSantri: 'Dihitung menggunakan ruas jari tangan kanan dengan tenang dan khusyuk.',
    kategori: 'Bacaan Shalat'
  },
  {
    id: 'sholat-tilawah',
    nomor: 'K',
    judul: 'Bacaan Sujud Tilawah',
    arab: 'سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ وَصَوَّرَهُ وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ فَتَبَارَكَ اللهُ أَحْسَنُ الْخَالِقِينَ',
    latin: "Sajada wajhiya lilladzi khalaqahu wa shawwarahu wa syaqqa sam'ahu wa basharahu bihaulihi wa quwwatihi fa tabarakallahu ahsanul khaliqin.",
    arti: 'Bersujud wajahku kepada Dzat yang menciptakannya, membentuk rupanya, dan membuka pendengaran serta penglihatannya dengan daya dan kekuatan-Nya. Maka Maha Berkah Allah sebaik-baik Pencipta.',
    tipsSantri: 'Disunnahkan bersujud satu kali saat membaca atau mendengar ayat sajadah dalam Al-Qur’an.',
    kategori: 'Bacaan Shalat'
  }
];
