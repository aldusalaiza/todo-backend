/* eslint-disable @adonisjs/prefer-lazy-controller-import */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import TodosController from '#controllers/todos_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router
  .group(() => {
    router.get('/todos', [TodosController, 'index'])

    router.get('/todo/:id', [TodosController, 'get'])

    router.post('/todo/add', [TodosController, 'store'])

    router.delete('/todo/delete', [TodosController, 'destroy'])

    router.put('/todo/edit/:id', [TodosController, 'update'])
  })
  .use(middleware.auth())
