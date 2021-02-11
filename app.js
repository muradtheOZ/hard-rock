const searchValue = async (name) => {
    const url = (`https://api.lyrics.ovh/suggest/${name}`);
    const errorMessage = document.getElementById("eroor");
    errorMessage.style.display = "none";
    const musicMain = document.getElementById("musicShow");
        musicMain.style.display = "block"
    try{
        const res = await fetch(url);
        const data = await res.json();
        showMusic(data.data); 
    }
    catch(error){
        const errorMessage = document.getElementById("eroor");
        errorMessage.style.display = "block";
        errorMessage.innerText =  "Please try search with different name";
        const musicMain = document.getElementById("musicShow");
        musicMain.style.display = "none"
        
    }

    
    const inputValue = document.getElementById("searchBox").value = "";

}
const searchSong = () => {
    const inputValue = document.getElementById("searchBox").value;
    searchValue(inputValue);
    const  makeEmpty = document.getElementById("singleLyrics");
    makeEmpty.innerText = "";
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
    const url = `http://api.lyrics.ovh/v1/${artist}/${title}`
    try{
        const res = await fetch(url);
        const data = await res.json();
    
        let lyrics = document.getElementById("singleLyrics")
        lyrics.innerText = (data.lyrics);

    }
    catch(error){
        const errorMessage = document.getElementById('eroor');
        errorMessage.innerText = "This Music lyrics is not available";
        errorMessage.style.display = "block";
    }
  

}
