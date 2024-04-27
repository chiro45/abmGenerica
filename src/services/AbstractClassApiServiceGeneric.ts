import { AbstractCrudService } from "./AbstractCrudService";

export abstract class AbstractClassApiServiceGeneric<
  T
> extends AbstractCrudService<T> {
  // Método protegido para realizar la solicitud genérica
  protected async request(path: string, options: RequestInit): Promise<T> {
    try {
      // Realiza la solicitud fetch con la ruta y las opciones proporcionadas
      const response = await fetch(path, options);
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        console.log(response.statusText);
        // Si no es exitosa, lanza un error con el mensaje de estado de la respuesta
        throw new Error(response.statusText);
      }
      // Retorna los datos de la respuesta en formato JSON
      return response.json();
    } catch (error) {
      // Si hay algún error, rechaza la promesa con el error
      return Promise.reject(error);
    }
  }
  // Método protegido para realizar la solicitud genérica
  protected async requestAll(path: string, options: RequestInit): Promise<T[]> {
    try {
      const response = await fetch(path, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Implementación de los métodos de la interfaz AbstractCrudService
  async get(url: string, id: string): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "GET",
    };
    return this.request(path, options);
  }

  async getAll(url: string): Promise<T[]> {
    const path = url;
    const options: RequestInit = {
      method: "GET",
    };
    return this.requestAll(path, options);
  }

  async post(url: string, data: T): Promise<T> {
    const path = url;
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this.request(path, options);
  }

  async put(url: string, id: string, data: T): Promise<T> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return this.request(path, options);
  }

  async delete(url: string, id: string): Promise<void> {
    const path = `${url}/${id}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await this.request(path, options);
  }
}
