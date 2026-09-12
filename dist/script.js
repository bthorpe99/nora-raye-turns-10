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
    if (card.classList.contains('fave-card--candy')) candyShower(); else burst(28);
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

function candyShower() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i=0; i<32; i++) {
    const candy=document.createElement('span'); candy.className='confetti-piece candy-piece';
    candy.textContent=['🍬','🍭','🍫'][i%3]; candy.setAttribute('aria-hidden','true');
    candy.style.left=Math.random()*100+'%'; candy.style.setProperty('--duration',3+Math.random()*2+'s');
    candy.style.setProperty('--drift',-70+Math.random()*140+'px'); candy.style.animationDelay=Math.random()*.6+'s';
    confetti.appendChild(candy); setTimeout(()=>candy.remove(),6000);
  }
}
const squishy=document.querySelector('.fave-card--squishy');
function releaseSquish() { squishy.classList.remove('is-squished'); }
squishy.addEventListener('pointerdown',e=>{ squishy.setPointerCapture(e.pointerId); squishy.classList.add('is-squished'); });
['pointerup','pointercancel','lostpointercapture','blur'].forEach(event=>squishy.addEventListener(event,releaseSquish));
squishy.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter') squishy.classList.add('is-squished');});
squishy.addEventListener('keyup',releaseSquish);

const galleryPhotos=Array.from(document.querySelectorAll('.photo-card img, .memory img, .action-shot img'));
const viewer=document.querySelector('#photoViewer');
let photoIndex=0, photoOpener=null, swipeStart=null;
function showPhoto(index) {
  photoIndex=(index+galleryPhotos.length)%galleryPhotos.length;
  const photo=galleryPhotos[photoIndex], display=document.querySelector('#viewerImage');
  display.src=photo.src; display.alt=photo.alt;
  document.querySelector('#viewerCaption').textContent=photo.closest('figure').querySelector('figcaption')?.textContent.trim()||photo.alt;
  document.querySelector('#photoCount').textContent=(photoIndex+1)+' / '+galleryPhotos.length;
}
galleryPhotos.forEach((photo,index)=>{
  const button=document.createElement('button'); button.type='button'; button.className='photo-open';
  button.setAttribute('aria-label','Enlarge photo: '+photo.alt); photo.before(button); button.appendChild(photo);
  button.addEventListener('click',()=>{photoOpener=button;showPhoto(index);viewer.showModal();document.body.style.overflow='hidden';});
});
document.querySelector('#closeViewer').addEventListener('click',()=>viewer.close());
document.querySelector('#prevPhoto').addEventListener('click',()=>showPhoto(photoIndex-1));
document.querySelector('#nextPhoto').addEventListener('click',()=>showPhoto(photoIndex+1));
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1);}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1);}});
viewer.addEventListener('close',()=>{document.body.style.overflow='';photoOpener?.focus();});
const viewerImage=document.querySelector('#viewerImage');
viewerImage.addEventListener('touchstart',e=>{swipeStart=[e.changedTouches[0].clientX,e.changedTouches[0].clientY];},{passive:true});
viewerImage.addEventListener('touchend',e=>{if(!swipeStart)return;const dx=e.changedTouches[0].clientX-swipeStart[0],dy=e.changedTouches[0].clientY-swipeStart[1];if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))showPhoto(photoIndex+(dx<0?1:-1));swipeStart=null;},{passive:true});
viewerImage.addEventListener('touchcancel',()=>{swipeStart=null;},{passive:true});
