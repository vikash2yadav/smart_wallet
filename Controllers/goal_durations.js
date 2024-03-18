const { STATUS_MESSAGES, STATUS_CODES } = require("../Config/constant");
const goalDurationModel = new (require("../Models/goal_durations"));

class goalDurationController {

    // Add goal duration
    async addGoalDuration(req, res) {

        try {
            let data = await goalDurationModel.addGoalDuration(req?.body);

            if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS?.GOAL_DURATION);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.GOAL_DURATION?.ADDED)

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update goal duration
    async updateGoalDuration(req, res) {

        let data = await goalDurationModel.updateGoalDuration(req?.body);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL_DURATION);
            return;
        }

        if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
            res.handler.validationError(undefined, STATUS_MESSAGES?.EXISTS?.GOAL_DURATION);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.GOAL_DURATION?.UPDATED)
    }

    // Delete goal duration
    async deleteGoalDuration(req,res) {

        let data = await goalDurationModel.deleteGoalDuration(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL_DURATION);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.GOAL_DURATION?.DELETED)
    }

    // Get goal duration
    async getGoalDurationById(req, res) {

        let data = await goalDurationModel.getGoalDurationById(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.GOAL_DURATION);
            return;
        }

        res.handler.success(data)
    }

    // Get all list goal duration
    async getAllGoalDurationList(req, res) {

        let data = await goalDurationModel.getAllGoalDurationList(req?.body);

        res.handler.success(data);
    }
}

module.exports = goalDurationController;