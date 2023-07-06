const File = require('./models/file.model');
const fileController = {};

fileController.uploadFile = async (req, res) => {
  try {
    const { originalname, filename, mimetype, size } = req.file;

    const newFile = new File({
      originalName: originalname,
      fileName: filename,
      fileType: mimetype,
      fileSize: size,
    });

    const savedFile = await newFile.save();

    return res.status(200).json(savedFile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Greška prilikom spremanja datoteke.' });
  }
};

fileController.getFileById = async (req, res) => {
  try {
    const fileId = req.params.id;


    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'Datoteka nije pronađena.' });
    }

    return res.status(200).json(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Greška prilikom dohvata datoteke.' });
  }
};

module.exports = fileController;
