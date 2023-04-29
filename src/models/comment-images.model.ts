import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import ICommentImage from '../interfaces/ICommentImage.js';

interface CommentImageInstance extends Model<ICommentImage>, ICommentImage {}
type CommentImageModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentImageInstance;
};

export default db.define('commentImages', {
    id_comment_image: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.STRING
    },
    comment_image: DataTypes.STRING,
    id_comment_product:{
      type:DataTypes.STRING,
      references:{
        model:'commentProducts',
        key:'id_comment_product'
      }
    },
}, {
    freezeTableName: true,
    timestamps: false
}) as CommentImageModelStatic;