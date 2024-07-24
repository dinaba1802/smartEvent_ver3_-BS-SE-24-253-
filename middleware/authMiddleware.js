import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  let token = req.headers["Authorization"] || req.headers["authorization"];

  if (!token) throw new UnauthenticatedError("authentication invalid");

  token = token.replace("Bearer ");

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authenticateAdminUser = async (req, res, next) => {
  try {
    const role = req.user.role;

    if (role !== "admin")
      throw new UnauthenticatedError("authorization invalid");
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};
