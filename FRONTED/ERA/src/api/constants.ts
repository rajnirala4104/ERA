export const BASE_URL = 'http://127.0.0.1:8000/api/v1';
export const REQUEST_TIMEOUT = 5000;

export const ENDPIONTS = {
    login: "/user/login",
    signup: "/user/signup",
    updateUser: '/user/update',
    password: '/user/password',
    getSingpleUser: '/user/',
    getAllTheUser: '/user/all'
}

export const POST_ENDPOINT = {
    getAllpost: "/post/",
    getAllPostsOfAPerticulerUser: '/post/posts',
    getSinglePost: '/post/:postId',
    createPost: "/post/create",
    updatePost: "/post/update",
    deletePost: "/post/delete"
}

export const THOUGHT_POST_ENDPOINTS = {
    getAll: '/thoughtPost/',
    getSingle: '/thoughtPost/:thougthPostId',
    create: '/thoughtPost/create',
    update: '/thoughtPost/update',
    getAllTheThoughtPostsOfAUser: '/thoughtPost/allPosts',
    deleteThoughtPost: '/thoughtPost/delete'
}

export const FOLLOW_ENDPOINT = {
    getAllTheFollowersOfAPerticularUser: '/follower/followers',
    getAllTheFollowingsOfAPerticularUser: '/follower/following',
    create: '/follower/create',
    delete: '/follower/delete',
    search: '/follower/search'
}
