import axios from 'axios';

export const bindShowComments = () => {
    const showAndHideComments = document.querySelectorAll('.show-and-hide-comments');
    showAndHideComments.forEach((button) => {
        button.addEventListener('click', (e) => {
            toggleComments(e.target);
        });
    });
}

const toggleComments = (target) => {
    const targetComments = document.getElementById('comments-' + target.dataset.id);
    if (target.dataset.function === "0") {
        //show
        targetComments.style.display = "table";
        target.dataset.function = "1";
        target.innerText = "Hide comments"
        getComments(target.id);
    } else {
        targetComments.style.display = "none";
        target.dataset.function = "0";
        target.innerText = "Show comments"
            //hide
    }
}

const getComments = (id) => {
    axios
        .get('http://localhost:3000/comments?postId=' + id)
        .then((result) => { return result.data })
        .then((data) => {
            loadCommentsToDiv(data, id);
        })
        .catch(() => {
            loadCommentsToDiv('no comments', id);
        });
}

const loadCommentsToDiv = (comments, id) => {
    const targetDiv = document.getElementById('comments-' + id).querySelector('div');
    if (comments.length !== 0) {
        targetDiv.innerHTML = '';
        comments.forEach((comment) => {
            targetDiv.innerHTML += `<p>${comment.body}</p>`;
        });
    } else {
        targetDiv.innerHTML = "No comments";
    }
}

export const bindAddCommentButtons = () => {
    const addCommentForms = document.querySelectorAll('.comment-add');
    addCommentForms.forEach((form, index) => {
        form.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'BUTTON') {
                const commentBody = e.currentTarget.firstElementChild;
                const commentId = (e.currentTarget.id).split("-")[2];
                const comment = prepareComment(commentBody.value, commentId);
                sendComment(comment);
            }
        });
    });
}

const prepareComment = (comment, id) => {
    const commentToSend = {
        body: comment,
        postId: id
    };
    return commentToSend;
}

const sendComment = (comment) => {
    axios.post('http://localhost:3000/comments', comment)
        .then((response) => {
            console.log('I am working!');
        })
        .catch((error) => {
            console.log('I am not working...');
        });
    location = location;
}