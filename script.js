'use strict';

// ── Lightbox ─────────────────────────────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = galleryItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const img = galleryItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  const img = galleryItems[currentIndex].querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
}

// Open on gallery item click
galleryItems.forEach(function(item, index) {
  item.addEventListener('click', function() {
    openLightbox(index);
  });
});

// Navigation buttons
lightboxPrev.addEventListener('click', function(e) {
  e.stopPropagation();
  showPrev();
});

lightboxNext.addEventListener('click', function(e) {
  e.stopPropagation();
  showNext();
});

// Close on button or backdrop click
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard: Escape / Arrow keys
document.addEventListener('keydown', function(e) {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});
