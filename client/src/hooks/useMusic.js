import { useState, useRef, useEffect, useReducer } from "react";
import { loadAllAudio } from "../lib";

export const useMusic = (files, autoPlay = false) => {
  const tracks = useRef({});
  const [loading, setLoading] = useState(true);

  // This play track is set to play only one at a time for the samples page
  const [playing, playTrack] = useReducer((playing, track) => {
    if (playing) tracks.current[playing].volume = 0;
    tracks.current[track].volume = 1;
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
      let [BASS, DRUMS, PERCUSSION, SAMPLER, SYNTH] = t;
      tracks.current = { BASS, DRUMS, PERCUSSION, SAMPLER, SYNTH };
      setLoading(false);
    })();
    return () => (tracks.current = {});
  }, []);

  return {
    loading,
    playing,
    playTrack
  };
};
