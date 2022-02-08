import express, { Request, Response} from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/api/users/signup", [
    body('email')
        .isEmail()
        .withMessage("Invalid Email"),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error.array());
    }

    console.log("creating user...");
    res.send("Hi there!");
});

export { router as signupRouter };
