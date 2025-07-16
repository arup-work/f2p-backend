import AuthService from "../services/auth.service";

export default class AuthController{
    static async register(req, res, next){
        try {
            const {name, email, password} = req.body;
            const register = await AuthService.register(name, email, password);
        } catch (error) {
            
        }
    }
}