import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts';

const API_KEY = process.env.API_KEY;
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const KEY = `?key=${API_KEY}`;

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    }
}