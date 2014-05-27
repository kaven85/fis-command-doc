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
            var options=fis.config.get('settings.yuidoc.options')
            var starttime = Date.now();
            if(options['paths']&&options['outdir']){
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
//                    done();
                });
            }
        });
};