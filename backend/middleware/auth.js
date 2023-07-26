const jwt = require("jsonwebtoken");

const authenticateAdminToken = async (req, res, next) => {
  const verified = verifyToken(req.headers.authorization, res);
  if (verified) {
    if (verified.user_role == "Admin") {
      req.email = verified.username;
      req.user_role = verified.user_role;
      next();
    } else {
      return res.status(403).send({ status: 403, messge: "Access denied." });
    }
  }
  //  else {
  //   console.log("-----------1-----------");
  //   return res.status(401).send({ status: 401, messge: "Unauthorized." });
  // }
};

const authenticateCustomerToken = async (req, res, next) => {
  // let jwtSecretKey = process.env.JWT_SECRET_KEY;

  // try {
  //   const authHeader = req.headers.authorization;
  //   console.log("authHeader: " + authHeader);

  //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //     return res
  //       .status(401)
  //       .json({ status: 401, message: "Invalid token format." });
  //   }

  //   const access_token = authHeader.split(" ")[1];

  //   if (!access_token) {
  //     return res
  //       .status(401)
  //       .json({ status: 401, message: "No token provided." });
  //   }

  //   const verified = jwt.verify(access_token, jwtSecretKey);

  //   if (verified) {
  //     if (verified.user_role == "Customer") {
  //       req.email = verified.username;
  //       req.user_role = verified.user_role;
  //       next();
  //     } else {
  //       res.status(403).send({ status: 403, messge: "Access denied." });
  //     }
  //   } else {
  //     return res.status(401).send(error);
  //   }
  // } catch (error) {
  //   // TODO ----- Add code here to auto refresh token
  //   return res.status(401).send(error);
  // }

  const verified = verifyToken(req.headers.authorization, res);
  if (verified) {
    if (verified.user_role == "Customer") {
      req.email = verified.username;
      req.user_role = verified.user_role;
      next();
    } else {
      return res.status(403).send({ status: 403, messge: "Access denied." });
    }
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

// Both Admin & Customer tokens
const verifyToken = (authHeader, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("-----------2-----------");
      res.status(401).json({ status: 401, message: "Invalid token format." });
      return;
    }

    const access_token = authHeader.split(" ")[1];

    if (!access_token) {
      console.log("-----------3-----------");
      return res
        .status(401)
        .json({ status: 401, message: "No token provided." });
    }

    console.log(access_token);
    const verified = jwt.verify(access_token, jwtSecretKey);

    if (verified) {
      return verified;
    } else {
      console.log("-----------4-----------");
      return res.status(401).send(error);
    }
  } catch (error) {
    // TODO ----- Add code here to auto refresh token
    console.log("-----------5-----------");
    res.status(401).json({ status: 401, message: error });
  }
};

module.exports = {
  authenticateAdminToken,
  authenticateCustomerToken,
  refreshToken,
  verifyToken,
};
