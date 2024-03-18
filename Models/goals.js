const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const { goals: goalSchema } = require("../Database/Schema");

class goalModel {

    // Add goal
    async addGoal(bodyData) {

        let data = await goalSchema.findOne({
            where: {
                type: bodyData?.name
            }
        })

        if (data) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // Create goal
        return await goalSchema.create(bodyData);
    }

    // Update goal
    async updateGoal(bodyData) {

        // Check Exist goal Is Or Not
        let data = await goalSchema.findOne({
            where: {
                id: bodyData?.id
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL,
            };
        }

        // Update goal
        return await goalSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            },
        });
    }

    // Delete goal
    async deleteGoal(id) {

        // Check Exist goal Is Or Not
        let data = await goalSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL,
            };
        }

        // Delete goal
        return await goalSchema.destroy({
            where: {
                id,
            },
        });
    }

    // Get goal By Id
    async getGoalById(id) {

        // Check Exist goal Is Or Not
        let data = await goalSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL,
            };
        }

        // Return goal Data
        return data;
    }

    // Get All goal List
    async getAllGoalList(bodyData) {
        return await goalSchema.findAndCountAll();
    }
}

module.exports = goalModel;
