# js合并

## 安装 

> npm install gulp-hawkjs

## 插件的使用(gulpfile.js)
```javascript
var gulp = require('gulp'),
  hawkjs = require('gulp-hawkjs');

gulp.task('default', function() {
  gulp.src('./*.html')
    .pipe(hawkjs())
    .pipe(gulp.dest('dest/'));
});
```

## 示例html代码

> http://a.cdn.cn/??assets/a1.js,assets/a2.js,assets/a3.js

```html
<!DOCTYPE html>
<html>
<head lang="zh-cmn-Hans">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="assets/mian.css" />
    <!-- css:start -->
    
    <!-- css:end -->
    <script type="text/javascript" src="http://hawk.cdn.cn/??assets/seajs.js,assets/jquery.js"></script>


    <title>cssCombo</title>
</head>
<body>
    <link rel="stylesheet" href="assets/a1.css" />
    <script type="text/javascript" src="assets/a1.js"></script>
    <div class="a1">
        a1
    </div>

    <script>
        seajs.use('assets/a1',function (a1) {
            a1.init();
        });
    </script>
    <link rel="stylesheet" href="assets/a2.css" />
    <script type="text/javascript" src="assets/a2.js"></script>
    <div class="a2">
        a2
    </div>
    <script type="text/javascript">
        seajs.use('assets/a2', function (a2) {
            a2.init();
        });
    </script>
    <script>
    document.title = 'test title';
    </script>
    <link rel="stylesheet" href="assets/a3.css" />
    <script type="text/javascript" src= "assets/a3.js"></script>
    <div class="a3">
        a3
    </div>

    <script>
        seajs.use('assets/a3', function (a3) {
            a3.init();
        });
    </script>
    <!-- js:start -->

    <!-- js:end -->
</body>
</html>
```


