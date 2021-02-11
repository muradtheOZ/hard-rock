const searchValue = (name) =>{
    const url = (`https://api.lyrics.ovh/suggest/${name}`)
    fetch (url)
    .then (res => res.json())
    .then (data => showMusic(data.data));
}
const searchSong = () =>{
    const inputValue = document.getElementById("searchBox").value;
    searchValue(inputValue);

    
}

const showMusic = (data) =>{
    const musicMain = document.getElementById("musicShow");
    data.forEach(element => {
        console.log(element);
        let musicInfo = document.createElement('div');
        musicInfo.className = "single-result row align-items-center my-3 p-3";
      let singleMusicInfo = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${element.album.title}</h3>
                        <p class="author lead">Album by <span>${element.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success">Get Lyrics</button>
                    </div>
       `;
       musicInfo.innerHTML = singleMusicInfo;
       console.log(musicInfo);
       musicMain.appendChild(musicInfo);
    });
}
