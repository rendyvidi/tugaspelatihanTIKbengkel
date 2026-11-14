// DATA SEMUA LAYANAN BENGKEL
const services = [
  {
    id: 1,
    name: "Ganti Oli Mesin & Filter",
    category: "mesin",
    categoryLabel: "Mesin & Oli",
    price: 125000,
    duration: 30,
    description: "Penggantian oli mesin sintetik berkualitas beserta pembersihan atau penggantian filter oli.",
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Tune Up Mesin Lengkap",
    category: "mesin",
    categoryLabel: "Mesin & Oli",
    price: 250000,
    duration: 60,
    description: "Pembersihan ruang bakar, throttle body, cek busi, filter udara, dan penyetelan performa mesin.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Servis Rem & Ganti Kampas",
    category: "kaki",
    categoryLabel: "Kaki-kaki & Ban",
    price: 150000,
    duration: 45,
    description: "Pemeriksaan cakram, pembersihan kaliper, kuras minyak rem, dan penggantian kampas rem.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Spooring & Balancing Ban",
    category: "kaki",
    categoryLabel: "Kaki-kaki & Ban",
    price: 200000,
    duration: 50,
    description: "Meluruskan sudut roda agar kemudi stabil dan mencegah keausan ban yang tidak merata.",
    image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Cek & Ganti Aki (Battery)",
    category: "kelistrikan",
    categoryLabel: "Kelistrikan",
    price: 450000,
    duration: 20,
    description: "Pengecekan tegangan alternator, arus pengisian, dan pemasangan aki kering baru bergaransi.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Servis Lampu & Kelistrikan",
    category: "kelistrikan",
    categoryLabel: "Kelistrikan",
    price: 100000,
    duration: 40,
    description: "Perbaikan jalur kabel, sekring, klakson, serta upgrade atau penyetelan fokus lampu utama.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];
let currentCategory = "semua";
let searchQuery = "";

const serviceGrid = document.getElementById("service-grid");
const filterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const btnCart = document.getElementById("btn-cart");
const closeModal = document.getElementById("close-modal");
const cartItemsContainer = document.getElementById("cart-items");
const totalTimeEl = document.getElementById("total-time");
const totalPriceEl = document.getElementById("total-price");
const bookingForm = document.getElementById("booking-form");

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Fungsi menampilkan semua layanan
function renderServices() {
  const filtered = services.filter((item) => {
    const matchCategory = currentCategory === "semua" || item.category === currentCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    serviceGrid.innerHTML = `<p style="color:#a3a3a3;">Layanan tidak ditemukan.</p>`;
    return;
  }

  serviceGrid.innerHTML = filtered
    .map(
      (service) => `
      <div class="card">
        <img src="${service.image}" alt="${service.name}" class="card-img" />
        <div class="card-body">
          <span class="badge">${service.categoryLabel}</span>
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <div class="card-meta">
            <span>⏱️ ${service.duration} Menit</span>
            <span class="price">${formatRupiah(service.price)}</span>
          </div>
          <button class="add-btn" onclick="addToCart(${service.id})">
            + Tambah ke Estimasi
          </button>
        </div>
      </div>
    `
    )
    .join("");
}

function addToCart(id) {
  const selected = services.find((s) => s.id === id);
  if (selected) {
    cart.push(selected);
    updateCartUI();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Belum ada layanan yang dipilih.</p>`;
    totalTimeEl.textContent = "0 Menit";
    totalPriceEl.textContent = "Rp 0";
    return;
  }

  let totalDuration = 0;
  let totalPrice = 0;

  cartItemsContainer.innerHTML = cart
    .map((item, idx) => {
      totalDuration += item.duration;
      totalPrice += item.price;
      return `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong><br />
            <small>${formatRupiah(item.price)} •${item.duration} mnt</small>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${idx})">Hapus</button>
        </div>
      `;
    })
    .join("");

  totalTimeEl.textContent = `${totalDuration} Menit`;
  totalPriceEl.textContent = formatRupiah(totalPrice);
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    renderServices();
  });
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderServices();
});

btnCart.addEventListener("click", () => cartModal.classList.remove("hidden"));
closeModal.addEventListener("click", () => cartModal.classList.add("hidden"));

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Pilih minimal 1 layanan terlebih dahulu!");
    return;
  }

  const name = document.getElementById("customer-name").value;
  const vehicle = document.getElementById("vehicle-type").value;
  const date = document.getElementById("booking-date").value;

  alert(
    `Booking Berhasil!\n\nNama: ${name}\nKendaraan:${vehicle}\nTanggal: ${date}\nJumlah Layanan:${cart.length} item`
  );

  cart = [];
  updateCartUI();
  bookingForm.reset();
  cartModal.classList.add("hidden");
});

// Baris wajib agar semua layanan langsung muncul saat halaman dibuka:
renderServices();
