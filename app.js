// dom elements
var elements = {
    musicContainer: document.getElementById('music-container'),
    playBtn: document.getElementById('play'),
    prevBtn: document.getElementById('prev'),
    nextBtn: document.getElementById('next'),
    audio: document.getElementById('audio'),
    progress: document.getElementById('progress'),
    progressContainer: document.getElementById('progress-container'),
    title: document.getElementById('title'),
    cover: document.getElementById('cover')
};
var nowPlaying = 'ukulele';
var songs = ['summer', 'ukulele', 'hey'];
// functions
var play = function () {
    elements.audio.play();
    elements.musicContainer.classList.add('play');
    if (document.querySelector('.fa-play')) {
        document
            .querySelector('.fa-play')
            .classList.replace('fa-play', 'fa-pause');
    }
};
var pause = function () {
    elements.audio.pause();
    elements.musicContainer.classList.remove('play');
    if (document.querySelector('.fa-pause')) {
        document
            .querySelector('.fa-pause')
            .classList.replace('fa-pause', 'fa-play');
    }
};
var displaySongInfo = function () {
    elements.cover.src = "images/" + nowPlaying + ".jpg";
    elements.title.textContent = "" + nowPlaying.toUpperCase();
};
var togglePlayback = function () {
    displaySongInfo();
    if (elements.audio.paused) {
        play();
    }
    else {
        pause();
    }
};
var previousSong = function () {
    if (!elements.audio.paused)
        pause();
    if (songs.indexOf(nowPlaying) === 0)
        nowPlaying = songs[songs.length - 1];
    else
        nowPlaying = songs[songs.indexOf(nowPlaying) - 1];
    elements.audio.src = "music/" + nowPlaying + ".mp3";
    displaySongInfo();
    play();
};
var nextSong = function () {
    if (!elements.audio.paused)
        pause();
    if (songs.indexOf(nowPlaying) === songs.length - 1)
        nowPlaying = songs[0];
    else
        nowPlaying = songs[songs.indexOf(nowPlaying) + 1];
    elements.audio.src = "music/" + nowPlaying + ".mp3";
    displaySongInfo();
    play();
};
var progressSong = function () {
    elements.progress.style.width = (100 * elements.audio.currentTime) / elements.audio.duration + "%";
};
var skipTime = function (time) {
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
elements.progressContainer.addEventListener('click', function (e) {
    var time = (e.offsetX * elements.audio.duration) /
        elements.progressContainer.offsetWidth;
    skipTime(time);
});
// progress through
elements.audio.addEventListener('timeupdate', progressSong);
// ended
elements.audio.addEventListener('ended', nextSong);
