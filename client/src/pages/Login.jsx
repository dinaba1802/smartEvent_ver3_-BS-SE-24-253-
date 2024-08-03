import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const [err, setErr] = useState();

  const onLogin = async (e) => {
    e.preventDefault();

    const form = Object.fromEntries(new FormData(e.target).entries());

    try {
      const response = await login(form);

      if (response) {
        nav("/dashboard/profile");
      }
    } catch (e) {
      console.log(e);
      setErr(e.response.data.msg);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onLogin}>
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" defaultValue="" />
        <FormRow type="password" name="password" defaultValue="" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button type="button" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>

        <div
          className="text-center mx-auto p-2 font-bold h-[30px] block text-[red]"
          style={{ opacity: err ? 1 : 0 }}
        >
          {err}
        </div>
      </form>
    </Wrapper>
  );
};
export default Login;
