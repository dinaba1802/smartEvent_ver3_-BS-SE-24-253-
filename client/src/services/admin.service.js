import axios from "axios";

export async function getSiteStats() {
  const response = await axios.get("api/v3/admin/stats");
  return response.data;
}

export async function deleteUser({ userEmail }) {
  const response = await axios.post("api/v3/admin/delete-user", { userEmail });
  return response.data;
}
