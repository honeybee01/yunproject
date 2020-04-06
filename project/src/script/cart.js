!function ($) {

    function showlist(sid, num) {//sid：编号  num：数量
        $.ajax({
            url: 'http://localhost/yunproject/project/php/alldata.php',
            dataType: 'json'
        }).done(function (data) {
            $.each(data, function (index, value) {

                if (sid == value.sid) {
                    let $clonebox = $('.one:hidden').clone(true, true)//克隆隐藏元素
                    $clonebox.find('.pic').find('img').attr('src', value.url)
                    $clonebox.find('.pic').find('img').attr('sid', value.sid)
                    $clonebox.find('.msg').find('p').html(value.title)
                    $clonebox.find('.price').find('em').html(value.price)
                    $clonebox.find('.num').find('input').val(num)
                    //计算单个商品的价格
                    $clonebox.find('.prices').find('em').html((value.price * num).toFixed(2))
                    $clonebox.css('display', 'block')
                    $('.carlist').append($clonebox)
                    calcprice();//计算总价
                }
            })

        })
    }

    //2.获取cookie渲染数据

    if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
        let s = jscookie.get('cookiesid').split(',')//获取cookie 同时转换成数组[1,2]
        let n = jscookie.get('cookienum').split(',')//获取cookie 同时转换成数组[10,20]
        $.each(s, function (index, value) {
            showlist(s[index], n[index])
        })
    }

    //3.计算总价--使用次数很多--函数封装
    function calcprice() {
        let $sum = 0;//商品的件数
        let $count = 0;//商品的总价格 
        $('.one:visible').each(function (index, ele) {
            if ($(ele).find('.check input').prop('checked')) {//复选框勾选
                $sum += parseInt($(ele).find('.num input').val());
                $count += parseFloat($(ele).find('.prices em').html());
            }
        });
        $('.bottom .product').find('em').html($sum)
        $('.allsum').find('em').html($sum)
        $('.allprice').find('em').html($count.toFixed(2))
    }

    //4.全选
    $('.allcheck').on('change', function () {
        $('.one:visible').find(':checkbox').prop('checked', $(this).prop('checked'))
        $('.allcheck').prop('checked', $(this).prop('checked'))
        calcprice()//计算总价
    })
    let $inputs = $('.one:visible').find(':checkbox');
    $('.carlist').on('change', $inputs, function () {
        //$(this):被委托的元素，checkbox
        if ($('.one:visible').find(':checkbox').length === $('.one:visible').find('input:checked').size()) {
            $('.allcheck').prop('checked', true)
        } else {
            $('.allcheck').prop('checked', false)
        }
        calcprice()//计算总价
    })

    //5.数量的改变
    $('.up').on('click', function () {
        let $num = $(this).parents('.one').find('.num input').val()
        $num++
        $(this).parents('.one').find('.num input').val($num)

        $(this).parents('.one').find('.prices em').html(calcsingleprice($(this)))
        calcprice()//计算总价
        setcookie($(this))
    })


    $('.down').on('click', function () {
        let $num = $(this).parents('.one').find('.num input').val()
        $num--
        if ($num < 1) {
            $num = 1
        }
        $(this).parents('.one').find('.num input').val($num)
        $(this).parents('.one').find('.prices em').html(calcsingleprice($(this)))
        calcprice();//计算总价
        setcookie($(this))
    })


    $('.num input').on('input', function () {
        let $reg = /^\d+$/g//只能输入数字
        let $value = $(this).val()
        if (!$reg.test($value)) {//不是数字
            $(this).val(1)
        }
        $(this).parents('.one').find('.prices em').html(calcsingleprice($(this)))
        calcprice();//计算总价
        setcookie($(this))
    })

    //计算单价
    function calcsingleprice(obj) {//obj元素对象
        let $dj = parseFloat(obj.parents('.one').find('.price em').html())
        let $num = parseInt(obj.parents('.one').find('.num input').val())
        return ($dj * $num).toFixed(2)
    }


    //将改变后的数量存放到cookie中
    let arrsid = []//存储商品的编号。
    let arrnum = []//存储商品的数量。
    function cookietoarray() {
        if (jscookie.get('cookiesid') && jscookie.get('cookienum')) {
            arrsid = jscookie.get('cookiesid').split(',')//获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = jscookie.get('cookienum').split(',')//获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = []
            arrnum = []
        }
    }

    function setcookie(obj) {
        cookietoarray()
        let $sid = obj.parents('.one').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.one').find('.num input').val()
        jscookie.add('cookienum', arrnum, 10)
    }

        //6.删除
        function delcookie(sid, arrsid) {//sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
            let $index = -1;//删除的索引位置
            $.each(arrsid, function (index, value) {
                if (sid === value) {
                    $index = index
                }
            })
            arrsid.splice($index, 1)
            arrnum.splice($index, 1)
    
            jscookie.add('cookiesid', arrsid, 10)
            jscookie.add('cookienum', arrnum, 10)
        }
        $('.delete').on('click', function () {
            cookietoarray()
            if (window.confirm('你确定要删除吗?')) {
                $(this).parents('.one').remove()
                delcookie($(this).parents('.one').find('img').attr('sid'), arrsid)
                calcprice()//计算总价
            }
        })
        // 根据本地存储，显示用户信息
    if(localStorage.getItem('username')){
        $('.login').hide()
        $('.yh').show()
        $('.yhs').html(localStorage.getItem('username'))
    }
    $('.tc').on('click',function(){
        $('.login').show()
        $('.yh').hide()
        localStorage.removeItem('username')
    })


















}(jQuery)