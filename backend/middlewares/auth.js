import jwt from 'jsonwebtoken';

const verifyJWT = async (req,res,next)=>{
    try {

        const {token} = req.headers;

        if(!token){
            return res.json({success:false,message:'Authentication Error'})
        }

        const decodedData =  jwt.verify(token,process.env.JWT_SECRET)

        if(!decodedData){
            return res.json({success:false,message:'Authentication Error'})
        }

        const {id} = decodedData

        req.body.userId = id

        next()
        
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}

export default verifyJWT;