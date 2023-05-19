import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import counterModel from './models/counterModel.js';
import linkModel from './models/linkModel.js';


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => { console.log('connected!') })
    .catch((err) => { console.log(err) });



app.post('/', async (req, res) => {
    const link = await linkModel.find({ link: req.body.link });
    if (link.length > 0) {
        return res.status(201).json({ message: `link nay da ton tai link rut gon: ${link[0].shortedLink}` });
    }
    var counter = await counterModel.findById('linkId');
    if (!counter) {
        counter = new counterModel({ _id: 'linkId' });
        counter.save();
    }

    var ret = await counterModel.findById({ _id: 'linkId' });
    ret.seq++;
    ret.save();

    const newShortedLink = new linkModel({
        link: req.body.link,
        shortedLink: `http://localhost:3000/${ret.seq}`
    });
    newShortedLink.save();

    res.status(200).json({
        shortedLink: newShortedLink.shortedLink
    });
});

app.get('/:id', async (req, res) => {
    const result = await linkModel.find({ shortedLink: `http://localhost:3000/${req.params.id}` });
    if (result.length === 0) {
        return res.status(400).json({ message: 'link is invalid' });
    }

    res.redirect(result[0].link);
});

app.get('/', async (req, res) => {
    const listShortedLink = await linkModel.find({}, { _id: 0 });
    res.status(200).json(listShortedLink);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});