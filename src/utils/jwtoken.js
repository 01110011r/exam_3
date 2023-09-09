import Jwt from "jsonwebtoken";

export const jwtHelper={
    sign:(payload, secretkey, option={})=>{
        try {
            return Jwt.sign(payload, secretkey, option);
        } catch (error) {
            console.log('jwt helper--> '+error.message);
        }
    },
    verify:(token, secretkey)=>{
        try {
            return Jwt.verify(token, secretkey);
        } catch (error) {
            console.log('jwt helper--> '+error.message);
        }
    }
}