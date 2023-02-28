import { requestCreateNewPost, requestGetAllPosts } from './request.js';

let arrayPosts = [];

function authentication() {
    const token = localStorage.getItem('@doit:token')

    if (!token) {
        window.location.replace('../../index.html')
    }
}

function renderModalCreatePost() {
    let modalTag = document.querySelector('#modalControl-createPost');
    let containerModal = document.createElement('form');
    let containerHeaderModal = document.createElement('div');
    let titleHeaderModal = document.createElement('h1');
    let closeImg = document.createElement('img');
    let containerMainModal = document.createElement('div');
    let containerMainInputTitle = document.createElement('div');
    let tagTitle = document.createElement('label');
    let inputTitle = document.createElement('input');
    let containerMainInputContent = document.createElement('div');
    let tagContent = document.createElement('label');
    let inputContent = document.createElement('input');
    let containerButtons = document.createElement('div');
    let cancelButton = document.createElement('button');
    let buttonPublish = document.createElement('button');

    containerModal.setAttribute('class', 'modalCreatePost__container');
    containerHeaderModal.setAttribute('class', 'modalCreatePost__header');
    titleHeaderModal.innerText = 'Criando novo post';
    closeImg.src = '../assets/img/FecharModal.svg';
    closeImg.alt = 'X-icon';
    containerMainModal.setAttribute('class', 'modalCreatePost__main');

    containerMainInputTitle.setAttribute('class', 'modalCreatePost__inputs');
    tagTitle.for = 'title';
    tagTitle.innerText = 'Título do Post'
    inputTitle.setAttribute('class', 'modalCreatePost__inputPost');
    inputTitle.type = 'text';
    inputTitle.name = 'title';
    inputTitle.placeholder = 'Digite o título aqui...';

    containerMainInputContent.setAttribute('class', 'modalCreatePost__inputs');
    tagContent.for = 'content';
    tagContent.innerText = 'Conteúdo do Post';
    inputContent.setAttribute('class', 'modalCreatePost__inputPost');
    inputContent.type = 'text';
    inputContent.name = 'content';
    inputContent.placeholder = 'Desenvolva o conteúdo do post aqui...';

    containerButtons.setAttribute('class', 'modalCreatePost__buttons');
    cancelButton.setAttribute('class', 'modalCreatePost__buttons--cancel')
    cancelButton.type = 'submit';
    cancelButton.innerText = 'Cancelar';
    buttonPublish.setAttribute('class', 'modalCreatePost__buttons--publish');
    buttonPublish.type = 'submit';
    buttonPublish.innerText = 'Publicar';

    containerModal.append(containerHeaderModal, containerMainModal, containerButtons);
    containerHeaderModal.append(titleHeaderModal, closeImg);
    containerMainModal.append(containerMainInputTitle, containerMainInputContent);
    containerMainInputTitle.append(tagTitle, inputTitle);
    containerMainInputContent.append(tagContent, inputContent);
    containerButtons.append(cancelButton, buttonPublish);
    modalTag.appendChild(containerModal);

    return modalTag;
}

function addEventOpenModalCreatePost() {
    const modal = document.querySelector('#modalControl-createPost');
    const buttonCreatePost = document.querySelector('.nav__buttonCreatePost');

    buttonCreatePost.addEventListener('click', () => {
        modal.showModal();
    });
};

function addEventCloseModalCreatePost() {
    let modal = document.querySelector('#modalControl-createPost');
    let buttonCloseModal = document.querySelector('.modalCreatePost__header>img');
    let buttonCancel = document.querySelector('.modalCreatePost__buttons');

    buttonCloseModal.addEventListener('click', () => {
        modal.close();
    });

    buttonCancel.addEventListener('click', () => {
        modal.close();
    });
};

function handleNewPost() {
    const inputsModalPost = document.querySelectorAll('.modalCreatePost__inputPost');
    const buttonPublish = document.querySelector('.modalCreatePost__buttons--publish');
    const createPostBody = {};
    let count = 0;

    buttonPublish.addEventListener('click', async (event) => {
        event.preventDefault();

        inputsModalPost.forEach((input) => {
            if (input.value === '') {
                count++;
            }
            createPostBody[input.name] = input.value;
        });

        if (count !== 0) {
            return alert('Por favor preencha todos os campos antes de publicar');
        } else {
            const post = await requestCreateNewPost(createPostBody);

            arrayPosts.unshift(post);
            renderArrPosts(arrayPosts);

            return post;
        }
    });
}

function renderArrPosts(array) {
    let listPosts = document.querySelector('.post__container');

    listPosts.innerHTML = ''; //Limpar minha ul-list

    array.forEach((post) => {
        let itemPost = createCardPost(post);

        listPosts.appendChild(itemPost);
    });
    return listPosts;
};

function createCardPost(post) {
    let listPost = document.createElement('li');
    let containerPostUser = document.createElement('div');
    let containerUser = document.createElement('div');
    let imageUser = document.createElement('img');
    let nameUser = document.createElement('p');
    let containerUserButtons = document.createElement('div');
    let editButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    let postContainer = document.createElement('div');
    let postTitle = document.createElement('h1');
    let contentPost = document.createElement('p');
    let containerShowPost = document.createElement('div');
    let buttonShowPost = document.createElement('button');

    listPost.id = `post_${post.id}`;
    listPost.setAttribute('class', 'main__post');
    containerPostUser.setAttribute('class', 'main__postUser');
    containerUser.setAttribute('class', 'main__postUser--user');
    imageUser.src = post.user.avatar;
    imageUser.alt = 'User Photo'
    nameUser.innerText = post.user.username;
    containerUserButtons.setAttribute('class', 'main__postUser--buttons');
    postContainer.setAttribute('class', 'main__postContent');
    postTitle.innerText = post.title;

    let cutContentPost = post.content.indexOf('.');

    if (cutContentPost === -1) {  //Caso não encontra o (.)
        cutContentPost = post.content.length;
    };

    contentPost.innerText = `${post.content.substring(0, cutContentPost)}...`;
    containerShowPost.setAttribute('class', 'main__post--buttonModal');
    buttonShowPost.id = `showModal_${post.id}`;

    listPost.append(containerPostUser, postContainer, containerShowPost);
    containerPostUser.append(containerUser, containerUserButtons);
    containerUser.append(imageUser, nameUser);
    containerUserButtons.append(editButton, deleteButton);
    postContainer.append(postTitle, contentPost);
    containerShowPost.appendChild(buttonShowPost);

    // addEventButtonOpenPost(buttonOpenModal, post); //Evento button showModal
    return listPost;
};

async function getAllPostsFromServer() {
    arrayPosts = await requestGetAllPosts();
    renderArrPosts(arrayPosts);
}

// authentication();
renderModalCreatePost();
addEventOpenModalCreatePost();
addEventCloseModalCreatePost();
handleNewPost();
getAllPostsFromServer();
