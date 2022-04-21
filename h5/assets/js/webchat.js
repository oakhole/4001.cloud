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
    var array = new Array("智能分配", "智能辅助", "智能机器人");
    var swiper = new Swiper('.swiper1', {
      pagination: '.swiper-pagination',
      slidesPerView: 1,
      initialSlide: 1,
      paginationClickable: true,
      autoHeight: true,
      loop: true,
      //spaceBetween: 30,
      paginationBulletRender: function (index, className) {
        return '<div class="' + className + '">' + array[index] + '</div>';
      },
    });
    var array1 = new Array("自动质检", "统计报表", "聊天监控");
    var swiper = new Swiper('.swiper2', {
      pagination: '.swiper-pagination1',
      slidesPerView: 1,
      initialSlide: 1,
      paginationClickable: true,
      autoHeight: true,
      loop: true,
      //spaceBetween: 30,
      paginationBulletRender: function (index, className) {
        return '<div class="' + className + '">' + array1[index] + '</div>';
      }
    });
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
