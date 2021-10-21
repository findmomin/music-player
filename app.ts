// dom elements
const elements = {
  musicContainer: document.getElementById('music-container') as HTMLDivElement,
  playBtn: document.getElementById('play') as HTMLButtonElement,
  prevBtn: document.getElementById('prev') as HTMLButtonElement,
  nextBtn: document.getElementById('next') as HTMLButtonElement,

  audio: document.getElementById('audio') as HTMLAudioElement,
  progress: document.getElementById('progress') as HTMLDivElement,
  progressContainer: document.getElementById(
    'progress-container'
  ) as HTMLDivElement,
  title: document.getElementById('title') as HTMLHeadingElement,
  cover: document.getElementById('cover') as HTMLImageElement,
};

let nowPlaying = 'ukulele';
const songs = ['summer', 'ukulele', 'hey'];

// functions
const play = () => {
  elements.audio.play();

  elements.musicContainer.classList.add('play');

  if (document.querySelector('.fa-play')) {
    document
      .querySelector('.fa-play')!
      .classList.replace('fa-play', 'fa-pause');
  }
};

const pause = () => {
  elements.audio.pause();

  elements.musicContainer.classList.remove('play');

  if (document.querySelector('.fa-pause')) {
    document
      .querySelector('.fa-pause')!
      .classList.replace('fa-pause', 'fa-play');
  }
};

const displaySongInfo = () => {
  elements.cover.src = `images/${nowPlaying}.jpg`;
  elements.title.textContent = `${nowPlaying.toUpperCase()}`;
};

const togglePlayback = () => {
  displaySongInfo();

  if (elements.audio.paused) {
    play();
  } else {
    pause();
  }
};

const previousSong = () => {
  if (!elements.audio.paused) pause();

  if (songs.indexOf(nowPlaying) === 0) nowPlaying = songs[songs.length - 1];
  else nowPlaying = songs[songs.indexOf(nowPlaying) - 1];

  elements.audio.src = `music/${nowPlaying}.mp3`;
  displaySongInfo();

  play();
};

const nextSong = () => {
  if (!elements.audio.paused) pause();

  if (songs.indexOf(nowPlaying) === songs.length - 1) nowPlaying = songs[0];
  else nowPlaying = songs[songs.indexOf(nowPlaying) + 1];

  elements.audio.src = `music/${nowPlaying}.mp3`;
  displaySongInfo();

  play();
};

const progressSong = () => {
  elements.progress.style.width = `${
    (100 * elements.audio.currentTime) / elements.audio.duration
  }%`;
};

const skipTime = (time: number) => {
  elements.audio.currentTime = time;
};

// event handlers
// play
elements.playBtn.addEventListener('click', togglePlayback);

// previous
elements.prevBtn.addEventListener('click', previousSong);

// next
elements.nextBtn.addEventListener('click', nextSong);

// skip
elements.progressContainer.addEventListener('click', e => {
  const time =
    (e.offsetX * elements.audio.duration) /
    elements.progressContainer.offsetWidth;

  skipTime(time);
});

// progress through
elements.audio.addEventListener('timeupdate', progressSong);

// ended
elements.audio.addEventListener('ended', nextSong);
