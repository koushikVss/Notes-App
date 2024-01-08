
import jwt from "jsonwebtoken"
export default async function (req, res) {
    console.log("header ",req.headers.authorization)
    if (!req.headers.authorization) {
        res.status(401).json({ message: 'Unauthorized no token found', authorized: false, });
    }

    else {
        const token = req.headers.authorization.split(' ')[1];
        const secretKey = process.env.SECRET_JWT

        try {
            const decodedToken = await jwt.verify(token, secretKey);
            const user = decodedToken
            res.status(200).json({ message: 'success', authorized: true, user: user });

            // User is authenticated, proceed with the protected route logic
        } catch (error) {
            // Invalid token, deny access and return error response
            res.status(401).json({ message: 'Unauthorized', authorized: false });
        }
    }
}


