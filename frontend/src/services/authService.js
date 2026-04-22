import api from './api';

export const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },
  
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data;
  },
  
  async logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
  },
  
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};