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
        createVideoList: function (videoList) {
            var trElement = $('#videoList');
            trElement.empty();
            var tdElement = '';
            $.each(videoList, function (index, video) {
                tdElement +=
                    '<tr>' +
                    '<td> '+(index+1)+'</td>' +
                    '<td><a href="/list.html?data=' + btoa(video.href) + '">video.title</a></td>' +
                    '</tr>';
            });
            trElement.append(tdElement);
            UI.showTable();
        },
        showTable:function(){
            $('#tableBlock').removeClass('hide');
        },
        hideTable:function(){
            $('#tableBlock').addClass('hide');
        }
    };
    window.API = {
        submitKeyword: function () {
            var txtKeyword = $('#txtKeyword').val();
            var _success = function (response) {
                UI.createVideoList(response)
            };
            var _fail = function (err) {
                var msgObject =JSON.parse(err.responseText);
                console.log(msgObject.message);
                alert(msgObject.message);
            };
            API.getKeywordInfo(txtKeyword, _success, _fail);
        },
        getKeywordInfo: function (searchKeyword, success, fail) {
            if(searchKeyword.trim()){
                $.ajax({
                        url: "/api/v1/youtube/search/" + searchKeyword,
                        dataType: 'json',
                        type: "GET"
                    })
                    .done(success)
                    .fail(fail);
            }else{
                alert('Field can not left blank.');
            }
        }
    }
}
