const { validationResult } = require("express-validator");

const createTodo = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(500).json({
            success: false, message: "Invalid data", errors: errors.array()
        })

        return res.status(200).json({ success: true, message: 'success', data: null })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null })
    }
}

module.exports = {
    createTodo
}