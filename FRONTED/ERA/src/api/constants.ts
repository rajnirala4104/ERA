export const BASE_URL = 'http://127.0.0.1:8000/api/v1';
export const REQUEST_TIMEOUT = 5000;

export const ENDPIONTS = {
    login: "/user/login",
    signup: "/user/signup",
    updateUser: '/user/update/:id',
    password: '/user/password',
    getSingpleUser: '/user/'
}

export const POST_ENDPOINT = {
    getAllpost: "/post/",
    getSinglePost: '/post/:postId',
    createPost: "/post/create",
    updatePost: "/post/update",
    deletePost: "/post/:postId"
}

export const THOUGHT_POST_ENDPOINTS = {
    getAll: '/thoughtPost/',
    getSingle: '/thoughtPost/:thougthPostId',
    create: '/thoughtPost/create',
    update: '/thoughtPost/:thougthPostId'
}