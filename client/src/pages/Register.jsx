import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const nav = useNavigate();
  const onSubmitRegister = async (e) => {
    e.preventDefault();

    const form = Object.fromEntries(new FormData(e.target).entries());
    const business = e.target[7].checked;
    form.business = business;

    try {
      const response = await register(form);
      if (response) {
        alert("Registered succesully");
        nav("/login");
      }
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmitRegister}>
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="tel" name="phone number" />
        <FormRow type="text" name="username" />
        <FormRow type="password" name="password" />
        <FormRow
          type="checkbox"
          required={false}
          name="business"
          style={{ alignSelf: "center", textAlign: "center" }}
        />
        <button type="submit" className="btn btn-block">
          Create user
        </button>

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
          <Link to="/" className="btn register-link">
            back to homepage
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
