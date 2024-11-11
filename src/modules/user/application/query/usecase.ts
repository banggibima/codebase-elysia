import { UserResponseDTO } from "./dto";
import UserService from "../../domain/service";

class UserQueryUseCase {
  constructor(private userService: UserService) {}

  async count(): Promise<number> {
    const users = await this.userService.count();
    const response = users;
    return response;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.userService.findAll();
    const response = users.map((user: UserResponseDTO) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    });
    return response;
  }

  async findById(id: string): Promise<UserResponseDTO | null> {
    const user = await this.userService.findById(id);
    if (user === null) {
      return null;
    }
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return response;
  }

  async findByEmail(email: string): Promise<UserResponseDTO | null> {
    const user = await this.userService.findByEmail(email);
    if (user === null) {
      return null;
    }
    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return response;
  }
}

export default UserQueryUseCase;
