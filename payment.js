const cart = JSON.parse(localStorage.getItem('nova-cart') || '[]');
const format = value => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value);
const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
const summaryItems = document.getElementById('summaryItems');
summaryItems.innerHTML = cart.length ? cart.map(item => `<div class="summary-row"><span>${item.name}</span><span>${format(item.price)}</span></div>`).join('') : '<p class="muted">Sepetinde ürün bulunmuyor.</p>';
document.getElementById('summaryTotal').textContent = format(total);
document.getElementById('payTotal').textContent = format(total);

const cardNumber = document.getElementById('cardNumber');
const expiry = document.getElementById('expiry');
const cvc = document.getElementById('cvc');
cardNumber.addEventListener('input', event => { event.target.value = event.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); });
expiry.addEventListener('input', event => { const digits = event.target.value.replace(/\D/g, '').slice(0, 4); event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits; });
cvc.addEventListener('input', event => { event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4); });

document.getElementById('paymentForm').addEventListener('submit', event => {
  event.preventDefault();
  const error = document.getElementById('paymentError');
  const digits = cardNumber.value.replace(/\s/g, '');
  const [month] = expiry.value.split('/').map(Number);
  if (!cart.length) { error.textContent = 'Ödeme yapmak için sepetine ürün eklemelisin.'; return; }
  if (!document.getElementById('cardName').value.trim() || digits.length < 16 || !/^\d{2}\/\d{2}$/.test(expiry.value) || month < 1 || month > 12 || cvc.value.length < 3) { error.textContent = 'Lütfen kart bilgilerini eksiksiz ve doğru formatta gir.'; return; }
  event.target.innerHTML = '<div class="success"><strong>Ödeme alındı ✦</strong>Bu bir demo ödeme akışıdır. Gerçek tahsilat yapılmadı ve kart bilgileri kaydedilmedi.<br><br><a href="index.html">Mağazaya dön →</a></div>';
  localStorage.removeItem('nova-cart');
});
