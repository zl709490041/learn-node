/**
 * Created by dell on 2017/8/30.
 */
function route(handle,pathname,request,response) {
    if (typeof(handle[pathname]) === 'function') {
        handle[pathname](request, response);
    } else {
        response.writeHead(404, {"content-type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;
