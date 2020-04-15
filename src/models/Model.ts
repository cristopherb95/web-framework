import { AxiosPromise, AxiosResponse } from "axios";

export type Callback = () => void;

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(value: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise<T>;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) { }

  get = this.attributes.get;
  on = this.events.on;
  trigger = this.events.trigger;

  set(updates: T): void {
    this.attributes.set(updates);
    this.events.trigger('change');
  }

  fetch() {
    const id = this.attributes.get('id');
    if (!id) {
      throw new Error('Cannot fetch without id');
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
  }

  save() {
    const data = this.attributes.getAll();
    this.sync.save(data)
      .then((res: AxiosResponse): void => {
        this.events.trigger('save');
      })
      .catch(err => this.events.trigger('error'));
  }
}