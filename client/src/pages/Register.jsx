import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo></Logo>
      </form>
    </Wrapper>
  );
};

export default Register;
