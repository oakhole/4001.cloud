if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      FastClick.attach(document.body);
    },
    false
  );
}
if (sourceUrl == null || sourceUrl == "") {
  sourceUrl = location.href;
}
console.log("最终" + sourceUrl);
// 电话号码验证
var checkTel = (rule, value, callback) => {
  const telReg = /^1[3|4|5|6|7|8][0-9]{9}$/
  if (!value) {
    return callback(new Error('电话号码不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (telReg.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }
  }, 300)
};
// 验证码验证
var checkCode = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入验证码!'));
  }
  setTimeout(() => {
    if (value == vm.$data.form.checkCode) {
      vm.$refs.form.validateField('checkCode');
      console.log('输入和验证成功!');
      callback();
    } else {
      callback(new Error('验证码不正确'))
    }
  }, 300)
};
// 城市验证
var checkCity = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入您所在的城市'));
  } else {
    callback();
  }
};
// 公司名验证
var checkCom = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入公司名称'));
  } else {
    callback();
  }
};
// 节流函数
function throttle (handle, wait) {
  let lastTime = 0;
  return function (e) {
    let nowTime = new Date().getTime()
    if (nowTime - lastTime > wait) {
      handle();
      lastTime = nowTime;
    }
  }
}
var vm = new Vue({
  el: "#app",
  data: {
    scrolllHeader: false,
    logoImg: "logo_black.png",
    menuImg: "menu_red.png",
    contactShow: true,
    able: false,
    titleText: '体验智能客服带来的便捷与高效',
    codeText: '获取验证码',
    count: 60,
    timer: null,
    actionId: '',
    checked: true,
    form: {
      tel: '',
      code: '',
      com: '',
      city: ''
    },
    rules: {
      tel: [
        { required: true, validator: checkTel, trigger: 'blur' }
      ],
      code: [
        { required: true, validator: checkCode, trigger: 'blur' }
      ],
      com: [
        { required: true, validator: checkCom, trigger: 'blur' }
      ],
      city: [
        { required: true, validator: checkCity, trigger: 'blur' }
      ]
    }
  },
  mounted () {
    // window.addEventListener("scroll", this.scrollHead);
  },
  created: function () {
    if (link.indexOf("source=menu") > -1) {
      this.titleText = "注册成功即可试用所有功能"
    }
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
    // 点击获取验证码倒计时........验证码倒计时
    getCode: throttle(function () {
      vm.actionId =
        vm.form.tel + "-" + Math.floor(Math.random() * 1000000);
      let param = new URLSearchParams();
      param.append('telNum', vm.form.tel);
      param.append('actionId', vm.actionId);
      param.append('info', "hollycrm-400.");
      param.append('actionName', "呼叫中心移动端试用申请");
      let applyParam = new URLSearchParams();
      applyParam.append('tel', vm.form.tel);
      applyParam.append('link', sourceUrl);
      // 下面是第一步的推送数据
      const telReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!vm.timer && telReg.test(vm.form.tel)) {
        axios({
          method: 'post',
          url: "/assets/api/sendVerifyMessage.php",
          data: param
        }).then(res => {
          console.log(res);
          if (res.data == "sent") {
            console.log('验证码发送成功');
          } else if (res.data == "error") {
            console.log('您的验证码已失效，请重新获取')
          } else {
            console.log("发送失败，请稍后再试");
          }
        })
          .catch(error => { });
        axios({
          method: 'post',
          url: '/assets/api/apply_code.php',
          data: applyParam
        }).then(res => {
          // console.log(res);
          console.log(res.data);
          console.log('第一步推送成功');
        })
          .catch(error => { });
        vm.timer = setInterval(() => {
          if (vm.count > 0 && vm.count <= 60) {
            vm.able = true
            vm.count--
            vm.codeText = vm.count + "秒后重新获取"
          } else {
            vm.able = false;
            vm.codeText = "获取验证码"
            clearInterval(vm.timer);
            vm.timer = null;
            vm.count = 60;
          }
        }, 1000)
      }
    }, 1500),
    // 验证码验证是否对错...........................验证码验证是否对错
    checkSmsCode: function () {
      let _this = this;
      let param = new URLSearchParams();
      param.append('telNum', _this.form.tel);
      param.append('actionId', _this.actionId);
      param.append('info', "hollycrm-400.");
      param.append('actionName', "呼叫中心移动端试用申请");
      param.append('code', _this.form.code);
      // 下面是第一步的推送数据
      axios({
        method: 'post',
        url: "/assets/api/verifyMessage.php",
        data: param
      }).then(res => {
        if (res.data.state == "vSucceed") {
          // console.log('服务端验证成功');
          _this.form.checkCode = res.data.rightCode;
        } else {
          console.log("验证失败");
        }
      })
        .catch(error => { });
    },
    // 提交..........................................提交
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this;
          let applyData = new URLSearchParams();
          applyData.append('tel', _this.form.tel);
          applyData.append('com', _this.form.com);
          applyData.append('city', vm.form.city);
          applyData.append('link', sourceUrl);
          axios({
            method: 'POST',
            url: '/assets/api/apply.php',
            data: applyData
          }).then(res => {
            // console.log(res);
            console.log(res.data);
            // console.log("提交成功");
            location.href = "/success.html";
          })
            .catch(error => { });
        } else {
          alert('提交失败!');
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
});
(function () {
  var bp = document.createElement("script");
  var curProtocol = window.location.protocol.split(":")[0];
  if (curProtocol === "https") {
    bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    bp.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();
