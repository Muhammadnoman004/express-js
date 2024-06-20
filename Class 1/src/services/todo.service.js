const { todo: Todo, todoItems: TodoItems } = require('../models/index')

const createTodoCategory = async (data) => {
    try {

        const newTodo = new Todo({ name: data.name, createdBy: data.uid })
        const response = await newTodo.save()
        return response

    } catch (error) {
        throw error
    }
}

const getTodoCategoryByID = async (todoID) => {
    try {

        const Response = await Todo.findById(todoID).populate(['createdBy', 'todoList'])
        return Response

    } catch (error) {
        throw error
    }
}

const createTodoListItem = async (data) => {
    try {

        const newTodoListItem = new TodoItems({ ...data })
        const response = await newTodoListItem.save()
        return response

    } catch (error) {
        throw error
    }
}

const deleteTodoItemByID = async (uid) => {
    try {
        const response = await TodoItems.deleteMany({ todoList: uid })
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    createTodoCategory,
    getTodoCategoryByID,
    createTodoListItem,
    deleteTodoItemByID
}