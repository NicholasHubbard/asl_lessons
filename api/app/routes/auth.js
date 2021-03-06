// import the express router
const router = require('express').Router();
// import the auth controller
const authCtrl = require('../controllers/auth');
// POST /auth/slack - receives a code and will exchange it for an access_token
router.post('/slack', authCtrl.exchangeCode);
// export the route from this file
module.exports = router;
