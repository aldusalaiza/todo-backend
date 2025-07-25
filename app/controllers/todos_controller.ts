// import type { HttpContext } from '@adonisjs/core/http'

import Todo from '#models/todo'
import { HttpContext } from '@adonisjs/core/http'

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
    const { title, description } = request.body()

    const todo = await Todo.create({
      title: title,
      description: description,
    })

    return todo
  }

  async destroy({ request }: HttpContext) {
    const { id } = request.body()

    const todo = await Todo.find(id)

    await todo?.delete()

    return todo
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

    return todo
  }
}
