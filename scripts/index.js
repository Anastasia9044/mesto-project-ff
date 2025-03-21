// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placeCards = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(initialCards, closeCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true); //клонируем со всем содержимым
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const buttonDelete = card.querySelector(".card__delete-button");
  cardImage.src = initialCards.link;
  cardTitle.textContent = initialCards.name;
  buttonDelete.addEventListener("click", function () {
    closeCard(buttonDelete);
  });
  return card;
}
// @todo: Функция удаления карточки

function closeCard(buttonDelete) {
  const cardListItem = buttonDelete.closest(".card");
  cardListItem.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach((card) => {
  const newCard = createCard(card, closeCard);
  placeCards.append(newCard); //новые добавляются в конец
});
