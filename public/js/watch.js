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
    var videoLink = atob(getUrlVars()["data"]);
    var videoMimeType = getUrlVars()["mime"];
    var videoPoster = getUrlVars()["poster"];
    videoMimeType = decodeURIComponent(videoMimeType);
    if (videoPoster != 'empty') {
        videoPoster = atob(videoPoster);
    }
    var videoPlayerDiv = document.getElementById("videoPlayer");
    var options = {
        controls: true,
        class: 'video-js vjs-default-skin',
        techOrder: ["html5", "flash"]
    };
    if (videoPoster != 'empty') {
        options.poster = videoPoster;
    }
    window.videojs(videoPlayerDiv, options, function () {
        var myPlayer = this;
        myPlayer.src({"type": videoMimeType, "src": videoLink});
    });
}
$(document).ready(init);