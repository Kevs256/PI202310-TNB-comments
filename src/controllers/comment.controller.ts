import Express, { Request, Response, NextFunction }  from "express";
import  path from "path" ;
import fs from "fs";
import sequelize from "../database/mysql.db.js";
import commentSeccionModel from "../models/commentsection.model.js";
import commentdetailsModel from "../models/commentdetails.model.js";
import commentimageModel from "../models/commentimage.model.js";



const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const fechaActual: Date = new Date();
    const dia: number = fechaActual.getDate();
    const mes: number = fechaActual.getMonth() + 1; 
    const anio: number = fechaActual.getFullYear();
    const fechaFormateada: string = `${dia}/${mes}/${anio}`;
    console.log(fechaFormateada);

    try {
        const { id_usuario, comentario, valoracion } = req.body;
        const { id_producto } = req.params;
        var commentSeccion = await commentSeccionModel.findOne({
            where:{
                Producto_id_producto: id_producto,
                Usuario_id_usuario: id_usuario,
            }
        });
        if (!commentSeccion) {
            commentSeccion = await commentSeccionModel.create({
                Usuario_id_usuario: id_usuario,
                Producto_id_producto: id_producto,
                Valoracion: valoracion,
            });
        }
        var commentdetails = await commentdetailsModel.create({
            comentario: comentario,
            fecha_comentario: fechaFormateada,
            Seccion_Comentario_id_comentario: commentSeccion.id_seccion_comentario!,
        });
        (req.files as unknown as globalThis.Express.Multer.File[]).forEach(async(file) =>{
            var id_image = path.parse(file.filename).name;

            await commentimageModel.create({
                Detalles_Comentario_idDetalles_Comentario: commentdetails.id_detalles_comentario!,
                Imagene_comentario: id_image,
            });
        });

        res.status(200).json({ status: true, });

    } catch (error) {
        console.log(error),
        res.status(500).json({ status: false, message: 'Server internal error' });
    }
}

const getCommentImage = async (req:Request, res:Response, next: NextFunction)=>{
    try{
        const {id_comment} = req.params;
        var route = path.join(__dirname, `../../../uploads/comment_images/${id_comment}.jpg`);
        fs.open(route, 'r', (err, df)=>{
            if(err) 

            res.status(404).json({error: 0, message: "Image not found"});
            else{
                res.sendFile(route);
            }
        });
    }catch(error){
        res.status(500).json({error: 1, status: false});
    }
} 


const getAllComment = async (req: Request, res: Response, next: NextFunction) => {
    
    const { id_producto } = req.params;
    try{
        const seccioncomments = await sequelize.query('CALL get_comments(:_id_seccion_comentario)', {replacements: {_id_seccion_comentario : id_producto}});
        if(seccioncomments){
            res.status(200).json({error: 0, status: true, comments: seccioncomments });
        }else{
            res.status(400).json({error: 0, status: true, message: 'No hay seccion de comentarios' });
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 0, status: false, message: 'Server internal error.'});
    }
}

export default {
    createComment,
    getCommentImage,
    getAllComment,
}