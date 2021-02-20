let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.author__edit');
let popupCloseButton = document.querySelector('.popup__close');

function openPopup() {
    popup.classList.add('popup_opened')
}
popupOpenButton.addEventListener('click', openPopup)

function closePopup() {
    popup.classList.remove('popup_opened')
}
popupCloseButton.addEventListener('click', closePopup)

//Находим форму в DOM
let formElement = popup.querySelector('.popup__container')
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name')
let jobInput = formElement.querySelector('.popup__profession')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value
    const jobValue = jobInput.value
    // Выберите элементы, куда должны быть вставлены значения полей
    const authorName = document.querySelector('.author__name')
    const authorProf = document.querySelector('.author__profession')
    // Вставьте новые значения с помощью textContent
    authorName.textContent = nameInput.value
    authorProf.textContent = jobInput.value
    closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

let activeLikes = document.querySelectorAll('.element__like')
for(let i=0; i < activeLikes.length; i++) {
    activeLikes[i].addEventListener('click', like)
  }
function like(evt) {
    evt.target.classList.toggle('element__like-on')
}