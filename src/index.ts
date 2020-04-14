import { User } from './models/User';

const user = new User({ id: 4 });
user.set({name: "BERNARD", age: 41});
user.save();

