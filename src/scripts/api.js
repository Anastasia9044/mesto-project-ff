const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-37',
    headers: {
      authorization: 'bdeea889-f933-4e28-8371-611dc4fee23a',
      'Content-Type': 'application/json'
    }
  }

  function handleResponse(res) {
    if(res.ok) {
        return res.json();
    }
        return Promise.reject(`Ошибка: ${res.status}`);
  }

//Загрузка информации о пользователе с сервера

function apiGetUser() { 
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: apiConfig.headers
})
    .then((res) => handleResponse(res))
}

//Загрузка карточек с сервера

function apiGetInitialCards() {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
})
    .then((res) => handleResponse(res))
}

//Редактирование профиля

function apiUpdateUserData(newName, job) {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: newName,
            about: job
        })
    })
    .then((res) => handleResponse(res))
}

//Добавление новой карточки

function apiAddNewCard(name, link) {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then((res) => handleResponse(res))
}

//Постановка и снятие лайка

function apiLikeCard(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
    .then((res) => handleResponse(res))
}

function apiDeleteLikeCard(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then((res) => handleResponse(res))
}

//Удаление карточки

function apiDeleteCard(cardId) {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then((res) => handleResponse(res))
}

//Обновление аватара пользователя

function apiUpdateUserAvatar(avatar) {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then((res) => handleResponse(res))
};

export {
    apiGetUser,
    apiGetInitialCards,
    apiUpdateUserData,
    apiAddNewCard,
    apiDeleteCard,
    apiLikeCard,
    apiDeleteLikeCard,
    apiUpdateUserAvatar
};