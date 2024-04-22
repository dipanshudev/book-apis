import jwt from 'jsonwebtoken';

// Secret key 
const secretKey = 'xyzablsjkldsfkl';

// generate jwt token 
export function generateJwtToken(data?: any): string {
  // Define token options, including the expiration time (24 hours)
  const options: jwt.SignOptions = {
    expiresIn: '24h',
  };

  // Sign the token with the data and secret key
  const token = jwt.sign(data, secretKey, options);

  return token;
}

// validate token
export function validateJwtToken(token: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return false;
    }
}