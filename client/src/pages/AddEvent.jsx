import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
/*import { useNavigation } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { EVENT_KIND } from '../../../utils/constants';*/
import { Form, useNavigation, redirect } from "react-router-dom";
/*import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';*/

const AddEvent = () => {
  /*const {user} = userOutletContext();
    const navigation = useNavigation();
    const isSubmitting = navigation.state ==='submitting';*/
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Business</h4>
        <div className="form-center">
          <FormRow type="text" name="Business Name"></FormRow>
          <FormRow type="text" name="Business Type"></FormRow>
          <FormRow
            type="text"
            labelText="business location"
            name="Business Location"
          ></FormRow>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddEvent;
