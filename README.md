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
![Alt text](https://lh3.googleusercontent.com/g1qFMXRxnUCLswCLQTmz68jTkCNt1evB1Uh-FXLU5QyPMHsF_u0P7CS_kM0RzReRCGHij2vx81WCzS3cydNHP0CmewhgG7JF1VJkxQQZm92K1jorEqFkRXgjiOy8Ur3LXkxu3tERf8jmj2O6COAY6ppEeBVOGuPYp1-UudQCll83hGwlBMDvUCQBmmW8MyMFde7vbE3024s4ipv49kS-0TP5a5Oz1nkMQY5TfnSyR5IPq4Dt3McCfiuFNUxOrVewhGwvMzbMzgQ9LrxzBKWpVN483Awivhhaa-3LXfn2pFhoSKV2AuSf1DFutwWIxc9CJxI35ftJ0m9KJb_U0U_FbfJMaHStJjc08-Pz8iEVRSQ-ma03RVufgcqRYr-d5ZDVouFQaqzcOnBP3dpLxBSNXvSPASTHhRiTPhlA9-jCamSg3uNYxheOzPeI7i-AcynjtR9rlD3wer04NkFb492ZwKhpQtE7tYdU78Mvq1LEI7b1tmDbc8LcXzhiZiTpeQAGT22J7XCEeBjvvNhtVT460nGmlc43kmmOymcKdfEdPiYh3NUxzukImaLO4YCuDXiWM_A5SEtWHwOILJhGQVw3bYLRN_syChrHqi9jhS9PidmwZXh3xNAH9dPT=w781-h465-no "MVC")

## Swiper

* 3개의 Slide element로 swiper 구성
* swipe animation을 translate3d으로 적용하여 GPU 사용 극대화

![Alt text](https://lh3.googleusercontent.com/mgl8pSRO5kaff6ZmWPyI-on88pcicNjsbqX9ovnjzhO9RrpAuZcD5uMKSfrs_f0r9-2wISWB7CmAKLlYzTNvGQWkYvh0P8BXOd_AN52oqbx3m5pT3yHg0JxvvW0hKFjtTLcxJR-6IwprHnQ8n4BeM6pj9NMKD3X1u61EdJhnNhlTPFoih29QFXD6KF3XRwanvL7B9hxqR1Ppp73tNtDx4_ndub7u5rFY_-Xa0bmgfaMGWncOrg3IfQexcozUljUW3zSC9YK9W7YvxMULNRoiX885Meeshs2wgRisBzDkHFsYFuOMy0zBugWusxnKfewRVemQW_dXOMp_e12APFAETBvKT7YA9gElfE-ye60CtC_4gyySdnezNSGJuMoQQYYtUAchgm5PMPjgyOJRBk_uRdfCpwUJk9tLx77NTqKJaMuf6DJgR1MyuoNgQKFhDN_ULC0VVLULQOiJvOW5aNWk_myntscNw7IXFm8HCJ3WgO0QqDdV25gdsU_FO8xBV6OnYCTxVFe0dMXyPf3V6-239yxGkE4_N4hTjr9PX58Rq4mXPwBTjAOoCPS5VoB7ICh0_pmrIOsqVbw6clFhemMqql0x_VTlmYYmo3LMVROAqYyDTgstZy10=w1392-h782-no "Swiper")
