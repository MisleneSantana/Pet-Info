// TOAST SUCESS
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

// TOAST ERROR:
export const toastResponseError = (message) => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    const containerImage = document.createElement('div');
    const icon = document.createElement('img');
    const mainMessage = document.createElement('p');

    container.classList.add('toast__containerError', 'toast__addError');
    containerImage.classList.add('toast__containerError--image');
    icon.src = '../assets/img/close (1).png';
    icon.alt = 'error-check';

    mainMessage.innerText = message;

    container.append(containerImage, mainMessage);
    containerImage.appendChild(icon);
    body.appendChild(container);

    setTimeout(() => {
        container.classList.add('toast__removeError');
    }, 3000)

    setTimeout(() => {
        body.removeChild(container);
    }, 4990);
};

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

