// import the express router
const router = require('express').Router();
// load the controller
const optionCtrl = require('../controllers/options');
const validationCtrl = require('../controllers/validation');
// GET /admin/options/new - loads the form to create a new option
router.get('/new', optionCtrl.renderOptionForm);
// POST /admin/options/new - validate the data an then save it
router.post('/new', [
  validationCtrl.validate('createOption'),
  optionCtrl.renderOptionFormWithErrors,
  optionCtrl.saveOption,
]);
// GET /admin/options/edit/:id - loads the edit form
router.get('/edit/:id', optionCtrl.renderEditForm);
// POST /admin/options/edit/:id - validate the data and then save it
router.post('/edit/:id', [
  validationCtrl.validate('editOption'),
  optionCtrl.renderOptionFormWithErrors,
  optionCtrl.saveOption,
]);
// GET /admin/options/delete/:id - deletes a option
router.get('/delete/:id', [
  validationCtrl.validate('deleteOption'),
  optionCtrl.goBackOnError,
  optionCtrl.deleteOption,
]);
// export the route from this file
module.exports = router;
