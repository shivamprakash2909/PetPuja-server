import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV !== "devlopment",
    sameSite: process.env.NODE_ENV !== "devlopment" ? "none" : "strict", // lax- if API and UI are deployed under same domain, strict- if both are on same server
    maxAge: 7 * 24 * 60 * 60 * 1000, //in miliseconds
  });
  return token;
};
