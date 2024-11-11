import { User } from "../../domain/entity";
import { UserPostgresRepository } from "../../domain/repository";
import sql from "../../../../core/database/postgres";

class UserPostgresRepositoryImpl implements UserPostgresRepository {
  async count(): Promise<number> {
    const query = await sql<{ count: string }[]>`
      SELECT COUNT(*) FROM users
    `;
    const users = parseInt(query[0].count);
    return users;
  }

  async findAll(): Promise<User[]> {
    const query = await sql<User[]>`
      SELECT * FROM users
    `;
    const users = query.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    });
    return users;
  }

  async findById(id: string): Promise<User | null> {
    const query = await sql<User[]>`
      SELECT * FROM users WHERE id = ${id}
    `;
    if (query.length === 0) {
      return null;
    }
    const user = {
      id: query[0].id,
      name: query[0].name,
      email: query[0].email,
      password: query[0].password,
      created_at: query[0].created_at,
      updated_at: query[0].updated_at,
    };
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email}
    `;
    if (query.length === 0) {
      return null;
    }
    const user = {
      id: query[0].id,
      name: query[0].name,
      email: query[0].email,
      password: query[0].password,
      created_at: query[0].created_at,
      updated_at: query[0].updated_at,
    };
    return user;
  }

  async create(payload: User): Promise<User> {
    const query = await sql<User[]>`
      INSERT INTO users (id, name, email, password, created_at, updated_at)
      VALUES (${payload.id}, ${payload.name}, ${payload.email}, ${payload.password}, ${payload.created_at}, ${payload.updated_at})
      RETURNING *
    `;
    const user = {
      id: query[0].id,
      name: query[0].name,
      email: query[0].email,
      password: query[0].password,
      created_at: query[0].created_at,
      updated_at: query[0].updated_at,
    };
    return user;
  }

  async update(payload: User): Promise<User> {
    const query = await sql<User[]>`
      UPDATE users
      SET name = ${payload.name}, email = ${payload.email}, password = ${payload.password}, updated_at = ${payload.updated_at}
      WHERE id = ${payload.id}
      RETURNING *
    `;
    const user = {
      id: query[0].id,
      name: query[0].name,
      email: query[0].email,
      password: query[0].password,
      created_at: query[0].created_at,
      updated_at: query[0].updated_at,
    };
    return user;
  }

  async remove(payload: User): Promise<User> {
    const query = await sql<User[]>`
      DELETE FROM users
      WHERE id = ${payload.id}
      RETURNING *
    `;
    const user = {
      id: query[0].id,
      name: query[0].name,
      email: query[0].email,
      password: query[0].password,
      created_at: query[0].created_at,
      updated_at: query[0].updated_at,
    };
    return user;
  }
}

export default UserPostgresRepositoryImpl;
