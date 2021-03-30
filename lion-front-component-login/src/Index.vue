<template>
    <div class="box">
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
                        Lion ©2020-2020 Created by <a href="#" onclick="window.open('https://github.com/lion-micro-service');">Mr.Liu</a>
                    </div>
                </footer>
            </section>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery'
    import './assets/login/toastr.min.css';
    import toastr from './assets/login/toastr.min.js';
    const img1 = require('@/assets/img/1.jpg')
    const img2 = require('@/assets/img/2.jpg')
    const img3 = require('@/assets/img/3.jpg')
    export default {
        data() {
            return {
            }
        }
    };

    $(function() {
        var verKey;
        toastr.options = {
            "timeOut": "5000",
            "positionClass": "toast-top-center"
        }
        //单个输入框验证
        $(".input:not([type=checkbox])").blur(function() {
            if (!this.value) {
                $(this).addClass("input-error");
            } else {
                $(this).removeClass("input-error");
            }
        });

        if ($.cookie("rem_name") && $.cookie("rem_pwd")) {
            $("#account").val($.cookie("rem_name"));
            $("#password").val($.cookie("rem_pwd"));
            $("#rememberMe")[0].checked = true;
        }
        $("#loginButton").click(function() {

            $(".input:not([type=checkbox])").each(function(){
                if (!this.value) {
                    $(this).addClass("input-error");
                } else {
                    $(this).removeClass("input-error");
                }
            });
            if ($(".input-error").length === 0) {
                var fd = new FormData();
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
                            window.location.href="/frame";
                        }else {
                            toastr.error(data.message);
                        }
                    }
                })
            }
        });
        $.backstretch([ img1,img2,img3 ], {
            fade : 1000,
            duration : 8000
        });
        var colors = {
            "0" : "10px 5px 70px #0d957a",
            "1" : "10px 5px 70px #ABB3A6",
            "2" : "10px 5px 70px #002842",
        };
        $(window).on("backstretch.before", function(e, instance, index) {

            $(".login").css("box-shadow", colors[index]);
        });

        //刷新验证码
        $("#vcode-image").click(function() {
            captcha();
        });

        function captcha() {
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
        }

        captcha();
    });
</script>





<style lang="css">
    .checkbox:checked {
        background: url('./assets/login/imgs/gou.png');
    }
</style>