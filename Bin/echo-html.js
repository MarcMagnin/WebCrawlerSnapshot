var webPage = require('webpage');
var page = webPage.create();
page.settings.resourceTimeout = 50000;
phantom.outputEncoding = "System";
var system = require('system');
var args = system.args;

//if (args.length === 1) {
//    console.log('Try to pass some arguments when invoking this script!');
//} else {
//    args.forEach(function (arg, i) {
//        console.log(i + ': ' + arg);
//    });
//}


page.onCallback = function () {
    console.log(page.content);
    phantom.exit();
};
page.onError = function (msg, trace) {
    var msgStack = ['ERROR: ' + msg];

    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
        });
    }

    console.error(msgStack.join('\n'));
    phantom.exit();
};
page.onResourceTimeout = function (request) {
    console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
    phantom.exit();
};
// console.log(args[1]);
// phantom.exit();
page.open(args[1], function (status) {
    //console.log('Status: ' + status);
});



//function helloWorld() {
//    console.log(phantom.outputEncoding + ": Benoît éà");
//}
//console.log(phantom.outputEncoding + ": æøå");

//helloWorld();

//console.log("\nUsing other encodings...");

//var encodings = ["euc-jp", "sjis", "utf8", "System"];
//for (var i = 0; i < encodings.length; i++) {
//    phantom.outputEncoding = encodings[i];
//    helloWorld();
//}