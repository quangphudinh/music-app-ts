import { Response , Request } from "express";
import { FavoriteSong } from "../../models/favorite-song.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";
import { changeDatime } from "../../helpers/change-datime";
import { convertToSlug } from "../../helpers/convertToSlug";


//[GET] /search/result
export const search = async (req: Request, res: Response) => {
    const keyword: string = req.query.keyword as string;

    let newSongs = [];

    if(keyword){
        const regex = new RegExp(keyword, 'i')
        //Tao ra 1 slug không dấu và có thêm dấu "-" ngăn cách các ký tự : cắt đôi -> cat doi ->cat-doi
        const stringSlug = convertToSlug(keyword);
        const stringSlugRegex = new RegExp(stringSlug, 'i')

        newSongs = await Song.find({
            $or: [
                {title : regex}, 
                {slug : stringSlugRegex}
            ] 
        })
    }

    for (const item of newSongs) {

        if(item.createdAt != null){
            item["createTime"] = changeDatime(item.createdAt);
        } else {item["createTime"] =  "24/04/2022";}

        const singer = await Singer.findOne({
            _id: item.singerId
        })
        item["singer"] = singer;
    }

    res.render("client/pages/search/result.pug", {
        titlePage: "Kết quả tìm kiếm với từ khóa: " + keyword,
        keyword : keyword,
        songs : newSongs

    });
}