import { Response , Request } from "express";
import { FavoriteSong } from "../../models/favorite-song.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";

import { changeDatime } from "../../helpers/change-datime";

//[GET] /favorite-songs/
export const index = async (req: Request, res: Response) => {
    const favoriteSongs = await FavoriteSong.find({
        //userId: "",
        deleted: false
    });
    for (const item of favoriteSongs) {
        const song = await Song.findOne({
            _id: item.songId
        });
        const singer = await Singer.findOne({
            _id: song.singerId
        })
        item["createTime"] = changeDatime(item.createdAt);
        item["song"] = song;
        item["singer"] = singer;
    }
    res.render("client/pages/favorite-songs/index.pug", {
        titlePage: "Danh sách bài hát yêu thích",
        favoriteSongs: favoriteSongs
    });
}