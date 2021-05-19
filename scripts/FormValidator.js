export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputErrorClass: "popup__input_type_error",
  spanErrorMessage: ".popup__span",
  inputContainer: ".popup__input-container",
};

export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._spanErrorMessage = config.spanErrorMessage;
    this._inputContainer = config.inputContainer;

    this._inputInvalidClass = config.inputInvalidClass;
    this._buttonInvalidClass = config.buttonInvalidClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
  }

  _showError = (inputElement, errorMessage) => {
    const errorElement = inputElement
      .closest(this._inputContainer)
      .querySelector(this._spanErrorMessage);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  _hideError = (inputElement) => {
    const errorElement = inputElement
      .closest(this._inputContainer)
      .querySelector(this._spanErrorMessage);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _isInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._isInvalidInput()) {
      this._button.setAttribute("disabled", "");
    } else {
      this._button.removeAttribute("disabled", "");
    }
  };
}
