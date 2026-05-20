import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 100 requests
  message: "Too many requests, please try again later",
});

export default limiter;
