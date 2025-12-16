import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // ✅ If Redis / Upstash is not configured, SKIP rate limiting
    if (!ratelimit) {
      return next();
    }

    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error.message);
    // ✅ Do NOT crash server because of rate limit
    next();
  }
};

export default rateLimiter;
