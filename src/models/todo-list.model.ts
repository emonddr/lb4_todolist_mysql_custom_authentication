import {Entity, hasMany, model, property} from '@loopback/repository';
import {Todo, TodoWithRelations} from './todo.model';

@model({
  settings: {
    mysql: {table: 'my_todo_list'},
  },
})
export class TodoList extends Entity {
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
      columnName: 'color',
    },
  })
  color?: string;

  @hasMany(() => Todo)
  todos: Todo[];

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}

export interface TodoListRelations {
  // describe navigational properties here
  todos?: TodoWithRelations[];
}

export type TodoListWithRelations = TodoList & TodoListRelations;
