(() => {
  const charts = document.querySelectorAll('#app .hero-photo');
  if (!charts.length) return;

  const assessments = {
    'thong-ke-ban-chay.jpg': 'After Dark và Mermicorno dẫn đầu với 46 và 45 sản phẩm đã bán, cao hơn rõ rệt so với ba sản phẩm còn lại. Có thể ưu tiên theo dõi tồn kho của hai dòng này để lên kế hoạch bổ sung hàng.',
    'tong-quan-don-hang.jpg': 'Đơn đã giao chiếm 40%, còn đơn chờ xác nhận và đã xác nhận chiếm tổng cộng 40%. Nên ưu tiên xử lý hai đơn đang chờ hoàn tất và xem xét nguyên nhân của một đơn đã hủy.',
    'tong-quan-san-pham.jpg': 'Mini Figure và Robot / Mecha có tổng tồn kho 125 sản phẩm, chiếm khoảng 66% tổng tồn kho. Designer Toy / Blind Box có tồn kho thấp nhất với 19 sản phẩm; cần đối chiếu sức bán trước khi quyết định nhập thêm.',
    'tong-quan-nhap-xuat.jpg': 'Lượng nhập 260 sản phẩm cao hơn lượng xuất 63 sản phẩm khoảng 4,1 lần, chênh lệch 197 sản phẩm trong các phiếu được thống kê. Nên theo dõi tốc độ bán và tồn kho thực tế để cân đối các đợt nhập tiếp theo.',
    'tong-quan-khach-hang.jpg': 'Có 4 trên 5 tài khoản đang hoạt động, tương đương 80%; một tài khoản đã bị khóa. Trạng thái hoạt động phản ánh tình trạng tài khoản, chưa đủ để đánh giá tần suất mua hàng của khách.'
  };

  const dialog = document.createElement('dialog');
  dialog.className = 'chart-viewer';
  dialog.setAttribute('aria-labelledby', 'chart-viewer-title');
  dialog.setAttribute('aria-describedby', 'chart-viewer-description');
  dialog.innerHTML = `
    <div class="chart-viewer-heading">
      <h2 id="chart-viewer-title">Chi tiết biểu đồ</h2>
      <button type="button" class="chart-viewer-close" aria-label="Đóng biểu đồ" autofocus>×</button>
    </div>
    <img class="chart-viewer-image" alt="" />
    <p id="chart-viewer-description"></p>
    <p class="chart-viewer-note" id="chart-viewer-assessment"></p>`;
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  let trigger;
  let previousOverflow;
  let animation;
  let closing = false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const collapsedTransform = () => {
    const source = trigger.getBoundingClientRect();
    const target = dialog.getBoundingClientRect();
    return `translate(${source.left + source.width / 2 - target.left - target.width / 2}px, ${source.top + source.height / 2 - target.top - target.height / 2}px) scale(${source.width / target.width}, ${source.height / target.height})`;
  };
  const closeViewer = async () => {
    if (!dialog.open || closing) return;
    closing = true;
    animation?.cancel();
    dialog.classList.add('is-closing');
    if (!reducedMotion.matches) {
      animation = dialog.animate([
        { transform: 'none', opacity: 1 },
        { transform: collapsedTransform(), opacity: 0 }
      ], { duration: 260, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'forwards' });
      await animation.finished.catch(() => {});
    }
    dialog.close();
  };
  dialog.querySelector('button').addEventListener('click', closeViewer);
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeViewer();
  });
  dialog.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) closeViewer();
  });
  dialog.addEventListener('close', () => {
    animation?.cancel();
    closing = false;
    dialog.classList.remove('is-closing');
    document.body.style.overflow = previousOverflow;
    trigger?.focus({ preventScroll: true });
  });

  charts.forEach((chart) => {
    const original = chart.querySelector('img');
    if (!original) return;
    chart.closest('.hero-art')?.removeAttribute('aria-hidden');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = chart.className + ' chart-zoom-trigger';
    button.setAttribute('aria-label', 'Phóng to biểu đồ: ' + original.alt);
    button.setAttribute('aria-haspopup', 'dialog');
    button.title = 'Bấm để xem biểu đồ lớn';
    while (chart.firstChild) button.append(chart.firstChild);
    chart.replaceWith(button);
    button.addEventListener('click', () => {
      trigger = button;
      image.src = original.src;
      image.alt = original.alt;
      dialog.querySelector('h2').textContent = button.querySelector('span')?.textContent.trim() || 'Chi tiết biểu đồ';
      dialog.querySelector('#chart-viewer-description').textContent = original.alt;
      const filename = new URL(original.src).pathname.split('/').pop();
      dialog.querySelector('#chart-viewer-assessment').textContent = assessments[filename] || '';
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      if (!reducedMotion.matches) {
        animation = dialog.animate([
          { transform: collapsedTransform(), opacity: 0 },
          { transform: 'none', opacity: 1 }
        ], { duration: 380, easing: 'cubic-bezier(.16, 1, .3, 1)' });
      }
    });
  });
})();
