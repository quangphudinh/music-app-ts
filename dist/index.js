"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database = __importStar(require("./config/database"));
const dotenv = __importStar(require("dotenv"));
const method_override_1 = __importDefault(require("method-override"));
const index_router_1 = __importDefault(require("./routers/client/index.router"));
const index_router_2 = __importDefault(require("./routers/admin/index.router"));
const config_1 = require("./config/config");
const path = require("path");
dotenv.config();
database.connect();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use('/tinymce', express.static(path.join(__dirname, "node_modules", 'tinymce')));
app.use((0, method_override_1.default)('_method'));
app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = config_1.systemConfig.prefixAdmin;
(0, index_router_1.default)(app);
(0, index_router_2.default)(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
