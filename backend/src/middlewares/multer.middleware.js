import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); //here instead of original filename, other things(id, unique suffix, etc) can be used so as to give every file a unique name because if multiple files are there with the same name, they can override each other. 
    //we are using originalname because it is not going to cause any problem since the file will be on the server for a very little time and then after uploading, we will delete it. So there wont be any problem of overriding.
  },
});

export const upload = multer({ storage });
