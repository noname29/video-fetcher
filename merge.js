const iterator = 311;
async function* concatStreams(readables) {
  for (const readable of readables) {
    for await (const chunk of readable) { yield chunk }
  }
} 

const fs = require('fs')
const stream = require('stream')
var files = [];

for(var i = 0; i < iterator; i++) {
	
	files.push("video" + i + ".ts")
}

console.dir(files, {depth: null})

async function merge() {
	
	const iterable = await concatStreams(files.map(f => fs.createReadStream(f))) 
	 
	// convert the async iterable to a readable stream 
	const mergedStream = stream.Readable.from(iterable) 

	
	let writer = fs.createWriteStream('march22.mp4') 
	mergedStream.pipe(writer)

}

merge()