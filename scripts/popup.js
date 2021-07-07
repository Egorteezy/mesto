const popupImage = document.querySelector(".popup__image");
const popupPic = document.querySelector(".popup_type_image");

export function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", escClosePopup);
    popup.addEventListener("click", overlayClosePopup);
  }

export function escClosePopup(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup)
      }
  }

export function overlayClosePopup(evt) {
      if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
      }
  }

export function openPopupPic(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    document.querySelector(".popup__title_type_image").textContent =
      popupImage.alt;
    openPopup(popupPic);
  }

  export function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", escClosePopup);
    popup.removeEventListener("click", overlayClosePopup);
  }