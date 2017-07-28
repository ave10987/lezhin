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

### MVC Structure
![Alt text](https://lh3.googleusercontent.com/pgvyQMSoh9sRVPF_pQNPTSbPtXJVYSdamouZEtgTb4Jd-q2WSfq0OgkHFe6VLcxJ4CFUruCAeUAvl-kpdaCT_eO1edVNrLN6MMB19GB3Zbr431qRDV6SUvvLMjnyCF8KyjW2ibuvo5Uq4x-6zPzgwPSv4SnbzU2zAX87hAqQnBJtPSe0h87pFHAJUBdHYzDWPwfaMtIx9vWalqb8orVk4F5CfshYyAvVh8X6gHfjQ_xcWE_bv9d2cpurzlKiVQsAoxIuUB8BqPF9C2kwlJDWhygrj4OLAESgKpBHha9Bft0zXCUUZ1H4kODgYKK8oIGOVt4LKRK6PXXrOr7JlU9lynszM-FosKo82OmURk2Db08_s7Gll7FetXCgSA8C6YhOiCMg279OsTzLQhl4Kt4tMKCV3HleusUrexXh0O1urEjNNW9Loao0Ec_qFlcjREtokRFrXk2z8ltggtrJnhSDxzeotPN7po868nt3hRKmCbYZ1mCNdITy3-tZnck5neNC0qNDIzD95zJeFK9anskAFbqcp_xaL0onc1EECWZ4CJUifJm_DIzr6ALP8pFLW3gnzbP6InkcP4cNIsRZKGgyCNrxehynZ1KEVN9OoyDZMZR1yYGmd56D=w781-h465-no "MVC")

## Swiper

* 3개의 Slide element로 swiper 구성
* swipe animation을 translate3d으로 적용하여 GPU 사용 극대화

![Alt text](https://lh3.googleusercontent.com/DYbAjcj_bHEH38j6ND-fZ4RfZnOHEqWFsFX4ZPrscs5kCEVdWv4zWzJ5NB5ABPZSDKEySdEwsZijZ9eI0F0CSr1dC6dYHseHVAd_2WTrf-_IkbrG-rEIMeyc5Bk9iBZIcSz7U7K__tSqHQXpBHE_wLuc3SYtH5CJ74d6gbyGoqEzYmt9DnDtqv0XAQx0C0gBen28QhR0rQOV9aG06X_NTZOocqiROyC4TqVqncAj4XFnlLqyBBFwKmJp6_SjRxqvFhq6kpMLgNIkA0UpTKBIFLqUPvkDff8SbW-tSebSjrlOBqsAm6lIskN_Pm8rkCyafOpVimicK5yo2ckA5f6u3mc05cjAx-QwYSqFt1X6Wg18T71uPaSax3iunHqNbm68eYZzVP_gAm_8nwVBtnFNEg2VpOS0gfoff0eQu7Y_eNNDpP5FbpfzNfcFJipQdcGEzZ_vtvnnCp43UcdcXtiU7sF8_clEaCZwp2loDraKvIwuRgIWUJoHA6yNWKGHrcMwcdKxWIJk7AU84z_Yg52P7YNabXHie_M8BjG-PlOotpuuH5dPm6r6R-cApTiN0zx74LySGNmYzWf6VcoIVyuLXY4TvE-oEJDrjnplXemSSlj43EFFuiUe=w1392-h782-no "Swiper")
