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
exports.index = void 0;
const favorite_song_model_1 = require("../../models/favorite-song.model");
const song_model_1 = require("../../models/song.model");
const singer_model_1 = require("../../models/singer.model");
const change_datime_1 = require("../../helpers/change-datime");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteSongs = yield favorite_song_model_1.FavoriteSong.find({
        deleted: false
    });
    for (const item of favoriteSongs) {
        const song = yield song_model_1.Song.findOne({
            _id: item.songId
        });
        const singer = yield singer_model_1.Singer.findOne({
            _id: song.singerId
        });
        item["createTime"] = (0, change_datime_1.changeDatime)(item.createdAt);
        item["song"] = song;
        item["singer"] = singer;
    }
    res.render("client/pages/favorite-songs/index.pug", {
        titlePage: "Danh sách bài hát yêu thích",
        favoriteSongs: favoriteSongs
    });
});
exports.index = index;
