export class Card {
  constructor(cardData, cardSelector) {
    this._title = cardData.name;
    this._photo = cardData.link;
    this._cardSelector = cardSelector;
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
    this._element.querySelector(".element__title").textContent = this._title;
    this._element.querySelector(".element__photo").src = this._photo;
    this._element.querySelector(".element__photo").alt = this._title;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", function () {
        this.closest(".element").remove();
      });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._like);
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", this._openPopupPic);
  }

  _like(evt) {
    evt.target.classList.toggle("element__like_active");
  }
}
