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

// Dọn dẹp dữ liệu cũ từ localStorage cũ nếu có
try {
  localStorage.removeItem("bb_cart");
} catch (e) {
  // Bỏ qua nếu môi trường chặn storage
}

// ─── GIỎ HÀNG DEMO (DANH SÁCH CỐ ĐỊNH, CHỈ ĐỔI ĐƯỢC SỐ LƯỢNG) ───

/** Lấy giỏ hàng */
function getCart() {
  try {
    const raw = sessionStorage.getItem("bb_cart_demo");
    if (raw) {
      const saved = JSON.parse(raw);
      if (Array.isArray(saved)) {
        return DEFAULT_DEMO_CART.map((demoItem) => {
          const savedItem = saved.find((item) => item && item.id === demoItem.id);
          const savedQty = parseInt(savedItem && savedItem.quantity, 10);
          return {
            ...demoItem,
            quantity: Number.isFinite(savedQty)
              ? Math.min(99, Math.max(1, savedQty))
              : demoItem.quantity,
          };
        });
      }
    }
  } catch (e) {}

  // Chỉ cho phép sản phẩm và thông tin sản phẩm từ danh sách demo cố định.
  return JSON.parse(JSON.stringify(DEFAULT_DEMO_CART));
}

/** Lưu giỏ hàng tạm thời cho phiên demo */
function saveCart(cart) {
  try {
    const fixedCart = DEFAULT_DEMO_CART.map((demoItem) => {
      const item = cart.find((cartItem) => cartItem.id === demoItem.id);
      const quantity = parseInt(item && item.quantity, 10);
      return {
        ...demoItem,
        quantity: Number.isFinite(quantity)
          ? Math.min(99, Math.max(1, quantity))
          : demoItem.quantity,
      };
    });
    sessionStorage.setItem("bb_cart_demo", JSON.stringify(fixedCart));
  } catch (e) {}
}

/**
 * Giỏ hàng demo không cho phép thêm sản phẩm.
 */
function addToCart(product, qty) {
  const message =
    "Giỏ hàng mẫu đã cố định. Chỉ có thể thay đổi số lượng trong giỏ.";
  if (typeof showToast === "function") {
    showToast(message, "info", 2000);
  } else {
    alert(message);
  }
  return false;
}

/** Xóa sản phẩm: Web tĩnh demo KHÔNG cho phép xóa ra khỏi danh sách */
function removeFromCart(productId) {
  // Web tĩnh demo: không xóa sản phẩm ra khỏi danh sách
  if (typeof showToast === "function") {
    showToast("Website demo: Danh sách sản phẩm được giữ cố định, không xóa.", "info", 2000);
  }
  return false;
}

/** Cập nhật số lượng: Hỗ trợ tăng/giảm số lượng nhưng KHÔNG giảm dưới 1 và KHÔNG xóa sản phẩm */
function updateCartQty(productId, newQty) {
  newQty = parseInt(newQty, 10);
  if (isNaN(newQty) || newQty < 1) {
    if (typeof showToast === "function") {
      showToast("Số lượng tối thiểu là 1 sản phẩm.", "info", 1500);
    }
    return;
  }
  if (newQty > 99) newQty = 99;

  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
    updateCartBadge();
    return true;
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

/** Đặt lại giỏ hàng về danh sách demo gốc */
function resetCartToDemo() {
  try {
    sessionStorage.removeItem("bb_cart_demo");
  } catch (e) {}
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
