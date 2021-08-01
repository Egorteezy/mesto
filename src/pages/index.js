// Импорт классов
import Card from "../components/Card.js";
import { FormValidator, validationConfig } from "../components/FormValidator.js";
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import '../pages/index.css';
import Api from "../components/Api.js"
import PopupWithSubmit from "../components/PopupWithSubmit.js";

// Объявляем константы
const popupProfileForm = document.querySelector(".popup_type_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");
const popupAddForm = document.querySelector(".popup_type_card-add");
const popupChangeAvatarForm = document.querySelector(".popup_type_avatar-add")
let userId 
// Создаем экземпляры классов
const user = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar')

const popupProfile = new PopupWithForm(
  ".popup_type_profile", 
  {submitFormCallback: ({name, profession}) => {
    api.patchUserInfo({name: name, about: profession })
    .then((data) => {
      user.setUserInfo({
        name: data.name,
        profession: data.about,
        id: data._id
      })
      popupProfile.close()
    })
    .catch((err) => console.log(err))
  }
}, 'Сохранение...', 'Сохранить')

const initialCardList = new Section({
  renderer: (item) => {
      const cardElement = createCardElement(item)
      initialCardList.addItem(cardElement)
  }
}, '.elements')

const popupAdd = new PopupWithForm (
  ".popup_type_card-add", 
  {submitFormCallback: handleCardCreate}, 'Создание...', 'Создать'
)

const popupImage = new PopupWithImage('.popup_type_image', '.popup__title_type_image', '.popup__image')
popupImage.setEventListeners()

const popupSubmit = new PopupWithSubmit('.popup_type_card-delete', 
{
  submitFormCallback: handleCardDelete
}, 'Удаление...', 'Да')

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-26', 
  headers: {
  authorization: '344bc90d-0cb2-49f8-8322-6cd96f065f72',
  'Content-Type': 'application/json'
  }
})

const popupChangeAvatar = new PopupWithForm('.popup_type_avatar-add', {
  submitFormCallback: ({avatar}) => {
    api.changeAvatar({link:avatar})
    .then((data) => {user.setUserAvatar(data.avatar)
    popupChangeAvatar.close()
  })
    .catch((err) => console.log(err))
  }}, 'Сохранение...', 'Сохранить')

  function handleOpenChangeAvatar() {
    popupChangeAvatar.open()
    popupChangeAvatarValidation.resetValidation()
  }

const popupAddFormValidation = new FormValidator(validationConfig, popupAddForm);
const popupProfileFormValidation = new FormValidator(validationConfig, popupProfileForm);
const popupChangeAvatarValidation = new FormValidator(validationConfig, popupChangeAvatarForm)

// Вешаем слушатели
popupProfile.setEventListeners()
popupAdd.setEventListeners()
popupSubmit.setEventListeners()
popupChangeAvatar.setEventListeners()
popupAddFormValidation.setEventListeners();
popupProfileFormValidation.setEventListeners();
popupChangeAvatarValidation.setEventListeners()

document.querySelector(".profile__edit").addEventListener("click", handleOpenEditProfile);
document.querySelector(".profile__add-button").addEventListener("click", handleOpenCardAdd);
document.querySelector(".profile__avatar-button").addEventListener("click", handleOpenChangeAvatar);


function handleOpenEditProfile() {
  const userData = user.getUserInfo();
  nameInput.value = userData.username;
  jobInput.value = userData.profession;

  popupProfile.open();
}

function handleOpenCardAdd() {
  popupAdd.open()
  popupAddFormValidation.resetValidation()
}

function createCardElement(item) {
  const card = new Card(item, "#placeCard", () => popupImage.open(item), handleLikeClick, handleOpenPopupDelete, userId);
  const cardElement = card.createCard();
  return cardElement
}

// Создаем функции
function handleCardCreate({ title, photo }) {
  api
    .postNewCard({
      name: title,
      link: photo,
    })
    .then((data) => {
      const cardElement = createCardElement(data);
      initialCardList.addItem(cardElement);

      popupAdd.close();
    })
    .catch((err) => console.log(err))
}

function handleOpenPopupDelete(cardId, card) {
  popupSubmit.open(cardId, card)
}

function handleLikeClick(cardId, likeCounter, likeButton) {
  likeButton.classList.contains("element__like_active")
  ? api
      .removeLikeCards(cardId)
      .then((data) => {
        likeButton.classList.remove("element__like_active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((error) => console.log(error))
  : api
      .putLikeCards(cardId)
      .then((data) => {
        likeButton.classList.add("element__like_active");
        likeCounter.textContent = data.likes.length;
      })
      .catch((error) => console.log(error));
}

function handleCardDelete(cardId, card) {
  api
  .deleteCard(cardId)
  .then(() => {
    card.remove();
    card = null;

    popupSubmit.close();
  })
  .catch((error) => console.log(error))
}

// Получаем данные с сервера для загрузки начальной страницы
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([data, initialCards]) => {
  user.setUserInfo({
    name: data.name,
    profession: data.about,
    id: data._id,
  });
  user.setUserAvatar(data.avatar)
  userId = data._id
  initialCards.reverse();
  initialCardList.renderItems(initialCards)
})
.catch((error) => console.log(error))