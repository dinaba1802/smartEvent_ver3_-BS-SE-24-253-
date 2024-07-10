import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link, useRouteError } from "react-router-dom";
import { Logo } from "../components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Plan Your Event <span>Easily</span>
          </h1>
          <p>
            I'm baby dreamcatcher lyft four loko heirloom ethical. Food truck
            big mood taiyaki 8-bit cliche. Kitsch try-hard asymmetrical
            chillwave fixie vaporware coloring book yes plz venmo actually banh
            mi meggings raclette cardigan stumptown. Vice taiyaki jean shorts,
            slow-carb tote bag truffaut letterpress normcore heirloom neutra
            affogato gentrify kogi master cleanse. Grailed single-origin coffee
            hammock post-ironic freegan.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="event hunt" className="img-main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
