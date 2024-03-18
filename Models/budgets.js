const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const { budgets: budgetSchema } = require("../Database/Schema");

class budgetModel {

    // Add budget
    async addBudget(bodyData) {

        let data = await budgetSchema.findOne({
            where: {
                type: bodyData?.name
            }
        })

        if (data) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // Create
        return await budgetSchema.create(bodyData);
    }

    // Update budget
    async updateBudget(bodyData) {

        // Check Exist Is Or Not
        let data = await budgetSchema.findOne({
            where: {
                id: bodyData?.id
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.BUDGET,
            };
        }

        // Update Access Type
        return await budgetSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            },
        });
    }

    // Delete budget
    async deleteBudget(id) {

        // Check Exist Access Type Is Or Not
        let data = await budgetSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.BUDGET,
            };
        }

        // Delete Access Type
        return await budgetSchema.destroy({
            where: {
                id,
            },
        });
    }

    // Get budget By Id
    async getBudgetById(id) {

        // Check Exist Is Or Not
        let data = await budgetSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.NOT_FOUND?.BUDGET,
            };
        }

        // Return Data
        return data;
    }

    // Get All budget List
    async getAllBudgetList(bodyData) {
        return await budgetSchema.findAndCountAll();
    }
}

module.exports = budgetModel;
