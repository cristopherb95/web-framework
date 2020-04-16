// import { User } from './models/User';
// import { UserEdit } from "./views/UserEdit";

import { Collection } from "./models/Collection";
import { UserProps, User } from "./models/User";
import { UserList } from "./views/UserList";

// const user = User.buildUser({ name: 'Charlotte', age: 21 });

const rootObj = document.querySelector('#root');
// if (rootObj) {
//   const userEdit = new UserEdit(rootObj, user);
//   userEdit.render();
// } else {
//   throw new Error('Root element not found');
// }

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json);
});

users.on('change', () => {
  if (rootObj) {
    new UserList(rootObj,users).render();
  }
})

users.fetch();


