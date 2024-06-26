// const { validationResult } = require("express-validator");
const { createTodoCategory, getTodoCategoryByID, createTodoListItem, deleteTodoItemByID } = require("../services/todo.service")
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

const createTodoitem = async (req, res) => {
    try {
        const { todoID } = req.params
        const { name } = req.body

        const response = await createTodoListItem({ name }) // {_id : 232kkmkm}
        const getTodoCategory = await getTodoCategoryByID(todoID)
        console.log(getTodoCategory);
        if (!getTodoCategory) return sendErrorResponse(res, null, `Category by ${todoID} not exists`)

        getTodoCategory.todoList.push(response.id)
        await getTodoCategory.save()

        return sendSuccessResponse(res, response, 'success')


    } catch (error) {
        return sendErrorResponse(res, error, 'Something went wrong')
    }
}

const deleteTodoItem = async (req, res) => {
    try {
        console.log(req.body);
        const { uid } = req.body

        const deletetodo = await deleteTodoItemByID(uid)

        if (deletetodo.deletedCount === 0) {
            return sendErrorResponse(res, null, 'Todo already deleted ')
        }

        return sendSuccessResponse(res, null, 'Todo deleted successfully')
    } catch (error) {
        sendErrorResponse(res, null, 'Something went wrong')
    }
}

module.exports = {
    createTodo,
    getTodoItem,
    createTodoitem,
    deleteTodoItem
}