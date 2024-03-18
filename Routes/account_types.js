const router = require('express').Router();
const accessTypeController = new(require('../Controllers/access_types'));

// Add access type
router.route('/add').post(accessTypeController.addAccessType);

// Update access type
router.route('/update').put(accessTypeController.updateAccessType);

// Delete access type
router.route('/delete/:id').delete(accessTypeController.deleteAccessType);

// Get access type by id
router.route('/:id').get(accessTypeController.getAccessTypeById);

// Get all list access type
router.route('/list').post(accessTypeController.getAllAccessTypeList);

module.exports = router;