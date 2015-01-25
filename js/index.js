$(document).ready(function(){
  var audio = new Audio();
  audio.autoplay = true;
  var startPlay = false;
  var startInitSwiper = false;
  var imgs_loaded = {};
  var funcInitSwiper = function(){
    if(!startInitSwiper){
      startInitSwiper = true;
      //初始化Contain高度
      $('.swiper-container').css('height', $(window).height())
      var mySwiper = new Swiper('.swiper-container', {
        //pagination: '.pagination',
        mode: 'vertical',
        onSlideChangeStart: function (swiper) {
          if ($('.swiper-slide-visible').attr('id') == 'end') {
            $('.up').hide()
          }else { $('.up').show() }
        }
      });
    }
  };
  var $loading = $("#loading");
  var $loading_text = $("#loading_text");
  var funcLoading = function(){
    var imgs = ['iphone.png','page 1.jpg','page 2.jpg','page 3.jpg','page 4.jpg','page 5.jpg','page 6.jpg','page 7.jpg','page 8.jpg','page 9.jpg','page 10.jpg','page 11.jpg','page 12.jpg','page 13.jpg'],
    imgs_len = imgs.length,
    imgs_loaded_len = 0;
    var funcImgsLoad = function(e) {
      var img = new Image();
      img.onload = function() {
        ++imgs_loaded_len, $loading_text.text(parseInt(imgs_loaded_len / imgs_len * 100) + "%"),
        imgs_loaded[imgs_loaded_len] = e,imgs_loaded['loaded'] = imgs_loaded_len == imgs_len ? true:false,
        imgs_loaded['iphone_loaded'] = e == 'iphone.png' ? true:false
      }, img.src = 'images/'.concat(e)
    };
    for (var i = 0; i < imgs_len; ++i) funcImgsLoad(imgs[i]);
    var cb = function(){};
    var s = 60;//unit second
    var o = function() {
      0 >= s ? imgs_loaded_len / imgs_len > 0.5 ? cb() : alert("你的网速不太给力哦,试试重新刷新!")
      : (s -= .5, imgs_loaded_len == imgs_len ? cb() : setTimeout(o, 500))
    };//0.5s检测一次,图片要么在固定秒内加载完成,要么超过半数,可以执行后续的初始化函数(作为参数传递).
    return function(e) {
      typeof e == "function" && (cb = e), o()
    };
  }();
  var funcInit = function(){
    if($('#content').css('display')!='none'){
      funcInitSwiper(); 
      if(!audio.src && imgs_loaded['loaded']){
        audio.src = "mp3/Coldplay - A Sky Full Of Stars.mp3"; 
        audio.load();
        window.addEventListener('touchstart', function (e) {
          //audio.loop = true;
          if(audio && audio.src && audio.paused){
            audio.play();
          }
        });
      }
    }
    if($loading.css('display') == 'block')
      $loading.fadeOut(1000);
  };
  var funcStartPlay = function(){
    if(!startPlay){
      startPlay = true;
      funcLoading(funcInit);
    }
    else{
      funcInit();
    }
  };
  if($('#content').css('display')=='none'){
    console.log('页面初始横屏,不播放');
    $('.lock_wrp').fadeIn(500);
  }
  else{
    funcStartPlay();
  }
  var funcInterval;
  window.addEventListener('resize',function(e){
    if($('#content').css('display')=='none'){
      console.log('页面改为横屏,停止播放');
      if(imgs_loaded['iphone_loaded']){
        $('.lock_wrp').fadeIn(500);
      }
      else{//确定iphone.png被加载后,再显示动画.
        funcInterval = setInterval(function(){
          if($('#content').css('display')=='none' && imgs_loaded['iphone_loaded']){
            $('.lock_wrp').fadeIn(500);
            clearInterval(funcInterval);
          }
        },250);
      }
      if(!audio.paused)
        audio.pause();
    }
    else{
      if(funcInterval)
        clearInterval(funcInterval);
      funcStartPlay();
      if(audio.paused)
        audio.play();
      console.log('页面改为竖屏,继续播放');
      $('.lock_wrp').fadeOut(500);
    }
  });
});
