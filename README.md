# lezhin

### How To Use
```

// api server를 위한 express 설치
1. npm install

// local api server 실행
2. node server/main.js

3. localhost:8888 접속
```

### Options
```
/*
 * containerId      {String}   banner를 생성할 element id (mandatory)
 * autoPlay         {Boolean}  autoPlay: 자동 slide 여부 (optional default : false )
 * infinity         {Boolean}  infinity: 무한 swipe 여부 (optional default : false )
 * autoplayDuration {Number}   autoplayDuration: 자동 slide 시간
 */
var options = {
    containerId: 'lezhin-swiper',
    autoPlay: false,
    infinity: true,
    autoPlayDuration : 3000
};
```
