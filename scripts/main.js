import { initialCards } from "./initial-сards.js";
import { Card } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";
import {openPopup, closePopup} from "./popup.js"

const popupProfile = document.querySelector(".popup_type_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");
const authorName = document.querySelector(".profile__name");
const authorProf = document.querySelector(".profile__profession");
const popupAdd = document.querySelector(".popup_type_card-add");
const popupPic = document.querySelector(".popup_type_image");
const closeProfile = document.querySelector(".popup__close_type_profile");
const popupAddFormValidation = new FormValidator(validationConfig, popupAdd);
const popupProfileFormValidation = new FormValidator(validationConfig, popupProfile);

function openPopupProfile() {
  nameInput.value = authorName.textContent;
  jobInput.value = authorProf.textContent;
  popupProfileFormValidation.resetErrorMessages(popupProfile)
  openPopup(popupProfile);
  popupProfileFormValidation.setEventListeners();
}

function openPopupAdd() {
  openPopup(popupAdd);
  popupAddFormValidation.setEventListeners();
}

function putNewProfile(evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorProf.textContent = jobInput.value;
  closePopup(popupProfile);
}

function addContainer(evt) {
  evt.preventDefault();
  const titleInput = popupAdd.querySelector(".popup__input_type_title");
  const photoInput = popupAdd.querySelector(".popup__input_type_photo");
  const newPlace = new Card(
    {
      name: titleInput.value,
      link: photoInput.value,
    },
    "#placeCard"
  ).createCard();
  document.querySelector(".elements").prepend(newPlace);

  closePopup(popupAdd);
  popupAddFormValidation.clearFormClosed(popupAdd)
}

document.querySelector(".profile__edit").addEventListener("click", openPopupProfile);
closeProfile.addEventListener("click", () => {closePopup(popupProfile)});
popupProfile.addEventListener("submit", putNewProfile);
document.querySelector(".profile__add-button").addEventListener("click", openPopupAdd);
document.querySelector(".popup__close_type_card-add").addEventListener("click", () => {closePopup(popupAdd);});
popupAdd.addEventListener("submit", addContainer);
document.querySelector(".popup__close_type_image").addEventListener("click", () => {closePopup(popupPic);});

initialCards.forEach((item) => {
  const card = new Card(item, "#placeCard");
  const cardElement = card.createCard();
  document.querySelector(".elements").prepend(cardElement);
});