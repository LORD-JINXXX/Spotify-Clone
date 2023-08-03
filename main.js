// Initialize the variables


let songIndex = 0;
let audioElement = new Audio('songs/Bekhayali.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let timeLeft = document.getElementById('timeLeft');
let timeFinished = document.getElementById('timeFinished');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songInfo = Array.from(document.getElementsByClassName('songInfo'));
let songTitle = document.getElementById('songTitle');


let songs = [
    { songName : "Bekhayali", filePath : "songs/Bekhayali.mp3", coverPath : "cover/1.jpg", songDuration : "06:11" },
    { songName : "Dusk Till Dawn", filePath : "songs/Dusk Till Dawn.mp3", coverPath : "cover/2.jpg", songDuration : "03:55" },
    { songName : "Enemy", filePath : "songs/Enemy.mp3", coverPath : "cover/3.jpg", songDuration : "03:33" },
    { songName : "Ghungroo", filePath : "songs/Ghungroo.mp3", coverPath : "cover/4.jpg", songDuration : "05:03" },
    { songName : "Hall of Fame", filePath : "songs/Hall of Fame.mp3", coverPath : "cover/5.jpg", songDuration : "03:22" },
    { songName : "Kya Mujhe Pyaar Hai", filePath : "songs/Kya Mujhe Pyaar Hai.mp3", coverPath : "cover/6.jpg", songDuration : "04:26" },
    { songName : "Mehram", filePath : "songs/Mehram.mp3", coverPath : "cover/7.jpg", songDuration : "03:47" },
    { songName : "Pal", filePath : "songs/Pal.mp3", coverPath : "cover/8.jpg", songDuration : "04:07" },
    { songName : "Tu Hi Meri Shab Hai", filePath : "songs/Tu Hi Meri Shab Hai.mp3", coverPath : "cover/9.jpg", songDuration : "06:27" },
    { songName : "Unstoppable", filePath : "songs/Unstoppable.mp3", coverPath : "cover/10.jpg", songDuration : "04:06" }

]


// Getting all songs name,cover and duration

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerText = songs[i].songDuration;
})




// Handle Play and Pause,

masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-circle-play');
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        makeAllPlay();
    }
    }
)


// Handle Progress Bar, duration and runtime

audioElement.addEventListener('timeupdate', () =>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    timeFinishedMin = parseInt((audioElement.currentTime)/60);
    timeFinishedSec = parseInt((audioElement.currentTime)%60);

    if (timeFinishedSec<10){
        timeFinishedSec = '0' + timeFinishedSec;
    }
    else {
        timeFinishedSec = '' + timeFinishedSec;
    }
    if (timeFinishedMin<10){
        timeFinishedMin = '0' + timeFinishedMin;
    }
    else {
        timeFinishedMin = '' + timeFinishedMin;
    }
    timeFinished.innerHTML = `${timeFinishedMin}:${timeFinishedSec}`;

    timeLeftMin = parseInt((audioElement.duration - audioElement.currentTime)/60);
    timeLeftSec = parseInt((audioElement.duration - audioElement.currentTime)%60);
    //timeLeft.innerHTML  = timeLeftMin + ':' + timeLeftSec;
    if (timeLeftSec<10){
        timeLeftSec = '0' + timeLeftSec;
    }
    else {
        timeLeftSec = '' + timeLeftSec;
    }
    if (timeLeftMin<10){
        timeLeftMin = '0' + timeLeftMin;
    }
    else {
        timeLeftMin = '' + timeLeftMin;
    }
    timeLeft.innerHTML = `${timeLeftMin}:${timeLeftSec}`;
})


myProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = (myProgressBar.value*audioElement.duration/100);
})

// handling small play bottom adjacent to song duration in song list




Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{

    element.addEventListener('click',(e)=>{

        songIndex = parseInt(e.target.id);
        song_name = songs[songIndex].songName;
        audioElement.src = `songs/${song_name}.mp3`;
        audioElement.currentTime = 0;

        if (audioElement.paused) {
            audioElement.play();
            makeAllPlay();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity=1;
        }

        else {
            audioElement.pause();
            makeAllPlay();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity=0;
        }
        
        songTitle.innerText = songs[songIndex].songName;

    })  
    
    
})

const makeAllPlay = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((e)=>{
        e.classList.add('fa-circle-play');
        e.classList.remove('fa-circle-pause');
    })
}


document.getElementById('next').addEventListener('click',()=>{
    if (songIndex>=9) {
        songIndex=0;
    }
    else {
        songIndex += 1;
    }
    makeAllPlay();
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-circle-play');
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-circle-pause');

    song_name = songs[songIndex].songName;
    audioElement.src = `songs/${song_name}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songTitle.innerText = songs[songIndex].songName;
    if (audioElement.play) {
        gif.style.opacity=1;
    }
    else {
        gif.style.opacity=0;
    }
})

document.getElementById('previous').addEventListener('click',()=>{
    if (songIndex<=0) {
        songIndex=0;
    }
    else {
        songIndex -= 1;
    }
    makeAllPlay();
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.remove('fa-circle-play');
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex].classList.add('fa-circle-pause');

    song_name = songs[songIndex].songName;
    audioElement.src = `songs/${song_name}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    songTitle.innerText = songs[songIndex].songName;
    if (audioElement.play) {
        gif.style.opacity=1;
    }
    else {
        gif.style.opacity=0;
    }
})
