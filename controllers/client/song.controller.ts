import { Request, Response } from "express";
import { Topic } from "../../models/topic.model";
import { Song } from "../../models/song.model";
import { Singer } from "../../models/singer.model";


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
    console.log(songs);

    for(const item of songs){
        const infoSinger = await Singer.findOne({
            _id: item.singerId,
            status: "active",
            deleted: false
        })
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
    const slugSong : string = req.params.slugSong;
    
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
    

    res.render("client/pages/songs/detail.pug", {
        titlePage: "Chi tiet bai hat",
        song: song,
        singer: singer,
        topic: topic
    });
}