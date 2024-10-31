"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_router_1 = require("./dashboard.router");
const topic_router_1 = require("./topic.router");
const song_router_1 = require("./song.router");
const upload_router_1 = require("./upload.router");
const config_1 = require("../../config/config");
const adminRoutes = (app) => {
    const PATH_ADMIN = `/${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, dashboard_router_1.dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, topic_router_1.topicRoutes);
    app.use(`${PATH_ADMIN}/songs`, song_router_1.songRoutes);
    app.use(`${PATH_ADMIN}/upload`, upload_router_1.uploadRoutes);
};
exports.default = adminRoutes;
