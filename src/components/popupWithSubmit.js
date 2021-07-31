import Popup from "./popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, { submitFormCallback }, loadingText, defaultText) {
        super(popupSelector)
        this._selectorForm = this._popup.querySelector('.form')
        this._submitButton = this._selectorForm.querySelector('.popup__agree')
        this._submitFormCallback = submitFormCallback 
        this._handleFormSubmit = this._handleFormSubmit.bind(this)
        this._rederLoading = this._rederLoading.bind(this)
        this._submitLoadingText = loadingText
        this._defaultText = defaultText
    }

    open(data, element) {
        super.open()
        this._data = data
        this._element = element
        this.setEventListeners()
    }

    setEventListeners() {
        super.setEventListeners()
        this._selectorForm.addEventListener('submit', this._handleFormSubmit)
    }

    _handleFormSubmit(evt) {
        evt.preventDefault()
        this._rederLoading(true)
        this._submitFormCallback(this._data, this._element)
        
    }

    _rederLoading(isLoading) {
        if(isLoading) {
            this._submitButton.textContent = this._submitLoadingText
        } else {
            this._submitButton.textContent = this._defaultText
        }
    }

    close() {
        super.close()
        this._rederLoading(false)
    }
}