const { STATUS_MESSAGES, STATUS_CODES } = require("../Config/constant");
const goalModel = new (require("../Models/goals"));

class goalController {

    // Add goal
    async addGoal(req, res) {

        try {
            let data = await goalModel.addGoal(req?.body);

            if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS?.GOAL);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.GOAL?.ADDED)

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update goal
    async updateGoal(req, res) {

        let data = await goalModel.updateGoal(req?.body);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL);
            return;
        }

        if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
            res.handler.validationError(undefined, STATUS_MESSAGES?.EXISTS?.GOAL);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.GOAL?.UPDATED)
    }

    // Delete goal
    async deleteGoal(req,res) {

        let data = await goalModel.deleteGoal(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.GOAL?.DELETED)
    }

    // Get goal
    async getGoalById(req, res) {

        let data = await goalModel.getGoalById(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL);
            return;
        }

        res.handler.success(data)
    }

    // Get all list goal
    async getAllGoalList(req, res) {

        let data = await goalModel.getAllGoalList(req?.body);

        res.handler.success(data);
    }
}

module.exports = goalController;