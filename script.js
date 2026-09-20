const products = [
  { id: 1, name: 'Sandal Ağacı Mum', description: '180 gr · El yapımı', price: 420, category: 'Ev', icon: '◒', badge: 'ÇOK SEVİLEN' },
  { id: 2, name: 'Keten Masa Örtüsü', description: '140 × 200 cm · Doğal keten', price: 680, category: 'Ev', icon: '▱', badge: '' },
  { id: 3, name: 'Seramik Kahve Fincanı', description: 'El yapımı · 220 ml', price: 295, category: 'Ev', icon: '◡', badge: 'YENİ' },
  { id: 4, name: 'Lavanta Vücut Yağı', description: '100 ml · Soğuk sıkım', price: 510, category: 'Bakım', icon: '♧', badge: '' },
  { id: 5, name: 'Pamuklu Tote Çanta', description: 'Organik pamuk · Krem', price: 350, category: 'Aksesuar', icon: '⌒', badge: '' },
  { id: 6, name: 'Nostaljik Saç Tokası', description: 'Asetat · Amber', price: 190, category: 'Aksesuar', icon: '∞', badge: 'YENİ' }
];
let cart = JSON.parse(localStorage.getItem('nova-cart') || '[]');
const grid = document.getElementById('productGrid');
const format = value => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value);

function renderProducts(list = products) {
  grid.innerHTML = list.length ? list.map(product => `
    <article class="product-card">
      <div class="product-image">${product.badge ? `<small class="badge">${product.badge}</small>` : ''}<span>${product.icon}</span></div>
      <div class="product-info"><h3>${product.name}</h3><p>${product.description}</p><div class="product-bottom"><strong class="price">${format(product.price)}</strong><button class="add-button" data-add="${product.id}">+ Sepete ekle</button></div></div>
    </article>`).join('') : '<p>Aradığın ürün bulunamadı.</p>';
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => addToCart(Number(button.dataset.add))));
}
function addToCart(id) { const product = products.find(item => item.id === id); cart.push(product); saveCart(); openCart(); }
function saveCart() { localStorage.setItem('nova-cart', JSON.stringify(cart)); renderCart(); }
function renderCart() {
  document.getElementById('cartCount').textContent = cart.length;
  const area = document.getElementById('cartItems');
  area.innerHTML = cart.length ? cart.map((item, index) => `<div class="cart-row"><div class="mini-image">${item.icon}</div><div><h4>${item.name}</h4><p>${format(item.price)}</p></div><button class="remove" data-remove="${index}" aria-label="Ürünü kaldır">×</button></div>`).join('') : '<div class="empty-cart">Sepetin henüz boş.<br />Sana iyi gelecek bir şeyler keşfet.</div>';
  document.getElementById('cartTotal').textContent = format(cart.reduce((sum, item) => sum + item.price, 0));
  document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart.splice(Number(button.dataset.remove), 1); saveCart(); }));
}
function openCart() { document.getElementById('cartDrawer').classList.add('open'); document.getElementById('overlay').classList.add('open'); document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false'); }
function closeCart() { document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('overlay').classList.remove('open'); document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true'); }

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); renderProducts(button.dataset.category === 'Tümü' ? products : products.filter(item => item.category === button.dataset.category)); }));
document.getElementById('searchToggle').addEventListener('click', () => { document.getElementById('searchBar').classList.toggle('open'); document.getElementById('searchInput').focus(); });
document.getElementById('searchInput').addEventListener('input', event => { const term = event.target.value.toLocaleLowerCase('tr-TR'); renderProducts(products.filter(item => `${item.name} ${item.description}`.toLocaleLowerCase('tr-TR').includes(term))); });
document.getElementById('cartToggle').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', closeCart);
document.getElementById('menuToggle').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
document.getElementById('newsletterForm').addEventListener('submit', event => { event.preventDefault(); event.target.innerHTML = '<p style="margin:15px 0;font-size:13px">Teşekkürler! Nova notları yolda ✦</p>'; });
document.getElementById('checkout').addEventListener('click', () => { if (!cart.length) { alert('Önce sepetine bir ürün ekle.'); return; } window.location.href = 'checkout.html'; });
renderProducts();
renderCart();
