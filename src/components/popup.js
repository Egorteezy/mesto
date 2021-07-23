export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector)
      this._closeButton = this._popup.querySelector('.popup__close')
      this._openPopupClass = 'popup_opened'
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleButtonClose = this._handleButtonClose.bind(this);
      this._overlayClose = this._overlayClose.bind(this);
    };

    open() {
      this._popup.classList.add(this._openPopupClass)
      document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
      this._popup.classList.remove(this._openPopupClass)
      document.removeEventListener('keydown', this._handleEscClose)
    }

    _handleEscClose(evt) {
      if(evt.key === 'Escape') {
        this.close()
      }
    }

    _handleButtonClose() {
      this.close()
    }

    setEventListeners() {
      this._popup.addEventListener('click', this._overlayClose)
      this._closeButton.addEventListener('click',  this._handleButtonClose)
    }

    _overlayClose(evt) {
      if(evt.target.classList.contains(this._openPopupClass)) {
        this.close()
      }
    }
  }