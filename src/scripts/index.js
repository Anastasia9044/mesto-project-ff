//Импортируем все нужные файлы

import { createCard, deleteCard, handleCardLikeButton } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import "/src/pages/index.css";
import {
  apiGetUser,
  apiGetInitialCards,
  apiUpdateUserData,
  apiAddNewCard,
  apiUpdateUserAvatar,
} from "./api.js";

//Переменные

const placeCards = document.querySelector(".places__list");

const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileImage = profile.querySelector(".profile__image");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupCardImage = document.querySelector(".popup_type_image");
const profileCloseButton = popupTypeEdit.querySelector(".popup__close");
const popupCloseCard = popupNewCard.querySelector(".popup__close");
const popupImage = popupCardImage.querySelector(".popup__image");
const popupImageCaption = popupCardImage.querySelector(".popup__caption");
const popupCloseImage = popupCardImage.querySelector(".popup__close");
const popupsArray = Array.from(document.querySelectorAll(".popup"));
const popupChangeAvatar = document.querySelector(".popup_type_new-avatar");
const popupCloseAvatar = popupChangeAvatar.querySelector(".popup__close");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editProfileForm = document.forms["edit-profile"];
const inputName = editProfileForm.querySelector(".popup__input_type_name");
const inputDescription = editProfileForm.querySelector(
  ".popup__input_type_description"
);

const newPlaceForm = document.forms["new-place"];
const inputTypeCardName = newPlaceForm.querySelector(
  ".popup__input_type_card-name"
);
const inputTypeUrl = newPlaceForm.querySelector(".popup__input_type_url");

const formUpdateAvatar = document.forms["new-avatar"];
const inputUrlAvatar = formUpdateAvatar.querySelector(".popup__input_type_url");

let userId;

//Функция чтения полей

function submitEditProfileForm(evt) {
  evt.preventDefault(); //отмена стандартной реакции браузера
  const button = editProfileForm.querySelector(".popup__button");
  button.disabled = true;
  button.textContent = "Сохранение...";
  const newName = inputName.value;
  const job = inputDescription.value;
  apiUpdateUserData(newName, job)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupTypeEdit);
      button.textContent = "Сохранить";
      button.disabled = false;
    });
}

//Функция добавления новой карточки

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const button = newPlaceForm.querySelector(".popup__button");
  button.textContent = "Сохранение...";
  button.disabled = true;
  const card = {
    link: inputTypeUrl.value,
    name: inputTypeCardName.value,
  };
  apiAddNewCard(card.name, card.link)
    .then((card) => {
      const newCard = createCard(
        card,
        handleCardLikeButton,
        openPopupImage,
        deleteCard,
        userId
      );
      placeCards.prepend(newCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupNewCard);
      button.textContent = "Сохранить";
      button.disabled = false;
    });
}

//Функция изменения аватара

function submitChangeAvatar(evt) {
  evt.preventDefault();
  const button = formUpdateAvatar.querySelector(".popup__button");
  button.disabled = true;
  button.textContent = "Сохранение...";
  const changeAvatar = inputUrlAvatar.value;
  apiUpdateUserAvatar(changeAvatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupChangeAvatar);
      button.textContent = "Сохранить";
      button.disabled = false;
    });
}

editProfileForm.addEventListener("submit", submitEditProfileForm);
newPlaceForm.addEventListener("submit", handleNewCardSubmit);
formUpdateAvatar.addEventListener("submit", submitChangeAvatar);

//Функция открытия карточки

function openPopupImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupCardImage);
}

//Попап редактирования имени и занятия

profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(popupTypeEdit, validationConfig);
  openPopup(popupTypeEdit);
});

//Слушатели попапов

profileImage.addEventListener("click", () => {
  inputUrlAvatar.value = "";
  clearValidation(popupChangeAvatar, validationConfig);
  openPopup(popupChangeAvatar);
});

popupCloseAvatar.addEventListener("click", () => {
  closePopup(popupChangeAvatar);
});

profileCloseButton.addEventListener("click", () => {
  closePopup(popupTypeEdit);
});

profileAddButton.addEventListener("click", () => {
  inputTypeCardName.value = "";
  inputTypeUrl.value = "";
  clearValidation(popupNewCard, validationConfig);
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

//Валидация

enableValidation(validationConfig);

//Запросы

Promise.all([apiGetUser(), apiGetInitialCards()])
  .then(([userProfile, initialCards]) => {
    userId = userProfile._id;
    profileImage.style.backgroundImage = `url(${userProfile.avatar})`;
    profileTitle.textContent = userProfile.name;
    profileDescription.textContent = userProfile.about;

    initialCards.forEach((card) => {
      const newCard = createCard(
        card,
        handleCardLikeButton,
        openPopupImage,
        deleteCard,
        userId
      );
      placeCards.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
