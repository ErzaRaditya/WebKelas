// Data 10 Kelompok Beserta Dokumen PDF
const kelompokData = [
  { id: 1, judul: "Legend & Folklore", anggota: "Aditya, Al Rafly, Ade Ikbal", desc: "Kumpulan cerita legenda Si Pitung, Roro Jonggrang, dan Danau Toba.", file: "pdf/kelompok1.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 2, judul: "Fairy Tale & Fable", anggota: "Zain, Ryan, Yunan", desc: "Petualangan cerita Rapunzel, Jumbo, dan Puss in Boots.", file: "pdf/kelompok2.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 3, judul: "Horror", anggota: "Al Rasyid, Arya, Azis", desc: "Kisah mistis Danur, Ghost in the Cell, dan The Conjuring.", file: "pdf/kelompok3.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 4, judul: "Horror", anggota: "Rizki Farel, Reddy, Rifa", desc: "Kisah urban Hell House, Annabelle, dan Ju-On.", file: "pdf/kelompok4.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 5, judul: "Fantasy & Adventure", anggota: "Dika, Feriko, Dendra", desc: "Kisah petualangan Avatar, Robinhood, dan Berserk.", file: "pdf/kelompok5.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 6, judul: "Classic Legends", anggota: "Raffa,Damar,Rama", desc: "The story of Keong mas,The story of Batu menangis,The legend of Situ bagendit.", file: "pdf/kelompok6.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 7, judul: "Epic Fantasy", anggota: "Firman, Lutfi, Ikbal", desc: "Legenda dunia Harry Potter, Shrek, dan Aladin.", file: "pdf/kelompok7.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 8, judul: "Horror & Occult", anggota: "Syakir,Rizki,Waldan", desc: "The Conjuring 2,The Conjuring the devil made me do it,The Conjuring last rites.", file: "pdf/kelompok8.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 9, judul: "Myths & Modern Legends", anggota: "Andi,M Farel", desc: "Nyi roro kidul,The story of Dewi sri.", file: "pdf/kelompok9.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" },
  { id: 10, judul: "Moral & Fable", anggota: "Radit, Ilham, Rasya", desc: "Kisah dongeng Timun Mas, Malin Kundang, dan Batu Menangis.", file: "pdf/kelompok10.pdf", harga: 100000, img: "https://i.ibb.co.com/HfGF34KG/STORRYTELLING-The-act-of-binding-content-and.jpg" }
];

let purchasedItems = [];
let cart = [];
let isLoggedIn = false;

window.onload = function() {
  renderStories();
  renderStore();
};

function renderStories() {
  const storiesGrid = document.getElementById('storiesGrid');
  storiesGrid.innerHTML = '';

  kelompokData.forEach(item => {
    storiesGrid.innerHTML += `
      <div class="story-card" onclick="toggleExpandCard(this)">
        <img src="${item.img}" alt="Cover">
        <h3>${item.judul}</h3>
        <div class="story-members">Kelompok ${item.id}: ${item.anggota}</div>
        <p class="story-desc">${item.desc}</p>
        <button class="btn-gold block" onclick="event.stopPropagation(); checkAndOpenPdf(${item.id})">
          <i class="fa-solid fa-book-reader"></i> Baca Cerita (PDF)
        </button>
      </div>
    `;
  });
}

function toggleExpandCard(cardElement) {
  document.querySelectorAll('.story-card').forEach(card => {
    if (card !== cardElement) card.classList.remove('expanded');
  });
  cardElement.classList.toggle('expanded');
}

function renderStore() {
  const storeGrid = document.getElementById('storeGrid');
  storeGrid.innerHTML = '';

  kelompokData.forEach(item => {
    const isBought = purchasedItems.includes(item.id);
    storeGrid.innerHTML += `
      <div class="store-card">
        <img src="${item.img}" alt="Cover">
        <h3>E-Book ${item.judul}</h3>
        <p class="story-desc">${item.desc}</p>
        <div class="price-tag">Rp ${item.harga.toLocaleString('id-ID')}</div>
        <button class="btn-gold block" onclick="addToCart(${item.id})" ${isBought ? 'disabled style="opacity:0.6"' : ''}>
          ${isBought ? '✓ Sudah Dibeli' : '+ Tambah ke Keranjang'}
        </button>
      </div>
    `;
  });
}

function checkAndOpenPdf(id) {
  const item = kelompokData.find(k => k.id === id);
  const pdfModal = document.getElementById('pdfModal');
  const pdfTitle = document.getElementById('pdfTitle');
  const pdfStatus = document.getElementById('pdfStatus');
  const pdfContainer = document.getElementById('pdfContainer');

  pdfTitle.innerText = `Manuskrip: ${item.judul}`;

  if (purchasedItems.includes(id)) {
    pdfStatus.className = "pdf-status status-unlocked";
    pdfStatus.innerHTML = `✓ Akses Terbuka: Lisensi resmi telah aktif. Silakan membaca atau mengunduh PDF.`;
    pdfContainer.innerHTML = `<iframe id="pdfFrame" src="${item.file}" width="100%" height="500px"></iframe>`;
  } else {
    pdfStatus.className = "pdf-status status-locked";
    pdfStatus.innerHTML = `🔒 Akses Terkunci: Cerita ini belum dibeli. Silakan beli E-Book "${item.judul}" terlebih dahulu di E-Book Store!`;
    pdfContainer.innerHTML = `
      <div style="text-align:center; padding: 2rem;">
        <i class="fa-solid fa-lock" style="font-size:3rem; color:#842029; margin-bottom:1rem;"></i>
        <p>Anda belum memiliki akses ke file PDF ini.</p>
        <br>
        <a href="#store" class="btn-gold" onclick="closePdfModal()">Pergi ke E-Book Store</a>
      </div>
    `;
  }
  pdfModal.style.display = 'flex';
}

function closePdfModal() {
  document.getElementById('pdfModal').style.display = 'none';
}

function addToCart(id) {
  const item = kelompokData.find(k => k.id === id);
  if (!cart.some(c => c.id === id)) {
    cart.push(item);
    updateCartUI();
    alert(`E-Book "${item.judul}" ditambahkan ke keranjang belanja.`);
  } else {
    alert('E-Book ini sudah ada di dalam keranjang.');
  }
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
}

function openCartModal() {
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotal = document.getElementById('cartTotal');
  const cartCountSummary = document.getElementById('cartCountSummary');
  let total = 0;

  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p style="color:#666;">Keranjang masih kosong.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.harga;
      cartItemsList.innerHTML += `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
          <span>${index + 1}. ${item.judul}</span>
          <strong>Rp ${item.harga.toLocaleString('id-ID')}</strong>
        </div>
      `;
    });
  }

  cartCountSummary.innerText = cart.length;
  cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
  document.getElementById('cartModal').style.display = 'flex';
}

function closeCartModal() {
  document.getElementById('cartModal').style.display = 'none';
}

function handleCheckout(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Keranjang Anda kosong! Silakan pilih E-Book di toko.');
    return;
  }

  const name = document.getElementById('buyerName').value;
  const payment = document.querySelector('input[name="payment"]:checked').value;

  cart.forEach(item => {
    if (!purchasedItems.includes(item.id)) {
      purchasedItems.push(item.id);
    }
  });

  alert(`Terima kasih, ${name}!\nPembayaran via ${payment} berhasil. Akses baca seluruh PDF e-book yang dibeli telah terbuka!`);

  cart = [];
  updateCartUI();
  renderStore();
  closeCartModal();
}

function openLoginModal() {
  if (isLoggedIn) {
    isLoggedIn = false;
    document.getElementById('authBtn').innerHTML = '<i class="fa-solid fa-key"></i> Login';
    alert('Anda telah logout.');
  } else {
    document.getElementById('loginModal').style.display = 'flex';
  }
}

function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

// FITUR SOUND / SUARA SAAT LOGIN
function handleLogin(e) {
  e.preventDefault();
  
  const usernameInput = document.getElementById('username').value;
  isLoggedIn = true;
  document.getElementById('authBtn').innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
  closeLoginModal();

  if ('speechSynthesis' in window) {
    const textToSpeech = new SpeechSynthesisUtterance(`Selamat datang, ${usernameInput}`);
    textToSpeech.lang = 'id-ID';
    textToSpeech.rate = 0.9;
    window.speechSynthesis.speak(textToSpeech);
  }

  alert(`Selamat datang, ${usernameInput}! Anda berhasil masuk ke sesi perpustakaan.`);
}