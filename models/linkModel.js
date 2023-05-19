import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema(
    {
        link: String,
        shortedLink: String
    },
    { versionKey: false }
);

const Link = mongoose.model("Link", LinkSchema);
export default Link;