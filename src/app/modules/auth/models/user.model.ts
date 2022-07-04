interface IUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
}

export class User implements IUser {
  name = '';
  email = '';
  id = '';
  firstName = '';
  lastName = '';
  age = 0;
}
