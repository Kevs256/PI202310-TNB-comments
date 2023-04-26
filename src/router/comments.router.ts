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
        this.router.route('/product/:id_product').get(commentController.getAllComment);
        this.router.route('/product/:id_comment').put(commentController.editComment);
        this.router.route('/product/:id_product/comments/:id_comment').put(commentController.editComment);
        this.router.route('/product/:id_product/comments/:id_comment').delete(commentController.deleteComment);
        this.router.route('/product/:id_product').post(upload.array("comment_images"), commentController.createComment);
        this.router.route('/image/:id_comment').get(commentController.getCommentImage);
    }
}

export default new CommentsRouter();