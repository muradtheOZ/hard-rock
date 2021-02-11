const searchValue = async (name) => {
    const url = (`https://api.lyrics.ovh/suggest/${name}`)
    const res = await fetch(url);
    const data = await res.json();
    showMusic(data.data);
    const inputValue = document.getElementById("searchBox").value = "";

}
const searchSong = () => {
    const inputValue = document.getElementById("searchBox").value;
    searchValue(inputValue);
}

const showMusic = (data) => {

    const musicMain = document.getElementById("musicShow");
    musicMain.innerHTML = "";
    data.forEach(element => {
        console.log(element);
        let musicInfo = document.createElement('div');
        musicInfo.className = "single-result row align-items-center my-3 p-3";
        let singleMusicInfo = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${element.title}</h3>
                        <p class="author lead">Album by <span>${element.artist.name}</span></p>
                        <audio controls>
                        <source src="${element.preview}" type="audio/ogg">
                        </audio>
                    </div>
                    
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
       `;
        musicInfo.innerHTML = singleMusicInfo;
        musicMain.appendChild(musicInfo);
    });
}

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(url);
    const data = await res.json();

    let lyrics = document.getElementById("singleLyrics")
    lyrics.innerText = (data.lyrics);

}
