import { login} from './request.js';

export const handleLogin = () => {
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

