import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
/*import { useNavigation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { EVENT_KIND } from '../../../utils/constants';*/
import { Form, redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BusinessGuard from "../guards/BusinessGuard";
/*import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';*/

const AddEvent = () => {
  /*const {user} = userOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state ==='submitting';*/
  const { updateBusinessInformation } = useAuth();
  const nav = useNavigate();

  const onAddBusinessInformation = async (e) => {
    e.preventDefault();

    try {
      const fileElement = document.querySelector(`#businessImage`);
      const form = Object.fromEntries(new FormData(e.target).entries());
      if (fileElement.files.length > 0) {
        await updateBusinessInformation(form, fileElement.files);
      } else {
        await updateBusinessInformation(form);
      }
      alert("Updated business information");
      nav("/dashboard/edit-business");
    } catch (e) {
      alert("Failed to update business information, please try again later");
    }
  };
  return (
    <Wrapper>
      <Form
        method="post"
        className="form w-full flex flex-col"
        onSubmit={onAddBusinessInformation}
      >
        <h4 className="form-title">Add Business</h4>
        <div className="form-center w-full">
          <FormRow type="text" name="businessName"></FormRow>
          <FormRow type="text" name="businessType"></FormRow>
          <FormRow
            type="text"
            labelText="business location"
            name="businessAddress"
          ></FormRow>
          <FormRow
            type="text"
            labelText="business phone"
            name="businessPhone"
          ></FormRow>
          <FormRow
            type="text"
            labelText="business email"
            name="businessEmail"
          ></FormRow>
          <FormRow
            type="text"
            multiline
            labelText="business about"
            name="businessAbout"
          ></FormRow>
          <FormRow
            type="file"
            labelText="business image"
            multifile
            name="businessImage"
          ></FormRow>
        </div>
        <button
          type="submit"
          className="p-3 rounded-sm text-white font-bold ml-auto self-end my-4 cursor-pointer"
          style={{ background: "rgb(55, 173, 140)" }}
        >
          Add Business Information
        </button>
      </Form>
    </Wrapper>
  );
};
export default BusinessGuard(AddEvent);
