import axios from 'axios';
import { addButtonListener } from './addPosts';
import { bindShowComments } from './comments';
import { bindAddCommentButtons } from './comments';
import { bindDeletePostButton } from './removePosts';
import { bindDeleteCommentButtons } from './comments';

const postsUrl = 'http://localhost:3000/posts';

export const getPosts = () => {
    axios
        .get(postsUrl)
        .then((result) => { return result.data })
        .then((data) => {
            // console.log('AJAX');
            // console.log(data);
            addButtonListener(data);
            loadPosts(data);
            bindShowComments();
            bindAddCommentButtons();
            bindDeletePostButton();
            //bindDeleteCommentButtons();
        });
}

// superagent.get(postsUrl)
//     .end((err, response) => {
//         console.log('SUPERAGENT');
//         console.log(response.body);
//     });

// $.get(postsUrl)
//     .then((response) => {
//         console.log('JQUERY');
//         console.log(response);
//     });


const loadPosts = (posts) => {
    const table = document.getElementById('posts');
    posts.forEach(post => {
        const newPost = document.createElement('tr');
        newPost.innerHTML = `<td>${post.author}</td>
                            <td>${post.title}</td>
                            <td>
                                <button class="show-and-hide-comments" data-function="0" id='${post.id}'>Show comments</button>
                            </td>
                            <td><button class="delete-post" id="delete-post-${post.id}">Delete</button></td>`;
        table.appendChild(newPost);
        const comments = document.createElement('tr');
        comments.setAttribute('class', 'comments');
        comments.setAttribute('id', 'comments-' + post.id);
        comments.innerHTML = `<td>
        <div>Comments</div>
        <form class="comment-add" id="comment-add-${post.id}">
            <input type="text" name="comment-body" id="comment-body-${post.id}" placeholder="Enter your comment">
            <button class="add-comments" id="add-comment-${post.id}">Add comment</button>
        </form>
        </td>`;
        table.appendChild(comments);
    });
}