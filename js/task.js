import items from '../gallery-items.js';

const galleryContainerRef = document.querySelector('.js-gallery');
const lightboxContainerRef = document.querySelector('.js-lightbox');
const lightboxOverlay = document.querySelector('.lightbox__content');
const lightboxImgRef = document.querySelector('.lightbox__image');
const buttonRef = document.querySelector('button[data-action="close-lightbox"]',);

const createItemCard = item => {
  const listRef = document.createElement('li');
  listRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.setAttribute('href', item.original);

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.setAttribute('src', item.preview);
  imgRef.setAttribute('data-source', item.original);
  imgRef.setAttribute('alt', item.description);

  linkRef.appendChild(imgRef);

  listRef.appendChild(linkRef);

  return listRef;
};

const itemList = items.map(item => createItemCard(item));

galleryContainerRef.append(...itemList);

galleryContainerRef.addEventListener('click', openModal);
buttonRef.addEventListener('click', closeModal);
lightboxOverlay.addEventListener('click', clickOnOverlay);

function openModal(event) {
  event.preventDefault();
  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;

  if (imageRef.nodeName !== 'IMG') {
    return;
  }

  lightboxContainerRef.classList.add('is-open');

  window.addEventListener('keydown', escClick);

  showBigFoto(largeImageURL, imageRef.alt);
}

function escClick(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function showBigFoto(url, description) {
  lightboxImgRef.src = url;
  lightboxImgRef.alt = description;
}

function closeModal(event) {
  lightboxContainerRef.classList.remove('is-open');
  showBigFoto('', '');
  window.removeEventListener('keydown', escClick);
}

function clickOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}
function outImgClick(event) {
  if (buttonRef === event.currentTarget) {
    closeModal();
  }
}
