import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import ICommentImage from '../interfaces/ICommentImage.js';

interface CommentImageInstance extends Model<ICommentImage>, ICommentImage {}
type CommentImageModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentImageInstance;
};

export default db.define('Imagenes_Comentario', {
    id_imagenes_comentario: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING},
    Imagene_comentario: DataTypes.STRING,
    Detalles_Comentario_idDetalles_Comentario:{
      type:DataTypes.STRING,
      references:{
        model:'Detalles_Comentario',
        key:'id_detalles_comentario'
      }
    },
}, {
    freezeTableName: true,
    timestamps: false
}) as CommentImageModelStatic;