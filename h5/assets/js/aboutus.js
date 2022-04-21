var vm = new Vue({
  el: "#app",
  data: {
    scrolllHeader: false,
    logoImg: "logo_white.png",
    menuImg: "menu_white.png",
    contactShow: true
  },
  mounted () {
    window.addEventListener("scroll", this.scrollHead);
    var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      initialSlide: 0,//初始化时slide的索引
      slidesPerView: 'auto',
      centeredSlides: true,
      slideToClickedSlide: true,
      grabCursor: true,//指针会变成手掌形状
      // setWrapperSize: true, //flex布局用
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      }
    })
  },
  methods: {
    scrollHead () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 50) {
        this.scrolllHeader = true;
        this.logoImg = "logo_black.png";
        this.menuImg = "menu_red.png"
      } else {
        this.scrolllHeader = false;
        this.logoImg = "logo_white.png";
        this.menuImg = "menu_white.png"
      }
    },
    contactClose () {
      this.contactShow = false;
    },
    toWebchat () {
      var date = new Date();
      var week = new Date().getDay();
      var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var time = Number(date.getHours() + "" + minute);
      if (((930 <= time && time <= 1200) || (1400 <= time && time <= 1750)) && (week != 0 && week != 6)) {
        location.href = "https://work.weixin.qq.com/kfid/kfc86c1b5e7c9cb4947"
      } else {
        location.href = "/register.html?btn=top"
      }
    }


  }
});
