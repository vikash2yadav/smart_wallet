const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const { account_types: accessTypeSchema } = require("../Database/Schema");

class accessTypeModel {

    // Add User
    async addAccessType(bodyData) {

        let data = await accessTypeSchema.findOne({
            where: {
                type: bodyData?.type
            }
        })

        if (data) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // Create access type
        return await accessTypeSchema.create(bodyData);
    }

    // Update User
    async updateAccessType(bodyData) {

        // Check Exist Access Type Is Or Not
        let data = await accessTypeSchema.findOne({
            where: {
                id: bodyData?.id
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.ACCESS_TYPE,
            };
        }

        // Update Access Type
        return await accessTypeSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            },
        });
    }

    // Delete User
    async deleteAccessType(id) {

        // Check Exist Access Type Is Or Not
        let data = await accessTypeSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.ACCESS_TYPE,
            };
        }

        // Delete Access Type
        return await accessTypeSchema.destroy({
            where: {
                id,
            },
        });
    }

    // Get Access Type By Id
    async getAccessTypeById(id) {

        // Check Exist Access Type Is Or Not
        let data = await accessTypeSchema.findOne({
            where: {
                id,
            },
        });

        if (!data) {
            return {
                status: STATUS_CODES?.NOT_FOUND,
                message: STATUS_MESSAGES?.ACCESS_TYPE,
            };
        }

        // Return Access Type Data
        return data;
    }

    // Get All Access Type List
    async getAllAccessTypeList(bodyData) {
        return await accessTypeSchema.findAndCountAll();
    }
}

module.exports = accessTypeModel;
