export abstract class AbstractClassApiServiceGeneric<T> {
  // Método protegido para realizar la solicitud genérica
  protected async request(path: string, options: RequestInit): Promise<T> {
    try {
      // Realiza la solicitud fetch con la ruta y las opciones proporcionadas
      const response = await fetch(path, options);
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
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

  // Método para realizar una solicitud GET
  async get(path: string): Promise<T> {
    // Configura las opciones de la solicitud GET
    const options: RequestInit = {
      method: "GET",
    };
    // Llama al método request con la ruta y las opciones proporcionadas
    return this.request(path, options);
  }

  // Método para realizar una solicitud POST
  async post(path: string, data: T): Promise<T> {
    // Configura las opciones de la solicitud POST incluyendo los datos a enviar
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convierte los datos a JSON y los incluye en el cuerpo de la solicitud
    };
    // Llama al método request con la ruta y las opciones proporcionadas
    return this.request(path, options);
  }

  // Método para realizar una solicitud PUT
  async put(path: string, data: T): Promise<T> {
    // Configura las opciones de la solicitud PUT incluyendo los datos a enviar
    const options: RequestInit = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convierte los datos a JSON y los incluye en el cuerpo de la solicitud
    };
    // Llama al método request con la ruta y las opciones proporcionadas
    return this.request(path, options);
  }

  // Método para realizar una solicitud DELETE
  async delete(path: string): Promise<void> {
    // Configura las opciones de la solicitud DELETE
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    // Llama al método request con la ruta y las opciones proporcionadas
    await this.request(path, options);
  }
}