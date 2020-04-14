import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  events: Eventing = new Eventing();

  constructor(private data: UserProps) { }

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(updates: UserProps): void {
    Object.assign(this.data, updates);
  }

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  save(): void {
    const id = this.get('id');
    if (id) {
      // Update
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      // Create
      axios.post('http://localhost:3000/users', this.data);
    }
  }

}