# Mystery World Blind Box Store

> Đồ án Lập trình Web & Ứng dụng — Website bán Blind Box trực tuyến.

---

## Mục Lục

- [Tổng quan](#tổng-quan)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Chức năng đã hoàn thành](#chức-năng-đã-hoàn-thành)
- [Chi tiết từng file](#chi-tiết-từng-file)
- [Dữ liệu & Tài nguyên](#dữ-liệu--tài-nguyên)
- [Cách sử dụng / Test](#cách-sử-dụng--test)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)

---

## Tổng Quan

Website bán Blind Box với **5 thương hiệu** (POP MART, 52TOYS, Sonny Angel, Smiski, Tokidoki) và **20 sản phẩm mẫu**. Toàn bộ front-end thuần (HTML + CSS + JS), dữ liệu lưu trữ bằng `localStorage`.

---

## Cấu Trúc Thư Mục

```
storeblinbox/
├── BOx/                          ← Mã nguồn website
│   ├── home.html                 ← Trang chủ (Hero banner, thương hiệu, sản phẩm nổi bật)
│   ├── shop.html                 ← Cửa hàng (Danh sách SP, bộ lọc nâng cao, modal chi tiết)
│   ├── register.html             ← Đăng ký tài khoản người mua
│   ├── login.html                ← Đăng nhập
│   ├── cart.html                 ← Giỏ hàng
│   ├── checkout.html             ← Thanh toán đơn hàng
│   ├── orders.html               ← Lịch sử đơn hàng
│   │
│   ├── layout.css                ← CSS chung (reset, hero banner, slider)
│   ├── header.css                ← CSS header (navbar, search, nav links)
│   ├── product.css               ← CSS thẻ sản phẩm & modal chi tiết
│   ├── shop1.css                 ← CSS riêng trang cửa hàng (sidebar, grid)
│   ├── auth.css                  ← CSS trang đăng ký & đăng nhập
│   ├── cart.css                  ← CSS giỏ hàng, checkout, lịch sử đơn hàng
│   │
│   ├── box.js                    ← Slider banner + Dữ liệu sản phẩm + Render + Modal
│   ├── auth.js                   ← Đăng ký / Đăng nhập / Đăng xuất (localStorage)
│   └── cart.js                   ← Giỏ hàng / Đơn hàng / Badge (localStorage)
│
├── TaiNguyen_5Brand_20Mon/       ← Tài nguyên dữ liệu gốc
│   ├── Hinh/                     ← 20 ảnh sản phẩm thực (P001.jpg – P020.jpg)
│   ├── products.csv              ← Dữ liệu 20 sản phẩm (ID, brand, model, giá...)
│   ├── brands.csv                ← 5 thương hiệu
│   ├── categories.csv            ← 4 phân loại danh mục
│   ├── assets.csv                ← Danh sách tài nguyên logo/banner cần chuẩn bị
│   ├── sources.csv               ← Nguồn tham khảo
│   ├── DATA_WEB_BLINDBOX_20MON.xlsx ← File Excel tổng hợp
│   └── README.txt                ← Ghi chú về bộ tài nguyên
│
├── 1.png                         ← Ảnh yêu cầu đồ án (chi tiết chức năng mua hàng)
├── 2.png                         ← Ảnh thang điểm đồ án
└── README.md                     ← File này
```

---

## Chức Năng Đã Hoàn Thành

### 1. Giao diện trang chủ & cửa hàng ✅
- **Trang chủ** (`home.html`): Hero banner slider tự động xoay ảnh, danh mục thương hiệu, sản phẩm nổi bật.
- **Cửa hàng** (`shop.html`): Hiển thị grid sản phẩm, thanh lọc nâng cao (tên, brand, collection, khoảng giá, trạng thái), modal xem chi tiết.

### 2. Đăng ký tài khoản người mua ✅
- **Đăng ký** (`register.html`): Form gồm họ tên, SĐT, tên đăng nhập, mật khẩu, xác nhận mật khẩu, địa chỉ nhận hàng mặc định.
- **Validate đầy đủ**: Tên đăng nhập 4–30 ký tự (chữ/số/`_`), mật khẩu ≥ 6 ký tự, xác nhận MK khớp, SĐT 10 số (bắt đầu `0`), kiểm tra trùng username.
- **Đăng nhập** (`login.html`): So khớp username + password từ localStorage.
- **Toggle hiện/ẩn mật khẩu**: Nhấn icon mắt.
- **Header thông minh**: Khi đã đăng nhập → hiển thị tên user + nút đăng xuất; khi chưa → hiển thị link "Tài khoản".

### 3. Giỏ hàng & Mua hàng ✅
- **Thêm vào giỏ**: Từ modal chi tiết sản phẩm trên trang cửa hàng, chọn số lượng → "Thêm Vào Giỏ Hàng".
- **Yêu cầu đăng nhập**: Nếu chưa đăng nhập → tự chuyển hướng tới trang login.
- **Trang giỏ hàng** (`cart.html`): Xem danh sách sản phẩm, tăng/giảm số lượng, xóa sản phẩm, tổng tiền, nút "Tiến hành thanh toán".
- **Badge giỏ hàng**: Tự động cập nhật số lượng trên icon giỏ hàng ở header mọi trang.

### 4. Thanh toán ✅
- **Trang thanh toán** (`checkout.html`):
  - Tự động hiển thị thông tin người mua (họ tên, SĐT, tài khoản) — **không cần nhập lại**.
  - **Chọn địa chỉ nhận hàng**: dùng địa chỉ mặc định của tài khoản HOẶC nhập địa chỉ mới.
  - **Chọn hình thức thanh toán**: Tiền mặt khi nhận hàng (COD) hoặc Thanh toán trực tuyến — **KHÔNG yêu cầu trang cổng thanh toán**.
  - Tóm tắt đơn hàng (danh sách SP, số lượng, đơn giá, tổng tiền).
- **Xác nhận đặt hàng**: Tạo mã đơn duy nhất (ORD-YYYYMMDD-XXXX), lưu vào localStorage, xóa giỏ hàng, hiển thị màn hình **đặt hàng thành công** kèm toàn bộ thông tin đơn.

### 5. Lịch sử đơn hàng ✅
- **Trang lịch sử** (`orders.html`): Hiển thị tất cả đơn hàng của người dùng đang đăng nhập.
- **Gom nhóm theo đơn hàng**: Mỗi đơn hiện mã đơn, ngày đặt, trạng thái, danh sách sản phẩm (ảnh, tên, SL, giá), địa chỉ giao hàng, phương thức thanh toán, tổng tiền.
- Đơn mới nhất hiển thị trên cùng.

---

## Chi Tiết Từng File

### JavaScript

| File | Vai trò | Hàm chính |
|------|---------|-----------|
| `box.js` | Slider banner + Dữ liệu sản phẩm + Render grid + Modal chi tiết | `renderProducts()`, `openModal()`, `goToSlide()` |
| `auth.js` | Đăng ký / Đăng nhập / Đăng xuất | `getUsers()`, `getCurrentUser()`, `setCurrentUser()`, `logoutUser()`, `updateHeaderAuth()` |
| `cart.js` | Giỏ hàng & Đơn hàng | `addToCart()`, `removeFromCart()`, `updateCartQty()`, `getCartTotal()`, `createOrder()`, `getUserOrders()`, `updateCartBadge()` |

### CSS

| File | Phạm vi |
|------|---------|
| `layout.css` | Reset, hero banner, slider controls, CTA button |
| `header.css` | Navbar, search bar, nav links 4 mục, brand cards |
| `product.css` | Product card, modal overlay |
| `shop1.css` | Filter sidebar, shop grid layout |
| `auth.css` | Form đăng ký/đăng nhập, input styles, messages |
| `cart.css` | Bảng giỏ hàng, checkout layout, order cards, responsive |

### Lưu trữ dữ liệu (localStorage)

| Key | Kiểu | Mô tả |
|-----|------|-------|
| `bb_users` | Array | Danh sách tài khoản đã đăng ký |
| `bb_current_user` | Object | Thông tin user đang đăng nhập |
| `bb_cart` | Array | Giỏ hàng hiện tại (items: id, name, brand, price, quantity, image) |
| `bb_orders` | Array | Tất cả đơn hàng (orderId, username, items, total, address, paymentMethod, createdAt, status) |

---

## Dữ Liệu & Tài Nguyên

Thư mục `TaiNguyen_5Brand_20Mon/` chứa:
- **20 ảnh sản phẩm thực** (`Hinh/P001.jpg` – `P020.jpg`)
- **products.csv**: 20 sản phẩm với đầy đủ ID, brand, model, series, category, giá VNĐ
- **brands.csv**: 5 thương hiệu (POP MART, 52TOYS, Sonny Angel, Smiski, Tokidoki)
- **categories.csv**: 4 danh mục (Blind Box, Mini Figure, Designer Toy, Robot / Mecha)

> **Lưu ý**: Hiện tại `box.js` mới dùng 4 sản phẩm mock với ảnh placeholder. Cần cập nhật để dùng đủ 20 sản phẩm từ CSV và ảnh thực trong thư mục `Hinh/`.

---

## Cách Sử Dụng / Test

1. Mở `BOx/home.html` trong trình duyệt.
2. Nhấn **"Tài khoản"** trên header → vào trang Đăng nhập → nhấn **"Đăng ký ngay"**.
3. Điền form đăng ký → Đăng ký thành công → Tự chuyển tới Đăng nhập.
4. Đăng nhập bằng tài khoản vừa tạo.
5. Vào **Cửa Hàng** → Click sản phẩm → Chọn số lượng → **"Thêm Vào Giỏ Hàng"**.
6. Nhấn **"Giỏ hàng"** trên header → Xem/sửa giỏ → **"Tiến Hành Thanh Toán"**.
7. Chọn địa chỉ, phương thức thanh toán → **"Xác Nhận Đặt Hàng"**.
8. Xem kết quả đơn hàng → Nhấn **"Xem Lịch Sử"** để xem tất cả đơn đã đặt.

---

## Công Nghệ Sử Dụng

- **HTML5 / CSS3** — Cấu trúc & giao diện
- **JavaScript (ES6+)** — Logic nghiệp vụ phía client
- **localStorage** — Lưu trữ dữ liệu (thay thế database cho đồ án front-end)
- **Font Awesome 6** — Icon
- **Google Fonts** — Montserrat, Playfair Display, Dancing Script

--- 
## BUG
- **Cửa hàng** — Khi từ cửa hàng qua `Sản Phẩm mới` và `Thương hiệu` có hiện tượng bị giữ lại ở `Cửa hàng`.
- **Giỏ hàng** Tương tự như `Cửa hàng` 
