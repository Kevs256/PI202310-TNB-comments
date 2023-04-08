import multer from "multer";
import ui from "uniqid";

const upload = multer({
    storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/comment_images');
    },
    filename: function (req, file, cb) {
        var id_producto = ui.process();
        cb(null, `${id_producto}.jpg`);
    }
})});

export default (upload);