import axios from "axios";

export default class PostService {
  static async getAllTasks() {
    const response = await axios.get('http://localhost:8000/tasks');
    return response;
  }

  static async addTask(text) {
    const response = await axios.post(`http://localhost:8000/tasks`, {
      text
    });
    return response;
  }

  static async removeTask(id) {
    const response = await axios.delete(`http://localhost:8000/tasks/${id}`);
    return response;
  }

  static async toggleTask(id, check) {
    const response = await axios.patch(`http://localhost:8000/tasks/${id}/toggle`, {
      isCheck: !check
    });
    return response;
  }

  static async editTask(id, text) {
    const response = await axios.patch(`http://localhost:8000/tasks/${id}/text`, {
      text
    });
    return response;
  }
}