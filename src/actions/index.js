import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POSTS = 'create_posts';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

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

export function createPosts(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_POSTS,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${KEY}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  }
}