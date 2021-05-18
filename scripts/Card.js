export class Card {
  constructor(cardData, cardSelector) {
    this._title = cardData.name;
    this._photo = cardData.link;
    this._cardSelector = cardSelector;

    const newPlace = this._createCard();
    document.querySelector(".elements").prepend(newPlace);
    this._addActives();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  _createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__title").textContent = this._title;
    this._element.querySelector(".element__photo").src = this._photo;
    this._element.querySelector(".element__photo").alt = this._title;
    return this._element;
  }

  _addActives() {
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

  _escClosePopup(evt) {
    const openPopup = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {
      openPopup.classList.remove('popup_opened')
      openPopup.removeEventListener('keydown', escClosePopup)
      openPopup.removeEventListener('click', overlayCloseProfile)
    }
  }

  _openPopupPic(evt) {
    const popupImage = document.querySelector(".popup__image");
    const popupPic = document.querySelector(".popup_type_image");
    popupImage.src = evt.target.src;
    popupPic.classList.add("popup_opened");
    
    const cardTitle = evt.target
      .closest(".element")
      .querySelector(".element__title").textContent;
    document.querySelector(".popup__title_type_image").textContent = cardTitle;
    popupImage.alt = cardTitle;
  }
}
