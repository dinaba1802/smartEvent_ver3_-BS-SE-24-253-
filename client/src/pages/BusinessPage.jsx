import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import BusinessCard from "../components/BusinessCard";
import { useAuth } from "../context/AuthContext";
import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel-animated";

import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import "react-carousel-animated/dist/style.css";
import ImageSlider from "../components/ImageSlider";
import { getBusinessById } from "../services/business.service";

const BusinessPage = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const { user } = useAuth();
  useEffect(() => {
    const fetchBusiness = async () => {
      if (!businessId) {
        nav("/dashboard-all-events");
        return;
      }
      try {
        const response = await getBusinessById(businessId);
        setBusiness(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, []);

  const selectedDates = useMemo(
    () =>
      business
        ? business.businessInformation.availableDates.map((d) => new Date(d))
        : [],
    [business]
  );

  if (loading) {
    return <div>Loading business information..</div>;
  }

  if (!business) {
    return <Navigate to="/dashboard/all-events" />;
  }

  const tileClassName = ({ date, view }) => {
    // Add class to selected dates
    if (selectedDates.find((d) => d.toDateString() === date.toDateString())) {
      return "selected";
    }
    return null;
  };
  return (
    <div>
      <h1>Business {business.businessInformation.name}</h1>
      <hr className="my-4" />
      <h4 className="p-2">Business info</h4>
      <div>
        <BusinessCard
          businessId={business._id}
          businessInfo={business.businessInformation}
        />
        {business.businessInformation.businessImages &&
          business.businessInformation.businessImages.length > 0 && (
            <ImageSlider images={business.businessInformation.businessImages} />
          )}
      </div>

      <h4 className="p-2">Business Calendar</h4>

      <Calendar
        onClickDay={(d) => {
          const existing = selectedDates.findIndex(
            (date) =>
              date.getYear() === d.getYear() &&
              d.getMonth() === date.getMonth() &&
              d.getDate() === date.getDate()
          );
          if (existing === -1) {
            alert("Date not available");
          } else if (business._id === user._id) {
            alert("Cannot schedule with your self");
          } else {
            if (
              confirm(
                `Would you like to schedule this date with ${business.businessInformation.businessName}?`
              )
            ) {
              alert("Date scheduled!");
            }
          }
        }}
        tileClassName={tileClassName}
      />
      <div className="flex flex-row gap-2 my-3">
        <div className="flex flex-row items-center gap-2">
          <div
            style={{ width: "20px", height: "20px", background: "yellow" }}
          ></div>
          <p>Today</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div
            style={{ width: "20px", height: "20px", background: "blue" }}
          ></div>
          <p>Available dates</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
