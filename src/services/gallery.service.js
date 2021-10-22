import { API_HOST } from "../utils/constant";
import { TokenService } from "./token.service";

export class GalleryService extends TokenService {
  async addPhoto(id, file) {
    const formData = new FormData();
    formData.append("foto", file);
    const response = await fetch(`${API_HOST}/gallery/add/${id}`, {
      method: "POST",
      headers: { token: `Bearer:${this.getToken()}` },
      body: formData,
    });
    return response.json();
  }
  async getPhotos(id) {
    const response = await fetch(`${API_HOST}/gallery/mostrar-gallery-product/${id}`, {
      headers: { token: `Bearer:${this.getToken()}` },
    });
    return response.json();
  }
}
