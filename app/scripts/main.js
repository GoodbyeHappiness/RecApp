var recApp = angular.module('recApp',[]);

/**
 * @author mr
 * @abstract demo
 */
recApp.filter('trustedHtml',trustedHtml);
trustedHtml.$inject = ['$sce'];
function trustedHtml ($sce) {
    return function (input) {
        return $sce.trustAs($sce.HTML,input);
    }
}
recApp.constant('pageState',{
    PAGE_MAIN : 1,
    PAGE_REGREF : 2
});
recApp.constant('requestUrl',{
    collect : '',  //收藏
    post : '',  //投递
    getRegs : '',  //请求简章
    //like : '',  //感兴趣
    linkEmail : ''  //发链接到邮箱
});
recApp.factory('dataRequest',dataRequest);
dataRequest.$inject = ['$http','requestUrl','$q'];
function dataRequest ($http,requestUrl,$q) {
    return {
        regCollect : regCollect,  //收藏简章
        resumePost : resumePost,  //投递简历
        getRegulations : getRegulations,  //获取简章
        sendEmail : sendEmail  //发送链接邮件
    };
    //具体细节
    function httpRequest (option) {
        var delay = $q.defer();
        $http(option).success(function (data) {
            if(data.status == 'success'){
                delay.resolve(data);
            }else {
                delay.reject(data.message);
            }
        }).error(function (data) {
            delay.reject(data.message);
        });
        return delay.promise;
    }
    function regCollect (rid) {
        return httpRequest({
            url : requestUrl.collect,
            method : 'get',
            params : {rid:rid}
        });
    }
    function resumePost (rid) {
        return httpRequest({
            url : requestUrl.post,
            method : 'get',
            params : {rid:rid}
        });
    }
    function getRegulations (id,likes) {
        return httpRequest({
            url : requestUrl.getRegs,
            method : 'post',
            data : {id:id,like:likes}
        });
    }
    function sendEmail () {
        return httpRequest({
            url : requestUrl.linkEmail,
            method : 'get'
        });
    }
}
//首页
recApp.controller('recControl',recControl);
recControl.$inject = ['$scope','$timeout','pageState'];
function recControl ($scope,$timeout,pageState) {
    $scope.stateFlag = pageState.PAGE_MAIN;
    $scope.init = function () {
        $scope.positionSelect = false;
        $scope.positionSelected = {
            status : false,
            target : null
        };
    };
    $scope.init();
    // 数据
    $scope.regulations = [
        {
            title:'亚信科技(中国)有限公司',
            content:'【企业简介】<br>亚信自1993年成立，一路助力中国互联网走过快速发展的20年，怀揣着' +
            '“把互联网带入祖国”的理想，开始“中国互联网建筑师”的旅程，并于2000年成为第一家' +
            '在美国上市的中国高科技企业。2002年，亚信成功完成向电信支撑软件提供商的转型，' +
            '为中国、丹麦、匈牙利、印度等十余个国家超过10亿的电信用户提供支撑。' +
            '亚信现拥有员工15000名，是中国最大、全球领先的通信行业IT解决方案和服务提供商，' +
            '并取得了BBS领域全球第二的业绩，软件产品净利润率超20%，' +
            '年收入20亿人民币（含硬件设备收入）。<br>' +
            '【招聘需求】<br>亚信技术培训生项目是从暑期实习开始的技术人才培养项目，培训生将完成3年定向培养，' +
            '迅速成长为能够独当一面的技术经理。<br>应聘者从暑期开始在公司进行实习和培训，秋季通过考核即可转聘，' +
            '并继续完成1年实习期（除暑期外，每周实习天数和毕业设计等返校要求可根据实际情况灵活协商）。<br>' +
            '技术培训生将参与公司核心软件产品设计与开发，其成果会应用于亚信各产品线，为客户提供电信服务运营、' +
            '智慧城市、智慧医疗、网络安全等解决方案；构建高效率、高质量的算法平台，优化为客户所提供各类产品的体验。<br>' +
            '技术培训生的工作地点在亚信战略重点的二线城市，我们提供与一线城市相同水准的薪酬福利待遇（一月一平米，年薪13w起）、' +
            '火箭式的升职加薪速度、更好的学习机会、广阔的发展平台。',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'亚信信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        }
    ];
    //缓存数据
    $scope.bufferRegulations = [
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'亚信信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        },
        {
            title:'亚信科技(中国)有限公司',
            content:'有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司亚信科技(中国)有限公司',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        }
    ];
    $scope.currentIndex = 0;
    $scope.hideRegulations = 0;
    $scope.setStyle = function ($index) {
        if ($index + 1 < $scope.currentIndex) {
            return $scope.cssTranslate.before
        } else if ($index + 1 == $scope.currentIndex) {
            return $scope.cssTranslate.pre
        } else if ($index == $scope.currentIndex) {
            return $scope.cssTranslate.current
        } else if ($index == $scope.currentIndex + 1) {
            return $scope.cssTranslate.next
        } else if ($index > $scope.currentIndex + 1) {
            return $scope.cssTranslate.after
        }
    };
    $(document).ready(function () {
        // 样式
        var body = $('body');
        $scope.body = {
            width : body.width(),
            height : body.height()
        };
        $scope.cssTranslate = {
            before : {
                //transform: 'translateX(-'+($scope.body.width+10)+'px) translateY(0) translateZ(0)',
                //'-webkit-transform': 'translateX(-'+($scope.body.width+10)+'px) translateY(0) translateZ(0)',
                //'-o-transform': 'translateX(-'+($scope.body.width+10)+'px) translateY(0) translateZ(0)',
                //'-moz-transform': 'translateX(-'+($scope.body.width+10)+'px) translateY(0) translateZ(0)',
                transform: 'translateX(-105%) translateY(0) translateZ(0)',
                '-webkit-transform': 'translateX(-105%) translateY(0) translateZ(0)',
                '-o-transform': 'translateX(-105%) translateY(0) translateZ(0)',
                '-moz-transform': 'translateX(-105%) translateY(0) translateZ(0)',
                opacity: 0
            },
            pre : {
                //transform: 'translateX(-'+($scope.body.width*0.95-5)+'px) translateY(0) translateZ(0)',
                //'-webkit-transform': 'translateX(-'+($scope.body.width*0.95-5)+'px) translateY(0) translateZ(0)',
                //'-o-transform': 'translateX(-'+($scope.body.width*0.95-5)+'px) translateY(0) translateZ(0)',
                //'-moz-transform': 'translateX(-'+($scope.body.width*0.95-5)+'px) translateY(0) translateZ(0)',
                transform: 'translateX(-95%) translateY(0) translateZ(0)',
                '-webkit-transform': 'translateX(-95%) translateY(0) translateZ(0)',
                '-o-transform': 'translateX(-95%) translateY(0) translateZ(0)',
                '-moz-transform': 'translateX(-95%) translateY(0) translateZ(0)',
                opacity: 1
            },
            current : {
                //transform: 'translateX(-'+$scope.body.width*0.05+'px) translateY(10px) translateZ(0)',
                //'-webkit-transform': 'translateX(-'+$scope.body.width*0.05+'px) translateY(10px) translateZ(0)',
                //'-o-transform': 'translateX(-'+$scope.body.width*0.05+'px) translateY(10px) translateZ(0)',
                //'-moz-transform': 'translateX(-'+$scope.body.width*0.05+'px) translateY(10px) translateZ(0)',
                transform: 'translateX(5%) translateY(10px) translateZ(0)',
                '-webkit-transform': 'translateX(5%) translateY(10px) translateZ(0)',
                '-o-transform': 'translateX(5%) translateY(10px) translateZ(0)',
                '-moz-transform': 'translateX(5%) translateY(10px) translateZ(0)',
                opacity: 1
            },
            next : {
                //transform: 'translateX(0px) translateY(20px) translateZ(0)',
                //'-webkit-transform': 'translateX(0px) translateY(20px) translateZ(0)',
                //'-o-transform': 'translateX(0px) translateY(20px) translateZ(0)',
                //'-moz-transform': 'translateX(0px) translateY(20px) translateZ(0)',
                transform: 'translateX(10%) translateY(20px) translateZ(0)',
                '-webkit-transform': 'translateX(10%) translateY(20px) translateZ(0)',
                '-o-transform': 'translateX(10%) translateY(20px) translateZ(0)',
                '-moz-transform': 'translateX(10%) translateY(20px) translateZ(0)',
                opacity: 1
            },
            after : {
                //transform: 'translateX(0px) translateY(-20px) translateZ(0)',
                //'-webkit-transform': 'translateX(0px) translateY(20px) translateZ(0)',
                //'-o-transform': 'translateX(0px) translateY(20px) translateZ(0)',
                //'-moz-transform': 'translateX(0px) translateY(20px) translateZ(0)',
                transform: 'translateX(10%) translateY(20px) translateZ(0)',
                '-webkit-transform': 'translateX(10%) translateY(20px) translateZ(0)',
                '-o-transform': 'translateX(10%) translateY(20px) translateZ(0)',
                '-moz-transform': 'translateX(10%) translateY(20px) translateZ(0)',
                opacity: 0
            }
        };
        //动态设置样式
        $('.rec-block').each(function (index) {
            $(this).css($scope.setStyle(index));
        });
        $('.rec-options div').fadeIn(100);
        //开始刷点击
        $('.refresh-begin img').click(function () {
            if($scope.stateFlag == pageState.PAGE_MAIN){
                $scope.stateFlag = pageState.PAGE_REGREF;
                $scope.$apply();
            }
        });
        //监听滑动事件
        body.mrTouch(function (e) {
            if($scope.stateFlag == pageState.PAGE_MAIN && e.direction == 'left'){
                $scope.stateFlag = pageState.PAGE_REGREF;
            }else if($scope.stateFlag == pageState.PAGE_REGREF){
                var recBlocks = $('.rec-block');
                // 左滑
                if(e.direction == 'left'){
                    if($scope.currentIndex == $scope.regulations.length - 1){
                        return
                    }
                    if($scope.currentIndex > 0){
                        recBlocks.eq($scope.currentIndex-1-$scope.hideRegulations).css($scope.cssTranslate.before);
                    }
                    recBlocks.eq($scope.currentIndex-$scope.hideRegulations).css($scope.cssTranslate.pre);
                    recBlocks.eq($scope.currentIndex+1-$scope.hideRegulations).css($scope.cssTranslate.current);
                    recBlocks.eq($scope.currentIndex+2-$scope.hideRegulations).css($scope.cssTranslate.next);
                    $scope.currentIndex++;
                    //只能往前滑49篇
                    if($scope.currentIndex > 50){
                        $scope.regulations[$scope.currentIndex-51] = $scope.currentIndex-51;
                        $scope.hideRegulations++;
                        console.log($scope.hideRegulations);
                        console.log($scope.currentIndex);
                    }
                }
                //右滑
                if(e.direction == 'right'){
                    if($scope.currentIndex == 0){
                        return
                    }
                    if(typeof $scope.regulations[$scope.currentIndex-1-$scope.hideRegulations] == 'number'){
                        $.mrAlert('不能再往前滑啦');
                        return
                    }
                    console.log($scope.hideRegulations);
                    console.log($scope.currentIndex);
                    if($scope.currentIndex-1-$scope.hideRegulations > 0){
                        recBlocks.eq($scope.currentIndex-2-$scope.hideRegulations).css($scope.cssTranslate.pre);
                    }
                    if($scope.currentIndex-$scope.hideRegulations > 0){
                        recBlocks.eq($scope.currentIndex-1-$scope.hideRegulations).css($scope.cssTranslate.current);
                    }
                    recBlocks.eq($scope.currentIndex-$scope.hideRegulations).css($scope.cssTranslate.next);
                    recBlocks.eq($scope.currentIndex+1-$scope.hideRegulations).css($scope.cssTranslate.after);
                    $scope.currentIndex--;
                }
                //还剩不到5篇时把缓存数据加进去并从服务器获取5篇作为缓存数据
                if($scope.currentIndex >= $scope.regulations.length - 5){
                    $scope.regulations = $scope.regulations.concat($scope.bufferRegulations);
                    //模拟请求更新缓存数据 TODO 从后台请求数据
                    $timeout(function () {
                        $scope.bufferRegulations = [
                            {
                                title:'亚信科技(中国)有限公司',
                                content:'server',
                                url:'http://baidu.com',
                                hotCount:5,
                                likeCount:3
                            },
                            {
                                title:'亚信科技(中国)有限公司',
                                content:'server',
                                url:'http://baidu.com',
                                hotCount:5,
                                likeCount:3
                            },
                            {
                                title:'亚信科技(中国)有限公司',
                                content:'server',
                                url:'http://baidu.com',
                                hotCount:5,
                                likeCount:3
                            },
                            {
                                title:'亚信科技(中国)有限公司',
                                content:'server',
                                url:'http://baidu.com',
                                hotCount:5,
                                likeCount:3
                            },
                            {
                                title:'亚信科技(中国)有限公司',
                                content:'server',
                                url:'http://baidu.com',
                                hotCount:5,
                                likeCount:3
                            }
                        ];
                    },1000);
                }
            }
            $scope.$apply();
        });
        //返回主页
        $scope.backMain = function () {
            $scope.stateFlag = pageState.PAGE_MAIN;
            $scope.init();
        };
        //显示隐藏职位
        $scope.showPositions = function () {
            $scope.positionSelect = true;
        };
        $scope.hidePositions = function () {
            $scope.positionSelect = false;
        };
        $scope.togglePositions = function () {
            $scope.positionSelect = !$scope.positionSelect;
        };
        //选择职位
        $scope.choosePosition = function (obj) {
            $scope.positionSelected.target = obj;
            $('.input-position>input').focus();
        };
        //focus隐藏positions
        $('.input-position>input').focus(function () {
            $scope.positionSelected.status = true;
            if(!$scope.positionSelected.target){
                $scope.$apply();
            }
        });
        //发送
        $scope.postPosition = function () {
            $scope.init();
            //TODO 告诉后台投递简历
            $.mrAlert('发送成功');
        };
        //收藏
        $scope.collect = function () {
            //TODO 收藏简历
            $scope.regulations[$scope.currentIndex].is_collect = 1;
            $.mrAlert('已收藏');
        };
    });
}
//列表
recApp.controller('listControl',listControl);
listControl.$inject = ['$scope','$timeout'];
function listControl ($scope,$timeout) {
    $scope.initPosition = function () {
        $scope.positionSelect = false;
        $scope.positionSelected = {
            status : false,
            target : null
        };
    };
    $scope.init = function () {
        var params = window.location.search;
        $scope.page = params.split('?')[1];
        switch($scope.page){
            case 'coll' :
                $scope.title = '收藏列表';
                break;
            case 'view' :
                $scope.title = '历史记录列表';
                break;
            case 'post' :
                $scope.title = '投递列表';
                break;
            default :
                $scope.title = '收藏列表';
        }
        $scope.initPosition();
    };
    $scope.init();
    $scope.pageState = 'list';
    $scope.viewRegulation = function () {
        $scope.pageState = 'view';
        $scope.selectRegulation = {
            title:'亚信科技(中国)有限公司',
            content:'【企业简介】<br>亚信自1993年成立，一路助力中国互联网走过快速发展的20年，怀揣着' +
            '“把互联网带入祖国”的理想，开始“中国互联网建筑师”的旅程，并于2000年成为第一家' +
            '在美国上市的中国高科技企业。2002年，亚信成功完成向电信支撑软件提供商的转型，' +
            '为中国、丹麦、匈牙利、印度等十余个国家超过10亿的电信用户提供支撑。' +
            '亚信现拥有员工15000名，是中国最大、全球领先的通信行业IT解决方案和服务提供商，' +
            '并取得了BBS领域全球第二的业绩，软件产品净利润率超20%，' +
            '年收入20亿人民币（含硬件设备收入）。<br>' +
            '【招聘需求】<br>亚信技术培训生项目是从暑期实习开始的技术人才培养项目，培训生将完成3年定向培养，' +
            '迅速成长为能够独当一面的技术经理。<br>应聘者从暑期开始在公司进行实习和培训，秋季通过考核即可转聘，' +
            '并继续完成1年实习期（除暑期外，每周实习天数和毕业设计等返校要求可根据实际情况灵活协商）。<br>' +
            '技术培训生将参与公司核心软件产品设计与开发，其成果会应用于亚信各产品线，为客户提供电信服务运营、' +
            '智慧城市、智慧医疗、网络安全等解决方案；构建高效率、高质量的算法平台，优化为客户所提供各类产品的体验。<br>' +
            '技术培训生的工作地点在亚信战略重点的二线城市，我们提供与一线城市相同水准的薪酬福利待遇（一月一平米，年薪13w起）、' +
            '火箭式的升职加薪速度、更好的学习机会、广阔的发展平台。',
            url:'http://baidu.com',
            hotCount:5,
            likeCount:3
        };
        $scope.initInput();
    };
    //显示隐藏职位
    $scope.showPositions = function () {
        $scope.positionSelect = true;
    };
    $scope.hidePositions = function () {
        $scope.positionSelect = false;
    };
    $scope.togglePositions = function () {
        $scope.positionSelect = !$scope.positionSelect;
    };
    $scope.backList = function () {
        $scope.pageState = 'list';
        $scope.initPosition();
    };
    //选择职位
    $scope.choosePosition = function (obj) {
        $scope.positionSelected.target = obj;
        $('.input-position>input').focus();
    };
    //focus隐藏positions
    $scope.initInput = function () {
        $timeout(function () {
            $('.input-position>input').unbind('focus').focus(function () {
                $scope.positionSelected.status = true;
                if(!$scope.positionSelected.target){
                    $scope.$apply();
                }
            });
        },100);
    };
    //发送
    $scope.postPosition = function () {
        $scope.initPosition();
        $.mrAlert('发送成功');
    };
}
//上传
recApp.controller('uploadControl',uploadControl);
uploadControl.$inject = ['$scope'];
function uploadControl ($scope) {

}
//注册
recApp.controller('registerControl',registerControl);
registerControl.$inject = ['$scope'];
function registerControl ($scope) {
    $scope.step = 1;
    $scope.waitMin = 0;
    $scope.perInfo = {
        major : '请选择',
        education : '请选择'
    };
    $scope.selectShow = {
        tag : null,
        data : {
            major : ['哲学','软件工程','计算机','法律','机械','土木','测绘','遥感'],
            education : ['大专','本科','硕士','博士']
        }
    };
    $scope.getCheckCode = function () {
        $scope.step = 2;
        $scope.sendCodeAgain($scope.waitMin);
    };
    $scope.setCheckCode = function () {
        $scope.step = 3;
    };
    $scope.complete = function () {
        $scope.step = 1;
    };
    $scope.sendCodeAgain = function (m) {
        if(minClock){
            clearInterval(minClock);
        }
        if(!m){
            $scope.waitMin = 59;
        } else {
            return
        }
        var minClock = setInterval(function () {
            $scope.waitMin = $scope.waitMin - 1;
            if($scope.waitMin == 0){
                clearInterval(minClock);
            }
            $scope.$apply();
        },1000);
    }
}
//扩展jQuery方法
(function ($) {
    $.fn.extend({
        mrTouch : function (callback) {
            var ele = this[0];
            var startX,startY;
            var flag = false;
            var isTouch = window.navigator.msPointerEnabled;
            var touchEvent = {
                'start': isTouch ? 'MSPointerDown' : 'touchstart',
                'move': isTouch ? 'MSPointerMove' : 'touchmove',
                'end': isTouch ? 'MSPointerUp' : 'touchend'
            };
            ele.addEventListener(touchEvent.start, function (e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            ele.addEventListener(touchEvent.move, function (e) {
                var offsetX = e.touches[0].clientX - startX;
                var offserY = e.touches[0].clientY - startY;
                if(!flag && Math.abs(offsetX) >= Math.abs(offserY) && Math.abs(offsetX) > 10){
                    e.preventDefault();
                    offsetX < 0 ? callback({direction:'left'}) : callback({direction:'right'});
                    flag = true;
                }
            });
            ele.addEventListener(touchEvent.end, function () {
                flag = false;
            });
        }
    });
    $.extend({
        mrAlert : function(string,duration){
            var ele = $('.alert-message');
            var time;
            if(duration && typeof duration == 'number' && duration >= 0){
                time = 100*Math.round(duration/100);
            }else {
                time = 1000;
            }
            $('.text-tip').html(string);
            ele.fadeIn(function () {
                setTimeout(function () {
                    ele.fadeOut();
                },time);
            });
        }
    });
})(jQuery);
