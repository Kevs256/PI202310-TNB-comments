import Express, { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import sequelize from "../database/mysql.db.js";
import commentProducts from "../models/comment-products.model.js";
import comments from "../models/comments.model.js";
import commentImages from "../models/comment-images.model.js";

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user, comment, rating } = req.body;
        const { id_product } = req.params;
        var _commentProduct = await commentProducts.findOne({
            where: {
                id_product,
                id_user,
            }
        });
        if (!_commentProduct) {
            _commentProduct = await commentProducts.create({
                id_product, id_user
            });
        }
        await comments.create({
            comment, comment_date: new Date(), id_comment_product: _commentProduct.id_comment_product!,
            has_rating: rating
        });
        (req.files as unknown as globalThis.Express.Multer.File[] || []).forEach(async (file) => {
            var id_image = path.parse(file.filename).name;
            await commentImages.create({
                id_comment_product: _commentProduct?.id_comment_product!,
                comment_image: id_image
            });
        });

        res.status(200).json({ status: true, });

    } catch (error) {
        console.log(error),
            res.status(500).json({ status: false, message: 'Server internal error' });
    }
}

const getCommentImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_comment } = req.params;
        var route = path.join(__dirname, `../../../uploads/comment_images/${id_comment}.jpg`);
        fs.open(route, 'r', (err, df) => {
            if (err)

                res.status(404).json({ error: 0, message: "Image not found" });
            else {
                res.sendFile(route);
            }
        });
    } catch (error) {
        res.status(500).json({ error: 1, status: false });
    }
}

const getAllComment = async (req: Request, res: Response, next: NextFunction) => {

    const { id_product } = req.params;
    try {
        const seccioncomments = await sequelize.query('CALL get_comments(:_id_seccion_comentario)', { replacements: { _id_seccion_comentario: id_product } });
        if (seccioncomments) {
            res.status(200).json({ error: 0, status: true, comments: seccioncomments });
        } else {
            res.status(400).json({ error: 0, status: true, message: 'No hay seccion de comentarios' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 0, status: false, message: 'Server internal error.' });
    }
}

const editComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_user, comment } = req.body;
        const { id_product, id_comment } = req.params;

        console.log(`id_product ${id_product}`);

        if (!id_product || !id_comment) {
            return res.status(400).json({ status: false, message: 'Missing required parameter(s)' });
        }

        const _commentProduct = await commentProducts.findOne({
            where: { id_product, id_user }
        });
        if (!_commentProduct) {
            return res.status(404).json({ status: false, message: 'Comment section not found' });
        }

        const _comment = await comments.findOne({
            where: { id_comment }
        });
        if (!_comment) {
            return res.status(404).json({ status: false, message: 'Comment not found' });
        }

        _comment.comment = comment;
        _comment.comment_date = new Date();

        await _comment.save();

        res.status(200).json({ status: true, message: 'Update' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server internal error' });
    }
}

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id_comment } = req.params;

        const comment = await comments.findByPk(id_comment);

        if (!comment) {
            return res.status(404).json({ error: 0, message: "Comment not found" });
        }

        await commentImages.destroy({
            where: { id_comment_product: id_comment }
        });

        await comment.destroy();

        res.status(200).json({ error: 0, status: true, message: "Deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 1, status: false, message: "Server internal error" });
    }
};

export default {
    createComment,
    getCommentImage,
    getAllComment,
    editComment,
    deleteComment
}