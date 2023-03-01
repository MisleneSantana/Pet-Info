import { registerNewUser } from './request.js';

function authentication() {
    const tokenLocalStorage = localStorage.getItem('@petInfoToken:token');

    if (tokenLocalStorage) {
        window.location.replace('./src/pages/homePost.html');
    }
}

function handleNewUser() {
    let userDataInputs = document.querySelectorAll('.formRegister__input');

    console.log(userDataInputs)
    const buttonForm = document.querySelector('.formRegister_registerButton');
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

handleNewUser();
// authentication();


