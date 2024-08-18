import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ScheduleEvents() {
  const [business, setBusiness] = useState();

  const nav = useNavigate();
  const { bid } = useParams();

  const fetchBusinessInfo = async (bid) => {
    try {
      const response = await axios.get(`api/v3/auth/get-business/${bid}`);
      setBusiness(response.data.data);
    } catch (e) {
      nav("/dashboard/profile");
    }
  };

  useEffect(() => {
    if (!bid) {
      nav("/dashboard/profile");
    } else {
      fetchBusinessInfo(bid);
    }
  }, [bid]);

  return (
    <div>
      <h4>{business.businessInformation.businessName}</h4>

      {/*TODO: Calemdars */}
    </div>
  );
}
