import { toastDelete } from './toasts.js';
import { toast, toastResponseError } from './toasts.js';

const baseUrl = 'http://localhost:3333';
const tokenLocalStorage = JSON.parse(localStorage.getItem('@petInfoToken:token'));
// console.log(tokenLocalStorage.token);
const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenLocalStorage}`
}

export const login = async (loginBody) => {
    const token = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginBody)
    })
        .then(response => {
            if (response.ok) {
                const responseJson = response.json()
                    .then(responseSucess => {
                        localStorage.setItem('@petInfoToken:token', JSON.stringify(responseSucess));
                        window.location.replace('./src/pages/homePost.html');
                        return responseSucess;
                    })
                return responseJson;
            } else {
                response.json()
                    .then(responseError => {
                        const invalidData = document.querySelector('.form__incorrectPassword');
                        invalidData.innerText = (responseError.message);
                    });
            };
        });
    // console.log(token);
    return token;
}

export const requestGetloggedUser = async () => {
    const userLoged = await fetch(`${baseUrl}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenLocalStorage.token}`
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                response.json()
                    .then(responseError => {
                        return toastResponseError(responseError.message);
                    });
            };
        });
    return userLoged;
}

export const registerNewUser = async (createRegisterBody) => {
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(createRegisterBody)
    })
        .then((response) => {
            if (response.ok) {
                toast('Usuário cadastrado com sucesso');
                return response.json();
            } else {
                response.json()
                    .then(responseError => {
                        return toastResponseError(responseError.message);
                    })
            }
        })
    return newUser;
}

export const requestCreateNewPost = async (createPostBody) => {
    const post = await fetch(`${baseUrl}/posts/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenLocalStorage.token}`
        },
        body: JSON.stringify(createPostBody)
    })
        .then(response => {
            if (response.ok) {
                const postJson = response.json()
                    .then(responseJson => {
                        console.log(('Post criado com sucesso'));
                        return responseJson;
                    })
                return postJson;
            } else {
                response.json()
                    .then(responseError => {
                        return console.log((responseError.message));
                    })
            }
        });
    return post;
}

export const requestGetAllPosts = async () => {
    const posts = await fetch(`${baseUrl}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenLocalStorage.token}`
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then(responseError => {
                    return toastResponseError(responseError.message);
                });
            };
        });
    // console.log(posts);
    return posts;
}

export const requestUpdatePost = async (postId, updatePostBody) => {
    const post = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenLocalStorage.token}`
        },
        body: JSON.stringify(updatePostBody)
    }).then((response) => {
        if (response.ok) {
            console.log(('Post atualizado com sucesso'));
            return response.json();
        } else {
            response.json()
                .then(responseError => {
                    return toastResponseError((responseError.message));
                });
        };
    });
    return post;
}

export const requestDeletePost = async (postId) => {
    const deletePost = await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenLocalStorage.token}`
        }
    })
        .then(response => {
            if (response.ok) {
                toastDelete('Post deletado com sucesso');
                return response.json();
            } else {
                response.json()
                    .then(responseError => {
                        return console.log((responseError.message));
                    });
            };
        });
    return deletePost;
};




