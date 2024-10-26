import { Request, Response } from "express";
import { Topic } from "../../models/topic.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";
import { FavoriteSong } from "../../models/favorite-song.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  // console.log(req.params.slugTopic);

  const topics = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false,
  });
  // console.log(topics);

  const songs = await Song.find({
    topicId: topics._id,
    status: "active",
    deleted: false,
  }).select("avatar title slug singerId like createdAt");
  // console.log(songs);

  for (const item of songs) {
    const infoSinger = await Singer.findOne({
      _id: item.singerId,
      status: "active",
      deleted: false,
    });
    item["infoSinger"] = infoSinger;
  }

  // console.log(songs);
  res.render("client/pages/songs/list.pug", {
    titlePage: topics.title,
    songs: songs,
  });
};

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false,
  }).select("title");

  const favoriteSong = await FavoriteSong.findOne({
    songId: song._id,
  });
  song["isFavorite"] = favoriteSong ? true : false;

  res.render("client/pages/songs/detail.pug", {
    titlePage: "Chi tiet bai hat",
    song: song,
    singer: singer,
    topic: topic,
  });
};

//[PATCH] /like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false,
  });
  const newlike: number = typeLike == "like" ? song.like + 1 : song.like - 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      like: newlike,
    }
  );
  res.json({
    code: 200,
    message: "Thành công",
    like: newlike,
  });
};

//[PATCH] /favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeFavorite: string = req.params.typeFavorite;

  switch (typeFavorite) {
    case "favorite":
      const existFavorite = await FavoriteSong.findOne({
        _id: idSong,
      });
      if (!existFavorite) {
        const record = new FavoriteSong({
          //   userId: "",
          songId: idSong,
        });
        await record.save();
      }
      break;
    case "unfavorite":
      await FavoriteSong.deleteOne({
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
};

//[PATCH] /listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  
  const song = await Song.findOne({
    _id: idSong
  });
  const listen : number = song.listen + 1;
  await Song.updateOne(
    {
      _id: idSong,
    },
    {
      listen: listen,
    }
  );

  const songNew = await Song.findOne({
    _id: idSong
  })

  res.json({
    code: 200,
    message: "Thành công",
    listen: songNew.listen
  });
} 