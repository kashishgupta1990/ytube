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
                var base64Encode = btoa(downloadLink);
                var mimeType = getQueryParamFromUrl(videoObject.url)["mime"];
                tdElement +=
                    '<tr>' +
                    '<td> '+(index+1)+'</td>' +
                    '<td>' + videoObject.format + '</td>' +
                    '<td>'+ Math.round(videoObject.filesize / 1024) + ' mb </td>' +
                    '<td>' + videoObject.ext + '</td>' +
                    '<td><a target="_blank" href="' + downloadLink + '">Download</a></td>' +
                    '<td><a target="_blank" href="/watch.html?mime=' + mimeType + '&data=' + base64Encode + '">Watch Now</a></td>' +
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
        showTable:function(){
            $('#tableBlock').removeClass('hide');
        },
        hideTable:function(){
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
