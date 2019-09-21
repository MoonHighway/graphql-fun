import { useState, useEffect } from "react";
import { loadAllAudio } from "../lib";

export const useMusic = files => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    (async () => {
      const tracks = await loadAllAudio(files);
      tracks.forEach(track => {
        track.volume = 0;
        track.loop = true;
      });
      tracks.forEach(track => track.play());
      let [BASS, DRUMS, PERCUSSION, SAMPLER, SYNTH] = tracks;
      setTracks({ BASS, DRUMS, PERCUSSION, SAMPLER, SYNTH });
    })();

    return () => {
      Object.keys(tracks).forEach(instrument => (tracks[instrument].src = ""));
      setTracks([]);
    };
  }, []);

  return {
    tracks,
    loading: tracks.length === 0
  };
};
