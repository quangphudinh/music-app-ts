import { Express } from "express";
import { topicRoutes } from "./topic.router";
import { songRoutes } from "./song.router";
import { favoriteRoutes } from "./favorite-song.router";

const clientRoutes = (app : Express) : void => {
    app.use("/topics" , topicRoutes);
    app.use("/songs" , songRoutes);
    app.use("/favorite-songs" , favoriteRoutes);
}
export default clientRoutes