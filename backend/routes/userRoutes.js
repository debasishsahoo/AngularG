const express = require('express');
const router = express.Router();
const UserCTRL = require('../controllers/userController');

router.post('/signup', UserCTRL.signup);
router.post('/signin', UserCTRL.signin);
router.get('/:id', UserCTRL.userDetails);

module.exports = router;