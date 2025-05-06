import {apiDeleteCard, apiLikeCard, apiDeleteLikeCard} from "./api";

//Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

//Функция создания карточки

function createCard(initialCards, handleCardLikeButton, openPopupImage, deleteCard, userId) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const buttonDelete = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCount = card.querySelector('.card__like-count');

  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;
  cardLikeCount.textContent = initialCards.likes.length;

  checkActiveLike(initialCards, cardLikeButton, userId);
  cardLikeButton.addEventListener('click', () => {
    handleCardLikeButton(cardLikeButton, cardLikeCount, initialCards, userId);
  });

  cardImage.addEventListener("click", (evt) => {
    openPopupImage(evt);
  });
  
  if(initialCards.owner._id === userId) {
    buttonDelete.classList.remove('card__delete-button_inactive');
    buttonDelete.addEventListener('click', (evt) => {
        deleteCard(evt.target, initialCards._id);
    })
} else {
  buttonDelete.classList.add('card__delete-button_inactive');
  buttonDelete.style.display = 'none';
}
  return card;
}

//Функция удаления карточки

function deleteCard(buttonDelete, cardId) {
  const cardListItem = buttonDelete.closest(".card");
  apiDeleteCard(cardId)
        .then(() => {
  cardListItem.remove();
})
.catch((err) => {
  console.log(err);
});
}

//Функция лайка карточки

function handleCardLikeButton(cardLikeButton, cardLikeCount, initialCards, userId) {
  const cardId = initialCards._id;
    const checkLike = initialCards.likes.some((like) => {
        return like._id === userId;
      });
    const likeMethod = checkLike ? apiDeleteLikeCard : apiLikeCard;
    likeMethod(cardId)
        .then((res) => {
            cardLikeButton.classList.toggle('card__like-button_is-active');
            cardLikeCount.textContent = res.likes.length;
            initialCards.likes = res.likes;
        })
        .catch((err) => {
            console.log(err);
        });    
}

//Проверка нажатых лайков 

function checkActiveLike(initialCards, cardLikeButton, userId) {
  if(initialCards.likes.some((like) => like._id === userId)) {
      cardLikeButton.classList.add('card__like-button_is-active');
  }
}

//Экспортируем все функции в index.js

export { createCard, deleteCard, handleCardLikeButton };
