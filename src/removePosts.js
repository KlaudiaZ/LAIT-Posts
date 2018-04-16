import axios from 'axios';

export const bindDeletePostButton = () => {
    const deletePosts = document.querySelectorAll('.delete-post');
    deletePosts.forEach((post) => {
        const id = post.id.split("-")[2];
        post.addEventListener('click', (e) => {
            removePost(id);
            location = location;
        });
    });
}

const removePost = (postId) => {
    return axios
        .delete('http://localhost:3000/posts/' + postId);
}