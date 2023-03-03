import { toastResponseError } from './toasts.js';
import { requestGetloggedUser, requestCreateNewPost, requestGetAllPosts, requestUpdatePost, requestDeletePost } from './request.js';

let arrayAllPosts = [];
let currentUser = {};

function authentication() {
    const token = localStorage.getItem('@petInfoToken:token');
    if (!token) {
        console.log('oi')
        window.location.replace('../../index.html');
    };
};

// CRIAR POSTS

// CRIA MODAL CREATE POST:
function renderModalCreatePost() {
    let modalTag = document.querySelector('#modalControl-createPost');
    if (!modalTag) return;

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
    tagTitle.setAttribute('class', 'modalCreatePost__inputs--title');
    tagTitle.for = 'title';
    tagTitle.innerText = 'Título do Post'
    inputTitle.setAttribute('class', 'modalCreatePost__inputPost modalCreatePost__inputPost--styleTitle');
    inputTitle.type = 'text';
    inputTitle.name = 'title';
    inputTitle.id = 'title';
    inputTitle.placeholder = 'Digite o título aqui...';

    containerMainInputContent.setAttribute('class', 'modalCreatePost__inputs');
    tagContent.setAttribute('class', 'modalCreatePost__inputs--content');
    tagContent.for = 'content';
    tagContent.innerText = 'Conteúdo do Post';
    inputContent.setAttribute('class', 'modalCreatePost__inputPost modalCreatePost__inputPost--styleContent');
    inputContent.type = 'text';
    inputContent.name = 'content';
    inputContent.id = 'content';
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
};

// ADICIONA EVENT AO BOTÃO CRIAR PUBLICAÇÃO (ABRE O MODAL):
function addEventOpenModalCreatePost() {
    const modal = document.querySelector('#modalControl-createPost');
    if (!modal) return;
    const buttonCreatePost = document.querySelector('.nav__buttonCreatePost');

    buttonCreatePost.addEventListener('click', () => {
        modal.showModal();
    });
};

// ADICIONA EVENT AOS BOTÕES (X) E CANCELAR (FECHAR MODAL CREATE POST):
function addEventCloseModalCreatePost() {
    let modal = document.querySelector('#modalControl-createPost');
    if (!modal) return;
    let buttonCloseModal = document.querySelector('.modalCreatePost__header>img');
    let buttonCancel = document.querySelector('.modalCreatePost__buttons');

    buttonCloseModal.addEventListener('click', () => {
        modal.close();
    });

    buttonCancel.addEventListener('click', () => {
        modal.close();
    });
};

// PEGA ARRAY VAZIO DECLARADO GLOBALMENTE E ATRIBUI A ELE O ARRAY POSTS CRIADOS VINDOS DO SERVIDOR (REQUEST):
async function getAllPostsFromServer() {
    arrayAllPosts = await requestGetAllPosts();
    // console.log(arrayAllPosts);
};

// CAPTURA AS ENTRADAS DO CREATE POST. MONTA O CORPO DE DA REQUISIÇÃO (COM UM forEach()), PARA PASSAR COMO PARÂMETRO PARA A REQUEST POST(CREATE POST).
// QUANDO OS VALORES RETORNAM DO SERVIDOR, SÃO INSERIDOS DENTRO DO ARRAY E RENDERIZADOS EM TELA:
function handleNewPost() {
    const inputsModalPost = document.querySelectorAll('.modalCreatePost__inputPost');
    const buttonPublish = document.querySelector('.modalCreatePost__buttons--publish');
    if (!buttonPublish) return;

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
            return toastResponseError('Por favor preencha todos os campos antes de publicar');
        } else {
            const post = await requestCreateNewPost(createPostBody);

            arrayAllPosts.push(post);
            renderArrAllPosts(arrayAllPosts);

            inputsModalPost.forEach((input) => {
                input.value = '';
            });
            return post;
        }
    });
};

// APÓS O POST ESTAR CRIADO, ELE SERÁ ANEXADO NA UL E RENDERIZADO EM TELA:
function renderArrAllPosts(array) {
    let listPosts = document.querySelector('.post__container');

    listPosts.innerHTML = ''; //Limpar minha ul-list

    array.forEach((post) => {
        let itemPost = createCardPost(post);
        listPosts.appendChild(itemPost);
    });

    return listPosts;
};

// CRIA O CARD DO POST.
// APLICA CRIA OS BOTÕES EDITAR E EXCLUIR SOMENTE CASO O ID DO POST COINCIDA COM O ID DO USUÁRIO LOGADO:
function createCardPost(post) {
    let listPost = document.createElement('li');
    let containerPostUser = document.createElement('div');
    let containerUser = document.createElement('div');
    let imageUser = document.createElement('img');
    let nameUser = document.createElement('p');
    let dataPost = document.createElement('small');
    let small = document.createElement('small');
    let containerUserButtons = {};
    let editButton = {};
    let deleteButton = {};

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
    dataPost.setAttribute('class', 'main__postUser--data');

    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const options = { month: 'long', year: 'numeric' };
    const currenteDatePost = new Date(post.createdAt).toLocaleDateString("pt-BR", options);
    dataPost.innerText = currenteDatePost.charAt(0).toUpperCase() + currenteDatePost.slice(1);

    small.innerHTML = '|';
    small.setAttribute('class', 'main__postUser--character');
    postContainer.setAttribute('class', 'main__postContent');
    postTitle.innerText = post.title;

    // let cutContent = '';
    // if (post.content.length < 145) {

    //     cutContent = post.content;
    // } else {
    //     for (let i = 145; i < post.content.length; i++) {
    //         if (post.content[i] === ' ') {
    //             cutContent = post.content.substring(0, i);
    //             return cutContent;
    //         } else if (i === post.content.length - 1) {
    //             cutContent = post.content;
    //             return cutContent;
    //         };
    //     };
    // };
    // contentPost.innerText = `${cutContent}...`;

    contentPost.innerText = `${post.content.substring(0, 146)}...`;
    containerShowPost.setAttribute('class', 'main__post--buttonModal');
    buttonShowPost.id = `showModal_${post.id}`;
    buttonShowPost.innerText = 'Acessar publicação'

    listPost.append(containerPostUser, postContainer, containerShowPost);
    containerPostUser.append(containerUser);
    containerUser.append(imageUser, nameUser, small, dataPost);
    postContainer.append(postTitle, contentPost);
    containerShowPost.appendChild(buttonShowPost);

    if (currentUser.id === post.user.id) {
        // console.log(currentUser.id);
        // console.log(post.user.id);
        containerUserButtons = document.createElement('div');
        editButton = document.createElement('button');
        deleteButton = document.createElement('button');
        containerUserButtons.setAttribute('class', 'main__postUser--buttons');
        editButton.setAttribute('class', 'main__postUser--edit');
        editButton.innerText = 'Editar';
        deleteButton.setAttribute('class', 'main__postUser--delete');
        deleteButton.innerHTML = 'Excluir';
        containerUserButtons.append(editButton, deleteButton);
        addEventButtonEditPost(editButton, post); //Evento button Editar;
        addEventButtonDeletePost(deleteButton, post); //Evento button Excluir;
        containerPostUser.append(containerUserButtons);
    };

    addEventButtonOpenPost(buttonShowPost, post); //Evento button showModal;
    return listPost;
};

// ALTERAR POSTS
function renderModalPost() {
    let modal = document.querySelector('#modalControl-showPost');
    if (!modal) return;
    let containerModal = document.createElement('div');
    let headerContainer = document.createElement('div');
    let containerUser = document.createElement('div');
    let userPhoto = document.createElement('img');
    let userName = document.createElement('p');
    let small = document.createElement('small');
    let postDate = document.createElement('small');
    let buttonCloseModal = document.createElement('img');
    let containerContentPost = document.createElement('div');
    let titlePost = document.createElement('h1');
    let textPost = document.createElement('p');

    containerModal.setAttribute('class', 'modalShowPost__container');
    headerContainer.setAttribute('class', 'modalShowPost__user');
    containerUser.setAttribute('class', 'modalShowPost__user--user');
    userPhoto.setAttribute('class', 'modalShowPost__avatar');
    userPhoto.alt = 'userPhoto';
    userName.setAttribute('class', 'modalShowPost__username');
    small.setAttribute('class', 'modalShowPost__character');
    small.innerText = '|';
    postDate.setAttribute('class', 'modalShowPost__createdAt');

    buttonCloseModal.setAttribute('class', 'closeModalPost');
    buttonCloseModal.src = '../assets/img/FecharModal.svg';
    buttonCloseModal.alt = 'X-icon';

    containerContentPost.setAttribute('class', 'modalShowPost__postContent');
    titlePost.setAttribute('class', 'modalShowPost__title');
    textPost.setAttribute('class', 'modalShowPost__content');

    modal.appendChild(containerModal);
    containerModal.append(headerContainer, containerContentPost);
    headerContainer.append(containerUser, buttonCloseModal);
    containerUser.append(userPhoto, userName, small, postDate);
    containerContentPost.append(titlePost, textPost);

    addEventCloseModalPost();     // Fechando o modal
    return modal;
};

function addEventButtonOpenPost(buttonOpenModal, post) {

    buttonOpenModal.addEventListener('click', () => {
        OpenModalPost(post); //Chamando a função abrir modal
    });
};

function OpenModalPost(post) {
    updateModalPost(post); //Chamando função que renderiza post conforme click.

    let modal = document.querySelector('#modalControl-showPost');
    modal.showModal(); //Abrindo o modal
};

function updateModalPost(post) {
    let userPhoto = document.querySelector('.modalShowPost__avatar');
    let userName = document.querySelector('.modalShowPost__username');
    let postDate = document.querySelector('.modalShowPost__createdAt');
    let modalTitle = document.querySelector('.modalShowPost__title');
    let modalPost = document.querySelector('.modalShowPost__content');

    userPhoto.src = post.user.avatar;
    userPhoto.alt = post.user.username;
    userName.innerText = post.user.username;

    const options = { month: 'long', year: 'numeric' };
    const currentDatePostModal = new Date(post.createdAt).toLocaleDateString("pt-BR", options);
    postDate.innerText = currentDatePostModal.charAt(0).toUpperCase() + currentDatePostModal.slice(1);

    modalTitle.innerText = post.title;
    modalPost.innerText = post.content;
};

function addEventCloseModalPost() {
    let modal = document.querySelector('#modalControl-showPost');
    if (!modal) return;
    let buttonCloseModal = document.querySelector('.closeModalPost');

    buttonCloseModal.addEventListener('click', (event) => {
        modal.close();
    });
};

function renderModalEditPost() {
    const modalEditPost = document.querySelector('#modalControl-patchPost');
    if (!modalEditPost) return;
    let containerModal = document.createElement('form');
    let containerHeaderModal = document.createElement('div');
    let titleForm = document.createElement('h3');
    let closeModalEditPost = document.createElement('img');
    let containerContentModal = document.createElement('div');
    let tagTitle = document.createElement('label');
    let inputTitle = document.createElement('input');
    let tagContent = document.createElement('label');
    let areaContent = document.createElement('textarea');
    let containerButtons = document.createElement('div');
    let cancelButton = document.createElement('button');
    let buttonSave = document.createElement('button');

    containerModal.setAttribute('class', 'modalPatchPost__container');
    containerHeaderModal.setAttribute('class', 'modalPatchPost__header');
    titleForm.innerText = 'Edição';
    closeModalEditPost.setAttribute('class', 'modalPatchPost__closeEditPost');
    closeModalEditPost.src = '../assets/img/FecharModal.svg';
    closeModalEditPost.alt = 'Button X';
    containerContentModal.setAttribute('class', 'modalPatchPost__postContent');
    tagTitle.for = 'title';
    tagTitle.innerText = 'Título do Post';
    inputTitle.setAttribute('class', 'edit__input');
    inputTitle.type = 'text';
    inputTitle.name = 'title';
    inputTitle.id = 'title';
    tagContent.for = 'content';
    tagContent.innerHTML = 'Conteúdo do post';
    areaContent.setAttribute('class', 'edit__textarea');
    areaContent.name = 'content';
    areaContent.id = 'content';
    containerButtons.setAttribute('class', 'modalPatchPost__buttons');
    cancelButton.setAttribute('class', 'modalPatchPost__buttons--cancel');
    cancelButton.type = 'submit';
    cancelButton.innerText = 'Cancelar';
    buttonSave.setAttribute('class', 'modalPatchPost__buttons--toSave');
    buttonSave.type = 'submit';
    buttonSave.innerText = 'Salvar alterações';

    modalEditPost.appendChild(containerModal);
    containerModal.append(containerHeaderModal, containerContentModal, containerButtons);
    containerHeaderModal.append(titleForm, closeModalEditPost);
    containerContentModal.append(tagTitle, inputTitle, tagContent, areaContent);
    containerButtons.append(cancelButton, buttonSave);

    addEventCloseModalFormEditPost();
    return modalEditPost;
};

function addEventButtonEditPost(editButton, post) {
    editButton.addEventListener('click', () => {
        OpenModalFormEditPost(post); //Chamando a função abrir modal
    });
};

function OpenModalFormEditPost(post) {
    updateModalFormEditPost(post); //Chamando função que renderiza post conforme click.

    let modal = document.querySelector('#modalControl-patchPost');
    modal.showModal(); //Abrindo o modal
};

function updateModalFormEditPost(post) {
    let inputTitle = document.querySelector('.edit__input');
    let textareaContent = document.querySelector('.edit__textarea');

    inputTitle.value = post.title;
    textareaContent.innerText = post.content;
    // console.dir(inputTitle);

    handleUpdatePost(post);
};

function handleUpdatePost(post) {
    const titlePostInput = document.querySelector('.edit__input');
    const contentPostTextarea = document.querySelector('.edit__textarea');
    const buttonSave = document.querySelector('.modalPatchPost__buttons--toSave');
    const updatePostBody = {};
    if (post) {
        const postId = post.id;

        buttonSave.addEventListener('click', async (event) => {
            event.preventDefault();

            if (titlePostInput.value !== '') {
                updatePostBody.title = titlePostInput.value;
            }
            if (contentPostTextarea.value !== '') {
                updatePostBody.content = contentPostTextarea.value;
            }
            await requestUpdatePost(postId, updatePostBody);
            let updatedPostClient = arrayAllPosts.find((element) => element.id === post.id);
            updatedPostClient.content = updatePostBody.content;
            updatedPostClient.title = updatePostBody.title;
            // console.log(updatedPostClient.content);
            // console.log(updatePostBody.title);

            renderArrAllPosts(arrayAllPosts);
        });
    }
};

function addEventCloseModalFormEditPost() {
    let modal = document.querySelector('#modalControl-patchPost');
    let buttonCloseModal = document.querySelector('.modalPatchPost__closeEditPost');
    let buttonSave = document.querySelector('.modalPatchPost__buttons--toSave');

    buttonCloseModal.addEventListener('click', (event) => {
        modal.close();
    });
    buttonSave.addEventListener('click', (event) => {
        event.preventDefault();
        modal.close();
    })
};

// DELETAR POSTS
function renderModalDeletePost() {
    const modalDeletePost = document.querySelector('#modalControl-deletePost');
    if (!modalDeletePost) return;
    const formContainer = document.createElement('form');
    const headerContainer = document.createElement('div');
    const headerTitle = document.createElement('h2');
    const buttonCloseModal = document.createElement('img');
    const titleAlert = document.createElement('h1');
    const contentAlert = document.createElement('p');
    const buttonsContainer = document.createElement('div');
    const buttonCancel = document.createElement('button');
    const buttonConfirmDelete = document.createElement('button');

    formContainer.setAttribute('class', 'modalDeletePost__container');
    headerContainer.setAttribute('class', 'modalDeletePost__header');
    headerTitle.innerText = 'Confirmação de exclusão'
    buttonCloseModal.setAttribute('class', 'modalDeletePost__imgClose');
    buttonCloseModal.src = '../assets/img/FecharModal.svg';
    buttonCloseModal.alt = 'Button X';
    titleAlert.innerText = 'Tem certeza que deseja excluir este post?';
    contentAlert.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha confirme antes de concluir';
    buttonsContainer.setAttribute('class', 'modalDeletePost__buttons');
    buttonCancel.type = 'submit';
    buttonCancel.innerText = 'Cancelar';
    buttonConfirmDelete.id = 'modalDeletePost__confirmeDelete';
    buttonConfirmDelete.type = 'submit';
    buttonConfirmDelete.innerHTML = 'Sim, excluir este post';

    modalDeletePost.appendChild(formContainer);
    formContainer.append(headerContainer, titleAlert, contentAlert, buttonsContainer)
    headerContainer.append(headerTitle, buttonCloseModal);
    buttonsContainer.append(buttonCancel, buttonConfirmDelete);

    addEventCloseModal();
    return modalDeletePost;
};

function addEventButtonDeletePost(deleteButton, post) {
    deleteButton.addEventListener('click', () => {
        openModalDelete(post);
    });
};

function openModalDelete(post) {
    handleDeletePost(post);
    let modal = document.querySelector('#modalControl-deletePost');
    modal.showModal(); //Abrindo o modal
};

const handleDeletePost = (post) => {
    if (post) {
        const postId = post.id;
        const buttonDelete = document.querySelector('#modalDeletePost__confirmeDelete');

        buttonDelete.addEventListener('click', async (event) => {
            event.preventDefault();
            await requestDeletePost(postId);

            arrayAllPosts = arrayAllPosts.filter(post => post.id !== postId);
            renderArrAllPosts(arrayAllPosts);
        });
    };
};

function addEventCloseModal() {
    let modal = document.querySelector('#modalControl-deletePost');
    let buttonCloseModal = document.querySelector('.modalDeletePost__imgClose');
    let buttonConfirmDelete = document.querySelector('#modalDeletePost__confirmeDelete')

    buttonCloseModal.addEventListener('click', (event) => {
        event.preventDefault();
        modal.close();
    });

    buttonConfirmDelete.addEventListener('click', (event) => {
        event.preventDefault();
        modal.close();
    });
};

// VISUALIZAR OPÇÕES EDITAR/EXCLUIR
async function getUserDataLogged() {
    currentUser = await requestGetloggedUser();
    // console.log(currentUser);

    createImageUserLogged(currentUser);
    renderArrAllPosts(arrayAllPosts);
};

// RENDERIZAR USER LOGADO
function createImageUserLogged(currentUser) {
    const imageContainer = document.querySelector('.nav__imageContainer');
    const logoutContainer = document.querySelector('.logout__header');
    const userImage = document.createElement('img');
    const username = document.createElement('p');

    userImage.setAttribute('class', 'nav__userImage');
    userImage.src = currentUser.avatar;
    userImage.alt = 'Photo User';
    username.setAttribute('class', 'header__logout--username');
    username.innerText = `@${currentUser.username}`.toLowerCase().replace(' ', '');
    imageContainer.appendChild(userImage);
    logoutContainer.appendChild(username);

    showLogout();
    return imageContainer;
};

// CONTAINER LOGOUT:
function showLogout() {
    const containerLogout = document.querySelector('.logout__header');
    const userImage = document.querySelector('.nav__imageContainer');
    if (!userImage) return;

    userImage.addEventListener('click', () => {
        containerLogout.classList.toggle('showLogout');

        const eventLogout = document.querySelector('.logout__exit');
        if (!eventLogout) return;

        eventLogout.addEventListener("click", () => {
            // console.log('sair');
            localStorage.clear();
            window.location.replace("../../index.html");
        });
    });
};


authentication();
renderModalCreatePost();
addEventOpenModalCreatePost();
addEventCloseModalCreatePost();
getAllPostsFromServer();
handleNewPost();
getUserDataLogged();
renderModalPost();
renderModalEditPost();
handleUpdatePost();
renderModalDeletePost();


