!function($){
    //注册盒子显示
    $('.sbox .btn1').on('click',function(){
        $('.flogin').show()
    })
    

    
    // 登录盒子显示
    $('.sbox .phone').on('click',function(){
        $('.logins').show()
    })
    // 点击关闭盒子隐藏
    $('.close').on('click',function(){
        $(this).parent().parent().hide()
    })



}(jQuery)