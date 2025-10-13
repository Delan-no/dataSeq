





// Middleware for authorization
async function authorize(req, res, next) {
    try {
        const isAuthorized = await UserController.authorize(req.user, 'viewInterfaceAgent', Campaign);
        if (!isAuthorized) {
            throw new ConfigNotFoundException("Unauthorized access.", 403);
        }
        next();
    } catch (error) {
        next(error);
    }
}
