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
import * as businessService from "../services/business.service";

function ReviewCard({ review }) {
  return (
    <div
      className="bg-white px-4 py-6 text-[18px] w-[350px] rounded-lg flex gap-2 flex-col items-start h-fit"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      <p>Reviewer: {review.reviewer.name}</p>
      <p>{review.review}</p>
      <p>Rating: {review.rating}</p>
    </div>
  );
}

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

  const scheduleEvent = async (d) => {
    try {
      const response = await businessService.scheduleEvent(businessId, d);
      if (response.status === 201) {
        alert("Event scheduled, status: waiting for approval");
      } else {
        alert("There was a problem scheduling the evnet");
      }
    } catch (e) {
      alert("There was a problem scheduling the evnet: " + e.message);
      console.log(e);
    }
  };

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

  const hasMadeReview = () => {
    return (
      business.reviews &&
      business.reviews.findIndex(
        (b) => b.reviewer === user._id || b.reviewer._id === user._id
      ) !== -1
    );
  };

  const submitReview = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target).entries());

    data.business = business._id;

    try {
      const response = await businessService.addReview(
        data.review,
        data.rating,
        data.business
      );
      if (response.status === 201) {
        alert("Added review!");

        window.location.reload();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const tileClassName = ({ date, view }) => {
    // Add class to selected dates
    const existingApproved = business.businessInformation.businessEvents.find(
      (e) => {
        const dateOther = new Date(e.date);
        return (
          date.getDate() === dateOther.getDate() &&
          dateOther.getFullYear() === date.getFullYear() &&
          date.getMonth() === dateOther.getMonth() &&
          e.status === "approved"
        );
      }
    );
    if (existingApproved) {
      return "unavailable";
    }

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
          const approvedAtThisDate =
            business.businessInformation.businessEvents.find((e) => {
              const date = new Date(e.date);
              return (
                date.getDate() === d.getDate() &&
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                e.status === "approved"
              );
            });
          if (approvedAtThisDate)
            return alert(
              "Date is unavailable for changes, an event is alreadu approved for this date"
            );
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
              scheduleEvent(d);
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
            style={{ width: "20px", height: "20px", background: "gold" }}
          ></div>
          <p>Available dates</p>
        </div>
      </div>

      <h2 className="my-6">
        {business.businessInformation.businessName} Reviews
      </h2>
      {business.reviews && business.reviews.length > 0 ? (
        <div className="h-[350px] grid grid-cols-2 overflow-scroll">
          {React.Children.toArray(
            business.reviews.map((review) => <ReviewCard review={review} />)
          )}
        </div>
      ) : (
        <div>No Reviews </div>
      )}

      <div
        style={{
          pointerEvents: hasMadeReview() ? "none" : "inherit",
        }}
      >
        <h2 className="my-6">
          Review {business.businessInformation.businessName}
        </h2>
        <form
          onSubmit={submitReview}
          className="flex flex-col gap-2 my-4"
          style={{ opacity: hasMadeReview() ? "0.4" : "1" }}
        >
          <textarea
            name="review"
            placeholder="Enter review"
            className="h-[100px] border-[1px] border-[lightgray] p-2"
          />
          <label>Rating</label>
          <select
            name="rating"
            className="bg-gray-100 p-2  border-[1px] border-[lightgray]"
          >
            {React.Children.toArray(
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option value={num}>{num}</option>
              ))
            )}
          </select>
          <button className="bg-[green] text-white p-4 font-bold text-[24px]">
            Submit review
          </button>
        </form>

        <div className="fixed bottom-4 left-4 cursor-pointer">
          <img
            onClick={() => {
              window.open(
                `https://api.whatsapp.com/send?phone=${business.businessInformation.businessPhone}&text=Hello%20i%20reached%20you%20from%20events%20site%2C%20can%20we%20schedule%3F`
              );
            }}
            src="https://cdn.pixabay.com/photo/2015/08/03/13/58/whatsapp-873316_1280.png"
            width={70}
            height={70}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
