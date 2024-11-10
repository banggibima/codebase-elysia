import { User } from "./entity";
import { UserPostgresRepository } from "./repository";

export class UserService {
  constructor(private userPostgresRepository: UserPostgresRepository) {}

  async count() {
    return this.userPostgresRepository.count();
  }

  async findAll() {
    return this.userPostgresRepository.findAll();
  }

  async findById(id: string) {
    return this.userPostgresRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.userPostgresRepository.findByEmail(email);
  }

  async create(payload: User) {
    return this.userPostgresRepository.create(payload);
  }

  async update(payload: User) {
    return this.userPostgresRepository.update(payload);
  }

  async remove(payload: User) {
    return this.userPostgresRepository.remove(payload);
  }
}
