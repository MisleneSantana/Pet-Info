const baseUrl = 'http://localhost:3333';
const tokenLocalStorage = JSON.parse(localStorage.getItem('@petInfoToken:token'));
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
                    })
            }
        })
    console.log(token);
    return token;
}

export const registerNewUser = async (createRegisterBody) => {
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(createRegisterBody)
    })
        .then(response => {
            if (response.ok) {
                alert('Sua conta foi criada com sucesso');
                return response.json();
            } else {
                response.json()
                    .then(responseError => {
                        alert(responseError.message);
                    })
            }
        })
    return newUser;
}

export const requestCreateNewPost = async (createPostBody) => {
    // console.log(requestHeaders.Authorization)
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
                        alert('Post criado com sucesso');
                        return responseJson;
                    })
                return postJson;
            } else {
                response.json()
                    .then(responseError => {
                        alert(responseError.message);
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
                    alert(responseError.message);
                });
            };
        });
    console.log(posts);
    return posts;
}

