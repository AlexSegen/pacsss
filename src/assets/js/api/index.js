import $http from "./api.config";
const toastme = require('toastmejs');

class RequestError extends Error {
  constructor(errorCode, errorMessage, args) {
    super(args);
    this.name = args;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

const Api = {
  getAll: async (resource) => {
    try {
      const response = await $http.get(resource);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  },

  getOne: async (resource, identifier)  => {
    try {
      const response = await $http.get(`${resource}/${identifier}`);

      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  },

  create: async (resource, payload) => {
    try {
      const response = await $http.post(resource, payload);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  },

  update: async (resource, identifier, payload) => {
    try {
      const response = await $http.put(`${resource}/${identifier}`, payload);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  },

  remove: async (resource, identifier) => {
    try {
      const response = await $http.delete(`${resource}/${identifier}`);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  }

}


/* class ApiClass {
  async getAll(resource) {
    try {
      const response = await $http.get(resource);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  }
  async getOne(resource, identifier) {
    try {
      const response = await $http.get(`${resource}/${identifier}`);

      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  }
  async create(resource, payload) {
    try {
      const response = await $http.post(resource, payload);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  }
  async update(resource, identifier, payload) {
    try {
      const response = await $http.put(`${resource}/${identifier}`, payload);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  }
  async remove(resource, identifier) {
    try {
      const response = await $http.delete(`${resource}/${identifier}`);
      return response.data;
    } catch (e) {
        toastme.error(e.message);
      throw new RequestError(e.response.status, e.message);
    }
  }
}

const Api = new ApiClass(); */

module.exports = Api;
