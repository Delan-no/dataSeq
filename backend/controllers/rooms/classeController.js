const classeService = require("../../services/roomes/roomeService");

const {responseSuccess, responseError, responseBadReq} = require("../../core/utils/httpResponses");

const createClasse = async (req, res) =>{
    try {
        const classe = await classeService.createClass(req.body);
        res.status(201).json({
            success: true,
            data: classe,
        });
    }catch (error) {
      return responseBadReq(res, 400, error.message);
    }
};

const getAllClasses = async (req, res) => {
    try {
        const classes = await classeService.getAllRooms();
      return responseSuccess(res, classes);
    }catch (error) {
        return responseError(res, 500, error.message);
    }
};

const getAllRoomActive = async (req, res) =>{
    try {
        const classes = await classeService.getAllRoomsActive();
       return responseSuccess(res, classes);
    }catch (error) {
        return responseError(res, 500, error.message);
    }
};

const deleteClasseById = async (req, res) => {
    try{
        const classe = await classeService.deleteClasseById(req.params._id)
    return responseSuccess(res, classe);
    }catch (error) {
      return responseError(res, 500, error.message);
    }
};

const updateClasseById = async (req, res) => {
    try {
        const classe = await classeService.updateClasseById(req.params._id, req.body);
        responseSuccess(res, classe);
    } catch (error) {
        responseError(res, 500, error.message);
    }
}
module.exports= {
    createClasse,
    getAllClasses,
    getAllRoomActive,
    deleteClasseById,
    updateClasseById
}