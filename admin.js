const credentials = { email: 'admin@nova.store', password: 'Nova123!' };
const products = [
  ['Sandal Ağacı Mum', 'Ev', '₺420'],
  ['Keten Masa Örtüsü', 'Ev', '₺680'],
  ['Seramik Kahve Fincanı', 'Ev', '₺295'],
  ['Lavanta Vücut Yağı', 'Bakım', '₺510'],
  ['Pamuklu Tote Çanta', 'Aksesuar', '₺350'],
  ['Nostaljik Saç Tokası', 'Aksesuar', '₺190']
];
const loginCard = document.getElementById('loginCard');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const error = document.getElementById('loginError');

function showDashboard() {
  loginCard.hidden = true;
  dashboard.hidden = false;
  document.getElementById('productTable').innerHTML = products.map(product => `<tr><td>${product[0]}</td><td>${product[1]}</td><td>${product[2]}</td><td><span class="status">Aktif</span></td></tr>`).join('');
}
if (sessionStorage.getItem('nova-admin-auth') === 'true') showDashboard();
loginForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (email === credentials.email && password === credentials.password) {
    sessionStorage.setItem('nova-admin-auth', 'true');
    error.textContent = '';
    showDashboard();
  } else error.textContent = 'E-posta veya şifre hatalı.';
});
document.getElementById('logout').addEventListener('click', () => { sessionStorage.removeItem('nova-admin-auth'); dashboard.hidden = true; loginCard.hidden = false; loginForm.reset(); });
document.getElementById('addProduct').addEventListener('click', () => {
  const toast = document.createElement('div');
  toast.className = 'toast'; toast.textContent = 'Ürün ekleme ekranı yakında aktif olacak.';
  document.body.append(toast); setTimeout(() => toast.remove(), 2500);
});
