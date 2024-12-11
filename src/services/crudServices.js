import instance from ".";

const handleRequest = async (func, path, data = {}) => {
  try {
    const response = await func(`${path}`, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (path) => handleRequest(instance.get, path);

export const getOneItem = async (path, id) =>
  handleRequest(instance.get, `${path}/${id}`);

export const createItem = async (path, data) =>
  handleRequest(instance.post, path, data);

export const updateItem = async (path, id, data) =>
  handleRequest(instance.patch, `${path}/${id}`, data);

export const removeItem = async (path, id) =>
  handleRequest(instance.delete, `${path}/${id}`);
