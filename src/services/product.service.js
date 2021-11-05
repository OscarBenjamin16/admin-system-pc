import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";
export class ProductService extends TokenService {
  async addProduct(data) {
    const response = await fetch(`${API_HOST}/producto`, {
      method: "POST",
      headers: {
        token: `Bearer:${this.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async addImage(file, id) {
    const formData = new FormData();
    formData.append("foto", file);
    const response = await fetch(`${API_HOST}/producto/file-product/${id}`, {
      method: "POST",
      headers: { token: `Bearer:${this.getToken()}` },
      body: formData,
    });
    return response.json();
  }
  async putProduct(data) {
    const response = await fetch(`${API_HOST}/producto/${data.id}`, {
      method: "PUT",
      headers: {
        token: `Bearer:${this.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async showProducts(page, search,limit=2,status) {
    const response = await fetch(
      `${API_HOST}/producto/products-paginate?pagina=${page}&producto=${search}&limit=${limit}&status=${status}`
    );
    return response.json();
  }
  async getProductbyId(id) {
    const response = await fetch(`${API_HOST}/producto/${id}`);
    return response.json();
  }
  showImage(name) {
    return `${API_HOST}/producto/image?image=${name}`;
  }
  async changeStatus(query) {
    const response = await fetch(`${API_HOST}/producto/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(query),
    });
    return response.json();
  }
  async deleteProduct(id) {
    const response = await fetch(`${API_HOST}/producto/${id}`, {
      method: "DELETE",
      headers: { token: `Bearer:${this.getToken()}` },
    });
    return response.json();
  }
  async searchProduct(search) {
    const response = await fetch(`${API_HOST}/producto/news?search=${search}`);
    return response.json();
  }
  async addStockProduct(idP, values) {
    const response = await fetch(`${API_HOST}/producto/add-stock/${idP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer:${this.getToken()}`,
      },
      body: JSON.stringify(values),
    });
    return response.json();
  }
}
