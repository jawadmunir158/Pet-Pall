import jwt from 'jsonwebtoken';

const authenticateDoctor = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // Verify the token
    req.doctor = decoded;  // Attach the decoded token to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export default authenticateDoctor;
