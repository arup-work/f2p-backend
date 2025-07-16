import AuthService from "../services/auth.service.js";

export default class AuthController {
    static async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const registerDetails = await AuthService.register(name, email, password);
            return res.status(200).json({
                message: "Congratulations your Registration is successful",
                user: registerDetails.user
            })
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: err.message });

        }
    }
}