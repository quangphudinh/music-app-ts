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
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = require("../../models/topic.model");
const song_model_1 = require("../../models/song.model");
const singer_model_1 = require("../../models/singer.model");
const favorite_song_model_1 = require("../../models/favorite-song.model");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.Topic.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false,
    });
    const songs = yield song_model_1.Song.find({
        topicId: topics._id,
        status: "active",
        deleted: false,
    }).select("avatar title slug singerId like createdAt");
    for (const item of songs) {
        const infoSinger = yield singer_model_1.Singer.findOne({
            _id: item.singerId,
            status: "active",
            deleted: false,
        });
        item["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list.pug", {
        titlePage: topics.title,
        songs: songs,
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.Song.findOne({
        slug: slugSong,
        status: "active",
        deleted: false,
    });
    const singer = yield singer_model_1.Singer.findOne({
        _id: song.singerId,
        deleted: false,
    }).select("fullName");
    const topic = yield topic_model_1.Topic.findOne({
        _id: song.topicId,
        deleted: false,
    }).select("title");
    const favoriteSong = yield favorite_song_model_1.FavoriteSong.findOne({
        songId: song._id,
    });
    song["isFavorite"] = favoriteSong ? true : false;
    res.render("client/pages/songs/detail.pug", {
        titlePage: "Chi tiet bai hat",
        song: song,
        singer: singer,
        topic: topic,
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    const song = yield song_model_1.Song.findOne({
        _id: idSong,
        status: "active",
        deleted: false,
    });
    const newlike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.Song.updateOne({
        _id: idSong,
    }, {
        like: newlike,
    });
    res.json({
        code: 200,
        message: "Thành công",
        like: newlike,
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavorite = yield favorite_song_model_1.FavoriteSong.findOne({
                _id: idSong,
            });
            if (!existFavorite) {
                const record = new favorite_song_model_1.FavoriteSong({
                    songId: idSong,
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.FavoriteSong.deleteOne({
                songId: idSong,
            });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thành công",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.Song.findOne({
        _id: idSong
    });
    const listen = song.listen + 1;
    yield song_model_1.Song.updateOne({
        _id: idSong,
    }, {
        listen: listen,
    });
    const songNew = yield song_model_1.Song.findOne({
        _id: idSong
    });
    res.json({
        code: 200,
        message: "Thành công",
        listen: songNew.listen
    });
});
exports.listen = listen;
