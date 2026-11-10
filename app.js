const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }
menuButton.addEventListener('click', () => {
 const open = menuButton.getAttribute('aria-expanded') !== 'true';
 menuButton.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
});
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
window.matchMedia('(min-width: 48.01rem)').addEventListener('change', e => { if (e.matches) closeMenu(); });
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const galleryItems = [...document.querySelectorAll('.gallery-grid figure')];
function filterGallery(category) {
 filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
 let count = 0;
 galleryItems.forEach(item => { item.hidden = category !== 'semua' && item.dataset.category !== category; if (!item.hidden) count++; });
 document.querySelector('#gallery-status').textContent = `${count} karya dipaparkan.`;
}
filterButtons.forEach(button => button.addEventListener('click', () => filterGallery(button.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(link => link.addEventListener('click', () => filterGallery(link.dataset.filterLink)));
const dialog = document.querySelector('#lightbox');
let dialogTrigger;
document.querySelectorAll('.gallery-open').forEach(link => link.addEventListener('click', e => {
 if (typeof dialog.showModal !== 'function') return;
 e.preventDefault(); dialogTrigger = link;
 const image = document.querySelector('#lightbox-image'); image.src = link.getAttribute('href'); image.alt = link.querySelector('img').alt;
 document.querySelector('#lightbox-title').textContent = link.dataset.title;
 dialog.querySelector('.whatsapp').href = `https://wa.me/60178743020?text=${encodeURIComponent('Salam Modern Nature, saya ingin bertanya tentang ' + link.dataset.title + '.')}`;
 dialog.showModal(); document.documentElement.style.overflow = 'hidden';
}));
dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r=dialog.getBoundingClientRect(); if (e.clientX<r.left || e.clientX>r.right || e.clientY<r.top || e.clientY>r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.documentElement.style.overflow = ''; dialogTrigger?.focus(); });
