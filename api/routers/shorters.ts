import express from 'express';
import Shorter from '../models/Shorter';

const shortersRouter = express.Router();

shortersRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const shortUrl = req.params.shortUrl;
    const url = await Shorter.findOne({shortUrl});

    if (!url) {
      return res.status(404).send({error: 'Link not found'});
    }

    res.status(301).redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
});


shortersRouter.post('/', (req, res, next) => {

});

export default shortersRouter;