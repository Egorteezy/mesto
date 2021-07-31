export default class Card {
  constructor(cardData, cardSelector, handleCardClick, handleLikeClick, handleOpenPopupDelete, myId) {
    this._title = cardData.name;
    this._photo = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id
    this._cardOwner = cardData.owner
    this._myId = myId
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
    this._handleLikeClick = handleLikeClick
    this._handleOpenPopupDelete = handleOpenPopupDelete
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
    this._likeButton = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._titleElement.textContent = this._title;
    this._photoElement.src = this._photo;
    this._photoElement.alt = this._title;
    this._likeCounter.textContent = this._likes.length
    if (this._myId !== this._cardOwner._id) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    if (this._myId === this._cardOwner._id) {
      this._deleteButton.addEventListener("click", () => {
        this._handleOpenPopupDelete(this._cardId, this._element);
      });
    }
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => this._handleLikeClick(this._cardId, this._likeCounter, this._likeButton));
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", this._handleCardClick)
  }

  // _removeCard() {
  //   this.closest('.element').remove()
  // }
}
