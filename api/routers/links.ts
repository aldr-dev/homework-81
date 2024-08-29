import express from 'express';
import Shorter from '../models/Shorter';
import {generateShortUrl} from '../helpers/constants';
import {UrlData} from '../types';
import mongoose from 'mongoose';

const linksRouter = express.Router();

linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Shorter.findOne({shortUrl});

    if (!url) {
      return res.status(404).send({error: 'Link not found!'});
    }

    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
});

linksRouter.post('/',  async (req, res, next) => {
  try {
    const originalUrl = req.body.originalUrl;
    const shortUrl = generateShortUrl();

    const existingShortUrl = await Shorter.findOne({shortUrl});

    if (existingShortUrl) {
      return res.status(500).send({error: 'Short URL already exists!'});
    }

    const urlData: UrlData = {
      shortUrl,
      originalUrl
    };

    const url = new Shorter(urlData);
    await url.save();

    return res.send(url);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default linksRouter;