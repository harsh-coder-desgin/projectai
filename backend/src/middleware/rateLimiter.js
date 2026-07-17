const requestMap = new Map();

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  const WINDOW_TIME = 60 * 1000;
  const MAX_REQUESTS = 5;

  if (!requestMap.has(ip)) {
    requestMap.set(ip, {
      count: 1,
      startTime: currentTime,
    });

    return next();
  }

  const user = requestMap.get(ip);

  if (currentTime - user.startTime > WINDOW_TIME) {
    user.count = 1;
    user.startTime = currentTime;
    return next();
  }

  if (user.count >= MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
  }

  user.count++;

  next();
};

export default rateLimiter;