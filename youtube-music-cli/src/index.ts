// src/index.ts

import readlineSync from 'readline-sync';
import { searchVideo, playVideo } from "./youtube";

const mainMenu = async () => {
  console.log(`
  1. Search and play a song
  2. Exit
  `);

  const option = readlineSync.question("Choose an option: ");

  switch (option) {
    case "1":
      const query = readlineSync.question("Enter song name: ");
      try {
        const video = await searchVideo(query);
        console.log(`Playing: ${video.title}`);
        playVideo(video.url);
      } catch (error: any) {
        console.error("Error:", error.message);
      }
      mainMenu();
      break;
    case "2":
      console.log("Goodbye!");
      process.exit(0);
      break;
    default:
      console.log("Invalid option");
      mainMenu();
  }
};

mainMenu();
