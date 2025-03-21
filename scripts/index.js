// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(initialCards, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true); //клонируем со всем содержимым
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const buttonDelete = card.querySelector(".card__delete-button");
  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;
  buttonDelete.addEventListener("click", function () {
    deleteCard(buttonDelete);
  });
  return card;
}

// @todo: Функция удаления карточки

function deleteCard(buttonDelete) {
  const cardListItem = buttonDelete.closest(".card");
  cardListItem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const newCard = createCard(card, deleteCard);
  cardsContainer.append(newCard); //новые добавляются в конец
});
