import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class CategoryService extends TokenService {
  async showCategories(page,search) {
    const response = await fetch(`${API_HOST}/categoria/categorias-paginated?pagina=${page}&categoria=${search}`);
    return response.json();
  }
  async getCategories() {
    const response = await fetch(`${API_HOST}/categoria`);
    return response.json();
  }
  async addCategory(data) {
    const response = await fetch(`${API_HOST}/categoria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async putCategory(data,id) {
    const response = await fetch(`${API_HOST}/categoria/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async deleteCategory(id){
    const response = await fetch(`${API_HOST}/categoria/${id}`,{
      method:'DELETE',
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
    })
    return response.json()
  }
  async changeStatus(query){
    const response = await fetch(`${API_HOST}/categoria/status`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body:JSON.stringify(query)
    })
    return response.json()
  }
}
