// const searchSongs = () => {
//     const searchText = document.getElementById('searchText').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     fetch(url)
//     .then(response => response.json())
//     .then(data => displaySongs(data.data))
//     .catch(error => displayError('Something went wrong... please try again leter'))
// }
const searchSongs = async() => {
    const searchText = document.getElementById('searchText').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }
    catch(error){
        displayError('Something went wrong... please try again leter')
    }
}

const displaySongs = songs => {
    const songContainer = document.getElementById('songContainer');
    songContainer.innerText = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

// const getLyric = (artist, title) => {
//     const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyric(data.lyrics))
// }

const getLyric = async (artist, title) => {
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics);
    }
    catch(error){
        displayError('something worng... please try again leter')
    }
    
}

const displayLyric = lyrics => {
    const lyricsDiv =document.getElementById('songLyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorMassege = document.getElementById('error');
    errorMassege.innerText = error;
}