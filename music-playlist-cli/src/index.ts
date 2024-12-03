import readline from "readline";
import { Playlist } from "./playlist";
import { Song } from "./song";

const playlist = new Playlist();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mainMenu = () => {
  console.log("Select an option:");
  console.log("1. Add song");
  console.log("2. View playlist"); 
  console.log("3. Remove song");
  console.log("4. Play song");
  console.log("5. Exit");

  rl.question(`Choose an option: `, (Option) => {
    switch (Option) {
      case "1":
        rl.question("Enter song title: ", (title) => {
          rl.question("Enter song artist: ", (artist) => {
            const song = new Song(title, artist);
            playlist.addSong(song);
            mainMenu();
          });
        });
        break;
      case "2":
        playlist.viewPlaylist();
        mainMenu();
        break;
      case "3":
        rl.question("Enter song title to remove: ", (title) => {
          playlist.removeSong(title);
          mainMenu();
        });
        break;
      case "4":
        rl.question("Enter song title to play: ", (title) => {
          playlist.playSong(title);
          mainMenu();
        });
        break;
      case "5":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option");
        mainMenu();
        break;
    }
  });
};

mainMenu();
