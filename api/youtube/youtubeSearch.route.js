"use strict";

const Joi = require('joi');
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const google = require('google');
google.resultsPerPage = 50;

/*var dao = {
 user: require(path.join(global._APP_DIR, 'dao', 'modules', 'User'))
 };*/

//Routs Lists
module.exports = [
    {
        path: '/api/v1/youtube/search/{videoName}',
        method: ['GET'],
        config: {
            description: 'Search Youtube Video',
            notes: 'Search Youtube Video',
            tags: ['api'],
            validate: {
                params: {
                    videoName: Joi.string().required()
                }
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            handler: function (request, reply) {
                const siteSearch = 'site:youtube.com/watch ';
                const videoName = request.params.videoName;
                var resultList = [];
                google(siteSearch + videoName, function (err, res){
                    if(err){
                        return reply(err);
                    }else{
                        res.links.forEach((data)=>{
                            console.log(data);
                            resultList.push(data);
                        });

                        return reply(resultList);
                    }
                })

            }
        }
    }
];