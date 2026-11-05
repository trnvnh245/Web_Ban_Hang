/* =========================================================
   LOGIC SỰ KIỆN CHI TIẾT SẢN PHẨM & TRANG TÌM KIẾM
   ========================================================= */

// 1. Chức năng đổi ảnh xem trước trên trang Chi Tiết Sản Phẩm
function changeImage(element) {
  const mainImg = document.getElementById("mainProductImg");
  if (mainImg) {
    mainImg.src = element.src;
  }
  document.querySelectorAll(".thumb-item").forEach((img) => {
    img.classList.remove("active");
  });
  element.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------
  // Xử lý nút Thêm Vào Giỏ Hàng trên trang product-detail.html
  // -------------------------------------------------------------
  const btnAddToCart = document.getElementById("btnAddToCart");
  if (btnAddToCart) {
    btnAddToCart.addEventListener("click", () => {
      const qtyInput = document.getElementById("detailQty");
      const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
      alert(
        `Đã thêm thành công ${qty} sản phẩm Hirono Monster's Carnival vào giỏ hàng!`,
      );
    });
  }

  // -------------------------------------------------------------
  // Xử lý Trang Kết Quả Tìm Kiếm (search-results.html)
  // -------------------------------------------------------------
  const searchGrid = document.getElementById("searchProductGrid");

  if (searchGrid) {
    const ITEMS_PER_PAGE = 8;
    let currentPage = 1;
    let searchResultsData = [];

    // Lấy từ khóa 'search' từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("search") || "";

    const searchKeywordInput = document.getElementById("searchKeyword");
    if (searchKeywordInput) {
      searchKeywordInput.value = queryParam;
    }

    const headerSearchInput = document.getElementById("headerSearchInput");
    if (headerSearchInput) {
      headerSearchInput.value = queryParam;
    }

    // Hàm lọc dữ liệu theo các điều kiện
    function applySearchLogic() {
      // Lấy dữ liệu sản phẩm gốc từ file box.js
      const sourceData = typeof products !== "undefined" ? products : [];

      // Gán trực tiếp tất cả sản phẩm, không qua hàm .filter()
      searchResultsData = sourceData;

      // Cập nhật lại tiêu đề (nếu có)
      const heading = document.getElementById("searchHeading");
      if (heading) {
        heading.innerText = "TẤT CẢ SẢN PHẨM TÌM KIẾM";
      }

      // Reset về trang 1 và hiển thị danh sách
      currentPage = 1;
      renderSearchResultGrid(searchResultsData, currentPage);
    }

    // Render danh sách sản phẩm khớp kết quả
    function renderSearchResultGrid(list, page = 1) {
      searchGrid.innerHTML = "";

      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedList = list.slice(startIndex, endIndex);

      if (paginatedList.length === 0) {
        searchGrid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 50px 0;">
            <i class="fa-solid fa-box-open" style="font-size: 48px; margin-bottom: 15px; color: #9ca3af;"></i>
            <p style="font-size: 16px;">Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.</p>
          </div>`;
      } else {
        paginatedList.forEach((item) => {
          const card = document.createElement("div");
          card.className = "product-card";

          const newBadge = item.isNew
            ? `<span class="badge-new" style="position: absolute; top: 15px; left: 15px; background-color: #dc2626; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 6px; z-index: 2; text-transform: uppercase;">New</span>`
            : "";

          card.innerHTML = `
            ${newBadge}
            <img src="${item.image}" alt="${item.name}" class="product-img" onclick="location.href='product-detail.html?id=${item.id}'" onError="this.src='https://via.placeholder.com/240x240'" />
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
              </div>
            </div>
          `;
          searchGrid.appendChild(card);
        });
      }

      // Cập nhật số lượng
      const countEl = document.getElementById("searchResultCount");
      if (countEl) {
        countEl.innerText = `Hiển thị ${paginatedList.length}/${list.length} sản phẩm`;
      }

      renderSearchPagination(list.length, page);
    }

    // Hiển thị nút Phân Trang
    function renderSearchPagination(totalItems, activePage) {
      const container = document.getElementById("searchPagination");
      if (!container) return;
      container.innerHTML = "";

      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      if (totalPages <= 1) return;

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = `page-btn ${i === activePage ? "active" : ""}`;
        btn.innerText = i;
        btn.addEventListener("click", () => {
          currentPage = i;
          renderSearchResultGrid(searchResultsData, currentPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
        container.appendChild(btn);
      }
    }

    // Sự kiện Nút Lọc
    const btnApply = document.getElementById("btnApplySearchFilter");
    if (btnApply) {
      btnApply.addEventListener("click", applySearchLogic);
    }

    // Sự kiện Nút Reset
    const btnReset = document.getElementById("btnResetSearchFilter");
    if (btnReset) {
      btnReset.addEventListener("click", () => {
        document.getElementById("searchKeyword").value = "";
        document.getElementById("brandSelect").value = "all";
        document.getElementById("collectionSelect").value = "all";
        document.getElementById("categorySelect").value = "all";
        document.getElementById("minPrice").value = "";
        document.getElementById("maxPrice").value = "";
        applySearchLogic();
      });
    }

    // Chạy mặc định lần đầu
    applySearchLogic();
  }
});
