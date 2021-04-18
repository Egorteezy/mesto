const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage
  }

const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`)
  inputElement.classList.remove('popup__input_type_error')
  errorElement.textContent = ""
}

const isValid = (formElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideError(formElement, inputElement)
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
  const buttonElement = formElement.querySelector('.popup__save')
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  })
}

const formValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll('.form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement)
  })
}

formValidation()

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