const container = document.querySelector('.elements');
const placeCardTemplate = container.querySelector('#placeCard');
const placeCard = placeCardTemplate.content;

function createCard(cardData) {
  const newPlace = placeCard.querySelector('.element').cloneNode(true)
  const placeTitle = newPlace.querySelector('.element__title')
  const placePhoto = newPlace.querySelector('.element__photo')
  placeTitle.textContent = cardData.name
  placePhoto.src = cardData.link
  placePhoto.alt = cardData.name
  return newPlace
}

function addCard(cardData) {
  const newPlace = createCard(cardData)
  container.prepend(newPlace)
  addActives(newPlace)
}

for(let i=0; i < initialCards.length; i++) {
  addCard(initialCards[i])
}

const popupProfile = document.querySelector('.popup_type_profile');
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_profession')
const authorName = document.querySelector('.profile__name');
const authorProf = document.querySelector('.profile__profession');
const popupAdd = document.querySelector('.popup_type_card-add');
const popupPic = document.querySelector('.popup_type_image')


function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', escClosePopup)
  popup.addEventListener('click', overlayCloseProfile)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', escClosePopup)
  popup.removeEventListener('click', overlayCloseProfile)
}

function escClosePopup(evt) {
  const openPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(openPopup)
  }
}

function overlayCloseProfile(evt) {
  const openPopup = document.querySelector('.popup_opened')
    if (evt.target.classList.contains('popup')) {
      closePopup(openPopup)
    }
}

function openPopupProfile() {
  nameInput.value = authorName.textContent
  jobInput.value = authorProf.textContent
  popupProfile.querySelectorAll('.popup__span').forEach((span) => {span.textContent = ''})
  popupProfile.querySelectorAll('.popup__input').forEach((error) => {error.classList.remove('popup__input_type_error')})
  openPopup(popupProfile)
}

function putNewProfile (evt) {
  evt.preventDefault(); 
  authorName.textContent = nameInput.value
  authorProf.textContent = jobInput.value
  closePopup(popupProfile)
}

function addContaner(evt) {
  evt.preventDefault();
  const titleInput = popupAdd.querySelector('.popup__input_type_title')
  const photoInput = popupAdd.querySelector('.popup__input_type_photo')
  addCard({
    name: titleInput.value,
    link: photoInput.value
  })
  closePopup(popupAdd)
  photoInput.value = ''
  titleInput.value = ''
}

function addActives(newPlace) {
  newPlace.querySelector('.element__delete').addEventListener('click', function() {
    const elementItem = this.closest('.element')
    elementItem.remove()
  })

  newPlace.querySelector('.element__like').addEventListener('click', like)
  
  newPlace.querySelector('.element__photo').addEventListener('click', openPopupPic)
}

function like(evt) { 
  evt.target.classList.toggle('element__like_active') 
}

function openPopupPic(evt) {
  const popupImage = document.querySelector('.popup__image')
  popupImage.src = evt.target.src 
  openPopup(popupPic)
  const cardTitle = evt.target.closest('.element').querySelector('.element__title').textContent
  document.querySelector('.popup__title_type_image').textContent = cardTitle
  popupImage.alt = cardTitle
}

const closeProfile = document.querySelector('.popup__close_type_profile')

document.querySelector('.profile__edit').addEventListener('click', openPopupProfile)
closeProfile.addEventListener('click',  () => {closePopup(popupProfile)})
popupProfile.addEventListener('submit', putNewProfile)
document.querySelector('.profile__add-button').addEventListener('click', () => {openPopup(popupAdd)})
document.querySelector('.popup__close_type_card-add').addEventListener('click', () => {closePopup(popupAdd)})
popupAdd.addEventListener('submit', addContaner)
document.querySelector('.popup__close_type_image').addEventListener('click', () => {closePopup(popupPic)})