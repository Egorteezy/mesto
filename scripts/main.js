  const container = document.querySelector('.elements');
  const placeCardTemplate = container.querySelector('#placeCard');
  const placeCard = placeCardTemplate.content;
  
  function createCard() {
    const newPlace = placeCard.querySelector('.element').cloneNode(true)
    const placeTitle = newPlace.querySelector('.element__title')
    const placePhoto = newPlace.querySelector('.element__photo')
    placeTitle.textContent = nameOfPlace
    placePhoto.src = linkOfPlace
    placePhoto.alt = nameOfPlace
    container.prepend(newPlace)
    addActives()
  }

  for(let i=0; i < initialCards.length; i++) {
    nameOfPlace = initialCards[i].name
    linkOfPlace = initialCards[i].link
    createCard()
  }
  
  const popupProfile = document.querySelector('.popup_type_profile');
  const profileOpenButton = document.querySelector('.profile__edit');
  const profileCloseButton = document.querySelector('.popup__close_type_profile');
  const nameInput = document.querySelector('.popup__input_type_name')
  const jobInput = document.querySelector('.popup__input_type_profession')
  const authorName = document.querySelector('.profile__name');
  const authorProf = document.querySelector('.profile__profession');
  const popupAdd = document.querySelector('.popup_type_card-add');
  const addPlaceButton = document.querySelector('.profile__add-button');
  const popupAddCloseButton = document.querySelector('.popup__close_type_card-add');
  const titleInput = popupAdd.querySelector('.popup__input_type_title');
  const photoInput = popupAdd.querySelector('.popup__input_type_photo');
  const deleteButton = document.querySelector('.element__delete');
  const popupPic = document.querySelector('.popup_type_image')
  const popupPicCloseButton = document.querySelector('.popup__close_type_image')
  const popupImage = document.querySelector('.popup__image')
  
  function openPopup(popup) {
    popup.classList.add('popup_opened')
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened')
  }

  function openPopupProfile() {
    nameInput.value = authorName.textContent
    jobInput.value = authorProf.textContent
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
    linkOfPlace = photoInput.value
    nameOfPlace = titleInput.value
    createCard()
    closePopup(popupAdd)
    photoInput.value = ''
    titleInput.value = ''
  }
  
  function addActives() {
    let deleteButton = document.querySelectorAll('.element__delete')
    for(let i=0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener('click', function() {
        const elementItem = this.closest('.element')
        elementItem.remove()
      }
    )}
  
    let activeLikes = document.querySelectorAll('.element__like') 
      for(let i=0; i < activeLikes.length; i++) { 
          activeLikes[i].addEventListener('click', like)
        } 
    
    let openPic = document.querySelectorAll('.element__photo')
      for(let i=0; i < openPic.length; i++) {
        openPic[i].addEventListener('click', openPopupPic)
      }
  }

  function like(evt) { 
    evt.target.classList.toggle('element__like_active') 
  }
  
  function openPopupPic(evt) {
    popupImage.src = evt.target.src 
    openPopup(popupPic)
    let cardTitle = evt.target.closest('.element').querySelector('.element__title').textContent
    document.querySelector('.popup__title_type_image').textContent = cardTitle
    popupImage.alt = cardTitle
  }
  
  profileOpenButton.addEventListener('click', openPopupProfile)
  profileCloseButton.addEventListener('click',  () => {closePopup(popupProfile)})
  popupProfile.addEventListener('submit', putNewProfile)
  addPlaceButton.addEventListener('click', () => {openPopup(popupAdd)})
  popupAddCloseButton.addEventListener('click', () => {closePopup(popupAdd)})
  popupAdd.addEventListener('submit', addContaner)
  popupPicCloseButton.addEventListener('click', () => {closePopup(popupPic)})

