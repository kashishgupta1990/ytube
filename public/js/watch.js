// http://solutions.brightcove.com/bcls/assets/videos/Bird_Titmouse.mp4
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function init() {
    console.log('yoyoyo');
    var videoLink = atob(getUrlVars()["data"]);
    var videoMimeType = getUrlVars()["mime"];
    videoMimeType = decodeURIComponent(videoMimeType);

    console.log('>>> ', videoLink, videoMimeType);
    var videoPlayerDiv = document.getElementById("videoPlayer");

    window.videojs(videoPlayerDiv, {
        controls: true,
        class: 'video-js vjs-default-skin',
        techOrder: ["html5", "flash"]
    }, function () {
        var myPlayer = this;
        console.log('>> Load success');
        myPlayer.src({"type":videoMimeType, "src":videoLink});
        myPlayer.play();
    });
}
$(document).ready(init);