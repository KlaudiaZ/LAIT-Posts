import axios from 'axios';
import config from './config';

const postsUrl = 'http://localhost:3000/posts';

export const addButtonListener = (data) => {
    const addButton = document.getElementById('add');
    addButton.addEventListener('click', (e) => {
        e.preventDefault();
        const post = getInputValues(data);
        postNewPost(post.title, post.author, post.id);
    });
}

const createNewId = (posts) => {
    let id = 0;
    posts.forEach(post => {
        id >= parseInt(post.id) ?
            id = id :
            id = parseInt(post.id);
        id++;
    });
    return id;
}

const getInputValues = (data) => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const post = {
        title: title.value,
        author: author.value,
        id: createNewId(data)
    };
    return post;
}

const postNewPost = (title, author, id) => {
    axios.post(postsUrl, {
            author: author,
            title: title,
            id: id
        })
        .then((response) => {
            console.log('I am working!');
        })
        .catch((error) => {
            console.log('I am not working...');
        });
    location = location;
}