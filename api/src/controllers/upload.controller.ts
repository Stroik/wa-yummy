import { join } from 'path';
import { readdir } from 'fs';
import { Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';

const randomId = () => Math.random().toString(36).substring(2, 10);

export const upload = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        status: 'ERROR',
        message: 'No files were uploaded.',
      });
    }

    const sampleFile = req.files.file as UploadedFile;
    console.log(sampleFile.name);
    const filename = sampleFile.name;
    const name = filename.split('.')[0];
    const id = `${randomId()}-${user?.id}`;
    const matchResult = filename.match(/\.([^.]+)$/);
    const filextension = matchResult ? matchResult[1] : '';
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'mp4'];

    if (!allowedExtensions.includes(filextension)) {
      return res.status(200).json({
        status: 'ERROR',
        message: 'Sólo es posible subir archivos de imagenes .png, .jpg, .jpeg o videos .mp4 ',
      });
    }
    const uploadPath = join(
      __dirname,
      '..',
      '..',
      'public/' + name + '-' + id + '.' + filextension
    );

    sampleFile.mv(uploadPath, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.json({
        status: 'OK',
        message: 'File uploaded!',
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'ERROR',
      message: 'El archivo no se ha podido subir.',
    });
    return;
  }
};

export const getMediaFiles = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const publicPath = join(__dirname, '..', '..', 'public/');
    readdir(publicPath, (error, files) => {
      if (error) {
        res.status(500).json({
          status: 'ERROR',
          message: error.message,
        });
        return;
      }

      if (!user) {
        res.status(401).json({
          status: 'ERROR',
          message: 'Unauthorized',
        });
        return;
      }

      const mediaFiles = files
        .filter((f) => f.includes(user.id))
        .map((file) => {
          const matchResult = file.match(/\.([^.]+)$/);
          const filextension = matchResult ? matchResult[1] : '';
          return {
            name: file.split('-')[0],
            type: filextension,
            url: ['files', file],
          };
        });
      res.json({
        status: 'OK',
        message: 'Files found!',
        data: mediaFiles,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'No se han podido obtener los archivos.',
    });
    return;
  }
};
