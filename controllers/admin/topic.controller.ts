import { Request, Response } from "express";
import { Topic } from "../../models/topic.model";
//[GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({ 
        deleted: false 
    });
    // console.log(topics);
    res.render("admin/pages/topic/index", {
        titlePage: "Chủ đề bài hát",
        topics: topics
    });
}