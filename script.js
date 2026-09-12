const welcome = document.querySelector('#welcome');
const main = document.querySelector('#mainContent');
const confetti = document.querySelector('#confetti');
const enterButton = document.querySelector('#enterButton');
const wishButton = document.querySelector('#wishButton');
const cake = document.querySelector('#cake');
const toast = document.querySelector('#toast');

function burst(amount = 80) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#ff4fa3', '#53d9e9', '#ffe85c', '#8e5cf6', '#ffffff'];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement('i');
    const kind = Math.random() > .84 ? 'star' : Math.random() > .55 ? 'circle' : '';
    piece.className = `confetti-piece ${kind}`;
    if (kind === 'star') piece.textContent = '★';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.color = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--duration', `${2.6 + Math.random() * 2.4}s`);
    piece.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
    piece.style.animationDelay = `${Math.random() * .45}s`;
    confetti.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5600);
  }
}

enterButton.addEventListener('click', () => {
  welcome.classList.add('is-hidden');
  main.classList.add('is-visible');
  main.setAttribute('aria-hidden', 'false');
  main.inert = false;
  document.body.style.overflow = '';
  burst(110);
  window.setTimeout(() => document.querySelector('.hero').focus?.(), 700);
});

document.querySelectorAll('.fave-card').forEach((card) => {
  card.addEventListener('click', () => {
    toast.textContent = card.dataset.message;
    toast.classList.add('show');
    burst(28);
    window.clearTimeout(window.toastTimer);
    window.toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2300);
  });
});

wishButton.addEventListener('click', () => {
  cake.classList.add('blown');
  wishButton.textContent = 'Wish made! Happy 10th, Nora ♡';
  wishButton.disabled = true;
  burst(150);
  window.setTimeout(() => { document.querySelector('#birthdayFinale').appendChild(confetti); document.querySelector('#birthdayFinale').showModal(); document.body.style.overflow = 'hidden'; burst(100); }, 900);
});

document.body.style.overflow = 'hidden';

const finale = document.querySelector('#birthdayFinale');
document.querySelector('#closeFinale').addEventListener('click', () => finale.close());
finale.addEventListener('close', () => { document.body.appendChild(confetti); document.body.style.overflow = ''; wishButton.disabled = false; wishButton.textContent = 'Celebrate again ✦'; wishButton.focus(); });
