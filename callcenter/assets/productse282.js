var menu = function (obj) {
  var nid = parseInt(util.queryString("nid"));
  if (isNaN(nid)) {
    nid = 0;
  }
  if (nid > 0) {
    var navi = obj.find("li[data-nid=" + nid + "]");
    var tid = parseInt(util.queryString("typeid"));
    if (isNaN(tid)) {
      tid = parseInt(util.queryString("tid"));
    }
    var li = obj.children(".xg_menuUl").children("li[data-tid=" + tid + "]");
    if (li.length > 0) {
      li.addClass(li.attr("class").split(" ")[0] + "-select");
    } else if (navi.length > 0) {
      navi.addClass(navi.attr("class").split(" ")[0] + "-select");
      if (tid > 0) {
        var li = navi.find("li[data-tid=" + tid + "]");
        if (li.length > 0) {
          li.addClass(li.attr("class").split(" ")[0] + "-select");
          li.parentsUntil(".xg_menu", "li").each(function () {
            $(this).addClass($(this).attr("class").split(" ")[0] + "-select");
            actived = true;
            return false;
          });
        }
      }
    }
  } else {
    var url = util.createUrl();
    if (
      url.replace(document.location.host, "").indexOf(".") == -1 ||
      url.indexOf("index.html") > 0
    ) {
      var home = obj.find("li[home=1]");
      if (home.length > 0)
        home.addClass(home.attr("class").split(" ")[0] + "-select");
    }
  }
  var showType = obj.data("mobileshoweffect");
  obj.find(".xg_menuMobile .xg_memu_btn").on("click", function () {
    if (showType == 0 || showType == 2) {
      $(this).next().css({ left: "0px" });
    } else if (showType == 1 || showType == 3) {
      $(this).next().css({ top: "0px" });
    }
    setTimeout(function () {
      obj.find("img").lazyload();
    }, 300);
  });
  obj.find(".xg_menuShade").on("click", function () {
    var css = {};
    if (showType == 0) {
      css = { left: "-100%" };
    } else if (showType == 1) {
      css = { top: "-100%" };
    } else if (showType == 2) {
      css = { left: "100%" };
    } else if (showType == 3) {
      css = { top: "100%" };
    }
    $(this).parent().css(css);
  });
  obj
    .children(".xg_menuMobile")
    .find(".xg_menuTitle1,.xg_menuTitle2,.xg_menuTitle3,.xg_menuTitle4")
    .on("click", function (e) {
      var ul = $(this).next();
      if (ul.length == 0) {
        return true;
      }
      ul.slideToggle();
      return true;
    });
  var design = util.inDesign();

  if (obj.data("droptype") == "1" && page.currentDevice() == 1) {
    var ul = obj.children(".xg_menuUl");
    var needEffect = obj.data("effect");
    if (!needEffect) {
      needEffect = 0;
    }
    var menulis = ul.children("li");
    var droplist = obj.children(".xg_dropdownlist");
    if (droplist.length > 0) {
      menulis.hover(
        function () {
          clearTimeout($(this).data("menuHide"));
          var id = $(this).data("nid");
          if (!id) {
            id = $(this).data("tid");
          }
          if (!id) {
            return;
          }
          var mWidth = $(this).parents(".container").width();
          droplist.css({
            width: document.documentElement.clientWidth + "px",
            height: "0px",
            "min-width": mWidth + "px",
            position: "absolute",
            top: ul.height() + "px",
          });
          if (droplist.offset().left != 0) {
            var mLeft = parseInt(droplist.css("margin-left"));
            isNaN(mLeft) && (mLeft = 0);
            var left = mLeft - droplist.offset().left;
            droplist.css({ "margin-left": left + "px" });
          }
          var list = droplist.children("[data-rid=" + id + "]");
          if (list.length == 0) {
            return;
          }
          list.siblings().hide();
          if (needEffect == 0) {
            list.show();
          } else {
            list.stop().slideDown("fast");
          }
        },
        function () {
          var _this = $(this);
          var id = _this.data("nid");
          if (!id) {
            id = _this.data("tid");
          }
          if (!id) {
            return;
          }
          var list = droplist.children("[data-rid=" + id + "]");
          if (list.length == 0) {
            return;
          }
          clearTimeout(_this.data("menuHide"));
          _this.data(
            "menuHide",
            setTimeout(function () {
              if (needEffect == 0) {
                list.hide();
              } else {
                list.stop().slideUp("fast");
              }
            }, 120)
          );
        }
      );
      droplist.children("div").hover(
        function () {
          var id = $(this).data("rid");
          menulis.each(function () {
            var _that = $(this);
            var mid = _that.data("nid");
            if (!mid) {
              mid = _that.data("tid");
            }
            if (mid == id || mid == id) {
              clearTimeout(_that.data("menuHide"));
            }
          });
        },
        function () {
          if (needEffect == 0) {
            $(this).hide();
          } else {
            $(this).stop().slideUp("fast");
          }
        }
      );
    }
  }
};
var tab = {
  init: function (tabid) {
    var obj = $("#" + tabid);
    var evt = obj.data("switch");
    if (!evt) {
      util.log("事件不存在");
      return;
    }
    var datalist = obj.parents(".xg_list:first");
    if (datalist.length > 0) {
      var className = "";
      var parent = obj;
      while (!parent.is(datalist) && !className) {
        var strs = parent.attr("class").split(" ");
        for (var i = 0; i < strs.length; i++) {
          if (strs[i] && /^p[\d]+/.test(strs[i])) {
            className = strs[i];
            break;
          }
        }
        parent = parent.parent();
      }
      var tabs = null;
      if (className) {
        tabs = datalist.find("." + className);
      } else {
        tabs = datalist.find(".xg_tab");
      }
      tabs.children(".xg_tab_l_t").find("ul li").on(evt, tab.show);
    } else {
      obj.children(".xg_tab_l_t").find("ul li").on(evt, tab.show);
    }
  },
  show: function () {
    var _this = $(this);
    var index = _this.data("index");
    var content = _this
      .parent()
      .parent()
      .parent()
      .find(".xg_tab_tt")
      .eq(parseInt(index));
    content
      .addClass("xg_tab_tt-select")
      .siblings()
      .removeClass("xg_tab_tt-select");
    var checkarr = $(this).attr("class").split(/[ ,]/);
    var pmcid = "xg_tab_tl";
    for (j = 0; j < checkarr.length; j++) {
      var currcheck = checkarr[j].replace(".", "");
      if (/p\d+(m|c|\-m|\-c)\S/.test(currcheck)) {
        if (/-select$/.test(currcheck)) continue;
        pmcid = currcheck;
      }
    }
    _this.addClass(pmcid + "-select");
    $.each(_this.siblings(), function () {
      var arrCls = this.className.split(/[ ,]/);
      for (c = 0; c < arrCls.length; c++) {
        if (/-select$/.test(arrCls[c])) {
          $(this).removeClass(arrCls[c]);
        }
      }
    });
    content.find(".xg_video").each(function () {
      myplayer.tabChange($(this).attr("id"));
    });
    if (typeof page.registeTabReload != "undefined") {
      for (var i = 0; i < page.registeTabReload.length; i++) {
        page.registeTabReload[i](content, index);
      }
    }
  },
  changeitem: function (currSelect) {
    if (currSelect.length > 0) {
      var csslist = currSelect.attr("class").split(/[ ,]/);
      var currids = "xg_tab_tl-select";
      for (h = 0; h < csslist.length; h++) {
        if (/p\d+(m|c|\-m|\-c)\S/.test(csslist[h])) {
          if (/-select$/.test(csslist[h])) continue;
          currids = csslist[h];
          currSelect
            .removeClass("xg_tab_tl-select")
            .addClass(currids + "-select");
        }
      }
    }
  },
};
var banner = {
  init: function (panel) {
    panel.find(".container").click(function (e) {
      if ($(e.target).length > 0 && $(e.target).hasClass("container")) {
        $(this).prev().find("img").trigger("click");
        e.stopPropagation();
      }
    });
    banner.autoChange(panel);
    var adaptive = panel.data("adaptive");
    var firstImg = panel.find("img:first");
    firstImg.addClass("lazyload");
    firstImg.one(
      "animationend webkitAnimationEnd oAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
      function () {
        firstImg.removeClass("lazyload");
      }
    );
    firstImg.one("load", function (e) {
      var maxWidth = e && e.target ? e.target.width : 0;
      var op = banner.getOptions(panel);
      op.onAfterChange = banner.afterChange;
      op.centerPadding = "0px";
      op.index = 0;
      if (typeof op.animaType == "undefined" || op.animaType == 1) {
        var sc = panel.slick(op);
        panel.on("beforeChange", function (
          event,
          slick,
          currentSlide,
          nextSlide
        ) {
          slick.$slides
            .eq(currentSlide)
            .find("[data-eventid]")
            .trigger("screenout");
        });
        panel.on("afterChange", function (
          event,
          slick,
          currentSlide,
          nextSlide
        ) {
          var container = slick.$slides.eq(currentSlide);
          var device = page.currentDevice();
          var hideClass = device == 1 ? "pc_an_hide" : "mobile_an_hide";
          setTimeout(function () {
            container.find("[data-anids]").each(function () {
              var ok = false;
              String($(this).data("anids"))
                .split(",")
                .forEach(function (item) {
                  if (!ok && animation.anFindEvent(item)) {
                    ok = true;
                  }
                });
              if (ok) {
                $(this).removeClass(hideClass);
              }
            });
          }, 17);
          container.find("[data-eventid]").trigger("screenin");
          container
            .siblings()
            .find("[data-anids]")
            .each(function () {
              animation.removeAllAn($(this));
              var ok = false;
              String($(this).data("anids"))
                .split(",")
                .forEach(function (item) {
                  if (!ok && animation.anFindEvent(item)) {
                    ok = true;
                  }
                });
              if (ok) {
                $(this).removeClass(hideClass).addClass(hideClass);
              }
            });
        });
        var maxWidth = function () {
          if (maxWidth > 0 && screen.width > maxWidth) {
            panel
              .find(".xg_banner_item")
              .css({
                maxWidth: maxWidth + "px",
                overflow: "hidden",
                "margin-left": "auto",
                "margin-right": "auto",
              });
            panel.find(".xg_banner_img img").css({ maxWidth: maxWidth + "px" });
          }
        };
        page.resize(maxWidth);
        maxWidth();
        var hideClass =
          page.currentDevice() == 1 ? "pc_an_hide" : "mobile_an_hide";
        var ans = [];
        panel.find("[data-anids]").each(function () {
          var ok = false;
          String($(this).data("anids"))
            .split(",")
            .forEach(function (item) {
              if (!ok && animation.anFindEvent(item)) {
                ok = true;
              }
            });
          if (ok) {
            $(this).addClass(hideClass);
            ans.push($(this));
          }
        });
        $(function () {
          setTimeout(function () {
            setTimeout(function () {
              sc.find(".slick-current")
                .find("[data-anids]")
                .each(function () {
                  $(this).removeClass(hideClass);
                });
            }, 17);
            sc.find(".slick-current")
              .find("[data-eventid]")
              .trigger("screenin");
          }, 100);
        });
      } else {
        var relwidth = panel.data("width");
        var relheight = panel.data("height");
        var width = panel.width();
        var height = panel.height();
        if (width > relwidth) {
          width = relwidth;
          op.Width = relwidth;
        }
        if (height > relheight) {
          height = relheight;
          op.Height = relheight;
        }
        banner.initshutter(op);
        panel.find(".xg_banner_item").addClass("xg_banner_show");
        if (width > relwidth) {
          panel
            .find(".shutter")
            .css({
              width: width + "px",
              height: height + "px",
              "margin-left": "auto",
              "margin-right": "auto",
              overflow: "hidden",
            });
        }
      }
    });
    panel.find("img").each(function () {
      banner.loadImage($(this));
    });
  },
  imgSrc: function (img) {
    var data = $(img).data("src");
    if (data) {
      var src = data.split(",");
      if (src.length == 1) {
        return src[0].split(" ")[0];
      }
      if (page.currentDevice() == 1) {
        return src[0].split(" ")[0];
      } else {
        return src[1].split(" ")[0];
      }
    } else {
      return $(img).data("src");
    }
  },
  afterChange: function () {},
  loadImage: function (obj) {
    var src = banner.imgSrc(obj);
    if (!src) return;
    if (banner.imgCached(src)) {
      $(obj).attr("src", src);
    } else {
      setTimeout(function () {
        $(obj).attr("src", src);
      }, 0);
    }
  },
  imgCached: function (src) {
    var img = new Image();
    img.src = src;
    if (img.complete) {
      return true;
    }
    return false;
  },
  getOptions: function (panel) {
    if (!panel) {
      typeof console == "undefined" && console.log("banner不存在");
      return;
    }
    var op = {};
    var data = panel.data("autoplay");
    if (data) {
      op.autoplay = true;
      op.autoplaySpeed = data;
    }
    data = panel.data("loop");
    data && (op.infinite = data == "1" ? true : false);
    data = panel.data("dots");
    if (data == "1") {
      op.dots = true;
    } else {
      op.dots = false;
    }
    data = panel.data("arrows");
    if (data == "1") {
      op.arrows = true;
    } else {
      op.arrows = false;
    }
    data = panel.data("effect");
    op.animaType = data;
    op.speed =
      panel.data("speed") * 1000 == 0 ? 1000 : panel.data("speed") * 1000;
    if (typeof data == "undefined" || data == "1") {
      op.fade = false;
      op.cssEase = "ease";
    }
    op.variableWidth = true;
    op.centerMode = true;
    op.responsive = [
      {
        breakpoint: 768,
        settings: { arrows: false, variableWidth: false, centerMode: false },
      },
    ];
    data = panel.data("mobilarrow");
    if (data == "1") {
      op.responsive[0].settings.arrows = true;
      op.mobilarrow = true;
    }
    data = panel.data("width");
    if (typeof data == "undefined") {
      op.Width = 1920;
    } else {
      op.Width = data;
    }
    data = panel.data("height");
    if (typeof data == "undefined") {
      op.Height = 600;
    } else {
      op.Height = data;
    }
    return op;
  },
  autoChangeWidth: function (container) {
    var device = page.currentDevice();
    if (device == 2 && util.inDesign()) {
      $("html").addClass("xg_scrollwidth");
    }
    if (parent != window) {
      if (device == 2) {
        container.css({ width: container.parent().width() + "px" });
      } else {
        container.css({ width: "" });
      }
    } else if (page.currentDevice() == 1) {
      container.css({ width: "" });
    }
  },
  resize: function (container) {
    var device = page.currentDevice();
    var relwidth = container.data("width");
    if (typeof relwidth == "undefined") {
      relwidth = 1920;
    }
    var relheight = container.data("height");
    if (typeof relheight == "undefined") {
      relheight = 600;
    }
    var width = container.width();
    var height = container.height();
    if (width > relwidth) {
      width = relwidth;
    }
    if (height > relheight) {
      height = relheight;
    }
    container
      .find(".xg_banner_item")
      .css({
        width: width,
        height: height,
        "max-width": width,
        "max-height": height,
        "min-width": width,
        "min-height": height,
      });
    if (parent.$("#preview_page").length > 0) {
      setTimeout(function () {
        container
          .find(".xg_banner_item")
          .css({
            width: width,
            height: height,
            "max-width": width,
            "max-height": height,
            "min-width": width,
            "min-height": height,
          });
      }, 40);
    }
    var adaptive = container.data("adaptive");
    if (device == 1) {
      if (container.data("effect") == 1) {
        container
          .find(".slick-list")
          .css({
            width: width + "px",
            height: height + "px",
            "margin-left": "auto",
            "margin-right": "auto",
            overflow: "hidden",
          });
        if (adaptive) {
          container
            .find(".xg_banner_img img")
            .css({
              width: "",
              height: "",
              "min-width": "",
              "min-height": "",
              left: "",
              "margin-left": "",
              top: "",
              "margin-top": "",
            });
        } else {
          container
            .find(".xg_banner_img img")
            .css({
              width: relwidth + "px",
              height: relheight + "px",
              "min-width": relwidth + "px",
              "min-height": relheight + "px",
              left: "50%",
              position: "relative",
              "margin-left": (-1 * relwidth) / 2 + "px",
            });
        }
      } else if (adaptive) {
        container
          .find(".xg_banner_img img")
          .css({
            width: "100%",
            height: "100%",
            position: "relative",
            "min-width": "",
            "min-height": "",
            left: "",
            "margin-left": "",
            top: "",
            "margin-top": "",
          });
      } else {
        container
          .find(".xg_banner_img img")
          .css({
            width: relwidth + "px",
            height: relheight + "px",
            "min-width": relwidth + "px",
            "min-height": relheight + "px",
            left: "50%",
            position: "relative",
            "margin-left": (-1 * relwidth) / 2 + "px",
          });
      }
    } else {
      container
        .find(".xg_banner_img img")
        .css({
          width: "100%",
          height: "100%",
          position: "relative",
          "min-width": "",
          "min-height": "",
          left: "",
          "margin-left": "",
          top: "",
          "margin-top": "",
        });
    }
  },
  autoChange: function (container) {
    var pcAdaptive = container.data("adaptive");
    if (
      parent != window &&
      page.currentDevice() == 2 &&
      container.parent().width() == document.documentElement.clientWidth
    ) {
      var width = container.parent().width();
      width = screen.width < width ? screen.width : width;
      container.css({ width: width + "px" });
    }
    container.data("device", page.currentDevice());
    var resize = function () {
      banner.autoChangeWidth(container);
      var deivce = page.currentDevice() == 1;
      if (!pcAdaptive && deivce) {
        container.css("height", "");
      } else {
        mobileHeight =
          container.width() / (parseInt(container.data("scalheight")) / 100);
        pcHeight =
          (container.data("height") / container.data("width")) *
          container.width();
        if (!deivce) {
          container.css("height", mobileHeight + "px");
        } else {
          container.css("height", pcHeight + "px");
        }
      }
      banner.resize(container);
      if (deivce == container.data("device")) {
        return;
      }
      container.data("device", page.currentDevice());
      container.find(".xg_banner_img img").each(function (i) {
        banner.loadImage($(this));
      });
    };
    $(window).on("resize", function () {
      setTimeout(function () {
        resize();
      }, 17);
    });
    resize();
  },
  initshutter: function (option) {
    $(".shutter").shutter({
      shutterW: option.Width,
      shutterH: option.Height,
      isAutoPlay: option.autoplay,
      playInterval: option.autoplaySpeed,
      curDisplay: 0,
      fullPage: false,
      dotsNav: option.dots,
      arrows: option.arrows,
      animaType: option.animaType,
      duration: option.speed,
      mobilarrow: option.mobilarrow,
      currentDevice: page.currentDevice(),
    });
  },
};
var configa87809ef937cee01 = {
  autoPlay: "false",
  pc_slidesToShow: "5",
  pc_slidesToScroll: "1",
  arrows: "false",
  m_slidesToShow: "1",
  m_slidesToScroll: "1",
  dots: "false",
  m_arrows: "true",
  row: "2",
  slidesPerRow: "5",
  m_row: "1",
  m_slidesPerRow: "3",
  speed: "500",
  infinite: "true",
  pc_mouseTouch: "false",
  centerMode: "false",
  centerPadding: "150px",
  m_centerPadding: "80px",
  onBeforeChange: " ",
  onAfterChange: " ",
};
(function (root, config) {
  /*control-num-283*/
  var container = root.find(".xg_list:first");
  var slick = root.find(".data_row:first");
  root.find(".row").css("visibility", "hidden");
  root.find("img").each(function () {
    var src = $(this).data("src");
    if (!$(this).attr("src")) {
      $(this).attr("src", src);
    }
  });
  slick.data("currentDevice", 0);
  function main() {
    setTimeout(function () {
      play();
    }, 2000);
  }

  var play = function () {
    if (config.autoPlay) {
      slick.slick("slickPlay");
    }
  };

  function init() {
    config.autoPlay = util.toBool(config.autoPlay);
    config.infinite = util.toBool(config.infinite);
    config.speed =
      util.toInt(config.speed) == 0 ? 1000 : util.toInt(config.speed);
    config.autoplaySpeed =
      util.toInt(config.autoplaySpeed) == 0
        ? 3000
        : util.toInt(config.autoplaySpeed);
    config.centerPadding = config.centerPadding
      ? config.centerPadding
      : "150px";
    config.m_centerPadding = config.m_centerPadding
      ? config.m_centerPadding
      : "80px";
    if (
      slick.children().length > 0 &&
      slick.data("currentDevice") != 0 &&
      slick.find(".slick-list").length > 0
    ) {
      slick.slick("destroy");
    }

    var loaded = false;
    var load = function () {
      if (loaded) {
        return;
      }

      var options = {
        autoplay: false, //自动播放
        autoplaySpeed: config.autoplaySpeed, //自动播放速度
        arrows: config.arrows, //上一页下一页箭头
        infinite: config.infinite, //循环播放
        speed: config.speed, //滑动时间
        adaptiveHeight: true,
        pauseOnHover: true, //鼠标悬停暂停
        cssEase: "cubic-bezier(0.950, 0.050, 0.795, 0.950)",
        onBeforeChange: config.onBeforeChange,
        onAfterChange: config.onAfterChange,
      };
      options.dots = util.toBool(config.dots); //隐藏点点
      options.pcMouseTouch = util.toBool(config.pc_mouseTouch);
      options.centerMode = util.toBool(config.centerMode);
      var device = page.currentDevice();
      if (device == 2) {
        options.arrows = util.toBool(config.m_arrows); //上一页下一页箭头
        options.centerPadding = config.m_centerPadding;
      } else {
        options.arrows = util.toBool(config.arrows); //上一页下一页箭头
        options.centerPadding = config.centerPadding;
      }
      var rows = device == 2 ? config.m_row : config.row;
      if (rows <= 1) {
        if (device == 2) {
          options.slidesToShow =
            util.toInt(config.m_slidesToShow) == 0
              ? 3
              : util.toInt(config.m_slidesToShow); //幻灯片每屏显示个数
          options.slidesToScroll =
            util.toInt(config.m_slidesToScroll) == 0
              ? 3
              : util.toInt(config.m_slidesToScroll); //	幻灯片每次滑动个数
        } else {
          options.slidesToShow =
            util.toInt(config.pc_slidesToShow) == 0
              ? 4
              : util.toInt(config.pc_slidesToShow); //幻灯片每屏显示个数
          options.slidesToScroll =
            util.toInt(config.pc_slidesToScroll) == 0
              ? 4
              : util.toInt(config.pc_slidesToScroll); //	幻灯片每次滑动个数
        }
      } else {
        if (device == 2) {
          if (config.m_slidesPerRow) {
            options.slidesPerRow = config.m_slidesPerRow;
          }
        } else {
          if (config.slidesPerRow) {
            options.slidesPerRow = config.slidesPerRow;
          }
        }

        options.rows = rows;
      }
      loaded = true;
      slick
        .on("init", function (s) {
          var $imgs = $(s.currentTarget).find("img").not("[loaded]");
          $imgs.each(function (index, item) {
            var src = $(item).attr("src");
            if (!src || src.indexOf("data:") == 0) {
              $(item).attr("src", $(item).attr("data-src")).attr("loaded", 1);
            } else {
              $(item).attr("loaded", 1);
            }
          });

          slick.find(".slick-dots li").addClass("slick-dots-point");

          if (parent != this) {
            container.css("max-width", $(window).width() + "px");
          }

          $(slick.currentTarget).show();
          setTimeout(function () {
            root.find(".row").css("visibility", "visible");
          }, 100);
        })
        .slick(options);
      slick.data("currentDevice", page.currentDevice());
    };
    load();
  }

  function reloadSlick() {
    container.data("tabload", "0");
    if (
      slick.data("currentDevice") &&
      slick.data("currentDevice") != page.currentDevice()
    ) {
      init();
      main();
    }
  }

  page.resize(reloadSlick);

  page.registeTabReload.push(function (tabItem, index) {
    var find = false;
    container.parents().each(function () {
      if ($(this).is(tabItem)) {
        find = true;
      }
    });

    if (find) {
      if (container.data("tabload") == "1") {
        if (config.autoPlay) {
          slick.slick("slickPlay"); //继续播放
        }
      } else {
        container.data("tabload", "1");
        init();
        main();
      }
    } else {
      setTimeout(function () {
        slick.slick("slickPause"); //暂停
      }, 1000);
    }
  });
  var inTab = false;
  container.parents().each(function () {
    if ($(this).hasClass("xg_tab_tt") && $(this).data("index") != 0) {
      inTab = true;
    }
  });
  if (!inTab) {
    init();
  }
  /*control-num-283*/
  page.load(main);
})($("#ca87809ef937cee01"), configa87809ef937cee01);
var goTop = {
  init: function (btn) {
    btn.on("click", goTop.go);
  },
  go: function () {
    $("html,body").animate({ scrollTop: 0 }, 400);
  },
};
/**
 * 智能电话锚点
 */
$(document).ready(function () {
  var _window = $(window).width(); //屏幕尺寸
  if (_window > 768) {
    //pc端
    $("#c500020001").find(".box").find("a").eq(0).attr("href", "#s50003");
    $("#c500020001").find(".box").find("a").eq(1).attr("href", "#s50004");

    $("#c500020001").find(".box").find("a").eq(2).attr("href", "#s50005");

    $("#c500020001").find(".box").find("a").eq(3).attr("href", "#s50006");
  }
});
$(document).ready(function () {
  $("#i125f23803b2bd8ee").hide();
  $(window).scroll(function (event) {
    var _top = $(window).scrollTop();

    if (_top == 0) {
      $("#i125f23803b2bd8ee").hide();
    } else {
      $("#i125f23803b2bd8ee").show();
    }
  });
});

$(function () {
  menu($("#if1798075ff88e13e9583b7"));
});
$(function () {
  menu($("#if1798012ca002ce1b70bc5"));
});
(function (root) {
  root.find(".xg_list>div>.data_col ").each(function () {
    var _this = $(this).children();
    _this.next().hide();
    _this.find(".xg_img ").eq(1).hide();

    _this
      .find(".xg_img ")
      .eq(0)
      .click(function () {
        root.find(".xg_list>div>.data_col>.row:odd").hide();
        root
          .find(".xg_list>div>.data_col>.row:even")
          .find(".xg_img:even")
          .show();
        root
          .find(".xg_list>div>.data_col>.row:even")
          .find(".xg_img:odd")
          .hide();
        _this.next().show();
        $(this).hide();
        $(this).parent().next().children().show();
      });

    _this
      .find(".xg_img ")
      .eq(1)
      .click(function () {
        root.find(".xg_list>div>.data_col>.row:odd").hide();
        _this.next().hide();
        $(this).hide();
        $(this).parent().prev().children().show();
      });
  });
  root.find(".xg_list .data_col ").eq(0).children().next().show();

  root
    .find(".xg_list .data_col ")
    .eq(0)
    .children()
    .find(".xg_img ")
    .eq(1)
    .show();

  root
    .find(".xg_list .data_col ")
    .eq(0)
    .children()
    .find(".xg_img ")
    .eq(0)
    .hide();
})($("#rf1798_07a0989e53e314c61"));
(function (root) {
  root.find(".xg_list>div>.data_col ").each(function () {
    var _this = $(this).children();
    _this.next().hide();
    _this.find(".xg_img ").eq(1).hide();

    _this
      .find(".xg_img ")
      .eq(0)
      .click(function () {
        root.find(".xg_list>div>.data_col>.row:odd").hide();
        root
          .find(".xg_list>div>.data_col>.row:even")
          .find(".xg_img:even")
          .show();
        root
          .find(".xg_list>div>.data_col>.row:even")
          .find(".xg_img:odd")
          .hide();
        _this.next().show();
        $(this).hide();
        $(this).parent().next().children().show();
      });

    _this
      .find(".xg_img ")
      .eq(1)
      .click(function () {
        root.find(".xg_list>div>.data_col>.row:odd").hide();
        _this.next().hide();
        $(this).hide();
        $(this).parent().prev().children().show();
      });
  });
  root.find(".xg_list .data_col ").eq(0).children().next().show();

  root
    .find(".xg_list .data_col ")
    .eq(0)
    .children()
    .find(".xg_img ")
    .eq(1)
    .show();

  root
    .find(".xg_list .data_col ")
    .eq(0)
    .children()
    .find(".xg_img ")
    .eq(0)
    .hide();
})($("#rf1798_05b40b94fa31adfdf"));
$(function () {
  tab.init("if17980dab4c268ab55b800");
  var getcount = 10;
  var getindex = setInterval(function () {
    var tabselectdefault = $("#if17980dab4c268ab55b800 .xg_tab_tl-select");
    if (getcount-- <= 0 || $(tabselectdefault).length <= 0) {
      clearInterval(getindex);
      return;
    }
    tab.changeitem(tabselectdefault);
  }, 300);
});
(function (root) {
  root.find(".xg_list>div>.data_col ").each(function () {
    var _this = $(this).children();
    _this.next().hide();
    _this.find(".xg_img ").eq(1).hide();

    _this
      .find(".xg_img ")
      .eq(0)
      .click(function () {
        root.find(".xg_list>div>.data_col>.row:odd").hide();
        root
          .find(".xg_list>div>.data_col>.row:even")
          .find(".xg_img:even")
          .show();
        root
          .find(".xg_list>div>.data_col>.row:even")
          .find(".xg_img:odd")
          .hide();
        _this.next().show();
        $(this).hide();
        $(this).parent().next().children().show();
      });

    _this
      .find(".xg_img ")
      .eq(1)
      .click(function () {
        root.find(".xg_list>div>.data_col>.row:odd").hide();
        _this.next().hide();
        $(this).hide();
        $(this).parent().prev().children().show();
      });
  });
  root.find(".xg_list .data_col ").eq(0).children().next().show();

  root
    .find(".xg_list .data_col ")
    .eq(0)
    .children()
    .find(".xg_img ")
    .eq(1)
    .show();

  root
    .find(".xg_list .data_col ")
    .eq(0)
    .children()
    .find(".xg_img ")
    .eq(0)
    .hide();
})($("#rf1798_0e6f33b8f2da29422"));
$(function () {
  menu($("#if179800a4267fa4b795f79"));
});

(function (root) {
  /*LayoutRow*/
  $(function () {
    $("#xg_header").css({
      position: "fixed",
      top: 0,
      left: 0,
      "z-index": "9999",
      width: "100%",
    });
  });

  /*LayoutRow*/
})($("#rf1798_0a904198c4952bbc9"));
banner.init($("#i73f566b305986976"));
(function (root) {
  root.addClass("box");
})($("#r6377f16a9524dd73"));
animation.config["an271"] = {
  id: "271",
  clientIndex: "4f7d86f6c71454ea",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "271_滚到产品_向上飞入",
  anName: "an_tran_271",
  library: "fadeInUp",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};
animation.config["an273"] = {
  id: "273",
  clientIndex: "b7ef820348a76577",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "273_滚到产品功能_向上飞入",
  anName: "an_tran_273",
  library: "fadeInUp",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};
animation.config["an272"] = {
  id: "272",
  clientIndex: "723dc98fa329681c",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "272_滚到产品功能-咨询_向下飞入",
  anName: "an_tran_272",
  library: "fadeInDown",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};
animation.config["an276"] = {
  id: "276",
  clientIndex: "4e1e366d8e67611e",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "276_部署方案_向上飞入",
  anName: "an_tran_276",
  library: "fadeInUp",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};
animation.config["an277"] = {
  id: "277",
  clientIndex: "7deffa87e1366522",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "277_saas移进_1",
  anName: "an_tran_277",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.config["an278"] = {
  id: "278",
  clientIndex: "7deffa87e1366522",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "278_saas移进_2",
  anName: "an_tran_278",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 0,
};
animation.regist($("[data-eventid='7deffa87e1366522']"), [
  {
    name: "鼠标悬停",
    id: 157,
    event: "mouseenter",
    an: [{ id: 277, anName: "an_tran_277", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
  {
    name: "鼠标移出",
    id: 158,
    event: "mouseleave",
    an: [{ id: 278, anName: "an_tran_278", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
]);
animation.config["an194"] = {
  id: "194",
  clientIndex: "b98d5c28390b9823",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "194_产品功能_1",
  anName: "an_tran_194",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.config["an195"] = {
  id: "195",
  clientIndex: "b98d5c28390b9823",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "195_产品功能_2",
  anName: "an_tran_195",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.regist($("[data-eventid='b98d5c28390b9823']"), [
  {
    name: "鼠标悬停",
    id: 151,
    event: "mouseenter",
    an: [{ id: 194, anName: "an_tran_194", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
  {
    name: "鼠标移出",
    id: 152,
    event: "mouseleave",
    an: [{ id: 195, anName: "an_tran_195", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
]);
animation.config["an279"] = {
  id: "279",
  clientIndex: "a1f075699d989cc0",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "279_本地方案_1",
  anName: "an_tran_279",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.config["an280"] = {
  id: "280",
  clientIndex: "a1f075699d989cc0",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "280_本地方案_2",
  anName: "an_tran_280",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.regist($("[data-eventid='a1f075699d989cc0']"), [
  {
    name: "鼠标悬停",
    id: 159,
    event: "mouseenter",
    an: [{ id: 279, anName: "an_tran_279", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
  {
    name: "鼠标移出",
    id: 160,
    event: "mouseleave",
    an: [{ id: 280, anName: "an_tran_280", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
]);
animation.config["an274"] = {
  id: "274",
  clientIndex: "41afee04e543b426",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "274_混合云_1",
  anName: "an_tran_274",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.config["an275"] = {
  id: "275",
  clientIndex: "41afee04e543b426",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 10,
  name: "275_混合云_2",
  anName: "an_tran_275",
  library: "",
  device: 1,
  loop: 1,
  resume: 0,
  clear: 1,
};
animation.regist($("[data-eventid='41afee04e543b426']"), [
  {
    name: "鼠标悬停",
    id: 161,
    event: "mouseenter",
    an: [{ id: 274, anName: "an_tran_274", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
  {
    name: "鼠标移出",
    id: 162,
    event: "mouseleave",
    an: [{ id: 275, anName: "an_tran_275", device: 1 }],
    device: 1,
    doCount: 0,
    count: 0,
  },
]);
animation.config["an281"] = {
  id: "281",
  clientIndex: "089d7387b13c2c84",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "281_成功案例_向上飞入",
  anName: "an_tran_281",
  library: "fadeInUp",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};
animation.config["an193"] = {
  id: "193",
  clientIndex: "4f7d86f6c71454ea",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "193_滚到产品_向上飞入",
  anName: "an_tran_193",
  library: "fadeInUp",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};

animation.config["an199"] = {
  id: "199",
  clientIndex: "10e9e30a86f861d6",
  timingFunction: "",
  duration: "1",
  delay: "0",
  type: 1,
  name: "199_滚到产品功能_向上飞入",
  anName: "an_tran_199",
  library: "fadeInUp",
  device: 1,
  loop: 1,
  resume: 1,
  clear: 0,
};
$(function () {
  goTop.init($("#i125f23803b2bd8ee").children("a:first"));
});
