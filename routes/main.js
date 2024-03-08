const express = require("express")
const router = express.Router();

const verifyToken = require("../middleware/userToken")
const userController = require ("../controller/user")

router.route('/').get(verifyToken,userController.homePage);

router.get('/signup',userController.userSignup);
router.post('/signup',userController.userSignup);

router.get('/login',userController.userLogin);
router.post('/login',userController.userLogin);

router.get('/profile',userController.userProfile);

router.get('/logout',userController.userLogout);

router.route('/post').get(verifyToken,userController.addpost);
router.route('/post').post(verifyToken,userController.addpost);


router.route('/search').get(verifyToken,userController.searchBar);

module.exports = router;