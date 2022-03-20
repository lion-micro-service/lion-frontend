<template>
  <div class="box">
    <div id="loading" hidden class="loading">
      <span></span>
    </div>

    <form class="login-form" method="post" id="loginForm">
      <section class="login">
        <div class='message-top'>
        </div>
        <div class="login-title">Lion 管理平台</div>
        <div class="login-name login-input">
          <span class="login-icon iconfont icon-yonghuming" id="icon-name"></span><input
            id="account" autocomplete="off" name="account" class="input"
            type="text" placeholder="请输入账号名" />
        </div>
        <div class="login-password login-input">
          <span class="login-icon iconfont icon-mobile" id="icon-pws"></span><input
            autocomplete="off" class="input" id="password" name="password"
            type="password" placeholder="请输入密码" />
        </div>
        <div class="login-code login-input">
          <span class="login-icon iconfont icon-yanzhengma" id="icon-code"></span><input
            maxlength=6 autocomplete="off" class="input input-code" id="vcode"
            name="vcode" type="text" placeholder="请输入验证码" /> <img
            class="imgs-code"
            id="vcode-image" />
        </div>
        <div class="login-button" id="loginButton">登录</div>
        <footer class="footer">
          <div class="copyright">
            Lion ©2020-2021 Created by <a href="#" onclick="window.open('https://github.com/lion-micro-service');">Mr.Liu</a>
          </div>
        </footer>
      </section>
    </form>
  </div>
</template>
<script lang="ts">
  import $ from 'jquery';
  import './assets/js/jquery/jquery.backstretch.min.js'
  import toastr from './assets/login/toastr.min.js';
  import './assets/js/jquery/md5.js';
  import './assets/login/toastr.min.css';
  import './assets/login/login.css';
  import './assets/login/icon/style.css';

  const img1 = require('@/assets/img/1.jpg')
  const img2 = require('@/assets/img/2.jpg')
  const img3 = require('@/assets/img/3.jpg')
  import {Vue,Options} from 'vue-property-decorator';
  @Options({
    components:{}
  })
  export default class Index extends Vue {
    public mounted(): void {
      let verKey:string;
      $.backstretch([ img1,img2,img3 ], {
        fade : 1000,
        duration : 8000
      });

      $(".input:not([type=checkbox])").blur(function() {
        if (!this.value) {
          $(this).addClass("input-error");
        } else {
          $(this).removeClass("input-error");
        }
      });

      $("#loginButton").click(function() {

        let isError:boolean = false;
        $(".input:not([type=checkbox])").each(function(){
          if (!this.value) {
            $(this).addClass("input-error");
            isError = true;
          } else {
            $(this).removeClass("input-error");
          }
        });
        if (!isError) {
          $("#loading").attr("hidden",false);
          const fd = new FormData();
          fd.append("verKey", verKey);
          fd.append("vcode", $('#vcode').val());
          fd.append("grant_type", "password");
          fd.append("client_id", "console");
          fd.append("client_secret", "console");
          fd.append("username", $('#account').val());
          fd.append("password", $.md5($('#password').val()));
          $.ajax({
            url: process.env.VUE_APP_BASEURL+process.env.VUE_APP_BASEAPI+'/lion-oauth2-authorization-server/oauth/token?_t='+new Date().getTime(),
            type: 'post',
            processData: false,
            contentType: false,
            data: fd,
            success: function (data) {
              if (data.status===200){
                sessionStorage.setItem("token",data.data.access_token);
                window.location.href=window.location.protocol+"//"+location.host+"/frame";
              }else {
                toastr.error(data.message);
              }
              $("#loading").attr("hidden",true);
            }
          })
        }
      });

      const captcha = function (){
        $.ajax({
          url: process.env.VUE_APP_BASEURL+process.env.VUE_APP_BASEAPI+'/lion-common-console-restful/captcha/console/fresh?_t='+new Date().getTime(),
          type: 'get',
          processData: false,
          contentType: false,
          success: function (data) {
            if (data.status===200){
              verKey = data.data.key;
              $('#vcode-image').attr('src', data.data.image);
            }else {
              toastr.error(data.message);
            }
          }
        })
      };
      $("#vcode-image").click(function() {
        captcha();
      });
      captcha();
    }
  }
</script>





<style lang="css">
.checkbox:checked {
  background: url('./assets/login/imgs/gou.png');
}
.loading{
  width: 150px;
  height: 8px;
  border-radius: 4px;
  margin: 0 auto;
  margin-top:100px;
  position: relative;
  background: lightblue;
  overflow: hidden;
}
.loading span{
  display:block;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: lightgreen;
  -webkit-animation: changePosition 4s linear infinite;
}
@-webkit-keyframes changePosition{
  0%{
    -webkit-transform: translate(-150px);
  }
  50%{
    -webkit-transform: translate(0);
  }
  100%{
    -webkit-transform: translate(150px);
  }
}
</style>