export abstract class AbstractCrudService<T> {
  abstract get(url: string, id: string): Promise<T>;

  abstract getAll(url: string): Promise<T[]>;

  abstract post(url: string, data: T): Promise<T>;

  abstract put(url: string, id: string, data: T): Promise<T>;

  abstract delete(url: string, id: string): Promise<void>;
}
