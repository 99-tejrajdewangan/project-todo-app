import api from './api';

export const todoService = {
  async getProjectTodos(projectId) {
    const response = await api.get(`/todos/project/${projectId}`);
    return response.data;
  },
  
  async createTodo(todoData) {
    const response = await api.post('/todos', todoData);
    return response.data;
  },
  
  async updateTodo(id, todoData) {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },
  
  async deleteTodo(id) {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
  
  async toggleTodo(id) {
    const response = await api.put(`/todos/${id}/toggle`);
    return response.data;
  }
};