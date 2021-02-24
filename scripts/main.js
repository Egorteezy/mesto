let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__container')
let nameInput = formElement.querySelector('#input_name')
let jobInput = formElement.querySelector('#input_prof')
let authorName = document.querySelector('.profile__name')
let authorProf = document.querySelector('.profile__profession')

function openPopup() {
    popup.classList.add('popup_opened')
    nameInput.value = authorName.textContent
    jobInput.value = authorProf.textContent
}

function closePopup() {
    popup.classList.remove('popup_opened')
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    // let nameValue = nameInput.value
    // let jobValue = jobInput.value
    authorName.textContent = nameInput.value
    authorProf.textContent = jobInput.value
    closePopup()
}

popupOpenButton.addEventListener('click', openPopup)
popupCloseButton.addEventListener('click', closePopup)
formElement.addEventListener('submit', formSubmitHandler);