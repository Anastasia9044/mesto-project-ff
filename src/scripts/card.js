//Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки

function createCard(initialCards, handleCardLikeButton, openPopupImage, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const buttonDelete = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");

  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;

  buttonDelete.addEventListener("click", function () {
    deleteCard(buttonDelete);
  });
  cardLikeButton.addEventListener("click", handleCardLikeButton);
  cardImage.addEventListener("click", (evt) => {
    openPopupImage(evt);
  });
  return card;
}

//Функция удаления карточки

function deleteCard(buttonDelete) {
  const cardListItem = buttonDelete.closest(".card");
  cardListItem.remove();
}

//Функция лайка карточки

function handleCardLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

//Экспортируем все функции в index.js

export { createCard, deleteCard, handleCardLikeButton };
