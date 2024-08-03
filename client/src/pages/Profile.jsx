import { Link } from "react-router-dom";
import BusinessCard from "../components/BusinessCard";
import { useAuth } from "../context/AuthContext";
import ReactCarousel, { AFTER, CENTER, BEFORE } from "react-carousel-animated";

import "react-carousel-animated/dist/style.css";
import ImageSlider from "../components/ImageSlider";
const Profile = () => {
  const { user } = useAuth();

  if (user.role === "business") {
    return (
      <div>
        <h1>Profile</h1>
        <hr className="my-4" />
        <h4 className="p-2">Business info</h4>
        {user.businessInformation ? (
          <div>
            <BusinessCard businessInfo={user.businessInformation} />
            <ImageSlider images={user.businessInformation.businessImages} />
          </div>
        ) : (
          <div className="p-2">
            <span className="p-2">No Business information yet</span>
            <br />
            <Link className="text-blue-500 font-bold p-2" to="/dashboard">
              Add Business info
            </Link>
          </div>
        )}

        <h4 className="p-2">Personal info</h4>
        <div
          className="p-[2rem] m-4 flex flex-col items-start gap-4 bg-[white] rounded-lg"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <div>
            <span>Name: </span>
            <b>{user.name + " " + user.lastName}</b>
          </div>
          <div>
            <span>Email: </span>
            <b>{user.email}</b>
          </div>
          <div>
            <span>Location: </span>
            <b>{user.location}</b>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>Profile</h1>
      <div
        className="p-[2rem] m-4 flex flex-col items-start gap-4 bg-[white] rounded-lg"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div>
          <span>Name: </span>
          <b>{user.name + " " + user.lastName}</b>
        </div>
        <div>
          <span>Email: </span>
          <b>{user.email}</b>
        </div>
        <div>
          <span>Location: </span>
          <b>{user.location}</b>
        </div>
      </div>
    </div>
  );
};
export default Profile;
