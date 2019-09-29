export const loadAudio = file =>
  new Promise((res, rej) => {
    let sound = new Audio(file);
    sound.onloadeddata = () => res(sound);
    sound.onerror = error => rej(error);
  });

export const loadAllAudio = (files = []) => Promise.all(files.map(loadAudio));
