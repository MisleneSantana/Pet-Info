import { registerNewUser } from './request.js';

function authentication() {
    const tokenLocalStorage = localStorage.getItem('@petInfoToken:token');

    if (tokenLocalStorage) {
        window.location.replace('./src/pages/homePost.html');
    }
}

function handleNewUser() {
    let userDataInputs = document.querySelectorAll('.formRegister__input');

    const buttonForm = document.querySelector('.formRegister_registerButton');
    if (!buttonForm) return;

    const createRegisterBody = {};
    let emptyInput = 0;

    buttonForm.addEventListener('click', async (event) => {

        event.preventDefault();

        userDataInputs.forEach(input => {
            if (input.value === '') {
                emptyInput++;
            }
            createRegisterBody[input.name] = input.value;
        });

        if (emptyInput !== 0) {
            return alert('Por favor preencha todos os campos e tente novamente');
        } else {

            const newUser = await registerNewUser(createRegisterBody);

            setTimeout(() => {
                window.location.replace('../../index.html');
            }, 2000);

            console.log(newUser);
            return newUser;
        }
    });
}

export const toast = (message) => {
    const body = document.querySelector('body');
    const container = document.createElement('div');

    const containerResponse = document.createElement('div')
    const iconContainer = document.createElement('div');
    const icon = document.createElement('img');
    const mainMessage = document.createElement('p');
    const messageComplement = document.createElement('p');
    const link = document.createElement('a');

    container.classList.add('toast__container', 'toast__add')
    containerResponse.setAttribute('class', 'toast__containerResponse');
    icon.src = '../assets/img/check-solid (2).svg';
    icon.alt = 'icon-check';
    link.href = '../../index.html';
    link.target = '_self';
    link.innerText = 'Acessar página de login';

    mainMessage.innerText = message;
    console.log(mainMessage);
    messageComplement.innerText = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: ';

    containerResponse.append(iconContainer, mainMessage)
    container.append(containerResponse, messageComplement);
    messageComplement.appendChild(link);
    iconContainer.appendChild(icon);

    body.appendChild(container);


    setTimeout(() => {
        container.classList.add('toast__remove');
    }, 3000)

    setTimeout(() => {
        body.removeChild(container);
    }, 4990);
}

handleNewUser();
// authentication();


