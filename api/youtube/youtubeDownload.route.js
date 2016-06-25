"use strict";

const Joi = require('joi');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const youtubedl = require('youtube-dl');
const YOUTUBE_HOST_NAME = 'www.youtube.com';

/*var dao = {
 user: require(path.join(global._APP_DIR, 'dao', 'modules', 'User'))
 };*/

// Private Function
function downloadVideo(videoLink, index, info, reply) {
    var videoObject = info.formats[index];
    var videoFileName = info.title + '.' + videoObject.ext.split(' ').join('_');
    var videoUrlParse = querystring.parse(info.formats[index].url);
    var video = youtubedl(videoLink,

        // Optional arguments passed to youtube-dl.
        ['--format=' + videoObject.format_id]);

    reply(video)
        .header('Content-disposition', 'attachment; filename=' + videoFileName)
        .header('Content-Type', videoUrlParse.mime);
}

//Routs Lists
module.exports = [
    {
        path: '/api/v1/youtube/download/{videoIndex}/{youtubeUrl}',
        method: ['GET'],
        config: {
            description: 'Fetch Youtube Video Data',
            notes: 'Fetch Youtube Video Data',
            tags: ['api'],
            validate: {
                params: {
                    youtubeUrl: Joi.string().regex(/(v=[A-Za-z0-9_@./#&+-]*)\w+/g).required(),
                    videoIndex: Joi.string().required()
                }
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            handler: function (request, reply) {
                const urlObject = url.parse(request.params.youtubeUrl);
                const queryStringObject = querystring.parse(urlObject.query);
                var videoLink = path.join(YOUTUBE_HOST_NAME, 'watch');
                videoLink = 'https://' + videoLink;
                videoLink += '?v=' + queryStringObject.v;
                youtubedl.getInfo(videoLink, (err, info)=> {
                    if (err) {
                        return reply({
                            url: videoLink,
                            err: err
                        });
                    } else {
                        console.log('>>>> success');
                        return downloadVideo(videoLink, request.params.videoIndex, info, reply);
                    }
                });

            }
        }
    }
];