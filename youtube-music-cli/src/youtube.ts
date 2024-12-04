// src/youtube.ts

import axios from "axios";
import * as dotenv from "dotenv";
import ytdl from "ytdl-core";

dotenv.config();

const apiKey = process.env.YOUTUBE_API_KEY;
const baseUrl = "https://www.googleapis.com/youtube/v3";

export const searchVideo = async (query: string) => {
  try {
    const response = await axios.get(`${baseUrl}/search`, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        key: apiKey,
        maxResults: 1,
      },
    });

    const video = response.data.items[0];
    return {
      title: video.snippet.title,
      videoId: video.id.videoId,
      url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    };
  } catch (error) {
    throw new Error("Failed to search video");
  }
};

export const playVideo = (url: string) => {
  ytdl(url, { filter: "audioonly" })
    .pipe(process.stdout)
    .on("error", (err) => console.error("Error playing video:", err))
    .on("finish", () => console.log("Finished playing"));
};
