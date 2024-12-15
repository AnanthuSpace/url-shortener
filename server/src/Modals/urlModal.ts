import { model, Schema } from "mongoose";
import { IUrl } from "../Interfaces/common.interface";

const UrlSchema = new Schema<IUrl>({
    shortUrl: {
        type: String,
        required: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UrlModel = model<IUrl>("Url", UrlSchema);

export default UrlModel;
