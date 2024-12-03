import { Song } from "./song";

export class Playlist {
  private songs: Song[] = [];

  addSong(song: Song): void {
    this.songs.push(song);
    console.log(`Added song: ${song.title} by ${song.artist}`);
  }

  removeSong(title: string): void {
    const index = this.songs.findIndex(song => song.title === title)
    if (index !== -1) {
      const removedSong = this.songs.splice(index, 1)[0];
      console.log(`Removed song: ${removedSong.title} by ${removedSong.artist}`);
    } else {
      console.log(`Song with title "${title}" not found in the playlist`);
    }
  }

  viewPlaylist(): void {
    if (this.songs.length === 0) {
      console.log(`Your playlist is empty`);
    } else {
      console.log(`Your playlist:`);
      this.songs.forEach((song, index) => {
        console.log(`${index +  1}. ${song.title} by ${song.artist}`);
      })
    }
  }

  playSong(title: string): void {
    const song = this.songs.find(song => song.title === title)
    if (song) {
      console.log(`Playing song: ${song.title} by ${song.artist}`);
    } else {
      console.log(`Song with title "${title}" not found in the playlist`);
    }
  }
}