//Импортируем все нужные файлы

import { createCard, deleteCard, CardLikeButton } from "./card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./modal.js";
import "/src/pages/index.css";

//Переменные

const placeCards = document.querySelector(".places__list");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCardImage = document.querySelector(".popup_type_image");
const popupButtonClose = popupTypeEdit.querySelector(".popup__close");
const popupCloseCard = popupNewCard.querySelector(".popup__close");
const popupImage = popupCardImage.querySelector(".popup__image");
const popupImageCaption = popupCardImage.querySelector(".popup__caption");
const popupCloseImage = popupCardImage.querySelector(".popup__close");
const popupsArray = [popupTypeEdit, popupNewCard, popupCardImage];

const editProfile = document.forms["edit-profile"];
const inputName = editProfile.querySelector(".popup__input_type_name");
const inputDescription = editProfile.querySelector(".popup__input_type_description");

const popupNewPlace = document.forms["new-place"];
const inputTypeCardName = popupNewPlace.querySelector(".popup__input_type_card-name");
const inputTypeUrl = popupNewPlace.querySelector(".popup__input_type_url");

//Функция чтения полей

function submitEditProfileForm(evt) {
  evt.preventDefault(); //отмена стандартной реакции браузера
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupTypeEdit);
}

editProfile.addEventListener("submit", submitEditProfileForm);
popupNewPlace.addEventListener("submit", NewCardSubmit);

//Функция открытия карточки

function openPopupImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupCardImage);
}

//Функция добавления новой карточки

function NewCardSubmit(evt) {
  evt.preventDefault();
  const card = {};
  card.link = inputTypeUrl.value;
  card.name = inputTypeCardName.value;
  const newCard = createCard(card, CardLikeButton, openPopupImage, deleteCard);
  placeCards.prepend(newCard);
  closePopup(popupNewCard);
  inputTypeCardName.value = "";
  inputTypeUrl.value = "";
}

//Вывод карточки на страницу

initialCards.forEach((card) => {
  const newCard = createCard(card, CardLikeButton, openPopupImage, deleteCard);
  placeCards.append(newCard);
});

//Попап редактирования имени и занятия

profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

//Слушатели попапов

popupButtonClose.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupNewCard);
});

popupCloseCard.addEventListener("click", () => {
  closePopup(popupNewCard);
});

popupCloseImage.addEventListener("click", () => {
  closePopup(popupCardImage);
});

//Добавление анимации попапам

popupsArray.forEach((popup) => popup.classList.add("popup_is-animated"));
