const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log("user",user);
    
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user_id = user.id;
    next();
  });
};

module.exports = auth;
