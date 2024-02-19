import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Howl, Howler } from 'howler';
import { NotificationsSetIsPlaying } from '../store/actions/notifications.action';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  ringerTimeout = 30000;

  constructor(private store: Store) {}

  playHowl(soundPath: string, loop = false) {
    const howl = new Howl({
      src: [soundPath],
      loop: loop,
    });

    if (loop) {
      setTimeout(() => {
        const result = howl.play();
        console.log('Play Howl:', result);
        this.store.dispatch(new NotificationsSetIsPlaying(true));

        setTimeout(() => {
          Howler.stop(result);
          this.store.dispatch(new NotificationsSetIsPlaying(false));
          console.log('Stop Howl loop');
        }, this.ringerTimeout);
      }, 1000);
    } else {
      const result = howl.play();
    }
  }

  stopHowl() {
    Howler.stop();
    this.store.dispatch(new NotificationsSetIsPlaying(false));
    // console.log('Stop Howl');
  }

  playSound(soundPath) {
    const audio = new Audio();
    audio.src = soundPath;
    audio.load();
    audio
      .play()
      .then((res) => {})
      .catch((err) => {
        console.log('Audio Play Error:', err);
      });
  }
}
