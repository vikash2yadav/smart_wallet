const { STATUS_MESSAGES, STATUS_CODES } = require("../Config/constant");
const accessTypeModel = new (require("../Models/access_types"));

class accessTypeController {

    // Add acccess type
    async addAccessType(req, res) {

        try {
            let data = await accessTypeModel.addAccessType(req?.body);

            if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS?.ACCESS_TYPE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.ACCESS_TYPE?.ADDED)

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update acccess type
    async updateAccessType(req, res) {

        let data = await accessTypeModel.updateAccessType(req?.body);

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

    // Delete acccess type
    async deleteAccessType(req,res) {

        let data = await accessTypeModel.deleteAccessType(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.ACCESS_TYPE);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.ACCESS_TYPE?.DELETED)
    }

    // Get acccess type
    async getAccessTypeById(req, res) {

        let data = await accessTypeModel.getAccessTypeById(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.ACCESS_TYPE);
            return;
        }

        res.handler.success(data)
    }

    // Get all list acccess type
    async getAllAccessTypeList(req, res) {

        let data = await accessTypeModel.getAllAccessTypeList(req?.body);

        res.handler.success(data);
    }
}

module.exports = accessTypeController;