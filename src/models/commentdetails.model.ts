import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import ICommentDetails from '../interfaces/ICommentDetails.js';

interface CommentDetailsInstance extends Model<ICommentDetails>, ICommentDetails {}
type CommentDetailsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentDetailsInstance;
};

export default db.define('Detalles_Comentario', {
    id_detalles_comentario: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING},
    comentario: DataTypes.STRING,
    fecha_comentario: DataTypes.STRING,
    Seccion_Comentario_id_comentario:{
      type:DataTypes.STRING,
      references:{
        model:'Seccion_Comentario',
        key:'id_seccion_comentario'
      }
    },
}, {
    freezeTableName: true,
    timestamps: false
}) as CommentDetailsModelStatic;