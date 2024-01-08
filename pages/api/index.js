import middleware from "./middleware"
export default async function (req, res,next) {
    await middleware(req, res, next)
    res.status(200).send({ randonNumber: 7 })
}

