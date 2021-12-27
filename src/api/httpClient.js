import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_MARVELBASE_URL,
  // timeout: 2000, // indicates, 1000ms ie. 1 second
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    // Hacer algo antes de que se envíe la solicitud.
    return config;
  },
  function (error) {
    // Hacer algo con error de solicitud
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Cualquier código de estado que se encuentre dentro del rango de 2xx hace que esta función se active
    // Hacer algo con los datos de la respuest
    return response;
  },
  function (error) {
    // Cualquier código de estado que esté fuera del rango de 2xx hace que esta función se active
    // Hacer algo con el error de la respuesta
    if (!error.response) {
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 400:
        console.log('Error 400');
        break;

      case 404:
        console.log('Error 404');
        break;

      default:
        console.error(error.response.status, error.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
