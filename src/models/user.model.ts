import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    strict: true,
    mysql: {table: 'user'},
  },
})
export class User extends Entity {
  // must keep it
  // add id:string<UUID>
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
    mysql: {
      columnName: 'realm',
    },
  })
  realm?: string;

  // must keep it
  @property({
    type: 'string',
    mysql: {
      columnName: 'username',
    },
  })
  username?: string;

  // must keep it
  // feat email unique
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
    mysql: {
      columnName: 'email',
    },
  })
  email: string;

  @property({
    type: 'boolean',
    mysql: {
      columnName: 'emailVerified',
    },
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
    mysql: {
      columnName: 'verificationToken',
    },
  })
  verificationToken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
