import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { submitFormCallback }) {
        super(popupSelector)
        this._selectorForm = this._popup.querySelector('.form')
        this._submitButton = this._selectorForm.querySelector('.popup__save')
        this._submitFormCallback = submitFormCallback 
        this._selectorInputs = '.popup__input'
        this._handleFormSubmit = this._handleFormSubmit.bind(this)
    }

    _getInputValues() {
        this._inputList = this._selectorForm.querySelectorAll(this._selectorInputs)
        this._formValues = {}
        this._inputList.forEach((input) => (
            this._formValues[input.name] = input.value
        ))
        return this._formValues
    }

    open() {
        super.open()
        this.setEventListeners()
    }

    setEventListeners() {
        super.setEventListeners()
        this._selectorForm.addEventListener('submit', this._handleFormSubmit)
    }

    close() {
        this._selectorForm.reset()
        super.close()
    }

    _handleFormSubmit(evt) {
        evt.preventDefault()
        this._submitFormCallback(this._getInputValues())
        
    }
}