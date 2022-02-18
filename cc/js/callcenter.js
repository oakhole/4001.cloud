var vm = new Vue({
  el: "#app",
  data: {
    headerCss: false,
    menuCss: false,
    menuActive: 0,
    logo: "/assets2/images/logo.png",
    tel: "",
    i: 2,
    activeIndex: 2,
    solveSwiper: "",
    teleManaI: 1,
    fuwuTabI: 1,
    videoTopShow: true,
    videoBtnShow: true,
    footerShow: false,
    show: false, //在线咨询大框
    showWeekFlag: false, //上面的企微二维码
    slideShow: false, //下面的企微码
    getChatSlideShow: false, //在线咨询小弹窗
    fixChatImgMsg: true, //人像上的1
    chatText: "在线",
    toastImg: "/assets/images/duty_all.png",
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll, false), window.addEventListener("scroll", this.showIcon);
    window.addEventListener("scroll", this.menuFixed);
    window.addEventListener("scroll", this.scrollHandle);
    var _this = this;
    var solveSwiper = new Swiper(".tele-swiper-container", {
      // loop: true, // 循环模式选项
      initialSlide: 1,
      slidesPerView: "auto",
      centeredSlides: true,
      observer: true,
      observeParents: true,
      slideToClickedSlide: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        slideChangeTransitionStart: function () {
          _this.i = this.activeIndex + 1;
        },
      },
    });
    this.solveSwiper = solveSwiper;
    var customSwiper = new Swiper(".tele-custom-swiper-wrap", {
      // loop: true, // 循环模式选项
      initialSlide: 0,
      slidesPerView: 3,
      centeredSlides: true,
      slidesPerView: "auto",
      observer: true,
      observeParents: true,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
  created() {
    this.scrollKefu();
    let _this = this;
    setTimeout(function () {
      _this.getChatSlideShow = true;
    }, 20000);
  },
  methods: {
    showIcon() {
      if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
        this.headerCss = true;
        // this.logo = "/assets2/images/logo1.png";
      } else {
        this.headerCss = false;
        // this.logo = "/assets2/images/logo.png";
      }
    },
    menuFixed() {
      if ((!!document.documentElement.scrollTop && document.documentElement.scrollTop > 500) || document.body.scrollTop > 500) {
        this.menuCss = true;
        // this.logo = "/assets2/images/logo1.png";
      } else {
        this.menuCss = false;
        // this.logo = "/assets2/images/logo.png";
      }
    },
    scrollHandle(e) {
      var top = e.srcElement.scrollingElement.scrollTop;
      if (top > 60) {
        this.footerShow = true;
      } else {
        this.footerShow = false;
      }
    },
    solveTab(i) {
      this.i = i;
      var j = i - 1;
      this.solveSwiper.slideTo(j, 1000, false);
    },
    teleMana(i) {
      this.teleManaI = i;
    },
    fuwuTab(i) {
      this.fuwuTabI = i;
    },
    videoPlay() {
      var video = document.getElementById("banner-video");
      let _this = this;
      if (video.paused) {
        video.play();
        this.videoBtnShow = false;
        this.videoTopShow = false;
      } else if (video.play()) {
        video.pause();
        this.videoBtnShow = true;
      }
      video.addEventListener(
        "ended",
        function () {
          _this.videoBtnShow = true;
          _this.videoTopShow = true;
        },
        false
      );
    },
    toTop() {
      var timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          scrollTo(0, oTop - 200);
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
    // 去除人像上的1
    removeChatImgMsg() {
      this.fixChatImgMsg = false;
    },
    showKefu() {
      this.chatText == "收起" ? (this.chatText = "在线") : (this.chatText = "收起");
      // 大咨询框显示与隐藏
      let _this = this; // _this.show = !_this.show;
      this.removeChatImgMsg();
      this.getChatSlideShow = false;
      // 下面是分时段执行的函数
      var n = new Date();
      var nday = n.getDay();
      axios({
        method: "post",
        url: "/api/kefucheck.php",
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data == "vacation") {
            //假期
            this.show = false;
            this.showWeekFlag = !this.showWeekFlag;
          } else if (res.data == "onduty") {
            var date = new Date();
            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var time = Number(date.getHours() + "" + minute);
            if ((900 <= time && time <= 1200) || (1330 <= time && time <= 1800)) {
              //工作日上班时间
              if ($("#olchatframe")[0]) {
                _this.show = !_this.show;
              } else {
                _this.show = !_this.show;
                hollycrm.originate.getChatUrl(
                  {
                    channelID: "hollycrm.com-705d8d50-fa6c-11e6-9d96-b5920273913b",
                    accountID: "N000000001907",
                    urlParam: {
                      visitorId: "",
                      nickName: "",
                    },
                  },
                  function (callbackData) {
                    chatUrl1 = callbackData.chatUrl;
                    chatUrl1 = chatUrl1.replace("http:", "https:");
                    var chatframe = document.createElement("iframe");
                    var framebox = document.getElementById("kefu_frame_box");
                    chatframe.id = "olchatframe";
                    chatframe.src = chatUrl1;
                    framebox.appendChild(chatframe);
                    if (chatframe.attachEvent) {
                      chatframe.attachEvent("onload", function () {
                        $("#kefu_frame_box").addClass("open-kefu");
                      });
                    } else {
                      chatframe.onload = function () {
                        $("#kefu_frame_box").addClass("open-kefu");
                      };
                    }
                  }
                );
              }
            } else {
              this.show = false;
              _this.showWeekFlag = !_this.showWeekFlag;
            }
          }
        })
        .catch((error) => {
          console.log("新建失败");
        });
    },
    scrollKefu() {
      let _this = this;
      /* .......... 按渠道展现不同二维码 .......... */
      if (
        (sourceUrl.indexOf("baidu") >= 0 && (sourceUrl.indexOf("medium=cpc") >= 0 || sourceUrl.indexOf("utm_medium") >= 0)) ||
        sourceUrl.indexOf("百度sem") >= 0 ||
        sourceUrl.indexOf("百度SEM") >= 0 ||
        sourceUrl.indexOf("aladdin") >= 0
      ) {
        _this.toastImg = "/assets/images/duty_sem.png";
      }
      if (sourceUrl.indexOf("media=360") > 0 || sourceUrl.indexOf("so.com") > 0 || sourceUrl.indexOf("source=360") > 0) {
        if (sourceUrl.indexOf("medium=cpc") >= 0 || sourceUrl.indexOf("360sem") >= 0 || sourceUrl.indexOf("360SEM") >= 0) {
          _this.toastImg = "/assets/images/duty_360sem.png";
        } else {
          _this.toastImg = "/assets/images/duty_360seo.png";
        }
      }
      if ((sourceUrl.indexOf("media=sogou") > 0 || sourceUrl.indexOf("sogou.com") > 0) && sourceUrl.indexOf("medium=cpc") > 0) {
        _this.toastImg = "/assets/images/duty_sogousem.png";
      }
      axios({
        method: "post",
        url: "/api/kefucheck.php",
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data == "vacation") {
            _this.show = false;
          } else if (res.data == "onduty") {
            var date = new Date();
            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var time = Number(date.getHours() + "" + minute);
            if ((900 <= time && time <= 1200) || (1330 <= time && time <= 1800)) {
              // setTimeout(_this.scrollOpenKefu, 30000);
              // var away = true;
              // $(window).scroll(function (event) {
              //   var awayBtm = $(document).height() - $(window).scrollTop() - $(window).height();
              //   if (awayBtm <= 700) {
              //     if (away) {
              //       setTimeout(_this.scrollOpenKefu, 500); away = false;
              //     } else { }
              //   }
              // });
            } else {
              _this.show = false;
            }
          }
        })
        .catch((error) => {
          console.log("新建失败");
        });
    },
    closeFrame() {
      this.show = false;
      this.showWeekFlag = false;
      this.getChatSlideShow = false;
      this.removeChatImgMsg();
      this.chatText = "在线";
      var iframe = document.getElementById("olchatframe");
      var framebox = document.getElementById("kefu_frame_box");
      if (iframe) {
        framebox.removeChild(iframe);
      }
    },
    chatSlideShow() {
      //在线咨询小框关闭
      this.getChatSlideShow = false;
      this.removeChatImgMsg();
      this.setTimeChatShow();
    },
    setTimeChatShow() {
      let _this = this;
      setTimeout(function () {
        _this.getChatSlideShow = true;
      }, 40000);
    },
    slideClick() {
      //下面企微码显示隐藏
      this.slideShow = !this.slideShow;
    },
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll("main .call-menu");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach((item) => {
        offsetTopArr.push(item.offsetTop);
      });
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 定义当前点亮的导航下标
      let navIndex = 0;
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop >= offsetTopArr[n] - 100) {
          navIndex = n;
        }
      }
      this.menuActive = navIndex;
    },
    // 跳转到指定索引的元素
    scrollTo(index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop = document.getElementsByClassName("call-menu")[index].offsetTop;
      // 获取当前 offsetTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50;
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp();
      } else {
        // 往下滑
        smoothDown();
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop - 80;
          document.documentElement.scrollTop = scrollTop - 80;
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop - 80;
          document.documentElement.scrollTop = scrollTop - 80;
          requestAnimationFrame(smoothUp);
        }
      }
    },
  },
});
new WOW().init();
$("nav#menu").mmenu({
  navbar: {
    title: "导航栏",
  },
  extensions: ["shadow-panels", "theme-white", "fx-listitems-slide", "border-none", "position-right"],
  navbars: {
    content: ["prev", "searchfield", "close"],
    height: 3,
  },
  setSelected: true,
  searchfield: {
    resultsPanel: true,
  },
});
