// === CART.JS — Quản lý Giỏ hàng & Đơn hàng (Chế độ Demo Tĩnh, Không Database) ===
// === Mọi thao tác chỉ mang tính hình thức — KHÔNG thay đổi dữ liệu thực tế ===

// ─── TIỆN ÍCH GIÁ ───
function parsePrice(priceStr) {
  // "320.000 đ" → 320000
  return parseInt(String(priceStr).replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrice(num) {
  // 320000 → "320.000 đ"
  return Number(num).toLocaleString("vi-VN") + " đ";
}

// ─── DỮ LIỆU DEMO CỐ ĐỊNH (TĨNH — KHÔNG THAY ĐỔI) ───
const DEFAULT_DEMO_CART = [
  {
    id: "P001",
    name: "Hirono Monster's Carnival",
    brand: "POP MART",
    collection: "Hirono Carnival",
    category: "Blind Box",
    price: 320000,
    priceDisplay: "320.000 đ",
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P001.jpg",
    quantity: 1,
  },
  {
    id: "P002",
    name: "SKULLPANDA Where Time Dwells",
    brand: "POP MART",
    collection: "SKULLPANDA Time",
    category: "Blind Box",
    price: 280000,
    priceDisplay: "280.000 đ",
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P002.jpg",
    quantity: 2,
  },
  {
    id: "P011",
    name: "Sonny Angel - Animal Series 4",
    brand: "Sonny Angel",
    collection: "Animal Series",
    category: "Mini Figure",
    price: 240000,
    priceDisplay: "240.000 đ",
    image: "../TaiNguyen_5Brand_20Mon/Hinh/P011.jpg",
    quantity: 1,
  },
];

// Dọn dẹp dữ liệu cũ từ localStorage cũ nếu có
try {
  localStorage.removeItem("bb_cart");
} catch (e) {
  // Bỏ qua nếu môi trường chặn storage
}

// ─── GIỎ HÀNG DEMO (DANH SÁCH CỐ ĐỊNH, KHÔNG CHO SỬA SỐ LƯỢNG) ───

/** Lấy giỏ hàng — luôn trả về danh sách cố định, không đọc sessionStorage */
function getCart() {
  return JSON.parse(JSON.stringify(DEFAULT_DEMO_CART));
}

/** Lưu giỏ hàng — hình thức, không lưu gì cả */
function saveCart(cart) {
  // Demo tĩnh: không lưu thay đổi
}

/**
 * Giỏ hàng demo không cho phép thêm sản phẩm.
 */
function addToCart(product, qty) {
  const message =
    "Giỏ hàng mẫu đã cố định — không thể thêm, xóa hoặc sửa.";
  if (typeof showToast === "function") {
    showToast(message, "info", 2000);
  } else {
    alert(message);
  }
  return false;
}

/** Xóa sản phẩm: Web tĩnh demo KHÔNG cho phép xóa ra khỏi danh sách */
function removeFromCart(productId) {
  if (typeof showToast === "function") {
    showToast("Website demo: Danh sách sản phẩm được giữ cố định, không xóa.", "info", 2000);
  }
  return false;
}

/** Cập nhật số lượng: Hình thức — hiển thị toast nhưng KHÔNG thay đổi dữ liệu */
function updateCartQty(productId, newQty) {
  if (typeof showToast === "function") {
    showToast("Giỏ hàng demo: Số lượng được giữ cố định.", "info", 1500);
  }
  return false;
}

/** Tổng số lượng món hàng */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/** Tổng tiền giỏ hàng */
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Đặt lại giỏ hàng về danh sách demo gốc — hình thức */
function resetCartToDemo() {
  updateCartBadge();
}

/** Xóa toàn bộ giỏ hàng: Web tĩnh demo không làm rỗng giỏ */
function clearCart() {
  updateCartBadge();
}

/** Cập nhật badge số lượng trên header */
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll(".cart-badge").forEach((badge) => {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

// ─── ĐƠN HÀNG DEMO (TĨNH — MẶC ĐỊNH 2 ĐƠN) ───

const DEFAULT_DEMO_ORDERS = [
  {
    orderId: "ORD-DEMO-20261023-01",
    username: "demo",
    fullName: "Khách Demo",
    phone: "0901234567",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    paymentMethod: "cod",
    paymentLabel: "Tiền mặt khi nhận hàng (COD)",
    items: [
      {
        id: "P005",
        name: "THE MONSTERS - Wacky Mart",
        brand: "POP MART",
        price: 320000,
        priceDisplay: "320.000 đ",
        image: "../TaiNguyen_5Brand_20Mon/Hinh/P005.jpg",
        quantity: 1,
        subtotal: 320000,
      },
      {
        id: "P006",
        name: "52TOYS - Sleepy Crayon Shin-chan",
        brand: "52TOYS",
        price: 270000,
        priceDisplay: "270.000 đ",
        image: "../TaiNguyen_5Brand_20Mon/Hinh/P006.jpg",
        quantity: 1,
        subtotal: 270000,
      },
    ],
    total: 590000,
    totalDisplay: "590.000 đ",
    itemCount: 2,
    createdAt: "2026-10-23T14:30:00.000Z",
    status: "Đã đặt hàng",
  },
  {
    orderId: "ORD-DEMO-20261018-02",
    username: "demo",
    fullName: "Khách Demo",
    phone: "0901234567",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
    paymentMethod: "cod",
    paymentLabel: "Tiền mặt khi nhận hàng (COD)",
    items: [
      {
        id: "P011",
        name: "Sonny Angel - Animal Series 4",
        brand: "Sonny Angel",
        price: 240000,
        priceDisplay: "240.000 đ",
        image: "../TaiNguyen_5Brand_20Mon/Hinh/P011.jpg",
        quantity: 2,
        subtotal: 480000,
      },
      {
        id: "P015",
        name: "Smiski - Living Series",
        brand: "Smiski",
        price: 230000,
        priceDisplay: "230.000 đ",
        image: "../TaiNguyen_5Brand_20Mon/Hinh/P015.jpg",
        quantity: 1,
        subtotal: 230000,
      },
    ],
    total: 710000,
    totalDisplay: "710.000 đ",
    itemCount: 3,
    createdAt: "2026-10-18T10:15:00.000Z",
    status: "Đã đặt hàng",
  },
];

/** Tạo mã đơn hàng demo duy nhất */
function generateOrderId() {
  const now = new Date();
  const datePart =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return "ORD-" + datePart + "-" + rand;
}

/** Lấy tất cả đơn hàng — luôn trả về danh sách cố định, không đọc sessionStorage */
function getAllOrders() {
  return JSON.parse(JSON.stringify(DEFAULT_DEMO_ORDERS));
}

/** Lấy đơn hàng của user */
function getUserOrders() {
  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  if (!user) return getAllOrders();
  return getAllOrders().filter(
    (o) => o.username.toLowerCase() === user.username.toLowerCase()
  );
}

/** Tạo đơn hàng demo — hình thức, tạo object trả về nhưng KHÔNG lưu vào sessionStorage */
function createOrder(orderData) {
  const user = typeof getCurrentUser === "function" ? getCurrentUser() : {
    username: "demo",
    fullName: "Khách Demo",
    phone: "0901234567",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  };

  const cartItems = getCart();
  if (cartItems.length === 0) return null;

  const total = getCartTotal();

  const order = {
    orderId: generateOrderId(),
    username: user.username,
    fullName: user.fullName,
    phone: user.phone,
    address: orderData.address || user.address || "",
    paymentMethod: "cod",
    paymentLabel: "Tiền mặt khi nhận hàng (COD)",
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      priceDisplay: formatPrice(item.price),
      image: item.image,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    })),
    total: total,
    totalDisplay: formatPrice(total),
    itemCount: cartItems.reduce((s, i) => s + i.quantity, 0),
    createdAt: new Date().toISOString(),
    status: "Đã đặt hàng",
  };

  // Demo tĩnh: KHÔNG lưu vào sessionStorage — đơn hàng chỉ hiển thị trên trang thành công
  // Lịch sử đơn hàng luôn giữ nguyên 2 đơn mặc định

  return order;
}

// ─── KHỞI CHẠY ───
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
