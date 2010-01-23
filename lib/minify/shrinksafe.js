var OS = require("os");
var FILE = require("file");

var packageDir = FILE.path(module.path).dirname().dirname().dirname();
var rhinoPath = packageDir.join("js.jar");
var shinksafePath = packageDir.join("shrinksafe.jar");

exports.compress = function(code, options) {
    options = options || {};
    options.charset = options.charset || "UTF-8";

    var cmd = [
        "java",
        "-cp", rhinoPath,
        "-jar", shinksafePath
    ];
    
    var p = OS.popen(cmd, { charset : options.charset });
    try {
        p.stdin.write(code).close();
        
        if (p.wait() !== 0)
            throw new Error("shrinksafe error: " + p.stderr.read());
    
        return p.stdout.read();
    } finally {
        p.stdin.close();
        p.stdout.close();
        p.stderr.close();
    }
}
