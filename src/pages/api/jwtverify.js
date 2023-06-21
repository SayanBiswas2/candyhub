import jwt from "jsonwebtoken";

const handler = (req,res) => {
    if(req.cookies.jwttoken  !== undefined){
        let jwtSecretKey = process.env.JWT_KEY;
        const verified = jwt.verify(req.cookies.jwttoken, jwtSecretKey);
        if(verified){
            let j = jwt.decode(req.cookies.jwttoken)
            // console.log(typeof(j))
            return res.status(200).json(j.email);
        }else{
            // Access Denied
            return res.status(401).json('error');
        }
    }else{
        res.status(404).json('jwt not found')
    }
}

export default handler