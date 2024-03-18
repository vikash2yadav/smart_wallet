const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const { goal_categories: goalCategorySchema } = require("../Database/Schema");

class goalModel {

    // Add goal category
    async addGoalCategory(bodyData) {

        let data = await goalCategorySchema.findOne({
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
        return await goalCategorySchema.create(bodyData);
    }

    // Update goal category
    async updateGoalCategory(bodyData) {

        // Check Exist goal category Is Or Not
        let data = await goalCategorySchema.findOne({
            where: {
                id: bodyData?.id
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL_CATEGORY,
            };
        }

        // Update goal
        return await goalCategorySchema.update(bodyData, {
            where: {
                id: bodyData?.id
            },
        });
    }

    // Delete goal category
    async deleteGoalCategory(id) {

        // Check Exist goal category Is Or Not
        let data = await goalCategorySchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL_CATEGORY,
            };
        }

        // Delete goal
        return await goalCategorySchema.destroy({
            where: {
                id,
            },
        });
    }

    // Get goal category By Id 
    async getGoalCategoryById(id) {

        let data = await goalCategorySchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.GOAL_CATEGORY,
            };
        }

        return data;
    }

    // Get All goal category List
    async getAllGoalCategoryList(bodyData) {
        return await goalCategorySchema.findAndCountAll();
    }
}

module.exports = goalModel;
