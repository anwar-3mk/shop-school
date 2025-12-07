const tips = [
  "لا تشتري جهازًا بمواصفات عالية فقط لأنك رأيته في إعلان؛ اختر ما يناسب استخدامك.",
  "وجود SSD في الجهاز يرفع من سرعة الإقلاع وفتح البرامج بشكل ملحوظ.",
  "للألعاب، ركّز على كرت الشاشة أولًا ثم المعالج.",
  "للأعمال المكتبية والدراسة، معالج متوسط مع 8GB أو 16GB رام غالبًا يكفي.",
  "تأكد من وجود منافذ كافية مثل HDMI و USB-C لتوصيل شاشات وأجهزة إضافية."
];

const unitToggle = document.getElementById("unitToggle");
const priceItems = document.querySelectorAll(".card .price");
const tipButton = document.getElementById("tipButton");
const tipOutput = document.getElementById("tipOutput");
const cartButton = document.getElementById("cartButton");
const closeCartButton = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const studentInfoButton = document.getElementById("studentInfoButton");
const studentInfoModal = document.getElementById("studentInfoModal");
const closeStudentInfoButton = document.getElementById("closeStudentInfo");

const cartItems = [];

function updatePrices() {
  priceItems.forEach((item) => {
    const card = item.closest(".card");
    const baseText = card.dataset.priceBase;
    const taxText = card.dataset.priceTax;
    item.textContent = unitToggle.checked
      ? `${taxText} مع الضريبة`
      : `${baseText} بدون ضريبة`;
  });

  renderCart();
}

function showRandomTip() {
  const randomIndex = Math.floor(Math.random() * tips.length);
  tipOutput.textContent = tips[randomIndex];
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  overlay.classList.remove("visible");
  overlay.setAttribute("aria-hidden", "true");
}

function addItemToCart(card) {
  const item = {
    name: card.dataset.name || card.querySelector("h3").textContent.trim(),
    displayBase: card.dataset.priceBase,
    displayTax: card.dataset.priceTax,
    baseValue: Number(card.dataset.priceBaseValue || 0),
    taxValue: Number(card.dataset.priceTaxValue || 0)
  };

  cartItems.push(item);
  cartCount.textContent = cartItems.length;
  renderCart();
  openCart();
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (!cartItems.length) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">السلة فارغة، أضف منتجاتك المفضلة.</p>';
    cartTotal.textContent = "٠ ر.س";
    return;
  }

  cartItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <strong>${
        unitToggle.checked ? item.displayTax : item.displayBase
      }</strong>
    `;
    cartItemsContainer.appendChild(div);
  });

  const total = cartItems.reduce((sum, item) => {
    const price = unitToggle.checked ? item.taxValue : item.baseValue;
    return sum + price;
  }, 0);

  cartTotal.textContent = `${total.toLocaleString("ar-EG")} ر.س`;
}

updatePrices();

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    addItemToCart(card);
  });
});

cartButton.addEventListener("click", openCart);
closeCartButton.addEventListener("click", closeCart);
overlay.addEventListener("click", () => {
  closeCart();
  closeStudentInfo();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
  }
});

function openStudentInfo() {
  studentInfoModal.classList.add("open");
  studentInfoModal.setAttribute("aria-hidden", "false");
  overlay.classList.add("visible");
  overlay.setAttribute("aria-hidden", "false");
}

function closeStudentInfo() {
  studentInfoModal.classList.remove("open");
  studentInfoModal.setAttribute("aria-hidden", "true");
  overlay.classList.remove("visible");
  overlay.setAttribute("aria-hidden", "true");
}

unitToggle.addEventListener("change", updatePrices);
tipButton.addEventListener("click", showRandomTip);
studentInfoButton.addEventListener("click", openStudentInfo);
closeStudentInfoButton.addEventListener("click", closeStudentInfo);

