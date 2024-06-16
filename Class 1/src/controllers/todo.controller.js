// const { validationResult } = require("express-validator");
const { createTodoCategory, getTodoCategoryByID } = require("../services/todo.service")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/responsehandler.util")

const createTodo = async (req, res) => {
    try {
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) return res.status(500).json({
        //     success: false, message: "Invalid data", errors: errors.array()
        // })

        // return res.status(200).json({ success: true, message: 'success', data: null })

        const { name, uid } = req.body

        const createTodoResponse = await createTodoCategory({ name, uid })
        return sendSuccessResponse(res, createTodoResponse, 'Todo created successfully')

    } catch (error) {
        return sendErrorResponse(res, null, 'Something went wrong')
    }
}

const getTodoItem = async (req, res) => {
    try {
        const { todoID } = req.params

        const getTodoResponse = await getTodoCategoryByID(todoID)
        return sendSuccessResponse(res, getTodoResponse, 'success')

    } catch (error) {
        return sendErrorResponse(res, null, 'Something went wrong')

    }
}

module.exports = {
    createTodo,
    getTodoItem
}