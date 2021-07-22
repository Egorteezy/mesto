import PopupWithImage from "./popupWithImage.js";

export default class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._title = cardData.name;
    this._photo = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector(".element__title")
    this._photoElement = this._element.querySelector(".element__photo")
    this._titleElement.textContent = this._title;
    this._photoElement.src = this._photo;
    this._photoElement.alt = this._title;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", this._removeCard);
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._like);
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", this._handleCardClick)
  }

  _removeCard() {
    this.closest('.element').remove()
  }

  _like(evt) {
    evt.target.classList.toggle("element__like_active");
  }
}
