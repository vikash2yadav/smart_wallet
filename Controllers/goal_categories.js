const { STATUS_MESSAGES, STATUS_CODES } = require("../Config/constant");
const goalCategoryModel = new (require("../Models/goal_categories"));

class goalCategoryController {

    // Add goal Category
    async addGoalCategory(req, res) {

        try {
            let data = await goalCategoryModel.addGoalCategory(req?.body);

            if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS?.GOAL_CATEGORY);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.GOAL_CATEGORY?.ADDED)

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update goal Category
    async updateGoalCategory(req, res) {

        let data = await goalCategoryModel.updateGoalCategory(req?.body);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL_CATEGORY);
            return;
        }

        if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
            res.handler.validationError(undefined, STATUS_MESSAGES?.EXISTS?.GOAL_CATEGORY);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.GOAL_CATEGORY?.UPDATED)
    }

    // Delete goal Category
    async deleteGoalCategory(req,res) {

        let data = await goalCategoryModel.deleteGoalCategory(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL_CATEGORY);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.GOAL_CATEGORY?.DELETED)
    }

    // Get goal Category
    async getGoalCategoryById(req, res) {

        let data = await goalCategoryModel.getGoalCategoryById(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL_CATEGORY);
            return;
        }

        res.handler.success(data)
    }

    // Get all list goal Category
    async getAllGoalCategoryList(req, res) {

        let data = await goalCategoryModel.getAllGoalCategoryList(req?.body);

        res.handler.success(data);
    }
}

module.exports = goalCategoryController;