/**
 * Created by dell on 2017/8/30.
 */
var http = require('http');
var url = require('url');
function start(route,handle)
{
    function onrequest(request,response){
        var pathname = url.parse(request.url).pathname;
        route(handle,pathname,request,response);
    }
    http.createServer(onrequest).listen(8080);
}
exports.start = start;