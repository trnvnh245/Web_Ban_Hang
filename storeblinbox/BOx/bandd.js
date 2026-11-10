// --- XỬ LÝ BANNER SLIDER TỰ ĐỘNG CHUYỂN ẢNH ---
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (slides.length === 0) return;

  let currentSlide = 0;
  const slideIntervalTime = 4000;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, slideIntervalTime);
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAutoSlide();
      goToSlide(index);
      startAutoSlide();
    });
  });

  startAutoSlide();
});

// Dữ liệu 20 sản phẩm (5 Thương hiệu x 4 Sản phẩm)
// Dữ liệu chuẩn xác 20 sản phẩm theo file tài nguyên Blind Box (5 Thương hiệu)
const products = [
  {
    id: "P001",
    name: "Hirono",
    brand: "POP MART",
    collection: "Hirono Monster Carnival Series",
    category: "Blind Box",
    price: "320,000".replace(/,/g, ".") + " đ",
    sold: 15,
    stock: 12,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P001.jpg",
  },
  {
    id: "P002",
    name: "SKULLPANDA",
    brand: "POP MART",
    collection: "SKULLPANDA Where Time Dwells Series",
    category: "Blind Box",
    price: "280,000".replace(/,/g, ".") + " đ",
    sold: 8,
    stock: 6,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P002.jpg",
  },
  {
    id: "P003",
    name: "MOLLY",
    brand: "POP MART",
    collection: "MEGA SPACE MOLLY 100%",
    category: "Blind Box",
    price: "280,000".replace(/,/g, ".") + " đ",
    sold: 20,
    stock: 4,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P003.jpg",
  },
  {
    id: "P004",
    name: "Dimoo",
    brand: "POP MART",
    collection: "Dimoo Vinyl PLush Series",
    category: "Blind Box",
    price: "350,000".replace(/,/g, ".") + " đ",
    sold: 10,
    stock: 14,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P004.jpg",
  },
  {
    id: "P005",
    name: "Labubu",
    brand: "POP MART",
    collection: "Wacky mart Series",
    category: "Blind Box",
    price: "320,000".replace(/,/g, ".") + " đ",
    sold: 12,
    stock: 10,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P005.jpg",
  },
  {
    id: "P006",
    name: "BEASTBOX DIO",
    brand: "52TOYS",
    collection: "BEASTBOX BB-01 DIO LITE",
    category: "Robot / Mecha",
    price: "220,000".replace(/,/g, ".") + " đ",
    sold: 18,
    stock: 5,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P006.jpg",
  },
  {
    id: "P007",
    name: "BEASDRIVE WHEEL REPTOR",
    brand: "52TOYS",
    collection: "BEASTDIVE BD-01 WHEEL RAPTOR",
    category: "Robot / Mecha",
    price: "520,000".replace(/,/g, ".") + " đ",
    sold: 22,
    stock: 9,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P007.jpg",
  },
  {
    id: "P008",
    name: "MEGAOBX Gazelle",
    brand: "52TOYS",
    collection: "Nyota I Am Not Fluffy Series",
    category: "Robot / Mecha",
    price: "550,000".replace(/,/g, ".") + " đ",
    sold: 9,
    stock: 11,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P008.jpg",
  },
  {
    id: "P009",
    name: "BEASTBOX Shovelhead",
    brand: "52TOYS",
    collection: "BEASTBOX Heavy Mecha",
    category: "Robot / Mecha",
    price: "799,000".replace(/,/g, ".") + " đ",
    sold: 12,
    stock: 8,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P009.jpg",
  },
  {
    id: "P010",
    name: "BEASTDRIVE",
    brand: "52TOYS",
    collection: "BEASTDRIVE Armor Stare Void",
    category: "Robot / Mecha",
    price: "480,000".replace(/,/g, ".") + " đ",
    sold: 25,
    stock: 4,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P010.jpg",
  },
  {
    id: "P011",
    name: "Animal",
    brand: "Sonny Angel",
    collection: "Animal Series 1",
    category: "Mini Figure",
    price: "249,000".replace(/,/g, ".") + " đ",
    sold: 30,
    stock: 15,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P011.jpg",
  },
  {
    id: "P012",
    name: "Snack Series",
    brand: "Sonny Angel",
    collection: "Snack Series",
    category: "Mini Figure",
    price: "249,000".replace(/,/g, ".") + " đ",
    sold: 25,
    stock: 7,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P012.jpg",
  },
  {
    id: "P013",
    name: "HIPPERS",
    brand: "Sonny Angel",
    collection: "HIPPERS Series",
    category: "Mini Figure",
    price: "299,000".replace(/,/g, ".") + " đ",
    sold: 19,
    stock: 10,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P013.jpg",
  },
  {
    id: "P014",
    name: "FLower",
    brand: "Sonny Angel",
    collection: "Flower Series",
    category: "Mini Figure",
    price: "249,000".replace(/,/g, ".") + " đ",
    sold: 35,
    stock: 3,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P014.jpg",
  },
  {
    id: "P015",
    name: "Series 1",
    brand: "Smiski",
    collection: "Series 1",
    category: "Mini Figure",
    price: "220,000".replace(/,/g, ".") + " đ",
    sold: 40,
    stock: 20,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P015.jpg",
  },
  {
    id: "P016",
    name: "Living",
    brand: "Smiski",
    collection: "Living Series",
    category: "Mini Figure",
    price: "249,000".replace(/,/g, ".") + " đ",
    sold: 35,
    stock: 12,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P016.jpg",
  },
  {
    id: "P017",
    name: "Work",
    brand: "Smiski",
    collection: "Work Series",
    category: "Mini Figure",
    price: "249,000".replace(/,/g, ".") + " đ",
    sold: 28,
    stock: 10,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P017.jpg",
  },
  {
    id: "P018",
    name: "Unicorno",
    brand: "Tokidoki",
    collection: "Unicorno Series",
    category: "Designer Toy / Blind Box",
    price: "280,000".replace(/,/g, ".") + " đ",
    sold: 16,
    stock: 9,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P018.jpg",
  },
  {
    id: "P019",
    name: "Mermicorno",
    brand: "Tokidoki",
    collection: "Mermicorno Series",
    category: "Designer Toy / Blind Box",
    price: "319,000".replace(/,/g, ".") + " đ",
    sold: 11,
    stock: 7,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P019.jpg",
  },
  {
    id: "P020",
    name: "After Dark",
    brand: "Tokidoki",
    collection: "After Dark Series",
    category: "Designer Toy / Blind Box",
    price: "329,000".replace(/,/g, ".") + " đ",
    sold: 13,
    stock: 8,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P020.jpg",
  },
];

// Hàm render sản phẩm chung có hỗ trợ hiển thị nhãn "New"
function renderProductsByContainer(list, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 20px;">Không tìm thấy sản phẩm phù hợp.</p>`;
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.position = "relative";

    // Nếu sản phẩm là sản phẩm mới, tự động dán nhãn "NEW"
    let newBadgeHtml = item.isNew
      ? `<span class="badge-new" style="position: absolute; top: 15px; left: 15px; background-color: #dc2626; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 6px; z-index: 2; text-transform: uppercase;">New</span>`
      : "";

    card.innerHTML = `
      ${newBadgeHtml}
      <img src="${item.image}" alt="${item.name}" class="product-img" onclick="openModal('${item.id}')" onError="this.src='https://via.placeholder.com/240x240'" />
      <div class="product-info">
        <div class="product-meta-top">
          <span class="product-brand">${item.brand}</span>
          <span class="product-sku">${item.id}</span>
        </div>
        <h3 class="product-title" onclick="openModal('${item.id}')">${item.name}</h3>
        <div class="product-price">${item.price}</div>
        <div class="product-bottom-actions">
          <button class="btn-add-cart-red" onclick="openModal('${item.id}')">
            <i class="fa-solid fa-cart-shopping"></i> Mua ngay
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Xử lý Modal
let currentModalId = null;

function openModal(id) {
  const modal = document.getElementById("productModal");
  const item = products.find((p) => p.id === id);
  if (!item || !modal) return;

  currentModalId = id;
  const qtyInput = document.getElementById("modalQty");
  if (qtyInput) qtyInput.value = 1;

  document.getElementById("modalImg").src = item.image;
  document.getElementById("modalTitle").innerText = item.name;
  document.getElementById("modalCode").innerText = item.id;
  document.getElementById("modalBrand").innerText = item.brand;
  document.getElementById("modalCollection").innerText = item.collection;
  if (document.getElementById("modalCategory"))
    document.getElementById("modalCategory").innerText = item.category;
  document.getElementById("modalPrice").innerText = item.price;
  if (document.getElementById("modalSold"))
    document.getElementById("modalSold").innerText = item.sold;
  if (document.getElementById("modalStock"))
    document.getElementById("modalStock").innerText = item.stock;

  modal.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("productModal");
  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.classList.remove("show"));
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }

  // Nút "Thêm Vào Giỏ Hàng" trong modal sản phẩm
  const addBtn = document.getElementById("modalAddToCart");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const item = products.find((p) => p.id === currentModalId);
      if (!item) return;

      if (typeof addToCart !== "function") {
        alert("Không thể thêm vào giỏ hàng. Vui lòng tải lại trang.");
        return;
      }

      const qtyInput = document.getElementById("modalQty");
      let qty = parseInt(qtyInput ? qtyInput.value : 1, 10);
      if (!qty || qty < 1) qty = 1;

      if (addToCart(item, qty)) {
        if (modal) modal.classList.remove("show");
        if (typeof showToast === "function") {
          showToast(
            'Đã thêm "' + item.name + '" (' + qty + ") vào giỏ hàng!",
            "success"
          );
        } else {
          alert('Đã thêm "' + item.name + '" vào giỏ hàng!');
        }
      }
    });
  }
});
