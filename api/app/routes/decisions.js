// import the express router
const router = require('express').Router();
// import the decision controller
const decisionCtrl = require('../controllers/decisions');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// GET /decisions route
router.get('/', protectedRoute, decisionCtrl.getAll);

// GET /decisions/public
router.get('/public', decisionCtrl.getPublic);

// GET /decisions/:id
router.get('/:id', decisionCtrl.getOneById);

// POST /decisions
router.post('/', protectedRoute, decisionCtrl.createDecision);

// PUT /decisions/:id
router.put('/:id', protectedRoute, decisionCtrl.updateDecision);

// DELETE /decisions/:id
router.delete('/:id', protectedRoute, decisionCtrl.removeDecision);

// export the route from this file
module.exports = router;
