import { serialize } from "cookie"

const handler = (req, res) => {
    if(req.method == "POST"){
        const serialized = serialize('jwttoken', "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
        })
        res.setHeader('Set-Cookie',serialized)
        res.status(200)
        res.json('done')
    }
}

export default handler