import { supabase } from './supabase.js'

let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    checkUser();
});

async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        currentUser = session.user;
        document.getElementById('login').style.display = 'none';
        document.getElementById('blog').style.display = 'block';
        document.getElementById('user').innerText = currentUser.user_metadata.username;
        loadPosts();
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('blog').style.display = 'none';
    }
}

async function login() {
    const username = document.getElementById('username').value;
    if (!username) return alert('Please enter a username');
    let { error } = await supabase.auth.signInWithOtp({ email: username });
    if (error) {
        alert('Error logging in: ' + error.message);
    } else {
        currentUser = { user_metadata: { username } };
        document.getElementById('login').style.display = 'none';
        document.getElementById('blog').style.display = 'block';
        document.getElementById('user').innerText = username;
        loadPosts();
    }
}

async function logout() {
    await supabase.auth.signOut();
    currentUser = null;
    document.getElementById('login').style.display = 'block';
    document.getElementById('blog').style.display = 'none';
}

async function createPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    if (!title || !content) return alert('Please fill out all fields');
    const { data, error } = await supabase.from('posts').insert([{ user_id: currentUser.id, title, content }]);
    if (error) {
        alert('Error creating post: ' + error.message);
    } else {
        alert('Post created');
        loadPosts();
    }
}

async function loadPosts() {
    const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (error) {
        alert('Error loading posts: ' + error.message);
    } else {
        const postsContainer = document.getElementById('posts');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `<h4>${post.title}</h4><p>${post.content}</p><button onclick="loadComments('${post.id}')">Show Comments</button><div id="comments-${post.id}"></div>`;
            postsContainer.appendChild(postElement);
        });
    }
}

async function loadComments(postId) {
    const { data: comments, error } = await supabase.from('comments').select('*').eq('post_id', postId).order('created_at', { ascending: true });
    if (error) {
        alert('Error loading comments: ' + error.message);
    } else {
        const commentsContainer = document.getElementById(`comments-${postId}`);
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `<p>${comment.content}</p><button onclick="loadReplies('${comment.id}')">Show Replies</button><div id="replies-${comment.id}"></div>`;
            commentsContainer.appendChild(commentElement);
        });
    }
}

async function loadReplies(commentId) {
    const { data: replies, error } = await supabase.from('replies').select('*').eq('comment_id', commentId).order('created_at', { ascending: true });
    if (error) {
        alert('Error loading replies: ' + error.message);
    } else {
        const repliesContainer = document.getElementById(`replies-${commentId}`);
        repliesContainer.innerHTML = '';
        replies.forEach(reply => {
            const replyElement = document.createElement('div');
            replyElement.className = 'reply';
            replyElement.innerHTML = `<p>${reply.content}</p>`;
            repliesContainer.appendChild(replyElement);
        });
    }
}
