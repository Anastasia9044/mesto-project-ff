//Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClassActive);
}

//Функция, которая удаляет класс с ошибкой

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClassActive);
    errorElement.textContent = '';
}

//Функция, проверяющая соответствие шаблону и общей валидности

const isValid = (formElement, inputElement, obj) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
}

//Функция проверки элемента на валидность 

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
 }

//Функция управления состоянием кнопки (элемент невалидный => кнопка неактивна)

const toggleButtonState = (inputList, buttonElement, obj) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(obj.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(obj.inactiveButtonClass);
    }
}

//Функция проверки состояния формы

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

//Функция, обеспечивающая активацию валидации, не дает отправить данные, пока поля не будут валидны 

const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, obj);
    });
};

//Функция для сброса состояния валидации форм

const clearValidation = (form, obj) => {
    const allFormInputs = form.querySelectorAll(obj.inputSelector);
    const submitButton = form.querySelector(obj.submitButtonSelector);
   
    submitButton.classList.add(obj.inactiveButtonClass);
    submitButton.disabled = true;
    
    allFormInputs.forEach((input) => {
        hideInputError(form, input, obj);
   });
}

//экспорт 

export {enableValidation, clearValidation};