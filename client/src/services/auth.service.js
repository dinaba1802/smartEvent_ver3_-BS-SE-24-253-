import axios from "axios";

export async function register(registerForm) {
  const response = await axios.post("api/v3/auth/register", registerForm);
  return response.data;
}
export async function updateBusinessInformation(businessInformation) {
  const response = await axios.put(
    "api/v3/auth/update-business",
    businessInformation
  );
  return response.data;
}

export async function uploadImage(images) {
  const formData = new FormData();
  for (var image of images) {
    formData.append("files", image);
  }
  const response = await axios.post("api/v3/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function login(loginForm) {
  const response = await axios.post("api/v3/auth/login", loginForm);
  if (response.data) {
    const token = response.data;
    localStorage.setItem("token", token);
  }
  return response.data;
}

export async function me() {
  const response = await axios.get("api/v3/auth/me");
  return response.data;
}
