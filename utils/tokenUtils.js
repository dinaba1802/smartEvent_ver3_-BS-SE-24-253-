import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const createJWT = (payload) => {
  console.log("createJWT:payload", payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.decode(token);
  console.log("verifyJWT:decoded", decoded);

  return decoded;
};
