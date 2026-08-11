/* =============================================
   FRYS BAKU — APP.JS
   Fast Food Real Taste
   ============================================= */

'use strict';

// ─── Constants ───────────────────────────────
const WA_NUMBER = '994559406018';
const PAGE_SCROLL_MAP = {};
let currentPage = 'home';
let currentModalProduct = null;
let currentVacancy = null;
let cart = [];

// ─── IMAGE URLS ───────────────────────────────
const IMG = {
  caesarSalad: 'https://sspark.genspark.ai/cfimages?u1=aMN%2BcG35CUaqLjHcRNK2zve9OOp%2FF39uCqk0sTGnnHyHDKdmjvtX47paGcvDDWF1vj%2FUshHtiC8nBys5E0wdd0RylVGB44Jbox3uWVgeHtyPnzrB1tOb7%2BXszhzP7aD3jiM2IQ9ImCYUuB4wjKIu5dnbdYejkb%2BnOQyEH67rXML2lqIT6yYfxMLoOzNPMeRfdzXNka%2BxeKQo%2Fjdbl0VBHMlnTmGpQgBdEDlwpa96BDzID7t4MqW%2B&u2=RxHB%2BdH1m5YhO9PQ&width=2560',
  greekSalad: 'https://sspark.genspark.ai/cfimages?u1=5OWtPejxqau35lQo%2FkZcVati4gwV8d4dUHZ9UwjmXh%2BaLNQcYYvMX020aGeIUNCFEXiAfG6OnXi8ZdLVHrrabc4OmSw6M93lCUjt%2B%2FiYVLynCgdl1nNLOeK96hJpycB1xLwLEdqw6Q%3D%3D&u2=Z1IGf0izsVsepdbH&width=2560',
  vegSalad: 'https://sspark.genspark.ai/cfimages?u1=MTvSyC483IAmLh8VEoRMb0vVO4uILsVs%2FQj6jevh3V5lcZ9oK0UFTRVecwqUuAcUa8gYWWIFk3WfXVPYm50G12mXe8IT5I7HyZw6eM7UW29ij5%2FatPal1A8RdHjOPEnWOy2S5VFwRvN0Rs8%2BPK1%2BwbBBJdjCLUZKYultnOEqdkjaH%2B8wI5oA7HsJogJSfK4CqJVoqd5kolj7L%2F3NmSQixilQ%2F%2FWIn8wCcGihgJV%2F1EqE%2FwXRf3zebIpvo5FgND7D1Bk3Y5wxdjYLyRm7iEGPcCcHIJVD&u2=a5vsGv%2Fw6URPt9Fl&width=2560',
  shawarma: 'https://sspark.genspark.ai/cfimages?u1=SMElDESP3PqrQ4G7GQwHY5OHlrFpvyq7Vgpq5veoLV70%2BiNqhVoPW4zC007kDe2cuGq12KCzadwJSKtddK1hr2bXFgspX2e0aSOOaChnw%2FIqFhnkjfnj4D0YeWEm7JvoNtu4Mks9LXckfTY4CQctiejgz2USyj2uv%2BjpuY%2FK7ToT1lpLVaJ%2Ff6o%3D&u2=BEmrlHnpHV760aas&width=2560',
  caesarRoll: 'https://sspark.genspark.ai/cfimages?u1=mvVPzvefWbbfjNC1G85d%2F1qsBVftnvdXERrDFnbqWrbQaNxUKXTZyp5eREaX7SDChDeVPEvY4IvybUxj9qIaH%2BW2ebCyTGD8WM7pu3aV8e75EjpveQ54L1IzOnKX6kFBwzBXClUKQxgs&u2=eQXYC9kgdz4ub9gZ&width=2560',
  beefBurger: 'https://sspark.genspark.ai/cfimages?u1=8PArffSMkeOTziaIjRVYFm3Wi83z8Zf25Y%2B3ua8yZIxW0AuUOsH2SAiZ116q4%2BmuG6oRbyZVPazwHH42TzBozoLJJ2F9CARM89htJEyIC4vUJzEX0UNJ%2F4pgLF8HegGMQswb&u2=MNDaa1p47fYzWL8Z&width=2560',
  chickenBurger: 'https://sspark.genspark.ai/cfimages?u1=M8X0Zh9Gk0ePwX6ge38Pw%2Fht8Z3RFWAtUM0cHGWyvJG9jkCHGR7mJwV2rgk%2F1oA8XE7XDJK8BWP7Tm8kLNu%2BO5p0M%2FvqBqBUBHUvtEDuIvT4gr4NoptxEI0cagDjccDWjw2pifEQ8V56esBQLlRHe0zWRI8J3cWvyM5DsuZzy8ZPzV0i4QUYqYhyh0xbRmOetcN9JG9pw1W8j1o6Bwv4QAjhjU8ShJ2qivyfQNkAMdY8GhrnYmRJVaSYiRP4OfoRwYUV37evGQ8W4BeoXbVt%2F5bPyxAY3wfMCbPaCvXxpfuwyYKX&u2=zaFrgkAYNVMiOgqS&width=2560',
  stripsSandwich: 'https://sspark.genspark.ai/cfimages?u1=ARKak%2F44UvBRQqUTgsYPxxHca4xdmD0If9rxX5zSBCR13%2FEbHdu9C%2FVdh9wLt%2FKZ8fRJOFT%2FdbQVFJJYVdY1P8QXhqLplL0LXGK2KVI2YOe9WR0Fn7ecIKxE7NqrW3t8NfWvG%2BKNcCA76MRqDnlaXUdF8wrBEKKO5oOV9GQVibKMbiqhBVN0oxm2%2FAu4cv3hCQCyXon2jqcqMbljgnNsRhJAeacAEGxhtS9UoAvQVCFZnZrbBU2cpinmiZm5ar0NkZyPPxylVehIHPQWYy8n1wUbqCnCE9fIp8rbvRarUq96bMVBC1h0cv2DpGfovX6JQsp9Geb5aKjn86WOE3aWXWU%3D&u2=tPJ6f2w84Zel3DOu&width=2560',
  lahmacun: 'https://sspark.genspark.ai/cfimages?u1=1NhwkNgxStfgTJbm7d9kOUZ1TNRxTezMLkceO9WMKotS1GDo052K2xcPY8PRdzM04QRLY8zBGBQxXLOwETzlk850T5vc8m0F3zym%2Fybhgq7xnN7a%2BRbN9V3qNPBFgqocmcjXcBr3SERZI6f0hMsxgitz4NQ%3D&u2=q4T2yiDagSLPkI4D&width=2560',
  lahmacunPendir: 'https://sspark.genspark.ai/cfimages?u1=rYjWVXAOOgTHhuj2oVkxplmV5YKPe8vQOaxMozO7%2FnfWDUCiMxeH61SyRQh56C3nB%2BqVP%2B8WxprOLlBLi8cJQA5dx6otr7fqH5quwzGoQKAFwWz76wFKbc6BYnEqaH%2B%2BOUG57w%2FlLtxn6A%3D%3D&u2=5%2FnhqHmIZEtzOdK8&width=2560',
  pizza: 'https://sspark.genspark.ai/cfimages?u1=uQkKmhVkhNFccsd3HkiQdlQ91J4MEjTSNenET94bKmfntOuuvYMtMWWPGZrP7WSEquVkPYCjs2U1W1En1ya5r%2F0323UlsYVYAKS5cgtTbBX6b3ceWLjq%2Fei4DEyQ4421ozPpTF6hT2icBz1Io2C9ao7L6HWku4aNonhi3VXg7PZNe0f%2Fe9PualDn5d0CX%2FEJ30R5IRAQvOZSdR%2BtRSnLCucSmvapzB8LFZR6CkyO%2B81B6xlNrSr6eh2ttUHZ%2BL%2BRcMr0QkyWxvI1937%2Bv96CW0g%3D&u2=YVjKCRt8Qndrse07&width=2560',
  kartofFri: 'https://sspark.genspark.ai/cfimages?u1=CcEL11fhx%2FcqiFdGKdnJFV2IQ0uuJ3WtKvn29Vf4xfqBYHga6mUBD8urJACrb5OHCDDwU5hiF53B1SaD%2F4lSop2%2B%2BHZWC8xLJvLRmXDa3CnxylaogGAR57XgE7%2BTCGhPJaVA1ihozjR3bUXc5XEWwwGhoFeF8Z5275FCPLD5aUM6ZCEIofHe%2B03dIKOzlDw%2Fz4lQmrzZDTRVtFzm%2FLAZ0w2tEoc2dhNx00quu7F%2BQDmBTmwALe4BAZWrxw%3D%3D&u2=WlJG4ozYdb%2BQ4pyq&width=2560',
  nuggets: 'https://sspark.genspark.ai/cfimages?u1=kzIQGP4u%2FykiTsPzk9KoucVbLDdOTPv4jPQ4VZFHLTpjsmd6D3HBN4sXtthgSzi4aYwIQAylBdzP07u48pVGJVsTNdNBQQhoH7%2FAMiImHk0A%2BmG0JeRbAT71tX%2BRYXrq3%2BixssgQzunQF1kIuetPoGsC%2BepMsgEwzQcnoOO9FHkp7S0KV%2B%2BTyGgrB0FmFV%2B1UCg1eib3zEtMb%2BLNpSjwV6GvbxcNNpdZndAr8iahUxMGPlPBMf2iRCDzm8nrj%2FaN%2BbF3WhRmzZ8PdKGadBmKH53XF2BZR0UuAEWagD81yA%3D%3D&u2=i5TCSqdtFp8IY9ue&width=2560',
  wings: 'https://sspark.genspark.ai/cfimages?u1=fIL75FVBIwifUToHdPQJQRiM1Srt6Ocli9jsJUQM7wznzB3kb9GVl55ednI%2F6wn3orJkCeElKRSmETftDijsX11ySKgnr2yz93QzKbBqR2%2BRQm%2FSBG0T&u2=Zg1X4yFjdBxlr77A&width=2560',
  strips: 'https://sspark.genspark.ai/cfimages?u1=hnakoMgi%2BBQF87LTCoD2NJ3WqokkBkHrf0tGRrvjCrqMFZ5jVQCaghNxwJ%2BACF3FhlXGOrHiTE91%2BA1bQTjGNOgU1yN2HyY4MbmiAXTYWStgL9dA75ATZIrzhRebPfRYeaOOiHMuDIvWSN31voju0K4O01WSJtOCt4ND%2FpZuCOOs%2FO6EJEiS9TRYmWqhpCF5bZoEBvZ8MzrQHtbrlKAbuNkgIAl14lgpSkm5vGp9Mf%2BGd47UMP5nXZXe5Bw3ooRHR5oXCoq3RT4usemnCtCXgQ6m2qNL5PDGivb4MEp8CTwGSKvATVLGDTejWwhUiEWKlxY%3D&u2=4%2FvxT4H%2FTL6RHBpa&width=2560',
  budDibi: 'https://sspark.genspark.ai/cfimages?u1=sRsRGzoXIMHHLgV6a%2BIp8wpvRMLDieoKTg4gjT1KyifdVkLh9TjCSwLq%2FBB1ba9X10FGnFgL5xE94w4MHCwqBuvRMV3OdZWqeQ7ac3SF%2FY%2FqZRzzgpll285KMV%2FI3V8GkY3JBL806TGX7zAz2Tnx8L%2BU&u2=tulUw1jzl3tR1Jl5&width=2560'
};

// ─── DATA ─────────────────────────────────────

const menuData = {
  salatlar: [
    {
      id: 'sal1',
      name: 'Sezar toyuq',
      desc: 'Ətirli toyuq, təzə salat yarpaqları, Sezar sousu və krekerlərlə hazırlanmış dadlı salat.',
      price: 10,
      weight: '300 q',
      img: IMG.caesarSalad,
      badge: 'Populyar'
    },
    {
      id: 'sal2',
      name: 'Yunan salatı',
      desc: 'Pomidor, xiyar, zeytin, qırmızı soğan, feta pendir, zeytun yağı ilə hazırlanmış klassik yunan salatı.',
      price: 8,
      weight: '280 q',
      img: IMG.greekSalad
    },
    {
      id: 'sal3',
      name: 'Tərəvəz salatı smetanla (Uşaq üçün)',
      desc: 'Təzə tərəvəzlər smetana sousu ilə hazırlanmış, uşaqlar üçün ideal yüngül salat.',
      price: 7,
      weight: '250 q',
      img: IMG.vegSalad
    }
  ],
  shawarma: [
    {
      id: 'sh1',
      name: 'Şaurma Toyuq',
      desc: 'Lavaşda toyuq əti, tərəvəzlər, xüsusi sousla hazırlanmış ənənəvi şaurma.',
      price: 7,
      weight: '350 q',
      img: IMG.shawarma,
      badge: 'Bestseller'
    },
    {
      id: 'sh2',
      name: 'Sezar roll',
      desc: 'Lavaşda Sezar salatı, toyuq, pendir, xüsusi Sezar sousu ilə hazırlanmış dadlı roll.',
      price: 8,
      weight: '320 q',
      img: IMG.caesarRoll
    }
  ],
  burgers: [
    {
      id: 'b1',
      name: 'Beef Burger',
      desc: 'Şirəli mal əti kotleti, pendir, pomidor, salat yarpağı, xüsusi sous ilə hazırlanmış burger.',
      price: 11,
      weight: '350 q',
      img: IMG.beefBurger,
      badge: 'Yeni'
    },
    {
      id: 'b2',
      name: 'Chicken Burger',
      desc: 'Qızardılmış toyuq filesi, pendir, pomidor, xiyar, mayonez sousu ilə dadlı burger.',
      price: 10,
      weight: '320 q',
      img: IMG.chickenBurger,
      badge: 'Populyar'
    },
    {
      id: 'b3',
      name: 'Strips Sendviç',
      desc: 'Xırtıldayan toyuq strips, salat yarpağı, pomidor, xüsusi sousla hazırlanmış sendviç.',
      price: 9,
      weight: '300 q',
      img: IMG.stripsSandwich
    }
  ],
  lahmacun: [
    {
      id: 'l1',
      name: 'Lahmacun sadə',
      desc: 'Nazik xəmirdə qiymə əti, soğan, bibər, ədviyyatlarla hazırlanmış ənənəvi lahmacun.',
      price: 4,
      weight: '1 əd.',
      img: IMG.lahmacun
    },
    {
      id: 'l2',
      name: 'Lahmacun pendir',
      desc: 'Nazik xəmirdə qiymə əti, soğan, bibər, bol pendir ilə hazırlanmış pendiirli lahmacun.',
      price: 5,
      weight: '1 əd.',
      img: IMG.lahmacunPendir,
      badge: 'Populyar'
    },
    {
      id: 'l3',
      name: 'Lahmacun acılı',
      desc: 'Nazik xəmirdə qiymə əti, soğan, acı bibər, ədviyyatlarla hazırlanmış acılı lahmacun.',
      price: 4,
      weight: '1 əd.',
      img: IMG.lahmacun
    }
  ],
  pizza: [
    {
      id: 'p1',
      name: 'Margarita',
      desc: 'Pomidor sousu, mozzarella pendir, təzə reyhan ilə klassik İtalyan pizzası.',
      price: 8,
      weight: '30 sm.',
      img: IMG.pizza
    },
    {
      id: 'p2',
      name: 'Pepperoni',
      desc: 'Pomidor sousu, mozzarella pendir, pepperoni kolbasa ilə hazırlanmış dadlı pizza.',
      price: 11,
      weight: '30 sm.',
      img: IMG.pizza,
      badge: 'Bestseller'
    },
    {
      id: 'p3',
      name: 'Sezar Pizza',
      desc: 'Sezar sousu, toyuq, mozzarella pendir, kreker ilə hazırlanmış orijinal Sezar pizzası.',
      price: 12,
      weight: '30 sm.',
      img: IMG.pizza,
      badge: 'Yeni'
    },
    {
      id: 'p4',
      name: 'Toyuq pizza',
      desc: 'Pomidor sousu, toyuq əti, mozzarella pendir, soğan, bibər ilə hazırlanmış toyuq pizzası.',
      price: 12,
      weight: '30 sm.',
      img: IMG.pizza
    }
  ],
  kartof: [
    {
      id: 'k1',
      name: 'Kartof fri',
      desc: 'Xırtıldayan qızardılmış kartof dilimlər, duz ilə servis edilir.',
      price: 4,
      weight: '200 q',
      img: IMG.kartofFri,
      badge: 'Populyar'
    },
    {
      id: 'k2',
      name: 'Ev sayağı kartof',
      desc: 'Ədviyyatlı ev üsulu ilə hazırlanmış xüsusi kartof, xırtıldayan və dadlı.',
      price: 4,
      weight: '220 q',
      img: IMG.kartofFri
    }
  ],
  toyuq: [
    {
      id: 't1',
      name: 'Toyuq nagets',
      desc: 'Xırtıldayan xəmir içərisində şirəli toyuq parçaları, dip sous ilə servis edilir.',
      price: 8,
      weight: '8 əd.',
      img: IMG.nuggets,
      badge: 'Populyar'
    },
    {
      id: 't2',
      name: 'Toyuq qanadları BBQ sousuyla',
      desc: 'Şirəli toyuq qanadları, xüsusi BBQ sousu ilə marinələnib bişirilmiş.',
      price: 15,
      weight: '10 əd.',
      img: IMG.wings,
      badge: 'Bestseller'
    },
    {
      id: 't3',
      name: 'Bud dibi çöp şiş',
      desc: 'Bud dibi əti şişə düzülmüş, ədviyyatlarla marinələnib hazırlanmış dadlı çöp şiş.',
      price: 8,
      weight: '5 əd.',
      img: IMG.budDibi
    },
    {
      id: 't4',
      name: 'Strips box kiçik',
      desc: 'Xırtıldayan toyuq strips, dip sousu ilə kiçik box formatında servis edilir.',
      price: 7,
      weight: '5 əd.',
      img: IMG.strips
    },
    {
      id: 't5',
      name: 'Strips box böyük',
      desc: 'Xırtıldayan toyuq strips, dip sousu ilə böyük box formatında servis edilir.',
      price: 15,
      weight: '10 əd.',
      img: IMG.strips,
      badge: 'Yeni'
    }
  ]
};

const faqData = [
  {
    q: 'Çatdırılma müddəti nə qədərdir?',
    a: 'Bakı daxilindəki sifarişlər üçün ortalama çatdırılma müddəti 30-60 dəqiqədir. Sifariş verildikdən sonra kuryerimiz sizinlə əlaqə saxlayır.'
  },
  {
    q: 'Minimum sifariş məbləği nədir?',
    a: 'Minimum sifariş məbləği 10 AZN-dir. Çatdırılma xidmətimiz pulsuzdur (müəyyən rayonlar üçün şərtlər tətbiq oluna bilər).'
  },
  {
    q: 'Rezervasiya üçün depozit tələb olunurmu?',
    a: 'Xeyr, rezervasiya tamamilə pulsuzdur. Masa saxlamaq üçün heç bir ödəniş tələb edilmir. Sadəcə gəlmədiyiniz halda xəbər verməyinizi rica edirik.'
  },
  {
    q: 'Allergenləri nəzərə alırsınızmı?',
    a: 'Bəli, biz allergen məlumatlarını çox ciddi qəbul edirik. Sifarişinizi verərkən xüsusi diet tələblərinizi qeyd etdikdə aşpazımız uyğun hazırlayacaq.'
  },
  {
    q: 'Ödəniş üsulları hansılardır?',
    a: 'Nağd pul, bank kartı (Kapital Bank, ABB, PASHA Bank), ANSAN və onlayn ödəniş sistemləri qəbul edilir.'
  },
  {
    q: 'Korporativ sifarişlər mümkündürmü?',
    a: 'Bəli! Şirkətlər, tədbirlər və böyük qruplar üçün xüsusi korporativ menyu və endirim proqramlarımız mövcuddur. WhatsApp vasitəsilə bizimlə əlaqə saxlayın.'
  },
  {
    q: 'Harada yerləşirsiniz?',
    a: 'Baxıxanov Mall, 3-cü mərtəbə. Hər gün işləyirik: B.E – Cümə: 10:00–23:00 | Şənbə: 10:00–24:00 | Bazar: 11:00–23:00.'
  },
  {
    q: 'Restoranın iş saatları necədir?',
    a: 'B.E – Cümə: 10:00–23:00 | Şənbə: 10:00–24:00 | Bazar: 11:00–23:00. Çatdırılma xidməti restoran iş saatları daxilindədir.'
  }
];

const vacanciesData = [
  {
    id: 'v1',
    icon: '🍔',
    title: 'Aşpaz / Hazırlayıcı',
    type: 'Tam Ştat',
    salary: '700 – 1000 AZN',
    schedule: 'Dəyişən növbə (2/2)',
    requirements: 'Ən az 1 il fast food hazırlama təcrübəsi, gigiyena sertifikatı',
    desc: 'Frys Baku mətbəxinə peşəkar aşpaz axtarırıq. Sürətlilik, dəqiqlik və komanda ruhu vacibdir.',
    duties: 'Menyu maddələrinin hazırlanması, freshness nəzarəti, müştəri sifarişlərinin icrası'
  },
  {
    id: 'v2',
    icon: '🛵',
    title: 'Kuryer',
    type: 'Yarım / Tam Ştat',
    salary: '500 – 800 AZN + bonus',
    schedule: 'Çevik qrafik',
    requirements: 'Sürücülük vəsiqəsi (B kateqoriyası), Bakı ərazisinə bələdlik',
    desc: 'Sürətli, etibarlı kuryer işə qəbul edirik. Öz nəqliyyatı olan üçün əlavə bonus nəzərdə tutulur.',
    duties: 'Sifarişlərin vaxtında çatdırılması, müştəri ilə ünsiyyət'
  },
  {
    id: 'v3',
    icon: '👩‍💼',
    title: 'Kassir / Operator',
    type: 'Tam Ştat',
    salary: '600 – 900 AZN',
    schedule: 'Dəyişən növbə',
    requirements: 'Kompüter savadlılığı, ünsiyyət bacarığı, 18+ yaş',
    desc: 'Müştəri xidmətləri üzrə kassir/operator axtarırıq. Gülərüz, enerjili olmaq vacibdir.',
    duties: 'Sifarişlərin qəbulu, ödəniş əməliyyatları, müştəri məmnuniyyəti'
  },
  {
    id: 'v4',
    icon: '🧹',
    title: 'Sanitar Texnik',
    type: 'Tam Ştat',
    salary: '500 – 650 AZN',
    schedule: 'Günlük, 09:00–18:00',
    requirements: 'Gigiyena standartları bilikləri, fiziki hazırlıq',
    desc: 'Mətbəx və restoran sahəsinin gigiyena standartlarına uyğun saxlanılması üçün işçi axtarırıq.',
    duties: 'Restoran sahəsinin təmizliyi, sanitariya standartlarına riayət'
  }
];

// ─── PAGE NAVIGATION ───────────────────────────

function showPage(pageId) {
  const oldPage = document.getElementById('page-' + currentPage);
  if (oldPage) {
    PAGE_SCROLL_MAP[currentPage] = window.scrollY;
    oldPage.classList.remove('active');
  }

  currentPage = pageId;

  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;
  newPage.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  const savedScroll = PAGE_SCROLL_MAP[pageId] || 0;
  window.scrollTo({ top: savedScroll, behavior: 'instant' });
}

function goBack() {
  PAGE_SCROLL_MAP[currentPage] = window.scrollY;
  showPage('home');
}

// ─── MOBILE MENU ───────────────────────────────
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  overlay.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── CART ─────────────────────────────────────

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  const backdrop = document.getElementById('cartBackdrop');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  backdrop.classList.toggle('visible', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  bumpCartCount();
  showToast(`${product.name} səbətə əlavə edildi!`);
}

function addToCartFromModal() {
  if (!currentModalProduct) return;
  addToCart(currentModalProduct.id);
  closeProductModalBtn();
}

function findProduct(id) {
  for (const cat of Object.values(menuData)) {
    const found = cat.find(p => p.id === id);
    if (found) return found;
  }
  return null;
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else renderCart();
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  countEl.textContent = totalItems;
  totalEl.textContent = totalPrice + ' AZN';

  const isEmpty = cart.length === 0;
  emptyEl.style.display = isEmpty ? 'flex' : 'none';
  footerEl.style.display = isEmpty ? 'none' : 'block';

  const existingItems = itemsEl.querySelectorAll('.cart-item');
  existingItems.forEach(el => el.remove());

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-item-img" src="${item.img}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.style.background='#333'" />
      <div class="cart-item-info">
        <div class="cart-item-name">${escHtml(item.name)}</div>
        <div class="cart-item-price">${item.price * item.qty} AZN</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty('${item.id}',-1)" aria-label="Azalt">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.id}',1)" aria-label="Artır">+</button>
      </div>
    `;
    itemsEl.insertBefore(div, emptyEl);
  });
}

function bumpCartCount() {
  const el = document.getElementById('cartCount');
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 300);
}

function sendOrder() {
  if (cart.length === 0) return;

  let msg = '🔥 *YENİ SİFARİŞ — Frys Baku*\n\n';
  msg += '━━━━━━━━━━━━━━━━━━━━\n';
  cart.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.name}\n   ${item.qty} × ${item.price} AZN = ${item.qty * item.price} AZN\n`;
  });
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  msg += '━━━━━━━━━━━━━━━━━━━━\n';
  msg += `💰 *CƏMİ: ${total} AZN*\n\n`;
  msg += '📍 Çatdırılma ünvanınızı yazın.';

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// ─── MENU RENDERING ───────────────────────────

function renderMenuGrids() {
  Object.entries(menuData).forEach(([cat, items]) => {
    const grid = document.getElementById('grid-' + cat);
    if (!grid) return;
    grid.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', item.name);

      const badgeHtml = item.badge
        ? `<div class="menu-badge">${escHtml(item.badge)}</div>`
        : '';

      card.innerHTML = `
        <div class="menu-card-img">
          ${badgeHtml}
          <img src="${item.img}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.style.background='#1a1a1a'" />
        </div>
        <div class="menu-card-body">
          <div class="menu-card-name">${escHtml(item.name)}</div>
          <div class="menu-card-desc">${escHtml(item.desc)}</div>
          <div class="menu-card-footer">
            <span class="menu-card-price">${item.price} AZN</span>
            <button class="add-btn" onclick="event.stopPropagation();addToCart('${item.id}')" aria-label="Səbətə əlavə et">+</button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openProductModal(item));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openProductModal(item); });
      grid.appendChild(card);
    });
  });
}

function switchTab(tabId) {
  document.querySelectorAll('.menu-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });
  document.querySelectorAll('.menu-section').forEach(s => {
    s.classList.toggle('active', s.id === 'tab-' + tabId);
  });
}

// ─── PRODUCT MODAL ────────────────────────────

function openProductModal(product) {
  currentModalProduct = product;
  document.getElementById('modalImg').src = product.img;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalPrice').textContent = product.price + ' AZN';
  document.getElementById('modalWeight').textContent = product.weight;
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal(e) {
  if (e.target === document.getElementById('productModal')) closeProductModalBtn();
}
function closeProductModalBtn() {
  document.getElementById('productModal').classList.remove('open');
  currentModalProduct = null;
  document.body.style.overflow = '';
}

// ─── FAQ RENDERING ────────────────────────────

function renderFaq() {
  const list = document.getElementById('faqList');
  faqData.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'faq-item';
    el.innerHTML = `
      <div class="faq-q" onclick="toggleFaq(this)">
        <span>${escHtml(item.q)}</span>
        <span class="faq-icon">+</span>
      </div>
      <div class="faq-a">
        <div class="faq-a-inner">${escHtml(item.a)}</div>
      </div>
    `;
    list.appendChild(el);
  });
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── VACANCIES RENDERING ──────────────────────

function renderVacancies() {
  const grid = document.getElementById('vacancyGrid');
  vacanciesData.forEach(v => {
    const card = document.createElement('div');
    card.className = 'vacancy-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="vacancy-card-icon">${v.icon}</div>
      <div class="vacancy-card-title">${escHtml(v.title)}</div>
      <div class="vacancy-card-type">${escHtml(v.type)}</div>
      <div class="vacancy-card-desc">${escHtml(v.desc)}</div>
      <div class="vacancy-card-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    `;
    card.addEventListener('click', () => openVacancyModal(v));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openVacancyModal(v); });
    grid.appendChild(card);
  });
}

// ─── VACANCY MODAL ────────────────────────────

function openVacancyModal(v) {
  currentVacancy = v;
  document.getElementById('vacancyModalIcon').textContent = v.icon;
  document.getElementById('vacancyModalTitle').textContent = v.title;
  document.getElementById('vacancyModalType').textContent = v.type;

  const detailsEl = document.getElementById('vacancyModalDetails');
  detailsEl.innerHTML = `
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">💰 Maaş:</span><span class="vacancy-detail-value">${escHtml(v.salary)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">⏰ Qrafik:</span><span class="vacancy-detail-value">${escHtml(v.schedule)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📋 Tələblər:</span><span class="vacancy-detail-value">${escHtml(v.requirements)}</span></div>
    <div class="vacancy-detail-row"><span class="vacancy-detail-label">📝 Vəzifələr:</span><span class="vacancy-detail-value">${escHtml(v.duties)}</span></div>
  `;

  document.getElementById('vacancyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVacancyModal(e) {
  if (e.target === document.getElementById('vacancyModal')) closeVacancyModalBtn();
}
function closeVacancyModalBtn() {
  document.getElementById('vacancyModal').classList.remove('open');
  currentVacancy = null;
  document.body.style.overflow = '';
}

function applyVacancy() {
  if (!currentVacancy) return;
  const msg = `👋 *Vakansiyaya Müraciət — Frys Baku*\n\n🔹 *Vəzifə:* ${currentVacancy.title}\n🔹 *İş rejimi:* ${currentVacancy.type}\n\nSalam! Bu vakansiya ilə maraqlanıram. Əlaqə saxlamaq istəyirəm.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── RESERVATION ─────────────────────────────

function submitReservation(e) {
  e.preventDefault();
  const name    = document.getElementById('resName').value.trim();
  const phone   = document.getElementById('resPhone').value.trim();
  const date    = document.getElementById('resDate').value;
  const time    = document.getElementById('resTime').value;
  const guests  = document.getElementById('resGuests').value;
  const note    = document.getElementById('resNote').value.trim();

  if (!name || !phone || !date || !time || !guests) {
    showToast('Zəhmət olmasa bütün məcburi xanaları doldurun!');
    return;
  }

  const formattedDate = formatDate(date);
  let msg = `📅 *REZERVASIYA — Frys Baku*\n\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Ad, Soyad:* ${name}\n`;
  msg += `📞 *Telefon:* ${phone}\n`;
  msg += `📅 *Tarix:* ${formattedDate}\n`;
  msg += `⏰ *Saat:* ${time}\n`;
  msg += `👥 *Nəfər sayı:* ${guests}\n`;
  if (note) msg += `📝 *Qeyd:* ${note}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
}

// ─── GALLERY LIGHTBOX ─────────────────────────

function openLightbox(img) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── TOAST ────────────────────────────────────

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── UTILS ────────────────────────────────────

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('az-AZ', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

// ─── KEYBOARD ACCESSIBILITY ───────────────────

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('productModal').classList.contains('open')) {
      closeProductModalBtn();
    } else if (document.getElementById('vacancyModal').classList.contains('open')) {
      closeVacancyModalBtn();
    } else if (document.getElementById('lightbox').classList.contains('open')) {
      closeLightbox();
    } else if (document.getElementById('cartPanel').classList.contains('open')) {
      toggleCart();
    } else if (document.getElementById('mobileMenu').classList.contains('open')) {
      toggleMenu();
    }
  }
});

// ─── INIT ─────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderMenuGrids();
  renderFaq();
  renderVacancies();
  renderCart();

  const today = new Date().toISOString().split('T')[0];
  const resDate = document.getElementById('resDate');
  if (resDate) resDate.min = today;
});
