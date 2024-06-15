const { todo: Todo } = require('../models/index')

const createTodoCategory = async (data) => {
    try {
        const newTodo = new Todo({ name: data.name, createdBy: data.uid })
        const response = await newTodo.save()
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    createTodoCategory
}