import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, imageSelectorName, imageSelectorLink) {
        super(popupSelector)
        this._imageName = this._popup.querySelector(imageSelectorName)
        this._imageLink = this._popup.querySelector(imageSelectorLink)
    }

    open({name, link}) {
        this._imageName.textContent = name
        this._imageLink.src = link
        this._imageLink.alt = name
        super.open();
    }
}

