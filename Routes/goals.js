const router = require('express').Router();
const goalController = new(require('../Controllers/goals'));

// Add goal
router.route('/add').post(goalController.addGoal);

// Update goal
router.route('/update').put(goalController.updateGoal);

// Delete goal
router.route('/delete/:id').delete(goalController.deleteGoal);

// Get goal by id
router.route('/:id').get(goalController.getGoalById);

// Get all list goal
router.route('/list').post(goalController.getAllGoalList);

module.exports = router;