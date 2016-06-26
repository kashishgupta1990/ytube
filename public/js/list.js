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
            var trElement = $('#videoList');
            trElement.empty();
            var tdElement = '';
            $.each(videoList, function (index, videoObject) {
                var downloadLink = '/api/v1/youtube/download/' + index + '/' + encodeURIComponent(videoInfo.webpage_url);
                var base64EncodeDownloadLink = btoa(downloadLink);
                var base64EncodePoster;
                if (videoInfo.thumbnails && videoInfo.thumbnails.length > 0) {
                    base64EncodePoster = btoa(videoInfo.thumbnails[0].url);
                }else{
                    base64EncodePoster = 'empty';
                }
                var mimeType = getQueryParamFromUrl(videoObject.url)["mime"];
                tdElement +=
                    '<tr>' +
                    '<td> ' + (index + 1) + '</td>' +
                    '<td>' + videoObject.format + '</td>' +
                    '<td>' + Math.round(videoObject.filesize / 1024) + ' MB </td>' +
                    '<td>' + videoObject.ext + '</td>' +
                    '<td><a target="_blank" href="' + downloadLink + '">Download</a></td>' +
                    '<td><a target="_blank" href="/watch.html?poster=' + base64EncodePoster + '&mime=' + mimeType + '&data=' + base64EncodeDownloadLink + '">Play Now</a></td>' +
                    '</tr>';
            });
            trElement.append(tdElement);
            UI.showTable();
        },
        setVideoTitle: function (response) {
            var videoTitle = $('#videoName');
            videoTitle.empty();
            videoTitle.html(response.fulltitle);
        },
        showTable: function () {
            $('#tableBlock').removeClass('hide');
        },
        hideTable: function () {
            $('#tableBlock').addClass('hide');
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
                var msgObject = JSON.parse(err.responseText);
                console.log(msgObject.message);
                alert(msgObject.message);
            };
            API.getVideoInfo(txtYoutubeUrl, _success, _fail);
        },
        getVideoInfo: function (youtubeUrl, success, fail) {
            if (youtubeUrl.trim()) {
                $.ajax({
                        url: "/api/v1/youtube/" + encodeURIComponent(youtubeUrl),
                        dataType: 'json',
                        type: "GET"
                    })
                    .done(success)
                    .fail(fail);
            } else {
                alert('Field can not left blank.');
            }
        }
    };

    // Process Query Data
    var videoUrl = getQueryParamFromUrl(window.location.href)["data"];
    if (videoUrl) {
        videoUrl = atob(videoUrl);
        $('#txtUrl').val(videoUrl);
        window.API.submitYoutubeUrl();
    }
}
