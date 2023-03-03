import { registerNewUser } from './request.js';

function authentication() {
    const token = localStorage.getItem('@petInfoToken:token');

    if (token) {
        window.location.replace('../pages/homePost.html');
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
            return toastResponseError('Por favor preencha todos os campos e tente novamente');
        } else {

            const newUser = await registerNewUser(createRegisterBody);

            setTimeout(() => {
                window.location.replace('../../index.html');
            }, 3000);

            console.log(newUser);
            return newUser;
        }
    });
}

authentication();
handleNewUser();


