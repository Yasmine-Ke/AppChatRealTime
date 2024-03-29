// userRoutes.js
/*const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

router.get('/users', getUsers);

module.exports = router;*/
// userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');
const { createUser } = require('../controllers/userController');

const { SignInUser } = require('../controllers/userController');
const { signOut } = require('../controllers/userController');
const { DeleteUser } = require('../controllers/userController');
const { createMFAChallenge } = require('../controllers/userController');
const { verifyMFAChallenge } = require('../controllers/userController');
const { resetPassword } = require('../controllers/userController');
const { updatePassword } = require('../controllers/userController');

router.get('/users', getUsers);
router.post('/Create', createUser);
router.post('/Signin', SignInUser);
router.post('/Signout', signOut);
router.post('/Delete', DeleteUser);
router.post('/CreateMFA', createMFAChallenge);
router.post('/verifyMFA', verifyMFAChallenge);
router.post('/reset', updatePassword);
router.post('/update', resetPassword);

module.exports = router;
