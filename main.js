
const key = 'AIzaSyApe7HWoD5ubrzYypEuAyR5JTWVaMpvK9E';
const playlistId = 'PLQ6yLYmD-IdauG6YO6fDpcXJDONfPj_C8';
var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';

const options = {
    part: 'snippet',
    key: key,
    maxResults: 20,
    playlistId : playlistId
}

window.addEventListener('load', () => {
    URL += '?' + Object.keys(options).map((k) => k + '=' + encodeURIComponent(options[k])).join('&');

    fetch (URL, {
        method: "GET",
        withCredentials: true,
        headers: {
            options
        }
    })
    .then (response => response.json())
    .then (data => {
        console.log (data);

        var id = data.items[0].snippet.resourceId.videoId;
        mainVid(id);

        console.log(id);

        resultsLoop(data);

    }) 
    
    .catch(err => console.log(`error:::: ${err}`))


})

function mainVid(id) {
    document.getElementById('video').innerHTML = 
    `
    <iframe width="560" 
        height="315" 
        src="https://www.youtube.com/embed/${id}" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; 
        gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
    `
}

function resultsLoop(data) {

    data.items.forEach((item, i) => {

        var thumb = item.snippet.thumbnails.medium.url;
        var title = item.snippet.title;
        var desc = item.snippet.description.substring(0, 100);
        var vid = item.snippet.resourceId.videoId;


        var article = document.createElement("article");
        article.innerHTML =
        `
            <img src="${thumb}" alt="" class="thumb">
    
            <div class="details">
                <h4>${title}</h4>
                <p> ${desc} </p>
            </div>
        `
        document.getElementsByTagName('main')[0].appendChild(article);
        document.getElementsByTagName("article")[i].classList.add("item");
        document.getElementsByTagName("article")[i].setAttribute("data-key", `${vid}`)
        

        var el = document.getElementsByTagName("article")[i];
        el.addEventListener("click", () => {
        console.log(` vid ${i}: ${vid}`)

        mainVid(vid);

    })
  });
 
}










