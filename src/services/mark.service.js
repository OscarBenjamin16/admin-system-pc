import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class MarkService extends TokenService {
  async addMark(data) {
    const response = await fetch(`${API_HOST}/marca`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async showMarks(page, search) {
    const response = await fetch(
      `${API_HOST}/marca/marcas-paginated?pagina=${page}&marca=${search}&limit=5`
    );
    return response.json();
  }
  async getMarks() {
    const response = await fetch(`${API_HOST}/marca`);
    return response.json();
  }
  async changeStatus(query) {
    const response = await fetch(`${API_HOST}/marca/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(query),
    });
    return response.json();
  }
  async deleteMark(id) {
    const response = await fetch(`${API_HOST}/marca/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
    });
    return response.json();
  }
  async putMark(data,id) {
    const response = await fetch(`${API_HOST}/marca/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
