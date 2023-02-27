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
                        // window.location.replace('.src/pages/homePost.html');
                        return responseSucess;
                    })
                return responseJson;
            } else {
                response.json()
                    .then(responseError => {
                        // console.log(responseError);
                        const invalidData = document.querySelector('.form__incorrectPassword');

                        invalidData.innerText = (responseError.message);
                    })
            }
        })
    return token;
}

export const registerNewUser = async (createBody) => {
    const newUser = await fetch(`${baseUrl}/users/create`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(createBody)
    })
        .then(response => {
            if (response.ok) {
                alert('Usuário cadastrado com sucesso');
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