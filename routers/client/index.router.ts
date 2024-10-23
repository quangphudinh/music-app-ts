import { Express } from "express";
import { topicRoutes } from "./topic.router";

const clientRoutes = (app : Express) : void => {
    app.use("/" , topicRoutes);
}
export default clientRoutes