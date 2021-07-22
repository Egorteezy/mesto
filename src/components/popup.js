// const popupImage = document.querySelector(".popup__image");
// const popupPic = document.querySelector(".popup_type_image");

// export function openPopup(popup) {
//     popup.classList.add("popup_opened");
//     document.addEventListener("keydown", escClosePopup);
//     popup.addEventListener("click", overlayClosePopup);
//   }

// export function escClosePopup(evt) {
//   if (evt.key === "Escape") {
//     const openPopup = document.querySelector(".popup_opened");
//     closePopup(openPopup)
//       }
//   }

// export function overlayClosePopup(evt) {
//       if (evt.target.classList.contains("popup")) {
//         closePopup(evt.target);
//       }
//   }

// export function openPopupPic(evt) {
//     popupImage.src = evt.target.src;
//     popupImage.alt = evt.target.alt;
//     document.querySelector(".popup__title_type_image").textContent =
//       popupImage.alt;
//     openPopup(popupPic);
//   }

  // export function closePopup(popup) {
  //   popup.classList.remove("popup_opened");
  //   document.removeEventListener("keydown", escClosePopup);
  //   popup.removeEventListener("click", overlayClosePopup);
  // }


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