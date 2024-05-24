// components/AudioPlayer.js
import React, { useState, useRef, useEffect } from 'react';

const songs = [
  {
    title: "Star Shopping",
    artist: "Lil Peep",
    url: "/songs/star-shopping.mp3",
    cover: "/images/star-shopping-cover.webp"
  },
  {
    title: "No Idea",
    artist: "Don Toliver",
    url: "/songs/no-idea.mp3",
    cover: "/images/no-idea-cover.webp"
  }
];

const AudioPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveform, setWaveform] = useState(new Array(6).fill(2));
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      updateWaveform();
    }
  }, [isPlaying]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    setDuration(audio.duration);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const updateWaveform = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const newWaveform = Array.from(dataArrayRef.current.slice(0, 6)).map(value => Math.max(2, value / 16));
      setWaveform(newWaveform);
      requestAnimationFrame(updateWaveform);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [currentSongIndex]);

  return (
    <div>
      <audio ref={audioRef} src={songs[currentSongIndex].url} />
      <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div>
        <span>{Math.floor(progress / 60)}:{('0' + Math.floor(progress % 60)).slice(-2)}</span>
        /
        <span>{Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={(e) => {
          const audio = audioRef.current;
          audio.currentTime = e.target.value;
          setProgress(e.target.value);
        }}
      />
      <div className="flex items-center gap-1">
        {waveform.map((height, index) => (
          <span key={index} className="w-[2px] bg-purple-500 rounded-full" style={{ height: `${height}px` }}></span>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
