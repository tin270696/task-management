const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");

const generateHelper = require("../../helpers/generate.helper");
const sendEmailHelper = require("../../helpers/sendEmail.helper");
const { default: mongoose } = require("mongoose");

// [POST] /api/v1/users/register/
module.exports.register = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(existEmail){
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        })
        return;
    };

    const dataUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        token: generateHelper.generateRandomString(30)
    };

    const user = new User(dataUser);
    await user.save();

    const token = user.token;

    res.json({
        code: 200,
        message: "Đăng ký tài khoản thành công!",
        token: token
    });
};

// [POST] /api/v1/users/login/
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const existUser = await User.findOne({
        email: email,
        deleted: false
    });

    if(!existUser){
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    }

    if(md5(password) != existUser.password){
        res.json({
            code: 400,
            message: "Mật khẩu không chính xác!"
        });
        return;
    }

    const token = existUser.token;

    res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token: token
    });
}

// [POST] /api/v1/users/forgot-password/
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;

    const existUser = await User.findOne({
        email: email,
        deleted: false
    });

    if(!existUser) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        })
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    // Việc 1: Lưu email, OTP vào database
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expiredAt: Date.now() + 60*3*1000
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    forgotPassword.save();

    // Việc 2: Gửi mã OTP qua email cho người dùng
    const subject = "Lấy lại mật khẩu.";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. Mã OTP có hiệu lực trong vòng 3 phút. Vui lòng không chia sẻ mã OTP này với bất kỳ ai.`;
    sendEmailHelper.sendEmail(email, subject, text);

    res.json({
        code: 200,
        message: "Đã gửi OTP qua email!"
    });
}