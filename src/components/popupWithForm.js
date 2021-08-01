import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitFormCallback }, loadingText, defaultText) {
        super(popupSelector)
        this._selectorForm = this._popup.querySelector('.form')
        this._submitButton = this._selectorForm.querySelector('.popup__save')
        this._submitFormCallback = submitFormCallback 
        this._selectorInputs = '.popup__input'
        this._handleFormSubmit = this._handleFormSubmit.bind(this)
        this._submitLoadingText = loadingText
        this._defaultText = defaultText
        this._inputList = this._selectorForm.querySelectorAll(this._selectorInputs)
    }

    _getInputValues() {
        this._formValues = {}
        this._inputList.forEach((input) => (
            this._formValues[input.name] = input.value
        ))
        return this._formValues
    }

    setEventListeners() {
        super.setEventListeners()
        this._selectorForm.addEventListener('submit', this._handleFormSubmit)
    }

    close() {
        this._selectorForm.reset()
        super.close()
        this._renderLoading(false)
    }

    _handleFormSubmit(evt) {
        evt.preventDefault()
        this._renderLoading(true)
        this._submitFormCallback(this._getInputValues())
    }

    _renderLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = this._submitLoadingText
        } else {
            this._submitButton.textContent = this._defaultText
        }
    }
}