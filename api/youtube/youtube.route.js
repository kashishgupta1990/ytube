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

//Routs Lists
module.exports = [
    {
        path: '/api/v1/youtube/{youtubeUrl}',
        method: ['GET'],
        config: {
            description: 'Fetch Youtube Video Data',
            notes: 'Fetch Youtube Video Data',
            tags: ['api'],
            validate: {
                params: {
                    youtubeUrl: Joi.string().regex(/(v=[A-Za-z0-9_@./#&+-]*)\w+/g).required()
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
                        return reply(info);
                    }
                });
            }
        }
    }
];