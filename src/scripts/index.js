import { login } from './request.js';

function authentication() {
    const tokenLocalStorage = localStorage.getItem('@petInfoToken:token');

    if (tokenLocalStorage) {
        window.location.replace('./src/pages/homePost.html');
    }
}

function handleLogin() {
    const userEmailInput = document.querySelector('.form__emailUser');
    const passwordInput = document.querySelector('.form__userPassword');
    const loginSubmitButton = document.querySelector('.form__loginButton');

    loginSubmitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const loginBody = {
            email: userEmailInput.value,
            password: passwordInput.value
        }
        await login(loginBody);
    })
}

handleLogin();
// authentication();



