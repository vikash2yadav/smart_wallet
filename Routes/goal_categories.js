const router = require('express').Router();
const goalCategoryController = new(require('../Controllers/goal_categories'));

// Add goal Category
router.route('/add').post(goalCategoryController.addGoalCategory);

// Update goal Category
router.route('/update').put(goalCategoryController.updateGoalCategory);

// Delete goal Category
router.route('/delete/:id').delete(goalCategoryController.deleteGoalCategory);

// Get goal Category by id 
router.route('/:id').get(goalCategoryController.getGoalCategoryById);

// Get all list goal Category
router.route('/list').post(goalCategoryController.getAllGoalCategoryList);

module.exports = router;