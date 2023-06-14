import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    console.log("req: ", req.headers);
    let token = req.header("Authorization");
    console.log(token);

    if (!token) return res.status(403).send("Access Denied");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log("verified: ", verified);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
