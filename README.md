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
 * {String}   containerId: banner를 생성할 element id (mandatory)
 * {Boolean}  autoPlay: 자동 slide 여부 (optional default : false )
 * {Boolean}  infinity: 무한 swipe 여부 (optional default : false )
 * {Number}   autoplayDuration: 자동 slide 시간
 */
var options = {
    containerId: 'lezhin-swiper',
    autoPlay: false,
    infinity: true,
    autoPlayDuration : 3000
};
```
