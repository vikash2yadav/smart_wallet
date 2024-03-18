const router = require('express').Router();
const goalDurationController = new(require('../Controllers/goal_durations'));

// Add goal duration
router.route('/add').post(goalDurationController.addGoalDuration);

// Update goal duration
router.route('/update').put(goalDurationController.updateGoalDuration);

// Delete goal duration
router.route('/delete/:id').delete(goalDurationController.deleteGoalDuration);

// Get goal duration by id 
router.route('/:id').get(goalDurationController.getGoalDurationById);

// Get all list goal duration
router.route('/list').post(goalDurationController.getAllGoalDurationList);

module.exports = router;