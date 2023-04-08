import { Router } from "express";
import commentController from "../controllers/comment.controller.js";
import upload from "../middlewares/image.save.js";

class CommentsRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config(){
        this.router.route('/product/:id_producto/comments').get(commentController.getAllComment);
        this.router.route('/image/:id_comment').get(commentController.getCommentImage);
        this.router.route('/product/:id_producto/comments').post(upload.array("comment_images"), commentController.createComment);
    }
}

export default new CommentsRouter();