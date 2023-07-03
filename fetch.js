'use strict';

let videoStitch = require('video-stitch');
const https = require("https");
const fs = require("fs");

// URL of the image
var clipsArray = [];
var allLinksForConcatenate = []
function theLinkGetter(theLink, maxInd){
	for(var i = 0; i <= maxInd; i++){
		var theLinkForDown = theLink + i + '.ts';
		allLinksForConcatenate.push(theLinkForDown)
	}
	console.log(allLinksForConcatenate.length);
}

function downloader(){
	console.log("start download " )
	for(var key in allLinksForConcatenate){
		console.log(`key ${key} ${allLinksForConcatenate[key]}`);
		httpsGetter(key, allLinksForConcatenate[key]);
	}
}
function httpsGetter(key, linkOf){
	https.get(linkOf, (res) => {
	   const path = "video" + key + ".ts";
	   console.log(path)
	   const writeStream = fs.createWriteStream(path);
	   
	   res.pipe(writeStream);

	   writeStream.on("finish", () => {
		  writeStream.close();
		  console.log("Download Completed!");
		  clipsArray.push({"fileName": path})
	   })
	})
}
theLinkGetter('https://svs.sabanciuniv.edu/flash/smil:7732ei1h_1.smil/media_w1778722902_b1068000_', 280);
downloader();
		

console.dir(clipsArray, {depth: null})
