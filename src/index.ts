import { Elysia } from "elysia";
import config from "./core/config/config";
import user from "./modules/user/infrastructure/handler";

const app = new Elysia();

app.use(user);
app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});
