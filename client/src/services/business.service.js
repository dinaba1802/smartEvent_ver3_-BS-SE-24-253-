import axios from "axios";

export async function getAllBusinesses() {
  const response = await axios.get("api/v3/businesses");
  return response.data;
}
