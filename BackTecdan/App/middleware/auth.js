const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1].trim().replace(/"/g, '');
    //decoded the token
    const decodedToken = jwt.verify(token, process.env.CLE);
    const userId = decodedToken.id;
    const userName = decodedToken.nom;
    //save userId in req.auth var
    req.auth = {
      userId,
      userName,
    };
    next();
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized requestt!",
    });
  }
};
