import React, { useEffect, useState } from "react";
import { getAllBusinesses } from "../services/business.service";
import BusinessCard from "../components/BusinessCard";
import "react-calendar/dist/Calendar.css";
const AllEvents = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const result = await getAllBusinesses();
      setBusinesses(result.filter((b) => b.businessInformation));
    };
    fetchBusinesses();
  }, []);

  return (
    <div>
      <h1 className="ml-4 text-[32px]">All Businesses</h1>

      <div className="m-4">
        {React.Children.toArray(
          businesses.map((b) => (
            <BusinessCard
              businessId={b._id}
              customerView
              businessInfo={b.businessInformation}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default AllEvents;
