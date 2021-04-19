const showError = (config, inputElement, errorMessage) => {
  const errorElement = inputElement.closest(config.inputContainer).querySelector(config.spanErrorMessage)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  }

const hideError = (config, inputElement) => {
  const errorElement = inputElement.closest(config.inputContainer).querySelector(config.spanErrorMessage)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = ""
}

const isValid = (config, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(config, inputElement, inputElement.validationMessage)
  } else {
    hideError(config, inputElement)
  }
}

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(config, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(config, formElement)
  })
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__input_type_error',
  spanErrorMessage: '.popup__span',
  inputContainer: '.popup__input-container'
})

const isInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
})
}

const toggleButtonState = (inputList, buttonElement) => {
if (isInvalidInput(inputList)) {
  buttonElement.setAttribute('disabled', '')
} else {
  buttonElement.removeAttribute('disabled', '')
}
}