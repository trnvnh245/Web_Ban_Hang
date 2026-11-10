// 1. DỮ LIỆU NGƯỜI DÙNG (USERS)
const DANH_SACH_NGUOI_DUNG = [
  {
    ma: "ND001",
    ten: "Nguyễn Minh Anh",
    email: "anh@mail.com",
    sdt: "0901234567",
    trangThai: "hoat_dong",
  },
  {
    ma: "ND002",
    ten: "Trần Quốc Bảo",
    email: "bao@mail.com",
    sdt: "0912345678",
    trangThai: "hoat_dong",
  },
  {
    ma: "ND003",
    ten: "Lê Hoàng Nam",
    email: "nam@mail.com",
    sdt: "0923456789",
    trangThai: "hoat_dong",
  },
  {
    ma: "ND004",
    ten: "Trần Minh Đức",
    email: "duc@mail.com",
    sdt: "0934567890",
    trangThai: "hoat_dong",
  },
  {
    ma: "ND005",
    ten: "Võ Gia Huy",
    email: "huy@mail.com",
    sdt: "0945678901",
    trangThai: "khoa",
  },
];

// 2. DỮ LIỆU SẢN PHẨM (PRODUCTS - BLIND BOX)
const DANH_SACH_SAN_PHAM = [
  {
    maSP: "P001",
    tenSP: "Hirono",
    brand: "POP MART",
    boSuuTap: "Hirono Monster Carnival Series",
    danhMuc: "Blind Box",
    gia: 320000,
    daBan: 2,
    tonKho: 10,
    hinh: "assets/P001.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P002",
    tenSP: "SKULLPANDA",
    brand: "POP MART",
    boSuuTap: "SKULLPANDA Where Time Dwells Series",
    danhMuc: "Blind Box",
    gia: 280000,
    daBan: 14,
    tonKho: 3,
    hinh: "assets/P002.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P003",
    tenSP: "MOLLY",
    brand: "POP MART",
    boSuuTap: "MEGA SPACE MOLLY 100%",
    danhMuc: "Blind Box",
    gia: 280000,
    daBan: 0,
    tonKho: 20,
    hinh: "assets/P003.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P004",
    tenSP: "Dimoo",
    brand: "POP MART",
    boSuuTap: "Dimoo Vinyl PLush Series",
    danhMuc: "Blind Box",
    gia: 350000,
    daBan: 12,
    tonKho: 5,
    hinh: "assets/P004.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P005",
    tenSP: "Labubu",
    brand: "POP MART",
    boSuuTap: "Wacky mart Series",
    danhMuc: "Blind Box",
    gia: 320000,
    daBan: 30,
    tonKho: 8,
    hinh: "assets/P005.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P006",
    tenSP: "BEASTBOX DIO",
    brand: "52TOYS",
    boSuuTap: "BEASTBOX BB-01 DIO LITE",
    danhMuc: "Robot / Mecha",
    gia: 220000,
    daBan: 8,
    tonKho: 12,
    hinh: "assets/P006.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P007",
    tenSP: "BEASDRIVE WHEEL REPTOR",
    brand: "52TOYS",
    boSuuTap: "BEASTDIVE BD-01 WHEEL RAPTOR",
    danhMuc: "Robot / Mecha",
    gia: 520000,
    daBan: 18,
    tonKho: 6,
    hinh: "assets/P007.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P008",
    tenSP: "MEGAOBX Gazelle",
    brand: "52TOYS",
    boSuuTap: "Nyota I Am Not Fluffy Series",
    danhMuc: "Robot / Mecha",
    gia: 550000,
    daBan: 0,
    tonKho: 30,
    hinh: "assets/P008.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P009",
    tenSP: "BEASTBOX Shovelhead",
    brand: "52TOYS",
    boSuuTap: "BEASTBOX Heavy Mecha",
    danhMuc: "Robot / Mecha",
    gia: 799000,
    daBan: 4,
    tonKho: 5,
    hinh: "assets/P009.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P010",
    tenSP: "BEASTDRIVE",
    brand: "52TOYS",
    boSuuTap: "BEASTDRIVE Armor Stare Void",
    danhMuc: "Robot / Mecha",
    gia: 480000,
    daBan: 15,
    tonKho: 7,
    hinh: "assets/P010.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P011",
    tenSP: "Animal",
    brand: "Sonny Angel",
    boSuuTap: "Animal Series 1",
    danhMuc: "Mini Figure",
    gia: 249000,
    daBan: 11,
    tonKho: 9,
    hinh: "assets/P011.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P012",
    tenSP: "Snack Series",
    brand: "Sonny Angel",
    boSuuTap: "Snack Series",
    danhMuc: "Mini Figure",
    gia: 249000,
    daBan: 21,
    tonKho: 4,
    hinh: "assets/P012.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P013",
    tenSP: "HIPPERS",
    brand: "Sonny Angel",
    boSuuTap: "HIPPERS Series",
    danhMuc: "Mini Figure",
    gia: 299000,
    daBan: 25,
    tonKho: 14,
    hinh: "assets/P013.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P014",
    tenSP: "FLower",
    brand: "Sonny Angel",
    boSuuTap: "Flower Series",
    danhMuc: "Mini Figure",
    gia: 249000,
    daBan: 7,
    tonKho: 8,
    hinh: "assets/P014.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P015",
    tenSP: "Series 1",
    brand: "Smiski",
    boSuuTap: "Series 1",
    danhMuc: "Mini Figure",
    gia: 220000,
    daBan: 16,
    tonKho: 15,
    hinh: "assets/P015.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P016",
    tenSP: "Living",
    brand: "Smiski",
    boSuuTap: "Living Series",
    danhMuc: "Mini Figure",
    gia: 249000,
    daBan: 13,
    tonKho: 9,
    hinh: "assets/P016.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P017",
    tenSP: "Work",
    brand: "Smiski",
    boSuuTap: "Work Series",
    danhMuc: "Mini Figure",
    gia: 249000,
    daBan: 19,
    tonKho: 6,
    hinh: "assets/P017.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P018",
    tenSP: "Unicorno",
    brand: "Tokidoki",
    boSuuTap: "Unicorno Series",
    danhMuc: "Designer Toy / Blind Box",
    gia: 280000,
    daBan: 6,
    tonKho: 10,
    hinh: "assets/P018.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P019",
    tenSP: "Mermicorno",
    brand: "Tokidoki",
    boSuuTap: "Mermicorno Series",
    danhMuc: "Designer Toy / Blind Box",
    gia: 319000,
    daBan: 45,
    tonKho: 5,
    hinh: "assets/P019.jpg",
    trangThai: "dang_ban",
  },
  {
    maSP: "P020",
    tenSP: "After Dark",
    brand: "Tokidoki",
    boSuuTap: "After Dark Series",
    danhMuc: "Designer Toy / Blind Box",
    gia: 329000,
    daBan: 46,
    tonKho: 4,
    hinh: "assets/P020.jpg",
    trangThai: "dang_ban",
  },
];

// 3. DỮ LIỆU NHẬP - XUẤT KHO (INVENTORY IMPORT / EXPORT)
const DANH_SACH_NHAP_XUAT = [
  {
    maPhieu: "PN001",
    ngay: "2026-05-10",
    loai: "nhap",
    nhaCungCap: "POP MART Official Distributor",
    tongSoLuong: 120,
    tongTien: 28500000,
    ghiChu: "Nhập lô Blind Box Hirono & Skullpanda",
  },
  {
    maPhieu: "PX001",
    ngay: "2026-05-15",
    loai: "xuat",
    nguoiLap: "Admin (1252)",
    nhaCungCap: "Chi nhánh Quận 1",
    tongSoLuong: 35,
    tongTien: 9800000,
    ghiChu: "Xuất hàng giao đại lý trung tâm",
  },
  {
    maPhieu: "PN002",
    ngay: "2026-05-20",
    loai: "nhap",
    nguoiLap: "Admin (1252)",
    nhaCungCap: "Tokidoki Asia Supplier",
    tongSoLuong: 80,
    tongTien: 21400000,
    ghiChu: "Nhập thêm series Unicorno & Mermicorno",
  },
  {
    maPhieu: "PX002",
    ngay: "2026-05-24",
    loai: "xuat",
    nguoiLap: "Admin (1252)",
    nhaCungCap: "Đơn bán lẻ online (Tổng hợp)",
    tongSoLuong: 28,
    tongTien: 8120000,
    ghiChu: "Xuất đóng gói cho các đơn đặt hàng online",
  },
  {
    maPhieu: "PN003",
    ngay: "2026-06-01",
    loai: "nhap",
    nguoiLap: "Admin (1252)",
    nhaCungCap: "Sonny Angel HK Co.",
    tongSoLuong: 60,
    tongTien: 14200000,
    ghiChu: "Nhập bổ sung đợt mini figure HIPPERS",
  },
];

// 4. DỮ LIỆU ĐƠN HÀNG (ORDERS)
const DU_LIEU_MAU = [
  {
    id: "DH001",
    maKH: "ND001",
    tenKH: "Nguyễn Minh Anh",
    ngayDat: "2026-05-24",
    diaChi: "11 Sư Vạn Hạnh",
    quan: "Quận 10",
    thanhToan: "Tiền mặt",
    trangThai: "chua_xac_nhan",
    items: [
      {
        maSP: "P001",
        tenSP: "Hirono Monster's Carnival Series",
        gia: 320000,
        soLuong: 3,
      },
      {
        maSP: "P002",
        tenSP: "SKULLPANDA Where Time Dwells Series",
        gia: 280000,
        soLuong: 1,
      },
      { maSP: "P017", tenSP: "Work Series", gia: 249000, soLuong: 1 },
    ],
  },
  {
    id: "DH002",
    maKH: "ND002",
    tenKH: "Trần Quốc Bảo",
    ngayDat: "2026-02-06",
    diaChi: "123 Nguyễn Trãi",
    quan: "Quận 5",
    thanhToan: "Chuyển khoản",
    trangThai: "da_xac_nhan",
    items: [
      {
        maSP: "P006",
        tenSP: "BEASTBOX BB-01 DIO LITE EDITION",
        gia: 220000,
        soLuong: 2,
      },
      { maSP: "P009", tenSP: "BEASTBOX Shovelhead", gia: 799000, soLuong: 1 },
    ],
  },
  {
    id: "DH003",
    maKH: "ND004",
    tenKH: "Trần Minh Đức",
    ngayDat: "2025-12-30",
    diaChi: "103/23 Ông Ích Khiêm",
    quan: "Quận 11",
    thanhToan: "Tiền mặt",
    trangThai: "da_giao",
    items: [
      { maSP: "P013", tenSP: "HIPPERS Series", gia: 299000, soLuong: 2 },
      { maSP: "P016", tenSP: "Living Series", gia: 249000, soLuong: 2 },
    ],
  },
  {
    id: "DH004",
    maKH: "ND003",
    tenKH: "Lê Thu Hà",
    ngayDat: "2025-06-28",
    diaChi: "654 Nguyễn Thị Minh Khai",
    quan: "Quận 3",
    thanhToan: "Tiền mặt",
    trangThai: "da_giao",
    items: [
      { maSP: "P019", tenSP: "Mermicorno Series", gia: 319000, soLuong: 2 },
    ],
  },
  {
    id: "DH005",
    maKH: "ND005",
    tenKH: "Nguyễn Ngọc Hậu",
    ngayDat: "2026-02-19",
    diaChi: "293 Hậu Giang",
    quan: "Quận 6",
    thanhToan: "Chuyển khoản",
    trangThai: "da_huy",
    items: [
      { maSP: "P012", tenSP: "Snack Series", gia: 249000, soLuong: 1 },
      { maSP: "P015", tenSP: "Series 1", gia: 220000, soLuong: 1 },
      { maSP: "P020", tenSP: "After Dark Series", gia: 329000, soLuong: 1 },
    ],
  },
];

const TEN_TRANG_THAI = {
  chua_xac_nhan: "Chưa xác nhận",
  da_xac_nhan: "Đã xác nhận",
  da_giao: "Đã giao",
  da_huy: "Đã hủy",
};

const TRANG_THAI_TIEP = {
  chua_xac_nhan: ["da_xac_nhan", "da_huy"],
  da_xac_nhan: ["da_huy", "da_giao"],
  da_giao: [],
  da_huy: [],
};

// 5. CÁC HÀM TRUY XUẤT DỮ LIỆU
function layDonhang() {
  return DU_LIEU_MAU;
}

function layNguoiDung() {
  return DANH_SACH_NGUOI_DUNG;
}

function laySanPham() {
  return DANH_SACH_SAN_PHAM;
}

function layNhapXuat() {
  return DANH_SACH_NHAP_XUAT;
}

function tinhTong(don) {
  let tong = 0;
  for (let sp of don.items) {
    tong += sp.gia * sp.soLuong;
  }
  return tong;
}

function formatTien(so) {
  return Number(so).toLocaleString("vi-VN") + " ₫";
}

// 6. THANH THÔNG BÁO TOAST NOTIFICATION CAO CẤP
function showToast(message, type = "success", title = "Thông báo") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-item toast-${type}`;

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  } else if (type === "info") {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${message}</div>
    </div>
    <button class="toast-close" title="Đóng" onclick="this.closest('.toast-item').remove()">✕</button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hiding");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 280);
  }, 3500);
}

// 7. TIỆN ÍCH BẬT / TẮT MODAL HỘP THOẠI
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("active");
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
  }
}
