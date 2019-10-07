import { useState, useRef, useEffect, useReducer } from "react";
import { loadAllAudio } from "../lib";

export const useMusic = (files, autoPlay = false) => {
  const tracks = useRef({});
  const [loading, setLoading] = useState(true);

  // This play track is set to play only one at a time for the samples page
  const [playing, playTrack] = useReducer((playing, track) => {
    if (playing) tracks.current[playing].volume = 0;
    tracks.current[track].volume = 1;
    console.log(playing, track);
    return track;
  });

  useEffect(() => {
    (async () => {
      const t = await loadAllAudio(files);
      t.forEach(track => {
        track.volume = 0;
        track.loop = true;
      });
      t.forEach(track =>
        track.play().catch(e => {
          const permissionEvent = () => {
            track.play();
            document.body.removeEventListener("click", permissionEvent);
          };
          document.body.addEventListener("click", permissionEvent);
        })
      );
      let [BASS, DRUMS, PERCUSSION, SAMPLER] = t;
      tracks.current = { BASS, DRUMS, PERCUSSION, SAMPLER };
      setLoading(false);
    })();
    return () => {
      Object.keys(tracks.current).forEach(key => {
        console.log("stopping ", key);
        tracks.current[key].volume = 0;
        tracks.current[key].src = null;
      });
      tracks.current = {};
    };
  }, []);

  return {
    tracks: tracks.current,
    loading,
    playing,
    playTrack
  };
};
