// === CART.JS — Quản lý Giỏ hàng & Đơn hàng (Chế độ Demo Tĩnh, Không Database) ===

// ─── TIỆN ÍCH GIÁ ───
function parsePrice(priceStr) {
  // "320.000 đ" → 320000
  return parseInt(String(priceStr).replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrice(num) {
  // 320000 → "320.000 đ"
  return Number(num).toLocaleString("vi-VN") + " đ";
}

// ─── DỮ LIỆU DEMO CỐ ĐỊNH (TĨNH) ───
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

// Dọn dẹp dữ liệu cũ trong localStorage để đảm bảo không lưu thông tin vĩnh viễn
try {
  localStorage.removeItem("bb_cart");
  localStorage.removeItem("bb_orders");
} catch (e) {
  // Bỏ qua nếu môi trường chặn storage
}

// ─── GIỎ HÀNG (SESSION / MEMORY — MỖI LẦN MỞ WEB LÀ TĨNH) ───

/** Lấy giỏ hàng: Mỗi lần mở lại web luôn có sẵn các món demo tĩnh */
function getCart() {
  try {
    const sessionCart = sessionStorage.getItem("bb_cart_demo");
    if (sessionCart) {
      return JSON.parse(sessionCart);
    }
  } catch (e) {}

  // Mặc định luôn khởi tạo danh sách món demo tĩnh
  return JSON.parse(JSON.stringify(DEFAULT_DEMO_CART));
}

/** Lưu giỏ hàng tạm thời trong phiên duyệt (sessionStorage) */
function saveCart(cart) {
  try {
    sessionStorage.setItem("bb_cart_demo", JSON.stringify(cart));
  } catch (e) {}
}

/**
 * Thêm sản phẩm vào giỏ.
 * Yêu cầu: Nhấn thêm giỏ hàng thì KHÔNG THÊM (mục đích hoàn toàn demo tĩnh).
 * Giỏ hàng giữ nguyên các món demo có sẵn, không tăng thêm.
 */
function addToCart(product, qty) {
  // Không thêm sản phẩm vào giỏ hàng
  // Trả về true để giao diện (modal/toast) phản hồi thành công mượt mà khi demo
  updateCartBadge();
  return true;
}

/** Xóa sản phẩm khỏi giỏ trong phiên hiện tại */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

/** Cập nhật số lượng trong phiên hiện tại */
function updateCartQty(productId, newQty) {
  newQty = parseInt(newQty, 10);
  if (newQty < 1) {
    removeFromCart(productId);
    return;
  }
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
    updateCartBadge();
  }
}

/** Tổng số lượng món hàng */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/** Tổng tiền giỏ hàng */
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/** Đặt lại giỏ hàng về danh sách demo gốc */
function resetCartToDemo() {
  try {
    sessionStorage.removeItem("bb_cart_demo");
  } catch (e) {}
  updateCartBadge();
}

/** Xóa toàn bộ giỏ hàng trong phiên hiện tại */
function clearCart() {
  saveCart([]);
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

// ─── ĐƠN HÀNG DEMO (TĨNH) ───

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

/** Lấy tất cả đơn hàng (ưu tiên dữ liệu phiên, mặc định là đơn hàng demo tĩnh) */
function getAllOrders() {
  try {
    const sessionOrders = sessionStorage.getItem("bb_orders_demo");
    if (sessionOrders) {
      return JSON.parse(sessionOrders);
    }
  } catch (e) {}
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

/** Tạo đơn hàng demo (chỉ lưu trong phiên hiện tại) */
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
    paymentMethod: orderData.paymentMethod || "cod",
    paymentLabel:
      orderData.paymentMethod === "online"
        ? "Thanh toán trực tuyến"
        : "Tiền mặt khi nhận hàng (COD)",
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
    status:
      orderData.paymentMethod === "online" ? "Đã thanh toán" : "Đã đặt hàng",
  };

  const allOrders = getAllOrders();
  allOrders.unshift(order);
  try {
    sessionStorage.setItem("bb_orders_demo", JSON.stringify(allOrders));
  } catch (e) {}

  return order;
}

// ─── KHỞI CHẠY ───
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
});
