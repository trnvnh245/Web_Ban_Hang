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
  // --- POP MART (5 sản phẩm: 2 mới, 3 hiện tại) ---
  {
    id: "P001",
    name: "Hirono Monster's Carnival",
    brand: "POP MART",
    collection: "Hirono Carnival",
    category: "Blind Box",
    price: "320.000 đ",
    sold: 15,
    stock: 12,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P001.jpg",
  },
  {
    id: "P002",
    name: "SKULLPANDA Where Time Dwells",
    brand: "POP MART",
    collection: "SKULLPANDA Time",
    category: "Blind Box",
    price: "280.000 đ",
    sold: 8,
    stock: 6,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P002.jpg",
  },
  {
    id: "P003",
    name: "MEGA SPACE MOLLY 100%",
    brand: "POP MART",
    collection: "Space Molly",
    category: "Blind Box",
    price: "280.000 đ",
    sold: 20,
    stock: 4,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P003.jpg",
  },
  {
    id: "P004",
    name: "DIMOO Vinyl Plush Pendant",
    brand: "POP MART",
    collection: "DIMOO Retro",
    category: "Blind Box",
    price: "350.000 đ",
    sold: 10,
    stock: 14,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P004.jpg",
  },
  {
    id: "P005",
    name: "THE MONSTERS - Wacky Mart",
    brand: "POP MART",
    collection: "Wacky Mart",
    category: "Blind Box",
    price: "320.000 đ",
    sold: 12,
    stock: 10,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P005.jpg",
  },

  // --- 52TOYS (5 sản phẩm: 2 mới, 3 hiện tại) ---
  {
    id: "P006",
    name: "52TOYS - Sleepy Crayon Shin-chan",
    brand: "52TOYS",
    collection: "Shin-chan Daily",
    category: "Blind Box",
    price: "270.000 đ",
    sold: 18,
    stock: 5,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P006.jpg",
  },
  {
    id: "P007",
    name: "52TOYS - LuLu The Piggy Farm",
    brand: "52TOYS",
    collection: "LuLu Farm",
    category: "Blind Box",
    price: "280.000 đ",
    sold: 22,
    stock: 9,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P007.jpg",
  },
  {
    id: "P008",
    name: "52TOYS - Panda Roll Cozy Days",
    brand: "52TOYS",
    collection: "Panda Park",
    category: "Blind Box",
    price: "250.000 đ",
    sold: 9,
    stock: 11,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P008.jpg",
  },
  {
    id: "P009",
    name: "52TOYS - Kimmy & Miki Tea Time",
    brand: "52TOYS",
    collection: "Fairytale",
    category: "Blind Box",
    price: "260.000 đ",
    sold: 12,
    stock: 8,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P009.jpg",
  },
  {
    id: "P010",
    name: "52TOYS - MEGABOX Robot/Mecha",
    brand: "52TOYS",
    collection: "MEGABOX",
    category: "Robot / Mecha",
    price: "450.000 đ",
    sold: 25,
    stock: 4,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P010.jpg",
  },

  // --- Sonny Angel (4 sản phẩm: 1 mới, 3 hiện tại) ---
  {
    id: "P011",
    name: "Sonny Angel - Animal Series 4",
    brand: "Sonny Angel",
    collection: "Animal Series",
    category: "Mini Figure",
    price: "240.000 đ",
    sold: 30,
    stock: 15,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P011.jpg",
  },
  {
    id: "P012",
    name: "Sonny Angel - Fruit Series",
    brand: "Sonny Angel",
    collection: "Fruit Series",
    category: "Mini Figure",
    price: "240.000 đ",
    sold: 25,
    stock: 7,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P012.jpg",
  },
  {
    id: "P013",
    name: "Sonny Angel - Flower Series",
    brand: "Sonny Angel",
    collection: "Flower Series",
    category: "Mini Figure",
    price: "240.000 đ",
    sold: 19,
    stock: 10,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P013.jpg",
  },
  {
    id: "P014",
    name: "Sonny Angel - Hippers Looking Up",
    brand: "Sonny Angel",
    collection: "Hippers Series",
    category: "Mini Figure",
    price: "280.000 đ",
    sold: 35,
    stock: 3,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P014.jpg",
  },

  // --- Smiski (3 sản phẩm: 1 mới, 2 hiện tại) ---
  {
    id: "P015",
    name: "Smiski - Living Series",
    brand: "Smiski",
    collection: "Living Series",
    category: "Mini Figure",
    price: "230.000 đ",
    sold: 40,
    stock: 20,
    isNew: true,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P015.jpg",
  },
  {
    id: "P016",
    name: "Smiski - Toilet Series",
    brand: "Smiski",
    collection: "Toilet Series",
    category: "Mini Figure",
    price: "230.000 đ",
    sold: 35,
    stock: 12,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P016.jpg",
  },
  {
    id: "P017",
    name: "Smiski - Bath Series",
    brand: "Smiski",
    collection: "Bath Series",
    category: "Mini Figure",
    price: "230.000 đ",
    sold: 28,
    stock: 10,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P017.jpg",
  },

  // --- Tokidoki (3 sản phẩm: 0 mới, 3 hiện tại) ---
  {
    id: "P018",
    name: "Tokidoki - Unicorno Series 12",
    brand: "Tokidoki",
    collection: "Unicorno Series 12",
    category: "Designer Toy",
    price: "295.000 đ",
    sold: 16,
    stock: 9,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P018.jpg",
  },
  {
    id: "P019",
    name: "Tokidoki - Mermicorno Series 9",
    brand: "Tokidoki",
    collection: "Mermicorno Series 9",
    category: "Designer Toy",
    price: "295.000 đ",
    sold: 11,
    stock: 7,
    isNew: false,
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P019.jpg",
  },
  {
    id: "P020",
    name: "Tokidoki - Cactus Friends",
    brand: "Tokidoki",
    collection: "Cactus Friends",
    category: "Designer Toy",
    price: "285.000 đ",
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
     <img src="${item.image}" alt="${item.name}" class="product-img" 
onclick="location.href='product-detail.html?id=${item.id}'"" onError="this.src='https://via.placeholder.com/240x240'" />
      <div class="product-info">
        <div class="product-meta-top">
          <span class="product-brand">${item.brand}</span>
          <span class="product-sku">${item.id}</span>
        </div>
        <h3 class="product-title" onclick="location.href='product-detail.html?id=${item.id}'">${item.name}</h3>
        <div class="product-price">${item.price}</div>
        <div class="product-bottom-actions">
          <button class="btn-add-cart-red" onclick="location.href='product-detail.html?id=${item.id}'">
  <i class="fa-solid fa-cart-shopping"></i> Mua ngay
</button>
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
            "success",
          );
        } else {
          alert('Đã thêm "' + item.name + '" vào giỏ hàng!');
        }
      }
    });
  }
});
