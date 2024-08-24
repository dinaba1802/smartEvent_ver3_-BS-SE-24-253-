import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BusinessGuard from "../guards/BusinessGuard";
import React from "react";
import AuthGuard from "../guards/AuthGuard";
import UserModel from "../../../models/UserModel";

function EventRequestCard({ eventRequest, customer = false }) {
  const { updateBusinessEventStatus } = useAuth();

  const approve = () => {
    updateBusinessEventStatus(eventRequest, "approved");
  };
  const reject = () => {
    updateBusinessEventStatus(eventRequest, "rejected");
  };

  // Ensure business name is correctly accessed
  const businessName =
    eventRequest.business.businessInformation?.businessName ||
    "Unknown Business";

  console.log(eventRequest);
  return (
    <div
      className="bg-white px-4 py-6 text-[18px] w-[350px] rounded-lg flex gap-2 flex-col items-start"
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      <p className="font-bold">
        Customer:{" "}
        {eventRequest.customer.name + " " + eventRequest.customer.lastName}
      </p>
      <p className="font-bold">Business: {businessName}</p>

      <p className="text-gray-400">
        {" "}
        Date: {new Date(eventRequest.date).toDateString()}
      </p>
      <p className="font-bold text-[16px] self-start">
        Status :
        <b
          style={{
            color:
              eventRequest.status === "approved"
                ? "green"
                : eventRequest.status === "pending"
                ? "gold"
                : "red",
          }}
        >
          {" "}
          {eventRequest.status}
        </b>
      </p>
      {eventRequest.status === "pending" && !customer && (
        <div className="flex flex-row gap-2 mt-4 self-end font-bold">
          <button
            onClick={approve}
            style={{
              border: "1px solid lightgray",
              padding: ".5rem",
              background: "green",
              color: "white",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
          >
            Approve
          </button>
          <button
            onClick={reject}
            style={{
              border: "1px solid lightgray",
              padding: ".5rem",

              background: "red",
              color: "white",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
function BusinessEventRequests() {
  const { user } = useAuth();
  if (user.role === "business" && !user.businessInformation) {
    return (
      <div className="p-2">
        <span className="p-2">No Business information yet</span>
        <br />
        <Link className="text-blue-500 font-bold p-2" to="/dashboard">
          Add Business info
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Event requests</h1>
      <h2> </h2>
      <h2>My Incomming requests</h2>

      {user.role === "business" &&
      user.businessInformation &&
      user.businessInformation.businessEvents &&
      user.businessInformation.businessEvents.length > 0 ? (
        <div>
          <br />
          <div className="flex flex-col gap-2 my-16">
            {React.Children.toArray(
              user.businessInformation.businessEvents.map((eventRequest) => (
                <EventRequestCard eventRequest={eventRequest} />
              ))
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="my-2">No Incomming requests </h3>
        </div>
      )}
      <div>
        <br />
        <h2>My Outgoing requests</h2>
        {user.businessEventRequests && user.businessEventRequests.length > 0 ? (
          <div className="flex flex-col gap-2 my-16">
            {React.Children.toArray(
              user.businessEventRequests.map((eventRequest) => (
                <EventRequestCard eventRequest={eventRequest} customer />
              ))
            )}
          </div>
        ) : (
          <div>
            <h3 className="my-2">No Outgoing requests </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthGuard(BusinessEventRequests);
