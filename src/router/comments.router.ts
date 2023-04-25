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
        this.router.route('/product/:id_producto').get(commentController.getAllComment);
        this.router.route('/product/:id_producto').post(upload.array("comment_images"), commentController.createComment);
        this.router.route('/image/:id_comment').get(commentController.getCommentImage);
    }
}

export default new CommentsRouter();