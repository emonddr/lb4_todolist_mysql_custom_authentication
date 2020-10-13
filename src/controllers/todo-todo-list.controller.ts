import {authenticate} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Todo, TodoList} from '../models';
import {TodoRepository} from '../repositories';

@authenticate('jwt')
export class TodoTodoListController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) {}

  @get('/todos/{id}/todo-list', {
    responses: {
      '200': {
        description: 'TodoList belonging to Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TodoList)},
          },
        },
      },
    },
  })
  async getTodoList(
    @param.path.string('id') id: typeof Todo.prototype.id,
  ): Promise<TodoList> {
    return this.todoRepository.todoList(id);
  }
}
