import rateLimit from "express-rate-limit"
import { success } from "zod"

export const apiLimiter = rateLimit({
    windowMs: 15*60*1000, //15 min
    max:100, //maximum limit

    message:{
        success:false,
        message: "Too many request, please try again later"
    },

    standardHeaders: true,
    legacyHeaders: false

})

export const loginLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 5,

    message:{
        success: false,
        message: "Too many login attempts. Try again later"
    }
})