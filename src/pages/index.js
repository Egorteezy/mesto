import { initialCards } from "../components/initial-сards.js";
import Card from "../components/Card.js";
import { FormValidator, validationConfig } from "../components/FormValidator.js";
import Section from "../components/Section.js"
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithImage from "../components/popupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import '../pages/index.css';

const popupProfileForm = document.querySelector(".popup_type_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");
const popupAddForm = document.querySelector(".popup_type_card-add");

const user = new UserInfo('.profile__name', '.profile__profession')

const popupProfile = new PopupWithForm(
  ".popup_type_profile", 
  {submitFormCallback: ({name, profession}) => {
    user.setUserInfo(name, profession)
    popupProfile.close()
  }
})

popupProfile.setEventListeners()

const initialCardList = new Section({
  renderer: (item) => {
      const cardElement = createCardElement(item)
      initialCardList.addItem(cardElement)
  }
}, '.elements')

function handleOpenEditProfile() {
  const userData = user.getUserInfo();
  nameInput.value = userData.username;
  jobInput.value = userData.profession;

  popupProfile.open();
}

const popupAdd = new PopupWithForm (
  ".popup_type_card-add", 
  {submitFormCallback: ({ title, photo }) => {
  const cardElement = createCardElement({
    name: title,
    link: photo,
  })
  initialCardList.addItem(cardElement)

  popupAdd.close();
    }}
)

popupAdd.setEventListeners()

function handleOpenCardAdd() {
  popupAdd.open()
  popupAddFormValidation.resetValidation()
}


function createCardElement(item) {
  const card = new Card(item, "#placeCard", () => popupImage.open(item));
  const cardElement = card.createCard();
  return cardElement
}

const popupImage = new PopupWithImage('.popup_type_image', '.popup__title_type_image', '.popup__image')
popupImage.setEventListeners()

initialCardList.renderItems(initialCards)

const popupAddFormValidation = new FormValidator(validationConfig, popupAddForm);
const popupProfileFormValidation = new FormValidator(validationConfig, popupProfileForm);

popupAddFormValidation.setEventListeners();
popupProfileFormValidation.setEventListeners();
document.querySelector(".profile__edit").addEventListener("click", handleOpenEditProfile);
document.querySelector(".profile__add-button").addEventListener("click", handleOpenCardAdd);

