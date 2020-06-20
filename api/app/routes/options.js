// import the express router
const router = require('express').Router();
// import the option controller
const optionCtrl = require('../controllers/options');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /options?decisionId=___
router.get('/', optionCtrl.getDecisionOptions);
// GET /options/:id
router.get('/:id', optionCtrl.getOneById);
// POST /options
router.post('/', protectedRoute, optionCtrl.createOption);
// PUT /options/:id
router.put('/:id', protectedRoute, optionCtrl.updateOption);
// DELETE /options/:id
router.delete('/:id', protectedRoute, optionCtrl.removeOption);
// export the route from this file
module.exports = router;
