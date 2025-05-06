//Функция открытия попапа

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапа

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", closePopupEsc);
}

//Функция закрытия попапа Esc

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

//Функция закрытия попапа оверлеем

function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

//Экспортируем функции в index.js

export { openPopup, closePopup };
