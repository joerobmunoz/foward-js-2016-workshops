function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

var responses = { }

function setFired(file) {
	output(file)
	responses[file] = "fired"
}

function firePrevious(file) {
	// check if previous dictionary key exists and is not "fired", then fire previous
	var previousFileName = "file" + (file.split('').pop()-1).toString();
	// output('fire previous ' + previousFileName)
	if (previousFileName in responses) {
		if (responses[previousFileName] != "fired") {
			setFired(previousFileName)
		}

		fireNext(previousFileName)
	}
}

function fireNext(file) {
	// console.log('fire next file: ' + file)
	var next = 'file' + (parseInt(file.split('').pop())+1).toString();
	if ((next in responses)) {
		setFired(next)
		fireNext(next)
	}
}

function getFile(file) {
	fakeAjax(file, function(text) {
		// what do we do here?
		if (responses[file] != "fired") {
			responses[file] = text 
		}

		if (file.split('').pop() == 1) {
			setFired(file)
			fireNext(file)
		} else {
			firePrevious(file)
		}
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
