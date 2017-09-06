var fs = require('fs');
var formidable = require('formidable');
function start(req,res) {
   var body = '<html>' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<title>图片上传</title>' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="upload file"> ' +
        '</form> ' +
        '</body>' +
        '</html>';
   res.writeHead(200,{"content-type":"text/html"});
   res.write(body);
   res.end();
}
function upload(req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err){
            res.writeHead(500,{"content-type":"text/plain"});
            res.write(err+"\n");
            res.end();
        }
        //form.uploadDir = "temp";    //设置文件接收后保存的文件夹
        //fs.renameSync(files.upload.path,"temp/new.jpg"); 跨区操作时会出现问题
        var is = fs.createReadStream(files.upload.path);
        var os = fs.createWriteStream('temp/test.jpg');

        is.pipe(os);
        is.on('end',function() {
            fs.unlinkSync(files.upload.path);
        });

        res.writeHead(200, {"content-type": "text/html"});
        res.write("<img src='/show'>");
        res.end();
    });
}
function show(req,res){

   fs.readFile("temp/test.jpg","binary",function(err,file){
      if(err){
         res.writeHead(500,{"content-type":"text/plain"});
         res.write(err+"\n");
         res.end();
      }
      else{
         res.writeHead(200,{"content-type":"image/jpg"});
         res.write(file,'binary');
         res.end();
      }
   });
}
exports.start = start;
exports.upload = upload;
exports.show = show;