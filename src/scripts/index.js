import { toastResponseError } from './register.js';
import { login } from './request.js';

function authentication() {
    const token = localStorage.getItem('@petInfoToken:token');

    if (token) {
        window.location.replace('./src/scripts/homepost.js');
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
            // authentication();
            await login(loginBody);
        }
    })
}

// TOAST POST DELETADO COM SUCESSO:
export const toastDelete = (message) => {
    const body = document.querySelector('body');
    const container = document.createElement('div');

    const containerResponse = document.createElement('div')
    const iconContainer = document.createElement('div');
    const icon = document.createElement('img');
    const mainMessage = document.createElement('p');
    const messageComplement = document.createElement('p');

    container.classList.add('toast__container', 'toast__add')
    containerResponse.setAttribute('class', 'toast__containerResponse');
    iconContainer.setAttribute('class', 'toast__iconContainer');
    icon.src = '../assets/img/check-solid (2).svg';
    icon.alt = 'icon-check';

    mainMessage.innerText = message;
    messageComplement.innerText = 'O post selecionado para exclusão foi deletado e a partir de agora não aparecerá no seu feed. ';

    containerResponse.append(iconContainer, mainMessage)
    container.append(containerResponse, messageComplement);
    iconContainer.appendChild(icon);

    body.appendChild(container);


    setTimeout(() => {
        container.classList.add('toast__remove');
    }, 3000)

    setTimeout(() => {
        body.removeChild(container);
    }, 4990);
}

handleLogin();



