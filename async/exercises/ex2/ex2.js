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

function getFile(file) {
	// what do we do here?
	var response,
		fn;

	// Both code blocks below can occur
		// Add conditionals to care both either case occuring first
		// keep a reference to the sibling event in the function scope
	fakeAjax(file, function(resp) {
		response = resp
		if (fn)  fn(response)
	});

	return function thunk(cb) {
		fn = cb
		if (response) fn(response)
	}
}

// request all files at once in "parallel"
// ???


var th1 = getFile('file1');
var th2 = getFile('file2');
var th3 = getFile('file3');


// We don't want to think about 'time', so encapsulate it in thunks
th1(function(text1) {
	output(text1);
	th2(function(text2) {
		output(text2);
		th3(function(text3) {
			output(text3);
			output("Complete!");
		})
	})
})