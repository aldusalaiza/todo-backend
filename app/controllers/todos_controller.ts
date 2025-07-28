// import type { HttpContext } from '@adonisjs/core/http'

import Todo from '#models/todo'
import { HttpContext } from '@adonisjs/core/http'

type ReturnValue = { code: number; status: string; message: string; todo: Todo | null }

const data = (message: string, todo: Todo | null): ReturnValue => {
  return { code: 200, status: 'Success', message, todo }
}

export default class TodosController {
  async index() {
    const todos = await Todo.all()

    return todos
  }

  async get({ params }: HttpContext) {
    const id = params.id
    const todo = await Todo.find(id)

    return todo
  }

  async store({ request }: HttpContext) {
    const { title, description, userId } = request.body()

    const todo = await Todo.create({
      title: title,
      description: description,
      userId: userId,
    })

    return data('Todo created successfully', todo)
  }

  async destroy({ request }: HttpContext) {
    const { id } = request.body()

    const todo = await Todo.find(id)

    if (!todo) {
      return { code: 404, status: 'Not found', message: 'Todo not found' }
    }

    await todo?.delete()

    return data('Todo deleted successfully', todo)
  }

  async update({ params, request }: HttpContext) {
    const id = params.id
    const { title, description, isDone } = request.body()

    const todo = await Todo.firstOrFail(id)

    try {
      todo.title = title
      todo.description = description
      todo.isDone = isDone
      todo.save()
    } catch (err) {
      console.log(err)
    }

    return data('Todo updated successfully', todo)
  }
}
