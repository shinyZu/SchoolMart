const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader: " + authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid token format." });
    }

    const access_token = authHeader.split(" ")[1];

    if (!access_token) {
      return res
        .status(401)
        .json({ status: 401, message: "No token provided." });
    }

    const verified = jwt.verify(access_token, jwtSecretKey);
    // console.log("verified: " + verified);
    // console.log("req.email: " + req.email);
    // console.log("verified.username: " + verified.username);

    if (verified) {
      req.email = verified.username;
      next();
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    // TODO ----- Add code here to auto refresh token
    return res.status(401).send(error);
  }
};

const refreshToken = (email, refresh_token) => {
  try {
    let jwtRefreshKey = process.env.JWT_REFRESH_KEY;
    const decoded = jwt.verify(refresh_token, jwtRefreshKey);
    return decoded.username === email;
  } catch (error) {
    return false;
  }
};

module.exports = { authenticateToken, refreshToken };
