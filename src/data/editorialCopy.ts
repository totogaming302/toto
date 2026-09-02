/**
 * IMMUTABLE PRODUCTION ASSET: EDITORIAL COPY REGISTRY
 * 
 * CRITICAL DIRECTIVE ON CONTENT INTEGRITY:
 * - Do NOT rewrite, edit, paraphrase, condense, tone-down, summarize, or omit ANY of the text,
 *   case studies, questions, or economic terminology provided below.
 * - Treat the provided copy as immutable production assets.
 * - Every numbered question MUST appear as a bold visual anchor BEFORE the user scrolls to reveal the answer.
 */

export interface SectionCopy {
  id: string;
  tagline: string;
  questionAnchor: string;
  beats?: string[];
  [key: string]: any;
}

export const HERO_COPY = {
  id: "hero",
  tagline: "PROLOG MAKROEKONOMI",
  title: "Mata Uang Melemah, Ekspor Meningkat?",
  subtitle: "Dekonstruksi paradoks devaluasi mata uang by Kelompok 2 Ekonomi",
  scrollPrompt: "GULIR UNTUK MEMULAI ANALISIS",
  hudBadge: "KELOMPOK 2 EKONOMI // DATA JOURNALISM TERMINAL"
};

export const SECTION_1_COPY = {
  id: "section-1",
  tagline: "PERTANYAAN 01 // DAYA SAING EKSPOR",
  questionAnchor: "Mengapa Pelemahan Nilai Tukar Mendorong Daya Saing Ekspor?",
  beats: [
    {
      type: "reveal",
      label: "Diskon Internasional",
      text: "Ketika nilai mata uang suatu negara anjlok, barang-barang buatannya mendadak 'didiskon' di pasar internasional."
    },
    {
      type: "perspective",
      label: "Perspektif Pembeli Global",
      text: "Pembeli luar negeri yang memegang valuta asing (seperti dolar AS) membutuhkan lebih sedikit uang untuk menebus volume barang yang sama."
    },
    {
      type: "two-pathways",
      label: "Dua Strategi Eksportir",
      text: "Eksportir dapat memilih dua strategi: memangkas harga jual dalam valas agar merebut pangsa pasar global, atau mempertahankan harga jual valas untuk meraup margin keuntungan berlipat ganda saat laba dikonversi kembali ke mata uang domestik."
    }
  ]
};

export const SECTION_2_COPY = {
  id: "section-2",
  tagline: "PERTANYAAN 02 // BAHAN BAKU IMPOR",
  questionAnchor: "Mengapa perusahaan yang bergantung pada bahan baku impor justru dapat mengalami kerugian?",
  beats: [
    {
      type: "typewriter",
      label: "Imported Inflation",
      text: "Mata uang yang melemah memicu pisau bermata dua bernama imported inflation."
    },
    {
      type: "cost-mechanism",
      label: "Mekanisme Pembengkakan Biaya",
      text: "Bahan baku impor harus dibayar menggunakan valuta asing. Ketika mata uang lokal merosot, biaya pembelian komponen dasar melonjak seketika dalam pembukuan domestik. Jika perusahaan tidak sanggup melimpahkan kenaikan biaya tersebut kepada konsumen akhir—karena daya beli pasar yang melemah atau persaingan ketat—margin laba tergerus habis."
    }
  ]
};

export const SECTION_3_COPY = {
  id: "section-3",
  tagline: "PERTANYAAN 03 // PETA DAMPAK EKONOMI",
  questionAnchor: "Bagaimana dampaknya terhadap eksportir, importir, konsumen, dan produsen domestik?",
  actors: [
    {
      id: "eksportir",
      role: "Eksportir",
      status: "Untung",
      badgeColor: "emerald",
      brandingContext: "PT Freeport Indonesia",
      text: "Eksportir — Untung. Pendapatan bernilai valas meningkat tajam saat dirupiahkan, terutama bagi sektor padat sumber daya lokal."
    },
    {
      id: "importir",
      role: "Importir",
      status: "Buntung",
      badgeColor: "crimson",
      brandingContext: "Samsung Electronics Indonesia",
      text: "Importir — Buntung. Biaya pengadaan barang impor melambung; volume penjualan merosot akibat harga jual yang terpaksa dinaikkan."
    },
    {
      id: "konsumen",
      role: "Konsumen",
      status: "Buntung, Silent Casualty",
      badgeColor: "crimson",
      brandingContext: "Daya Beli & Keranjang Belanja",
      text: "Konsumen — Buntung, Silent Casualty. Daya beli tergerus akibat lonjakan harga barang kebutuhan pokok dan elektronik (cost-push inflation)."
    },
    {
      id: "produsen-domestik",
      role: "Produsen Domestik",
      status: "Tergantung, Strategic Opportunity",
      badgeColor: "amber",
      brandingContext: "Substitusi Impor vs Ketergantungan Input",
      text: "Produsen Domestik — Tergantung, Strategic Opportunity. Menguntungkan jika bahan baku 100% lokal karena barang substitusi impor jadi mahal; merugi jika bergantung pada input impor."
    }
  ]
};

export const SECTION_4_COPY = {
  id: "section-4",
  tagline: "PERTANYAAN 04 // ANOMALI KURVA-J",
  questionAnchor: "Apakah pelemahan rupiah selalu menguntungkan kegiatan ekspor?",
  beats: [
    {
      step: 1,
      headline: "Fenomena Kurva J",
      text: "Tidak selalu. Teori ekonomi mengenal fenomena Kurva J (J-Curve Effect)."
    },
    {
      step: 2,
      headline: "Kekakuan Kontrak Perdagangan",
      text: "Kontrak perdagangan internasional bersifat kaku dan terikat jangka menengah; volume ekspor tidak langsung melonjak seketika begitu rupiah jatuh."
    },
    {
      step: 3,
      headline: "Prasyarat Elastisitas & Rantai Pasok",
      text: "Ekspor hanya untung jika barang memiliki elastisitas permintaan harga yang tinggi di pasar global, pasokan domestik sanggup memenuhi lonjakan pesanan, serta rantai pasok tidak tercekik komponen impor."
    }
  ]
};

export const SECTION_5_COPY = {
  id: "section-5",
  tagline: "PERTANYAAN 05 // JALUR INFLASI",
  questionAnchor: "Bagaimana kondisi tersebut dapat memengaruhi inflasi?",
  typewriterIntro: "Pelemahan nilai tukar memicu inflasi melalui jalur kenaikan biaya produksi, sebuah fenomena yang dikenal sebagai Imported Inflation.",
  pipelineHeader: "Depresiasi mata uang menular ke inflasi melalui jalur penawaran (supply side):",
  pipelineNodes: [
    {
      number: 1,
      title: "Barang Konsumsi Impor",
      text: "1. Harga barang konsumsi impor (seperti kedelai, gandum, atau gawai) langsung naik."
    },
    {
      number: 2,
      title: "Biaya Input Manufaktur",
      text: "2. Biaya input industri manufaktur naik, memaksa produsen menaikkan harga jual barang jadi ke konsumen akhir."
    },
    {
      number: 3,
      title: "Beban Energi & Logistik",
      text: "3. Beban logistik dan energi berbasis minyak mentah (yang ditransaksikan dalam dolar) membengkak, memicu efek domino kenaikan tarif logistik nasional."
    }
  ]
};

export const SECTION_6_COPY = {
  id: "section-6",
  tagline: "TANTANGAN ANALISIS // DIAGRAM SEBAB-AKIBAT",
  challengeAnchor: "Tantangan: Buat diagram sebab-akibat: Pelemahan nilai tukar → … → … → … → dampak terhadap perekonomian.",
  path1: {
    id: "path-1",
    title: "Path 1 (Positif Ekspor)",
    color: "emerald",
    nodes: [
      "Pelemahan nilai tukar rupiah",
      "Produk Indonesia relatif lebih murah bagi pembeli luar negeri",
      "Permintaan dan daya saing ekspor meningkat",
      "Pendapatan devisa berpotensi meningkat",
      "Pertumbuhan ekonomi dapat terdorong"
    ],
    fullSequenceText: "Pelemahan nilai tukar rupiah → Produk Indonesia relatif lebih murah bagi pembeli luar negeri → Permintaan dan daya saing ekspor meningkat → Pendapatan devisa berpotensi meningkat → Pertumbuhan ekonomi dapat terdorong."
  },
  path2: {
    id: "path-2",
    title: "Path 2 (Negatif Impor & Inflasi)",
    color: "crimson",
    nodes: [
      "Pelemahan nilai tukar rupiah",
      "Harga barang dan bahan baku impor meningkat",
      "Biaya produksi perusahaan meningkat",
      "Harga barang dalam negeri meningkat",
      "Inflasi meningkat dan daya beli masyarakat dapat menurun (stagflation)"
    ],
    fullSequenceText: "Pelemahan nilai tukar rupiah → Harga barang dan bahan baku impor meningkat → Biaya produksi perusahaan meningkat → Harga barang dalam negeri meningkat → Inflasi meningkat dan daya beli masyarakat dapat menurun (stagflation)."
  }
};

export const SECTION_7_COPY = {
  id: "section-7",
  tagline: "SIMULASI STRATEGIS // RUANG KENDALI KRISIS",
  questionAnchor: "Jika Anda menjadi pengambil kebijakan, apa yang akan Anda lakukan untuk mengurangi dampak negatifnya?",
  massiveTitle: "Crisis Room",
  welcomeTerminal: "Selamat datang di sistem, Gubernur Bank Sentral & Menteri Keuangan.",
  briefing: "Mata uang nasional Anda sedang diserang gelombang spekulasi valas global (-30%). Pilihlah dari tuas kebijakan di bawah ini. Ingat: tidak ada kebijakan tanpa ongkos pengorbanan (trade-off).",
  levers: [
    {
      id: "forex-intervention",
      name: "Intervensi Pasar Valas",
      description: "Operasi moneter penjualan cadangan devisa untuk menahan kejatuhan kurs rupiah.",
      min: 0,
      max: 30,
      step: 1,
      unit: "$B",
      defaultVal: 5
    },
    {
      id: "interest-rate",
      name: "Suku Bunga Acuan / BI-Rate Hike",
      description: "Menaikkan suku bunga untuk membendung capital outflow dan meredam inflasi.",
      min: 0,
      max: 500,
      step: 25,
      unit: "bps",
      defaultVal: 50
    },
    {
      id: "lcs-expansion",
      name: "Perluasan Local Currency Settlement",
      description: "Penyelesaian transaksi bilateral menggunakan mata uang lokal non-USD (CNY, JPY, MYR, THB).",
      min: 0,
      max: 60,
      step: 5,
      unit: "%",
      defaultVal: 15
    },
    {
      id: "import-substitution",
      name: "Insentif Substitusi Impor",
      description: "Pemberian tax holiday dan pembebasan bea masuk mesin untuk rantai pasok domestik.",
      type: "toggle",
      defaultVal: true
    }
  ],
  telemetryLabels: {
    statusChipOptions: {
      high: "[RESILIENSI TINGGI]",
      vulnerable: "[RAWAN]",
      bailout: "[RISIKO BAILOUT IMF]",
      crisis: "[DARURAT KRISIS]"
    },
    inflation: "Tingkat Inflasi",
    gdpGrowth: "Pertumbuhan PDB",
    forexReserves: "Cadangan Devisa",
    forexReserveUnit: "Billion USD & Ketahanan Impor",
    spotRate: "Kurs Spot USD/IDR"
  }
};
