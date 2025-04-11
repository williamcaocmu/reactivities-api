import express, { Express } from "express";
import cors from "cors";

import activitiesRoute from "./modules/activities/activities.route";
import config from "./config/config";

const app: Express = express();

app.use(cors({ origin: config.corsOrigin }));

app.use("/activities", activitiesRoute);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
