# lezhin-homework

### How To Use
```
// api server를 위한 express 설치
1. npm install

// local api server 실행
2. node server/main.js

3. localhost:8888 접속
```

### Swiper Options
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

### MVC Structure
![alt text](https://github.com/ave10987/lezhin_homework/blob/master/mvc.png "MVC")

## Swiper

* 3개의 Slide element로 swiper 구성
* swipe animation을 translate3d으로 적용하여 GPU 사용 극대화

![alt text](https://github.com/ave10987/lezhin_homework/blob/master/swiper.png "Swiper")
