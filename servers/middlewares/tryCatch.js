export const tryCatch = (handlerFunction)=>{

    return async(req, res, next)=>{
        try {
            await handlerFunction(req, res, next)
        } catch (error) {
            console.error(error)
            res.status(500).json({
                message: error.message,
            })
        }
    }

}