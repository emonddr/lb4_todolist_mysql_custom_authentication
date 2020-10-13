import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TodoList, TodoListWithRelations} from './todo-list.model';

@model({
  settings: {
    mysql: {table: 'my_todo'},
    foreignKeys: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      fk_todo_todoListId: {
        name: 'fk_todo_todoListId',
        entity: 'TodoList',
        entityKey: 'id',
        foreignKey: 'todoListId',
      },
    },
  },
})
export class Todo extends Entity {
  @property({
    type: 'string',
    defaultFn: 'uuidv4',
    // generated: true,  -> not needed
    id: true,

    mysql: {
      columnName: 'id',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'title',
    },
  })
  title: string;

  @property({
    type: 'string',
    mysql: {
      columnName: 'desc',
    },
  })
  desc?: string;

  @property({
    type: 'boolean',
    mysql: {
      columnName: 'is_complete',
    },
  })
  isComplete?: boolean;

  @belongsTo(
    () => TodoList,
    {},
    {
      type: 'string',
      mysql: {
        columnName: 'todo_list_id',
      },
    },
  )
  todoListId: string;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // add the following line
  todoList?: TodoListWithRelations;
}

export type TodoWithRelations = Todo & TodoRelations;
