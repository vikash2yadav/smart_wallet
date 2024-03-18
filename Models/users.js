const { users: userSchema, user_tokens: userTokenSchema, otp_verifications: userOtpVerificationSchema } = require("../Database/Schema")
const { STATUS_CODES, STATUS_MESSAGES, STATUS, IMG_FOLDER_NAME } = require('../Config/constant');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const file_manager = new (require("../Utils/file_manager"))
const { unlinkRemoveFile } = require("../Utils/helpers");
const jwt = require('jsonwebtoken');
const { createHashPassword, generateOtp } = require('../Utils/helpers');
const mailer = new (require("../Utils/mailer"))();

class userModel {

    // Add User
    async addUser(bodyData) {

        // Check Exist Email Address
        let existEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email
            }
        });

        if (existEmail) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED,
                message: STATUS_MESSAGES?.EXISTS?.EMAIL_ALREADY_EXISTS
            }
        }

        // Check Exist Username 
        let existUserName = await userSchema.findOne({
            where: {
                username: bodyData?.username
            }
        });

        if (existUserName) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED,
                message: STATUS_MESSAGES?.EXISTS?.USERNAME
            }
        }

        // Check Password And Confirm Password 
        if (bodyData?.password !== bodyData?.confirm_password) {
            return {
                status: STATUS_CODES?.NOT_VALID_DATA,
                message: STATUS_MESSAGES?.PASSWORD?.NOT_SAME,
            };
        }

        // Hashing Password 
        bodyData.password = await bcrypt.hash(bodyData?.password, 10);

        // Profile Upload
        if (bodyData?.profile_image && typeof bodyData?.profile_image === "object") {
            let imageUrl = file_manager.createLiveImageURL(bodyData?.profile_image, IMG_FOLDER_NAME.USER_PROFILE, 'single');
            bodyData.profile_image = imageUrl;
        }

        // Cover Image Upload
        if (bodyData?.cover_image && typeof bodyData?.cover_image === "object") {
            let coverUrl = file_manager.createLiveImageURL(bodyData?.cover_image, IMG_FOLDER_NAME.COVER_PROFILE, 'single');
            bodyData.cover_image = coverUrl;
        }

        // Create User
        return await userSchema.create(bodyData);
    }

    // Update User
    async updateUser(bodyData) {

        // Check User Is Exist Or Not
        let checkUser = await userSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS?.NOTDELETED
            }
        });

        if (!checkUser) {
            return {
                status: STATUS_CODES?.NOT_FOUND
            }
        }

        // Check Username Or Email
        let ExistUser = await userSchema.findOne({
            where: {
                id: { [Op.ne]: bodyData?.id },
                [SEQUELIZE.Op.or]: [
                    { email: bodyData?.email },
                    { username: bodyData?.username }
                ]
            }
        });

        if (ExistUser) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // Unlink and upload new profile image
        if (bodyData?.profile_image && typeof bodyData?.profile_image === "object") {
            if (checkUser?.profile_image !== null) {
                unlinkRemoveFile(IMG_FOLDER_NAME?.USER_PROFILE, checkUser?.profile_image)
            }
            let imageUrl = file_manager.createLiveImageURL(bodyData?.profile_image, IMG_FOLDER_NAME?.USER_PROFILE, 'single');
            bodyData.profile_image = imageUrl;
        }

        // Unlink and upload new cover profile img
        if (bodyData?.cover_image && typeof bodyData?.cover_image === "object") {
            if (checkUser?.cover_image !== null) {
                unlinkRemoveFile(IMG_FOLDER_NAME?.COVER_PROFILE, checkUser?.cover_image)
            }
            let logoUrl = file_manager.createLiveImageURL(bodyData?.cover_image, IMG_FOLDER_NAME?.COVER_PROFILE, 'single');
            bodyData.cover_image = logoUrl;
        }

        // Update User  
        let updatedUserData = await userSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

        // Return Updated User
        if (updatedUserData) {
            return await this.getUserById(bodyData?.id);
        }

    }

    // Delete User
    async deleteUser(id) {

        // Check Exist User Is Or Not
        let data = await userSchema.findOne({
            where: {
                id,
                is_delete: STATUS?.NOTDELETED
            }
        })

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.USER
            }
        }

        // Delete User
        return await userSchema.update({ is_delete: STATUS?.DELETED },
            {
                where: {
                    id
                }
            }
        )
    }

    // Get User By Id
    async getUserById(id) {

        // Check Exist User Is Or Not
        let data = await userSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS?.NOTDELETED
            }
        })

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.USER
            }
        }

        // Return User Data
        return data;
    }

    // Get All User List
    async getAllUserList(bodyData) {

        return await userSchema.findAndCountAll({
            where: {
                is_delete: STATUS?.NOTDELETED
            }
        })

    }

    // Get All Active User List
    async getAllActiveUserList() {

        return await userSchema.findAndCountAll({
            where: {
                [SEQUELIZE.Op.or]: [
                    { status: STATUS?.ACTIVE },
                    { is_delete: STATUS?.NOTDELETED }
                ]
            }
        })
    }

    // Get All Deleted User List
    async getAllDeletedUserList() {

        return await userSchema.findAndCountAll({
            where: {
                is_delete: STATUS?.DELETED
            }
        })
    }

    // User Sign Up
    async userSignUp(bodyData) {

        // Check Email is registere?
        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email,
            },
        });

        if (checkEmail) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED,
                message: STATUS_MESSAGES.EXISTS.EMAIL,
            };
        }

        // // Check username is registered?
        // let checkUsername = await userSchema.findOne({
        //     where: {
        //         username: bodyData?.username,
        //     },
        // });

        // if (checkUsername) {
        //     return {
        //         status: STATUS_CODES.ALREADY_REPORTED,
        //         message: STATUS_MESSAGES.EXISTS.USERNAME,
        //     };
        // }

        // Hashing password
        bodyData.password = await bcrypt.hash(bodyData?.password, 10);

        // Sign up user
        return await userSchema.create(bodyData);
    }

    // User Sign In
    async userSignIn(bodyData) {

        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                is_delete: STATUS.NOTDELETED
            },
        });

        if (!checkEmail) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.EMAIL,
            };
        }

        let checkStatus = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                status: STATUS.ACTIVE
            }
        })

        if (!checkStatus) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.USER.INACTIVE
            };
        }

        // let checkUsername = await userSchema.findOne({
        //     where: {
        //         username: bodyData?.username,
        //         status: STATUS.ACTIVE,
        //         is_delete: STATUS.NOTDELETED
        //     },
        // });

        // if (!checkUsername) {
        //     return {
        //         status: STATUS_CODES.NOT_FOUND,
        //         message: STATUS_MESSAGES.NOT_FOUND.USERNAME,
        //     };
        // }

        let match_password = await bcrypt.compare(
            bodyData?.password,
            checkEmail?.password
        );

        if (!match_password) {
            return {
                status: STATUS_CODES.NOT_VALID_DATA,
                message: STATUS_MESSAGES.PASSWORD.INCORRECT,
            };
        }

        // Generate Token
        let accessToken = jwt.sign({ email: checkEmail?.email }, process.env.SECRET_KEY);

        // Store Token In Token Table
        await userTokenSchema.create({
            access_token: accessToken,
            user_id: checkEmail?.id,
        });

        return true;
    }

    //Forgot Password
    async forgotPassword(bodyData) {

        let checkEmail = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                is_delete: STATUS.NOTDELETED
            }
        })

        let checkStatus = await userSchema.findOne({
            where: {
                email: bodyData?.email,
                status: STATUS.ACTIVE
            }
        })

        if (!checkStatus) {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.USER.INACTIVE
            };
        }

        if (checkEmail) {

            var id = checkEmail?.id;

            var otp = await generateOtp();
            var hashedOtp = await bcrypt.hash(otp, 10);

            const emailOtp = {
                email: bodyData?.email,
                otp: otp
            }

            await mailer.forgotPasswordEmail(emailOtp);

            var date = new Date();
            date.setMinutes(date.getMinutes() + 2);

            let registerData = {
                otp: hashedOtp,
                user_id: id,
                expired_at: date
            }

            return await userOtpVerificationSchema.create(registerData);
        }
        else {
            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.EMAIL
            };
        }
    }

    // OTP Verification
    async otpVerification(bodyData) {

        var otp = bodyData?.otp;
        var date = new Date();

        let getOtp = await userOtpVerificationSchema.findAll({
            order: [['createdAt', 'DESC']],
        })

        let transformedArray = [];
        for (const item of getOtp) {
            let compareOTP = await bcrypt.compare(otp, item?.otp);
            if (compareOTP === true) {
                transformedArray.push(item);
                break;
            }
            else {
                return {
                    status: STATUS_CODES.NOT_FOUND
                };
            }
        }
        let oldOtp = transformedArray[0]?.otp;

        var olddate = transformedArray[0]?.expired_at;

        if (date > olddate) {

            await userOtpVerificationSchema.destroy({
                where: {
                    otp: oldOtp
                }
            });

            return {
                status: STATUS_CODES.NOT_ACCEPTABLE
            }
        }

        await userOtpVerificationSchema.destroy({
            where: {
                otp: oldOtp
            }
        });

        return {
            user_id: transformedArray[0]?.user_id
        }
    }

    // Reset User Password Using OTP
    async resetPasswordUsingOtp(bodyData, id) {

        var newPassword = bodyData?.new_password;
        var confirmPassword = bodyData?.confirm_password;

        if (newPassword === confirmPassword) {

            let checkId = await userSchema.findOne({
                where: {
                    id: id,
                    is_delete: STATUS.NOTDELETED
                }
            })

            let checkStatus = await userSchema.findOne({
                where: {
                    email: checkId?.email,
                    status: STATUS.ACTIVE
                }
            })

            if (!checkStatus) {
                return {
                    status: STATUS_CODES.NOT_FOUND,
                    message: STATUS_MESSAGES.USER.INACTIVE
                };
            }

            if (checkId) {
                let hashPassword = await createHashPassword(newPassword);
                let registerData = {
                    password: hashPassword
                }

                await userSchema.update(registerData, {
                    where: {
                        id: id
                    }
                });

                return {
                    status: STATUS_CODES.SUCCESS
                }
            }

            return {
                status: STATUS_CODES.NOT_FOUND,
                message: STATUS_MESSAGES.NOT_FOUND.ACCOUNT
            }
        }
        else {
            return {
                status: STATUS_CODES.VALIDATION_ERROR
            };
        }
    }

    // User Sign Out
    async userSignOut(userInfo, header) {

        if (userInfo !== null) {
            let user = await userSchema.findOne({
                where: {
                    id: userInfo?.id
                },
            });

            if (!user) {
                return { status: STATUS_CODES.NOT_FOUND };
            }

            return await userTokenSchema.destroy({
                where: {
                    access_token: header?.authorization,
                },
            });
        } else {
            return true;
        }
    }
}

module.exports = userModel