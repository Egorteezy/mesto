const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  let container = document.querySelector('.elements');
  let placeCardTemplate = container.querySelector('#placeCard');
  let placeCard = placeCardTemplate.content;
  
  for(let i=0; i < initialCards.length; i++) {
    let newPlace = placeCard.querySelector('.element').cloneNode(true)
    let placeTitle = newPlace.querySelector('.element__title')
    let placePhoto = newPlace.querySelector('.element__photo')
    placeTitle.textContent = initialCards[i].name
    placePhoto.src = initialCards[i].link
    container.prepend(newPlace)
  }
  addActives()
  
  const popup = document.querySelector('.popup');
  const popupOpenButton = document.querySelector('.profile__edit');
  const popupCloseButton = document.querySelector('.popup__close');
  const formElement = popup.querySelector('.popup__container');
  let nameInput = formElement.querySelector('#input_name')
  let jobInput = formElement.querySelector('#input_prof')
  const authorName = document.querySelector('.profile__name');
  const authorProf = document.querySelector('.profile__profession');
  const popupAdd = document.querySelector('.popup-add');
  const addPlaceButton = document.querySelector('.profile__add-button');
  const popupAddCloseButton = document.querySelector('.popup-add__close');
  const popupAddSave = document.querySelector('.popup-add__save');
  const titleInput = popupAdd.querySelector('#input_title');
  const photoInput = popupAdd.querySelector('#input_picture');
  const deleteButton = document.querySelector('.element__delete');
  const popupPic = document.querySelector('.popup-pic')
  const popupPicCloseButton = document.querySelector('.popup-pic__close')
  
  function openPopup() {
      popup.classList.add('popup_opened')
      nameInput.value = authorName.textContent
      jobInput.value = authorProf.textContent
  }
  
  function closePopup() {
      popup.classList.remove('popup_opened')
  }
  
  function formSubmitHandler (evt) {
      evt.preventDefault(); 
      authorName.textContent = nameInput.value
      authorProf.textContent = jobInput.value
      closePopup()
  }
  
  function openPopupAdd() {
      popupAdd.classList.add('popup-add_opened')
  }
  
  function closePopupAdd() {
      popupAdd.classList.remove('popup-add_opened')
  }
  
  function addContaner(evt) {
          evt.preventDefault();
          let newPlace = placeCard.querySelector('.element').cloneNode(true)
          let placeTitle = newPlace.querySelector('.element__title')
          let placePhoto = newPlace.querySelector('.element__photo')
          placeTitle.textContent = titleInput.value
          placePhoto.src = photoInput.value
          placePhoto.alt = titleInput.value
          container.prepend(newPlace)
          closePopupAdd()
          addActives()
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
    let popupImage = document.querySelector('.popup-pic__image')
    popupImage.src = evt.target.src 
    popupPic.classList.add('popup-pic_opened')
    let cardTitle = evt.target.closest('.element').querySelector('.element__title').textContent
    document.querySelector('.popup-pic__title').textContent = cardTitle
    popupImage.alt = cardTitle
  }
  
  function closePopupPic() {
    popupPic.classList.remove('popup-pic_opened')
  }
  
  
  popupOpenButton.addEventListener('click', openPopup)
  popupCloseButton.addEventListener('click', closePopup)
  formElement.addEventListener('submit', formSubmitHandler)
  addPlaceButton.addEventListener('click', openPopupAdd)
  popupAddCloseButton.addEventListener('click', closePopupAdd)
  popupAddSave.addEventListener('click', addContaner)
  popupPicCloseButton.addEventListener('click', closePopupPic)