import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: true, mysql: {table: 'user_credentials'}}})
export class UserCredentials extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
    mysql: {
      columnName: 'id',
    },
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    mysql: {
      columnName: 'password',
    },
  })
  password: string;

  @belongsTo(
    () => User,
    {},
    {
      type: 'string',
      required: true,
      mysql: {
        columnName: 'user_id',
      },
    },
  )
  userId: string;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
