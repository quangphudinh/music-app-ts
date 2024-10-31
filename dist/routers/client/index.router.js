"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_router_1 = require("./topic.router");
const song_router_1 = require("./song.router");
const favorite_song_router_1 = require("./favorite-song.router");
const search_router_1 = require("./search.router");
const clientRoutes = (app) => {
    app.use("/topics", topic_router_1.topicRoutes);
    app.use("/songs", song_router_1.songRoutes);
    app.use("/favorite-songs", favorite_song_router_1.favoriteRoutes);
    app.use("/search", search_router_1.searchRoutes);
};
exports.default = clientRoutes;
