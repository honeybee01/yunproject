!function ($) {
    //注册盒子显示
    $('.sbox .btn1').on('click', function () {
        $('.flogin').show()
    })
    let $user = $('.username')
    let $password = $('.pws')
    let $usernameflag = true
    $user.on('blur', function () {
        // 失去焦点value值不为空判断用户名是否被重复注册
        if ($user.val() !== '') {
            $.ajax({
                type: 'post',
                url: 'http://localhost/yunproject/project/php/registry.php',
                data: {
                    username: $user.val()
                }
            }).done(function (result) {
                if (!result) {
                    $('.p1').html('√').css('color', 'green')
                    $usernameflag = true
                } else {
                    $('.p1').html('该用户名已经存在').css('color', 'red')
                    $usernameflag = false
                }
            })
        } else {// 失去焦点用户名不能为空提示
            $('.p1').html('用户名不能为空').css('color', 'red')
            $usernameflag = false
        }
    })
    // 密码表单获取焦点
    $password.on('focus', function () {
        $('.p2').html('请输入一个6-12位的密码，必须两种字符组成').css('color', 'red')
        $('.p3').html('')
    })

    $password.bind('input', function () {
        //正则表达式请输入一个6-12位的密码，必须两种字符组成
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/g
        if (reg.test($(this).val())) {
            $('.p2').html('应该包含字母、数字、符号中至少两种').css('color', 'green')
            $('.p3').html('密码长度为6-16位').css('color', 'green')
            $usernameflag = true
        } else {
            $('.p2').html('包含字母、数字、符号中至少两种').css('color', 'red')
            $('.p3').html('密码长度为6-16位').css('color', 'red')
            $usernameflag = false
        }

    })

    $('.loginfrom').on('submit', function () {
        if ($user.val() == '') {
            $('.p1').html('用户名不能为空').css('color', 'red')
            $usernameflag = false
        }
        if ($password.val() == '') {
            $('.p2').html('密码不能为空').css('color', 'red')
            $('.p3').html('密码长度为6-16位').css('color', 'red')
            $usernameflag = false
        }
        if (!$usernameflag) {
            return false  //阻止跳转。
        }
    })


    // 点击悬浮登录盒子的返回登录悬浮的登录选项盒子显示
    $('.fbottom a').on('click', function () {
        $('.xbox').show()
        $(this).parent().parent().hide()
    })
    $('.lbottom a').on('click', function () {
        $('.xbox').show()
        $(this).parent().parent().hide()
    })


    // 点击悬浮的登录选项盒子登录和注册盒子分别显示
    $('.xbox .xphone').on('click', function () {
        $('.logins').show()
        $(this).parent().parent().parent().hide()
    })
    $('.xbox .xbtn1').on('click', function () {
        $('.flogin').show()
        $(this).parent().parent().parent().hide()
    })



    // 登录
    $('.btns').on('click', function () {
        // 用户名和密码不为空
        if ($('.user').val() && $('.pw').val() !== '') {
            console.log($('.user').val())
            console.log($('.pw').val())
            $.ajax({
                type: 'post',
                url: 'http://localhost/yunproject/project/php/login.php',
                data: {
                    user: $('.user').val(),
                    pass: hex_sha1($('.pw').val())

                }

            }).done(function (result) {
                console.log(result)
                if (result) {
                    location.href = 'index.html'
                    localStorage.setItem('username', $('.user').val())
                } else {
                    alert('用户名或者密码错误')
                }
            })
        } else {
            alert('用户名或者密码不能为空')
        }
    })

    // 登录盒子显示
    $('.sbox .phone').on('click', function () {
        $('.logins').show()
    })
    // 点击关闭盒子隐藏
    $('.close').on('down', function () {
        $(this).parent().parent().hide()
    })


    // // 悬浮登录盒子添加拖拽事件
    // $('.ltop').on('mousedown', function (e) {
    //     let $box=$(this).parent()
    //     let $sx=e.offsetX
    //     let $sy=e.offsetY
    //     $(document).on('mousemove', function (e) {
    //         $box.css({
    //             left: e.clientX - $sx,
    //             top: e.clientY - $sy,
    //             marginTop: 0,
    //             marginLeft: 0
    //         })
    //     })
    //     $(document).on('mouseup', function () {
    //         $(document).off('mouseup')
    //         $(document).off('mousemove')
    //     })
    // })
    // // 悬浮注册盒子添加拖拽事件
    // $('.ftop').on('mousedown', function (e) {
    //     let $box=$(this).parent()
    //     let $sx=e.offsetX
    //     let $sy=e.offsetY
    //     $(document).on('mousemove', function (e) {
    //         $box.css({
    //             left: e.clientX - $sx,
    //             top: e.clientY - $sy,
    //             marginTop: 0,
    //             marginLeft: 0
    //         })
    //     })
    //     $(document).on('mouseup', function () {
    //         $(document).off('mouseup')
    //         $(document).off('mousemove')
    //     })
    // })
    // // 悬浮登录选择方式盒子添加拖拽事件
    // $('.xtop').on('mousedown', function (e) {
    //     let $box=$(this).parent()
    //     let $sx=e.offsetX
    //     let $sy=e.offsetY
    //     $(document).on('mousemove', function (e) {
    //         $box.css({
    //             left: e.clientX - $sx,
    //             top: e.clientY - $sy,
    //             marginTop: 0,
    //             marginLeft: 0
    //         })
    //     })
    //     $(document).on('mouseup', function () {
    //         $(document).off('mouseup')
    //         $(document).off('mousemove')
    //     })
    // })

}(jQuery)