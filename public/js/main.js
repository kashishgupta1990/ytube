'use strict';

function getQueryParamFromUrl(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// https://www.youtube.com/watch?v=UPZ5FKEB02I
$(document).ready(init);

function init() {
    window.UI = {
        createVideoFormatList: function (videoInfo) {
            var videoList = videoInfo.formats;
            var ulElement = $('#videoList');
            ulElement.empty();
            var liElement = '';
            $.each(videoList, function (index, videoObject) {
                var downloadLink = '/api/v1/youtube/download/' + index + '/' + encodeURIComponent(videoInfo.webpage_url);
                var base64Encode = btoa(downloadLink);
                var mimeType = getQueryParamFromUrl(videoObject.url)["mime"];
                liElement +=
                    '' +
                    '<li>' +
                    '<p><b>Format: </b>' + videoObject.format + '</p>' +
                    '<p><b>File Size (MB): </b>' + videoObject.filesize / 1024 + '</p>' +
                    '<p><b>File Extension: </b>.' + videoObject.ext + '</p>' +
                    '<a target="_blank" href="' + downloadLink + '">Download</a>&nbsp;&nbsp;&nbsp;' +
                    '<a target="_blank" href="/watch.html?mime=' + mimeType + '&data=' + base64Encode + '">Watch Now</a>' +
                    '</li>';
            });
            ulElement.append(liElement);
        },
        setVideoTitle: function (response) {
            var videoTitle = $('#videoName');
            videoTitle.empty();
            videoTitle.html(response.fulltitle);
        }
    };
    window.API = {
        submitYoutubeUrl: function () {
            var txtYoutubeUrl = $('#txtUrl').val();
            var _success = function (response) {
                UI.setVideoTitle(response);
                UI.createVideoFormatList(response)
            };
            var _fail = function (err) {
                console.log(err);
            };
            API.getVideoInfo(txtYoutubeUrl, _success, _fail);
        },
        getVideoInfo: function (youtubeUrl, success, fail) {
            $.ajax({
                    url: "/api/v1/youtube/" + encodeURIComponent(youtubeUrl),
                    dataType: 'json',
                    type: "GET"
                })
                .done(success)
                .fail(fail);
        }
    }
}
