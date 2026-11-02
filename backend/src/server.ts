import { app } from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`Medical Platform API Gateway listening on port ${env.port}`);
});
