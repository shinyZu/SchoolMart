const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader: " + authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid token format." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ status: 401, message: "No token provided." });
    }

    const verified = jwt.verify(token, jwtSecretKey);
    console.log("verified: " + verified);

    if (verified) {
      next();
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

module.exports = { auth: auth };
