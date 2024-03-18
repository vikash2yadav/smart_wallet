const { STATUS_MESSAGES } = require('../Config/constant');
const userController = new (require('../Controllers/users'));
const router = require('express').Router();
const { body } = require('express-validator');
const validate = (require('../Middleware/validator'))?.validate;
const file_manager = new (require("../Utils/file_manager"));

// Add User 
router.route('/add').post(file_manager.userUploadImage().fields([{ name: 'profile_image'},{ name: 'cover_image'}]),
    validate([body('email').isEmail().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.INVALID_EMAIL),
    body('email').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.EMAIL),
    body('first_name').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.FIRST_NAME),
    body('last_name').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.LAST_NAME),
    body('password').isLength({ min: 6 }).withMessage(STATUS_MESSAGES?.VALIDATION?.LENGTH?.PASSWORD),
    body('gender').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.GENDER),
    body('birth_date').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.BIRTH_DATE),
    body('username').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.USERNAME),
    body('phone').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.CONTACT),
    ]),
    userController.addUser);

// Update User
router.route('/update').put(
    file_manager.userUploadImage().fields([{ name: 'profile_image'},{ name: 'cover_image'}]),
    validate([body('email').isEmail().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.INVALID_EMAIL),
    body('email').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.EMAIL),
    body('id').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.ID),
    body('first_name').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.FIRST_NAME),
    body('last_name').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.LAST_NAME),
    body('gender').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.GENDER),
    body('birth_date').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.BIRTH_DATE),
    body('username').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.USERNAME),
    body('phone').notEmpty().withMessage(STATUS_MESSAGES?.VALIDATION?.REQUIRED?.CONTACT),
    ]),
    userController.updateUser);

// Delete User
router.route('/delete/:id').delete(userController.deleteUser);

// Get User By Id
router.route('/:id').get(userController.getUserById);

// Get User List
router.route('/list').post(userController.getAllUserList);

// Get Active User List
router.route('/active/list').get(userController.getAllActiveUserList);

// Get All Deleted User List
router.route('/delete/list').get(userController.getAllDeletedUserList);

// Sign Up
router.route('/sign_up').post(validate([body('first_name').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.FIRST_NAME),
body('last_name').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.LAST_NAME),
body('email').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
body('email').isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
body('password').isLength({ min: 6 }).withMessage(STATUS_MESSAGES.VALIDATION.LENGTH.PASSWORD),
body('confirm_password').isLength({ min: 6 }).withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), userController.userSignUp);

// Sign In
router.route('/sign_in').post(validate([
body('email').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
body('email').isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL),
body('password').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.PASSWORD),
]), userController.userSignIn);

// Forgor Password
router.route('/forgot_password').post(validate([
    body('email').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.EMAIL),
    body('email').isEmail().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.INVALID_EMAIL)
]), userController.forgotPassword)

// Otp Verification
router.route('/otp_verification').post(validate([
    body('otp').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.OTP),
]),userController.otpVerification);

// Reset Password Using OTP
router.route('/reset_password/:id').put(validate([
    body('new_password').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.NEW_PASSWORD),
    body('new_password').isLength({min: 6}).withMessage(STATUS_MESSAGES.VALIDATION.LENGTH.PASSWORD),
    body('confirm_password').notEmpty().withMessage(STATUS_MESSAGES.VALIDATION.REQUIRED.CONFIRM_PASSWORD),
]), userController.resetPasswordUsingOtp);

// User Sign Out
router.route('/sign_out').post(userController.userSignOut);

module.exports = router