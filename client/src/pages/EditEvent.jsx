import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
/*import { useNavigation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { EVENT_KIND } from '../../../utils/constants';*/
import {
  Form,
  useNavigation,
  redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import BusinessGuard from "../guards/BusinessGuard";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-carousel-animated/dist/style.css";
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import axios from "axios";

/*import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';*/

const EditEvent = () => {
  /*const {user} = userOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state ==='submitting';*/
  const { user, updateBusinessInformation } = useAuth();

  const [selectedDates, setSelectedDates] = useState([]);

  const places = useMapsLibrary("places");
  const onEditBusinessInformation = async (e) => {
    e.preventDefault();

    try {
      const fileElement = document.querySelector(`#businessImage`);
      const form = Object.fromEntries(new FormData(e.target).entries());
      form.availableDates = selectedDates.map((d) => d.getTime());

      form.businessLocation = {
        lat: form.lat,
        lng: form.lng,
      };
      if (fileElement.files.length > 0) {
        await updateBusinessInformation(form, fileElement.files);
      } else {
        await updateBusinessInformation(form);
      }
      alert("Updated business information");
    } catch (e) {
      alert("Failed to update business information, please try again later");
    }
  };

  useEffect(() => {
    if (user && user.businessInformation) {
      setSelectedDates(
        user.businessInformation.availableDates.map((d) => new Date(d))
      );
    }
  }, [user]);
  if (!user.businessInformation) {
    return <Navigate to="/dashboard/add-business"></Navigate>;
  }
  const tileClassName = ({ date, view }) => {
    // Add class to selected dates
    const existingApproved = user.businessInformation.businessEvents.find(
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
    <Wrapper>
      <Form
        method="post"
        className="form w-full flex flex-col"
        onSubmit={onEditBusinessInformation}
      >
        <h4 className="form-title">Edit Business</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="businessName"
            defaultValue={user.businessInformation.businessName}
          ></FormRow>

          <div className="flex flex-col w-full translate-y-2 ">
            <label className="translate-y-[-.8rem]">Business Type</label>
            <select
              className="p-[6px] border-[1px] border-[lightgray]"
              name="businessType"
            >
              <option value={"DJ"}>DJ</option>
              <option value={"Camera Man"}>Camera Man</option>
              <option value={"Event hall"}>Event hall</option>
              <option value={"Food Services"}>Food Services</option>
            </select>
          </div>
          <FormRow
            type="text"
            labelText="business location"
            defaultValue={user.businessInformation.businessAddress}
            name="businessAddress"
          ></FormRow>
          <FormRow
            type="text"
            labelText="business phone"
            defaultValue={user.businessInformation.businessPhone}
            name="businessPhone"
          ></FormRow>
          <FormRow
            defaultValue={user.businessInformation.businessEmail}
            type="text"
            labelText="business email"
            name="businessEmail"
          ></FormRow>
          <FormRow
            type="text"
            multiline
            defaultValue={user.businessInformation.businessAbout}
            labelText="business about"
            name="businessAbout"
          ></FormRow>
          <FormRow
            type="file"
            required={false}
            labelText="business image"
            multifile
            name="businessImage"
          ></FormRow>

          {/*<FormRow
            defaultValue={user.businessInformation.businessLocation?.lat ?? 0}
            type="number"
            labelText="business location latitude"
            name="lat"
          ></FormRow>
          <FormRow
            defaultValue={user.businessInformation.businessLocation?.lng ?? 0}
            type="number"
            labelText="business location longitude"
            name="lng"
          ></FormRow>*/}
        </div>
        <button
          type="submit"
          className="p-3 rounded-sm text-white font-bold ml-auto self-end my-4 cursor-pointer"
          style={{ background: "rgb(55, 173, 140)" }}
        >
          Edit Business Information
        </button>
      </Form>

      <Calendar
        tileClassName={tileClassName}
        onClickDay={(d) => {
          // check if there is an approved event at this date

          const approvedAtThisDate =
            user.businessInformation.businessEvents.find((e) => {
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

          const existingIndex = selectedDates.findIndex(
            (date) =>
              date.getYear() === d.getYear() &&
              d.getMonth() === date.getMonth() &&
              d.getDate() === date.getDate()
          );
          if (existingIndex !== -1) {
            if (confirm("Would you like to make this date un-available?")) {
              selectedDates.splice(existingIndex, 1);
              setSelectedDates([...selectedDates]);
              // call server here to make the date un-available
            }
          } else if (
            confirm("Would you like to mark this date as available?")
          ) {
            // add the date to available dates
            setSelectedDates([...selectedDates, d]);
          }
        }}
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
            style={{
              width: "20px",
              height: "20px",
              background: "gold",
              //border: "2px solid rgb(0,0,150)",
            }}
          ></div>
          <p>Available dates</p>
        </div>
      </div>
      <br />
      <br />

      {/*user.businessInformation &&
        user.businessInformation.businessLocation && (
          <Map
            style={{ width: "400px", height: "400px" }}
            defaultCenter={user.businessInformation.businessLocation}
            defaultZoom={8}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />
        )*/}
    </Wrapper>
  );
};
export default BusinessGuard(EditEvent);
