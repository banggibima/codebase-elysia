import { User } from "./entity";

export interface UserPostgresRepository {
  count(): Promise<number>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(payload: User): Promise<User>;
  update(payload: User): Promise<User>;
  remove(payload: User): Promise<User>;
}
