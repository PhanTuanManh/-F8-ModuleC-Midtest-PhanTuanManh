import instance from ".";

export const registerAcount = async (data) => {
  try {
    const response = await instance.post("/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginAcount = async (data) => {
  try {
    const response = await instance.post("/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
