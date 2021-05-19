import { initialCards } from "./initial-сards.js";
import { Card } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";

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

initialCards.forEach((item) => {
  const card = new Card(item, "#placeCard");
  const cardElement = card.createCard();
  cardElement
    .querySelector(".element__photo")
    .addEventListener("click", openPopupPic);
  document.querySelector(".elements").prepend(cardElement);
});

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escClosePopup);
  popup.addEventListener("click", overlayClosePopup);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClosePopup);
  popup.removeEventListener("click", overlayClosePopup);
}

function overlayClosePopup(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function openPopupProfile() {
  nameInput.value = authorName.textContent;
  jobInput.value = authorProf.textContent;
  popupProfile.querySelectorAll(".popup__span").forEach((span) => {
    span.textContent = "";
  });
  popupProfile.querySelectorAll(".popup__input").forEach((error) => {
    error.classList.remove("popup__input_type_error");
  });
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
  newPlace
    .querySelector(".element__photo")
    .addEventListener("click", openPopupPic);
  document.querySelector(".elements").prepend(newPlace);

  closePopup(popupAdd);
  photoInput.value = "";
  titleInput.value = "";
  popupAdd.querySelector(".popup__save").setAttribute("disabled", "");
}

export function escClosePopup(evt) {
  const openPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    openPopup.classList.remove("popup_opened");
    openPopup.removeEventListener("keydown", escClosePopup);
    openPopup.removeEventListener("click", overlayClosePopup);
  }
}

function openPopupPic(evt) {
  const popupImage = document.querySelector(".popup__image");
  const popupPic = document.querySelector(".popup_type_image");
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  document.querySelector(".popup__title_type_image").textContent =
    popupImage.alt;
  openPopup(popupPic);
}

document.querySelector(".profile__edit").addEventListener("click", openPopupProfile);
closeProfile.addEventListener("click", () => {closePopup(popupProfile)});
popupProfile.addEventListener("submit", putNewProfile);
document.querySelector(".profile__add-button").addEventListener("click", openPopupAdd);
document.querySelector(".popup__close_type_card-add").addEventListener("click", () => {closePopup(popupAdd);});
popupAdd.addEventListener("submit", addContainer);
document.querySelector(".popup__close_type_image").addEventListener("click", () => {closePopup(popupPic);});
