import { Schema, model } from "mongoose";


const visitHistorySchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);

const urlSchema = new Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    visitHistory: [visitHistorySchema],
  },
    {
        timestamps: true, 
        versionKey: false,
  }
);


export const Url = model("Url", urlSchema);