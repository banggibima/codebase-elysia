import { v4 as uuid } from "uuid";
import { UserService } from "../../domain/service";
import {
  CreateRequestDTO,
  CreateResponseDTO,
  RemoveRequestDTO,
  RemoveResponseDTO,
  UpdateRequestDTO,
  UpdateResponseDTO,
} from "./dto";
import argon2 from "argon2";

export class UserCommandUseCase {
  constructor(private userService: UserService) {}

  async create(dto: CreateRequestDTO): Promise<CreateResponseDTO> {
    const hash = await argon2.hash(dto.password);
    const user = {
      id: uuid(),
      name: dto.name,
      email: dto.email,
      password: hash,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const saved = await this.userService.create(user);
    const response = {
      id: saved.id,
      name: saved.name,
      email: saved.email,
      password: saved.password,
      created_at: saved.created_at,
      updated_at: saved.updated_at,
    };
    return response;
  }

  async update(dto: UpdateRequestDTO): Promise<UpdateResponseDTO | null> {
    const exist = await this.userService.findById(dto.id);
    if (exist === null) {
      return null;
    }
    const hash = await argon2.hash(dto.password);
    const user = {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      password: hash,
      created_at: exist.created_at,
      updated_at: new Date(),
    };
    const updated = await this.userService.update(user);
    const response = {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      password: updated.password,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
    };
    return response;
  }

  async remove(dto: RemoveRequestDTO): Promise<RemoveResponseDTO | null> {
    const exist = await this.userService.findById(dto.id);
    if (exist === null) {
      return null;
    }
    const user = {
      id: dto.id,
      name: exist.name,
      email: exist.email,
      password: exist.password,
      created_at: exist.created_at,
      updated_at: exist.updated_at,
    };
    const removed = await this.userService.remove(user);
    const response = {
      id: removed.id,
    };
    return response;
  }
}
