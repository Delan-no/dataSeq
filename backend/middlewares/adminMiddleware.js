const onlyAdminAccess = async (req, res, next) => {
    try {

        if (req.user.user_role != "Admin" || req.user.user_role != "admin") {
            return res.status(400).json({
                success: false,
                msg: 'Impossible d\'accéder a cette route !'
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Something went wrong!'
        })
    }

    return next()
}

module.exports = {
    onlyAdminAccess
}
