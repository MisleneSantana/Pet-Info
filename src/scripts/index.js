import { toastResponseError } from './toasts.js';
import { login } from './request.js';

function authentication() {
    const token = localStorage.getItem('@petInfoToken:token');

    if (token) {
        window.location.replace('./src/pages/homePost.html');
    }
}

function handleLogin() {
    const userEmailInput = document.querySelector('.form__emailUser');
    const passwordInput = document.querySelector('.form__userPassword');
    const loginSubmitButton = document.querySelector('.form__loginButton');
    if (!loginSubmitButton) return;
    let count = 0;

    loginSubmitButton.addEventListener('click', async (event) => {
        event.preventDefault();

        if (userEmailInput.value === '' || passwordInput.value === '') {
            count++
        }
        const loginBody = {
            email: userEmailInput.value,
            password: passwordInput.value
        }
        if (count !== 0) {
            return toastResponseError('Preencha todos os campos');
        } else {
            await login(loginBody);
        }
    })
}

authentication();
handleLogin();



