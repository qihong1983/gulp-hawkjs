'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var fs = require('fs');
var path = require('path');

var abc = require('../../abc.json');
module.exports = function (options) {

  return through.obj(function (file, enc, cb) {

    var _that = this;

    if (file.isNull()) {

      this.push(file);

      return cb();

    }

    if (file.isStream()) {

      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));

      return cb();

    }

        Array.prototype.unique = function() {

          var res = [];

          var json = {};

          for (var i = 0; i < this.length; i++) {

            if (!json[this[i]]) {

              res.push(this[i]);

              json[this[i]] = 1;

            }

          }

          return res;

        }
    var HawkJs = {

      init: function (data) {

       // console.log(options);

        this.zhengli = false;

        if (options) {
          this.zhengli = options;
        }

        this.get_all_js = /<script[\s]+(type="text\/javascript"){0,1} src[\s]*=[\s]*"[\w\d\/]*\w*\d*[^?].js"><\/script>/ig;

        this.get_js_content_url = /[\w\d\.\/]+[\w\d]*\.{1}js/gi;

        this.get_combo_url = /<!-- js:start -->([\w\W]*)<!-- js:end -->/gi;

        this.ROOT = __dirname;

        var abc = fs.readFileSync('./abc.json','utf-8');

        abc = JSON.parse(abc);
  
        this.cdn_host = 'http://'+abc.local_host+':'+abc.local_port+abc.mock_online_address+'??';

        return this.procss();

      },

      subJs : function (v) {
          var that = this;
             var js_content = fs.readFileSync('./build/'+v,'utf-8');


              var get_js_re = /require\(\"([\w\-\/]+)\"\)?/gi;

              if (get_js_re.test(js_content)) {
                var replace_js = js_content.replace(get_js_re, function ($0, $1) {
                  // if ($1 == null) {
                  //   return ;
                  // }

                  if ($1) {
                     global.sub_js.push([$1+'.js']);
                     that.subJs($1+'.js');
                  } 
                });
              } else {
                return ;
              }

      },
      procss: function () {

        var that = this;
        
        var file_content = file.contents.toString();

        global.sub_js = [];
        if(that.get_all_js.test(file_content)) {

          var arr = file_content.match(that.get_all_js);

        } else {

          return file_content;

        }

        var css_file_arr = [];

        var css_file_str = that.cdn_host;

        arr = arr.unique();

        arr.forEach(function (v,k) {

          var re_sub = /[\w\d\.]+\/[\w\d]*\.{1}js/gi;


          css_file_arr.push(v.match(that.get_js_content_url));



        });





      css_file_str = that.cdn_host;
        css_file_arr = css_file_arr.unique();


        var require_js_arr = [];
        css_file_arr.forEach(function (v, k){

 
              css_file_arr.push(that.subJs(v));

              // var replace_js = js_content.replace(get_js_re, function ($0, $1) {
              //   console.log($1);

              // });

        });
        global.sub_js = global.sub_js.unique();

        global.sub_js.forEach(function (v, k) {
          css_file_arr.push(v);
        });

        
        css_file_arr.forEach(function (v, k) {
            if (v == undefined) {
              return ;
            }
            if (k < css_file_arr.length - 1) {

              css_file_str +=  v+',';

            } else {

              css_file_str +=  v;

            }

        });



        var data_build = file_content.replace(that.get_all_js, '');

        var build  = data_build.replace(that.get_combo_url,function ($0, $1) {

          $1 = '<script src="'+css_file_str+'" ></script>';

          return $1;

        });



        if (this.zhengli) {
          var re11 = /<script[\s]{0,1}(type=[\"|\']text\/javascript\"|\'){0,1}>([\s]+)(seajs.use){1}([\w\W]+?)<\/script>?/ig;

          var get_script_content = build.replace(re11, function ($0, $1) {

            return $0;
          });

          // //清空script 里的内容 
           var get_script_content = get_script_content.replace(re11, '');


           var get_script_content_arr = build.match(re11);



           var get_script_content_str = '';
          get_script_content_arr.forEach(function (get_script_content_v, get_script_content_k) {


            var get_script_content_v = get_script_content_v.replace(/<script[\s]{0,1}(type=[\"|\']text\/javascript\"|\'){0,1}>/ig,'');
            
            var get_script_content_v = get_script_content_v.replace(/<\/script>/ig,'');
            

            get_script_content_str += get_script_content_v;

          });


          // //获取</body>正则
           var body_re = /<\/body>/gi;

           get_script_content = get_script_content.replace(body_re, '<script>\n'+get_script_content_str+'\n</script>\n</body>');
            


           build = get_script_content;
          return build;
        } else {
           return build;
        }

       
      }

    };

    var content = HawkJs.init(file.contents.toString());
      //todo: 转换代码

      file.contents = new Buffer(content);
      
     // fs.writeFileSync(__dirname+'/html.html', 'html');

      this.push(file);

      cb();

    });

};
