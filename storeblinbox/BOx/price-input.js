// Định dạng các ô khoảng giá giống ô nhập đơn giá bên admin.
document.addEventListener("input", (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || !["minPrice", "maxPrice"].includes(input.id)) return;

  const digitsBeforeCaret = input.value.slice(0, input.selectionStart).replace(/\D/g, "").length;
  const digits = input.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  input.value = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  let caret = 0;
  let digitsSeen = 0;
  while (caret < input.value.length && digitsSeen < digitsBeforeCaret) {
    if (/\d/.test(input.value[caret])) digitsSeen++;
    caret++;
  }
  input.setSelectionRange(caret, caret);
});
