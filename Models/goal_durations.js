const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const { goal_durations: goalDurationSchema } = require("../Database/Schema");

class goalDurationModel {

    // Add goal duration
    async addGoalDuration(bodyData) {

        let data = await goalDurationSchema.findOne({
            where: {
                type: bodyData?.name
            }
        })

        if (data) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // Create duration
        return await goalDurationSchema.create(bodyData);
    }

    // Update goal duration
    async updateGoalDuration(bodyData) {

        // Check Exist goal duration Is Or Not
        let data = await goalDurationSchema.findOne({
            where: {
                id: bodyData?.id
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL_DURATION,
            };
        }

        // Update goal duration
        return await goalDurationSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            },
        });
    }

    // Delete goal duration
    async deleteGoalDuration(id) {

        // Check Exist goal duration Is Or Not
        let data = await goalDurationSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL_DURATION,
            };
        }

        // Delete goal duration
        return await goalDurationSchema.destroy({
            where: {
                id,
            },
        });
    }

    // Get goal duration By Id 
    async getGoalDurationById(id) {

        let data = await goalDurationSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL_DURATION,
            };
        }

        return data;
    }

    // Get All goal duration List
    async getAllGoalDurationList(bodyData) {
        return await goalDurationSchema.findAndCountAll();
    }
}

module.exports = goalDurationModel;
