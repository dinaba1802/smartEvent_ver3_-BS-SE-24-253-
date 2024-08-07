import axios from "axios";

export async function getAllBusinesses() {
  const response = await axios.get("api/v3/businesses");
  return response.data;
}

export async function getBusinessById(bid) {
  const response = await axios.get(`api/v3/auth/get-business/${bid}`);
  return response.data;
}

//

export async function scheduleEvent(businessId, date) {
  const response = await axios.post("api/v3/business-events/schedule", {
    businessId,
    date,
  });
  return response.data;
}

export async function updateBusinessEventStatus(status, businessEvent) {
  const response = await axios.post("api/v3/business-events/update-status", {
    status,
    businessEvent,
  });
  return response.data;
}
export async function addReview(review, rating, business) {
  const response = await axios.post("api/v3/business/reviews/createReview", {
    review,
    rating,
    business,
  });
  return response.data;
}
