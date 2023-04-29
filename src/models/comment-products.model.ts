import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import ICommentProducts from '../interfaces/ICommentProducts.js';

interface CommentProductsInstance extends Model<ICommentProducts>, ICommentProducts {}
type CommentProductsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentProductsInstance;
};

export default db.define('commentProducts', {
    id_comment_product: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.NUMBER
    },
    id_user: DataTypes.STRING,
    id_product: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
}) as CommentProductsModelStatic;