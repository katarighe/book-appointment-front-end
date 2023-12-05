export default class StorageManager {
    static getToken = () => (localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : { token: '' });

    static setToken = (token, expiry) => localStorage.setItem('token', JSON.stringify({ token, exp_date: expiry }));
}
