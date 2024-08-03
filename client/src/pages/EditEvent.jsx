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
/*import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';*/

const EditEvent = () => {
  /*const {user} = userOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state ==='submitting';*/
  const { user, updateBusinessInformation } = useAuth();

  const onEditBusinessInformation = async (e) => {
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
    } catch (e) {
      alert("Failed to update business information, please try again later");
    }
  };
  if (!user.businessInformation) {
    return <Navigate to="/dashboard/add-business"></Navigate>;
  }

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
          <FormRow
            type="text"
            name="businessType"
            defaultValue={user.businessInformation.businessType}
          ></FormRow>
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
          Edit Business Information
        </button>
      </Form>
    </Wrapper>
  );
};
export default BusinessGuard(EditEvent);
