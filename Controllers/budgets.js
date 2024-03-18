const { STATUS_MESSAGES, STATUS_CODES } = require("../Config/constant");
const budgetModel = new (require("../Models/budgets"));

class budgetController {

    // Add budget
    async addBudget(req, res) {

        try {
            let data = await budgetModel.addBudget(req?.body);

            if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS?.ACCESS_TYPE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.ACCESS_TYPE?.ADDED)

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update budget
    async updateBudget(req, res) {

        let data = await budgetModel.updateBudget(req?.body);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.ACCESS_TYPE);
            return;
        }

        if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
            res.handler.validationError(undefined, STATUS_MESSAGES?.EXISTS?.ACCESS_TYPE);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.ACCESS_TYPE?.UPDATED)
    }

    // Delete budget
    async deleteBudget(req,res) {

        let data = await budgetModel.deleteBudget(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.ACCESS_TYPE);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.ACCESS_TYPE?.DELETED)
    }

    // Get budget
    async getBudgetById(req, res) {

        let data = await budgetModel.getBudgetById(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.ACCESS_TYPE);
            return;
        }

        res.handler.success(data)
    }

    // Get all list budget
    async getAllBudgetList(req, res) {

        let data = await budgetModel.getAllBudgetList(req?.body);

        res.handler.success(data);
    }
}

module.exports = budgetController;