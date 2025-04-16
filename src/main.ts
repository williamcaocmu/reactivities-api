import express, { Express } from "express";
import cors from "cors";
import activitiesRoute from "./modules/activities/activities.route";
import usersRoute from "./modules/users/users.route";
import config from "./config/config";

const app: Express = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use("/activities", activitiesRoute);
app.use("/users", usersRoute);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
