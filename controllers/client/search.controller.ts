import { Response, Request } from "express";
import { FavoriteSong } from "../../models/favorite-song.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";
import { changeDatime } from "../../helpers/change-datime";
import { convertToSlug } from "../../helpers/convertToSlug";

//[GET] /search/:type (result | search)
export const result = async (req: Request, res: Response) => {
  const type: string = req.params.type;
  const keyword: string = req.query.keyword as string;

  let newSongs = [];

  if (keyword) {
    const regex = new RegExp(keyword, "i");
    //Tao ra 1 slug không dấu và có thêm dấu "-" ngăn cách các ký tự : cắt đôi -> cat doi ->cat-doi
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");

    const songs = await Song.find({
      $or: [{ title: regex }, { slug: stringSlugRegex }],
    });

    for (const item of songs) {
      if (item.createdAt != null) {
        item["createTime"] = changeDatime(item.createdAt);
      } else {
        item["createTime"] = "24/04/2022";
      }

      const singer = await Singer.findOne({
        _id: item.singerId,
      });
      
      newSongs.push({
        _id: item._id,
        title: item.title,
        slug: item.slug,
        avatar: item.avatar,
        singer: {
            fullName : singer.fullName
        },
        like: item.like,
        createAt: item['createTime'],
      })
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
};
