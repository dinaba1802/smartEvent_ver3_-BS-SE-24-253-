import React, { useEffect, useState } from "react";
import { getAllBusinesses } from "../services/business.service";
import BusinessCard from "../components/BusinessCard";

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
      <h1>All Businesses</h1>

      {React.Children.toArray(
        businesses.map((b) => (
          <BusinessCard businessInfo={b.businessInformation} />
        ))
      )}
    </div>
  );
};
export default AllEvents;
