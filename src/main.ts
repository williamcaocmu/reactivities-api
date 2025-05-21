import cors from "cors";
import express, { Express } from "express";
import activitiesRoute from "./modules/activities/activities.route";
import profilesRoute from "./modules/profiles/profiles.route";
import usersRoute from "./modules/users/users.route";

import { v2 as cloudinary } from "cloudinary";

import config from "./config/config";

cloudinary.config({
  cloud_name: "dts5hk4pn",
  api_key: "148173892991721",
  api_secret: "6UnzjuvClIqDrBLwul0XcWr96FY",
});

const app: Express = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use("/activities", activitiesRoute);
app.use("/users", usersRoute);
app.use("/profiles", profilesRoute);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
