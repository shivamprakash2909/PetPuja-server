import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Not authorized! Login again" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: tokenDecode.userId };
    next();
  } catch (error) {
    console.error("Error in chechAuth middleware: ", error);
    res.status(401).json({ message: "Error in checkAuth middleware" });
  }
};

export default checkAuth;
