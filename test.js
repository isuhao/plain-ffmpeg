var FFmpeg = require('./plain-ffmpeg');

testOptionsAreSet = function() {
	if (ffmpeg.input_path === 'test_input_path')
		console.log("Setting input path: OK")
	else
		console.log("Setting input path: FAIL")


	if (ffmpeg.output_path === 'test_output_path')
		console.log("Setting output path: OK")
	else
		console.log("Setting output path: FAIL")


	if (ffmpeg.options.in['-r'] === '24')
		console.log("Setting input option: OK")
	else
		console.log("Setting input opiton: FAIL")

	if (ffmpeg.options.out['-y'] === null)
		console.log("Setting output option: OK")
	else
		console.log("Setting output opiton: FAIL")

	if (ffmpeg._compileOptions().toString() === [ '-r', '-i', 'test_input_path', '-y', 'test_output_path' ].toString())
		// Converting to strings and comparing is not a guarantee,
		// but it's a good enough option for now.
		// TODO: change array comparison method.
		console.log("Compiling options: OK")
	else
		console.log("Compiling options: FAIL")
}

// Test setter methods
console.log('::: Testing setter methods :::');

ffmpeg = new FFmpeg();

ffmpeg.input('test_input_path');
ffmpeg.output('test_output_path');
ffmpeg.out('-y');
ffmpeg.in('-r', '24')

testOptionsAreSet();

// Test constructor
console.log('::: Testing constructor :::')

options = {
	in: {'-r': '24'},
	out: {'-y': null}
}

ffmpeg = new FFmpeg('test_input_path', 'test_output_path', options)

testOptionsAreSet();

// Test progress parser
ffmpeg = new FFmpeg();

progress_string = "frame=  182 fps= 62 q=32766.0 Lsize=     301kB time=00:00:06.00 bitrate= 411.5kbits/s";
progress_obj = {frame: '182', fps: '62', targetSize: '301', timeMark: '00:00:06.00', kbps: '411.5'};

console.log("Parsed progress:");
console.log(ffmpeg._parseProgress(progress_string));

// TODO: test the eventEmiter

ffmpeg = new FFmpeg();
ffmpeg.on('data', function(){})
if ('data' in ffmpeg.proc._events)
	console.log("Binding events OK");
else
	console.log("Binding events FAIL");