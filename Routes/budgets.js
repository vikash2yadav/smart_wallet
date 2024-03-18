const router = require('express').Router();
const budgetController = new(require('../Controllers/budgets'));

// Add budget
router.route('/add').post(budgetController.addBudget);

// Update budget
router.route('/update').put(budgetController.updateBudget);

// Delete budget
router.route('/delete/:id').delete(budgetController.deleteBudget);

// Get budget by id
router.route('/:id').get(budgetController.getBudgetById);

// Get all list budget
router.route('/list').post(budgetController.getAllBudgetList);

module.exports = router;