import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/mysql.db.js';
import IComments from '../interfaces/IComments.js';

interface CommentsInstance extends Model<IComments>, IComments {}
type CommentsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentsInstance;
};

export default db.define('comments', {
    id_comment: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    comment: DataTypes.STRING,
    comment_date: DataTypes.DATE,
    has_rating: DataTypes.BOOLEAN,
    id_comment_product: {
      type:DataTypes.NUMBER,
      references:{
        model:'commentProducts',
        key:'id_comment_product'
      }
    },
}, {
    freezeTableName: true,
    timestamps: false
}) as CommentsModelStatic;