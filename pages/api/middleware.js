
import jwt from "jsonwebtoken";
export default async function (req, res) {

    console.log("into middle")
    if (!req.headers.authorization) {
        res.status(401).send({ message: "Unauthorized" })
        return
    }

    else {
        const token = req.headers.authorization.split(' ')[1];
        // console.log("token ", token)
        const secretKey = process.env.SECRET_JWT
        // console.log("secre ", secretKey)
        try {
            const decodedToken = await jwt.verify(token, secretKey);
            req.user = decodedToken
            // console.log("dec ", decodedToken)
            console.log("exiting middle ware")
            return
            // const user = await decodedToken.user;
            // User is authenticated, proceed with the protected route logic
        } catch (error) {

            console.log("err ", error.message)
            // Invalid token, deny access and return error response
            res.status(401).send({ message: 'Invalid token' });
            return
        }
    }
}

