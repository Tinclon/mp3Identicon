// https://github.com/donpark/identicon/tree/master/identicon-canvas
// https://github.com/stewartlord/identicon.js/blob/master/identicon.js
// https://jdenticon.com/

var hashes = [];

function render(index, files, file, isMp3) {
	const fs = require("fs"),
        md5File = require("md5-file"),
        hash = parseInt(md5File.sync("./mp3s/" + file + (isMp3 ? ".mp3" : ".m4a")).substr(-8), 16),
        render_identicon = require("./identicon_canvas.js");

    hashes.push({file: file, hash: hash});
    
    try {
        const Canvas = require("canvas"),
            canvas = new Canvas(600, 600),
            ctx = canvas.getContext("2d");

        render_identicon(ctx, hash, 600);

        const out = fs.createWriteStream("./mp3s/" + file + ".png"),
            stream = canvas.pngStream();

        stream.on("data", chunk => out.write(chunk));
        stream.on("end", () => renderAll(index + 1, files));
    } catch (e) {
        renderAll(index + 1, files);
    }
}

function renderAll(index, files) {
    if(index >= files.length) { return; }
    if(files[index].toLowerCase().indexOf(".mp3") === -1 &&
        files[index].toLowerCase().indexOf(".m4a") === -1) {
        renderAll(index+1, files);
        return;
    }

    if(index % 100 === 0) { console.error("index: " + index); }

	render(index, files, files[index].replace(/.mp3/i,"").replace(/.m4a/i,""), files[index].toLowerCase().indexOf(".mp3") !== -1);
}

function readFilesAndRender() {
    const fs = require("fs"),
        files = fs.readdirSync("./mp3s");
    renderAll(0, files);
    
    var identicon_canvas_test;
    try {
    	fs.readFile("identicon_canvas_test.html", "utf8", function read(err, data) {
		    identicon_canvas_test = data;
			var startIndex = identicon_canvas_test.indexOf("/* START FILEHASHES */");
			var endIndex = identicon_canvas_test.indexOf("/* END FILEHASHES */");
			identicon_canvas_test = identicon_canvas_test.substring(0, startIndex + 24) +
				"var fileHashes = " + JSON.stringify(hashes) + ";" +
				identicon_canvas_test.substring(endIndex - 2);
			try {
				fs.writeFile("identicon_canvas_test.html", identicon_canvas_test);
			} catch (e) {
			}  		    
		});
    } catch (e) {
    }
    
}

readFilesAndRender();