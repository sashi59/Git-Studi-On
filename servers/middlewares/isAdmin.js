export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Unauthorized Access"
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}