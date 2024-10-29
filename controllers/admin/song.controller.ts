import { Response, Request } from "express";
import { Song } from "../../models/song.model";
import { Topic } from "../../models/topic.model";
import { Singer } from "../../models/singer.model";
import { systemConfig } from "../../config/config";

//[GET] /admin/songs/
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({ deleted: false });

  // console.log(songs);

  res.render("admin/pages/song/index", {
    titlePage: "Quản lý bài hát",
    songs: songs,
  });
};

// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");

  res.render("admin/pages/song/create", {
    titlePage: "Tạo bài hát mới",
    topics: topics,
    singers: singers,
  });
};

// [POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
    let avatar = "";
    let audio = "";

    if(req.body.avatar)
        avatar = req.body.avatar[0];
    if(req.body.audio)
        audio = req.body.audio[0];

    const dataSong = {
    title: req.body.title || "",
    topicId: req.body.topicId ,
    singerId: req.body.singerId ,
    description: req.body.description,
    status: req.body.status,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
  };

  const song = new Song(dataSong);
  await song.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};


// [GET] /admin/songs/:id/edit
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;
  const song = await Song.findOne({
    _id: id, 
    deleted: false 
  });
  const topics = await Topic.find({
    deleted: false,
  }).select("title");

  const singers = await Singer.find({
    deleted: false,
  }).select("fullName");

  res.render("admin/pages/song/edit", {
    titlePage: "Chỉnh sửa bài hát",
    songs : song,
    topics: topics,
    singers: singers,
  });
}

// [PATCH] /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  // console.log(req.body);
    const id = req.params.id;

    

    const dataSong = {
    title: req.body.title || "",
    topicId: req.body.topicId ,
    singerId: req.body.singerId ,
    description: req.body.description,
    status: req.body.status,
    lyrics: req.body.lyrics,
  };

  if(req.body.avatar)
        dataSong["avatar"] = req.body.avatar[0];
      if(req.body.audio)
        dataSong["audio"] = req.body.audio[0];
  const song = await Song.updateOne({ _id: id }, dataSong);
  
  res.redirect("back");
}