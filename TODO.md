 - 使用CDN加速静态文件
  1.使用online的检测工具测试页面加载速度
  2.本人的家庭宽带/电信3g/公司网络测试,CDN加速效果几乎没有(尤其是mp3)

 - loading的效果放在下载大部分的JS/css库之前
  1.进行了优化,mp3在图片之后加载,加速了约10s

 - 开启nginx对其他资源的gzip
  1.默认nginx对css/js/图片关闭gzip,开启后加速了约1s
  2.mp3的gzip压缩没有生效

 - 开启nginx的缓存
  1.缓存设置了未生效
 
 - 浏览器端判断Agent,(希望手持设备才可以访问)

 - 服务器端判断Agent,(只在微信中打开)
  1.添加了对MicroMessenger的检测

 - 横竖屏的检测和效果
  1.控制了横竖屏时页面效果的切换以及音乐的播放/暂停

 - 如何使用parallax.js?
  1.http://www.gbtags.com/gb/demoviewer/1832/bad6eb62-e5f8-4d07-9aa0-190aab188601/jquery.html.htm
  2.http://matthew.wagerfield.com/parallax/
  3.https://github.com/wagerfield/parallax

 - 音乐播放/暂停的按钮效果

 - 有时候出现横屏幕页面动画不显示,页面空白的bug
  1.暂时修复,修改了iphone.png加载完成的逻辑

 - 手机上音乐不能播放的bug
  1.已修复,手机微信(iphone/android)打开页面,请求mp3文件时,user-agent并没有发送MicroMessenger标识,因此nginx配置对mp3的请求不做user-agent的过滤
