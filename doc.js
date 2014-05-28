/*
 * fis-command-doc
 * https://github.com/kaven85
 * @author Kaven.D
 */

'use strict';

exports.name = 'doc';
exports.desc = 'output api html';
var Y=require('yuidocjs'),json
exports.register = function(commander){
    commander
        .option('--doc', 'output api html', String)
        .action(function(){
			var options = arguments[arguments.length - 1],root,filename='fis-conf.js',conf;
            if(options.root){
                root = fis.util.realpath(options.root);
                if(fis.util.isDir(root)){
                    if(!conf && fis.util.isFile(root + '/' + filename)){
                        conf = root + '/' + filename;
                    }
                    delete options.root;
                } else {
                    fis.log.error('invalid project root path [' + options.root + ']');
                }
            } else {
                root = fis.util.realpath(process.cwd());
                if(!conf){
                    //try to find fis-conf.js
                    var cwd = root, pos = cwd.length;
                    do {
                        cwd  = cwd.substring(0, pos);
                        conf = cwd + '/' + filename;
                        if(fis.util.exists(conf)){
                            root = cwd;
                            break;
                        } else {
                            conf = false;
                            pos = cwd.lastIndexOf('/');
                        }
                    } while(pos > 0);
                }
            }
            process.title = 'fis ' + process.argv.splice(2).join(' ') + ' [ ' + root + ' ]';
            if(conf){
                var cache = fis.cache(conf, 'conf');
                if(!cache.revert()){
                    options.clean = true;
                    cache.save();
                }
                require(conf);
            } else {
                fis.log.warning('missing config file [' + filename + ']');
            }
            options=fis.config.get('settings.yuidoc.options')
            var starttime = Date.now();
            if(options&&options['paths']&&options['outdir']){
                if(options['paths'].constructor ==String){
                    options['paths']=[options['paths']];
                }
                try {
                    json = (new Y.YUIDoc(options)).run();
                } catch(e) {
                    console.error(e);
                }
                options = Y.Project.mix(json, options);
                var builder = new Y.DocBuilder(options, json);
                builder.compile(function() {
                    var endtime = Date.now();
                    console.log('YUIDoc compile completed in ' + ((endtime - starttime) / 1000) + ' seconds');
                });
            }
        });
};