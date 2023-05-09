import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
