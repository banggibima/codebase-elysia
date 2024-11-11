import { Elysia, t } from "elysia";
import UserPostgresRepositoryImpl from "./repository/postgres";
import UserService from "../domain/service";
import UserCommandUseCase from "../application/command/usecase";
import UserQueryUseCase from "../application/query/usecase";
import wrapper from "../../../core/utils/wrapper";

const userPostgresRepository = new UserPostgresRepositoryImpl();
const userService = new UserService(userPostgresRepository);
const userCommandUseCase = new UserCommandUseCase(userService);
const userQueryUseCase = new UserQueryUseCase(userService);

const user = new Elysia({ prefix: "/api/users" });

user
  .get("", async ({ query, set }) => {
    let page = query.page ? parseInt(query.page) : 0;
    let size = query.size ? parseInt(query.size) : 0;

    if (page <= 0 && size === 0) {
      page = 0;
      size = 0;
    } else {
      if (page <= 0) {
        page = 1;
      }
      if (size <= 0) {
        size = 10;
      }
    }

    let sort = query.sort ? query.sort : "created_at";
    let order = query.order ? query.order : "desc";

    sort = sort;
    order = order;

    const total = await userQueryUseCase.count();
    const users = await userQueryUseCase.findAll();
    const meta = {
      page: page,
      size: size,
      count: users.length,
      total: total,
      sort: sort,
      order: order,
    };
    set.status = 200;
    const success = wrapper.pagination(200, meta, users);
    return success;
  })
  .get(
    "/:id",
    async ({ params, set }) => {
      const user = await userQueryUseCase.findById(params.id);
      if (user === null) {
        set.status = 404;
        const error = wrapper.error(404, "user not found");
        return error;
      }
      set.status = 200;
      const success = wrapper.detail(200, user);
      return success;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .get(
    "/email/:email",
    async ({ params, set }) => {
      const user = await userQueryUseCase.findByEmail(params.email);
      if (user === null) {
        set.status = 404;
        const error = wrapper.error(404, "user not found");
        return error;
      }
      set.status = 200;
      const success = wrapper.detail(200, user);
      return success;
    },
    {
      params: t.Object({
        email: t.String(),
      }),
    }
  )
  .post(
    "",
    async ({ body, set }) => {
      const user = await userCommandUseCase.create(body);
      set.status = 201;
      const success = wrapper.detail(201, user);
      return success;
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params, body, set }) => {
      const user = await userCommandUseCase.update({ id: params.id, ...body });
      if (user === null) {
        set.status = 404;
        const error = wrapper.error(404, "user not found");
        return error;
      }
      const success = wrapper.detail(200, user);
      return success;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      const user = await userCommandUseCase.remove(params);
      if (user === null) {
        set.status = 404;
        const error = wrapper.error(404, "user not found");
        return error;
      }
      set.status = 204;
      const success = wrapper.detail(204, user);
      return success;
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );

export default user;
