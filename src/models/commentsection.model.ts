import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import ICommentSection from '../interfaces/ICommentSection.js';

interface CommentSectionInstance extends Model<ICommentSection>, ICommentSection {}
type CommentSectionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentSectionInstance;
};

export default db.define('Seccion_Comentario', {
    id_seccion_comentario: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.STRING},
    Usuario_id_usuario:{
      type:DataTypes.STRING,
      references:{
        model:'Usuario',
        key:'id_usuario'
      }
    },
    Valoracion: DataTypes.NUMBER,
    Producto_id_producto:{
        type:DataTypes.STRING,
        references:{
          model:'Producto',
          key:'id_producto'
        }
      }
}, {
    freezeTableName: true,
    timestamps: false
}) as CommentSectionModelStatic;