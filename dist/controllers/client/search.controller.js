"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const song_model_1 = require("../../models/song.model");
const singer_model_1 = require("../../models/singer.model");
const change_datime_1 = require("../../helpers/change-datime");
const convertToSlug_1 = require("../../helpers/convertToSlug");
const result = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.params.type;
    const keyword = req.query.keyword;
    let newSongs = [];
    if (keyword) {
        const regex = new RegExp(keyword, "i");
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        const songs = yield song_model_1.Song.find({
            $or: [{ title: regex }, { slug: stringSlugRegex }],
        });
        for (const item of songs) {
            if (item.createdAt != null) {
                item["createTime"] = (0, change_datime_1.changeDatime)(item.createdAt);
            }
            else {
                item["createTime"] = "24/04/2022";
            }
            const singer = yield singer_model_1.Singer.findOne({
                _id: item.singerId,
            });
            newSongs.push({
                _id: item._id,
                title: item.title,
                slug: item.slug,
                avatar: item.avatar,
                singer: {
                    fullName: singer.fullName
                },
                like: item.like,
                createAt: item['createTime'],
            });
        }
    }
    switch (type) {
        case "suggest":
            res.json({
                code: 200,
                message: "Thanh Cong !!!",
                songs: newSongs,
            });
            break;
        case "result":
            res.render("client/pages/search/result.pug", {
                titlePage: "Kết quả tìm kiếm với từ khóa: " + keyword,
                keyword: keyword,
                songs: newSongs,
            });
            break;
        default:
            break;
    }
});
exports.result = result;
