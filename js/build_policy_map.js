var dataType = 'strick_idx';
var dataName = {'strick_idx': '政策严格程度', 'shoool_close': '学校关闭', 'campaigns':'公共宣传', 'workplace_close': '工作场所', 'public_events':'公共活动', 'gathering':'集会限制', 'public_stransport':'公共交通', 'stay_at_home':'居家隔离', 'internal_move':'国内旅行', "international_traval":'国际旅行', 'testing_policy':'检测政策', 'contract_trace':'接触跟踪'};
// var dataSource = {'strick_idx': 'data/policy/covid_stringency_index.csv',
//                 'school_close': 'data/policy/school_closures_covid.csv',
//                 'campagins': 'data/policy/public_campaigns_covid.csv',
//                 'workplace_close': 'data/policy/workplace_closures_covid.csv',
//                 'public_events':'data/policy/public_events_covid.csv',
//                 'gathering':'data/policy/public_gathering_rules_covid.csv',
//                 'public_stransport':'data/policy/public_transport_covid.csv',
//                 'stay_at_home':'data/policy/stay_at_home_covid.csv',
//                 'internal_move':'data/policy/internal_movement_covid.csv',
//                 'international_traval':'data/policy/international_travel_covid.csv',
//                 'testing_policy':'data/policy/covid_19_testing_policy.csv',
//                 'contract_trace':'data/policy/covid_contact_tracing.csv'};
var dataSource = {'strick_idx': 'covid_stringency_index',
    'school_close': 'school_closures_covid',
    'campagins': 'public_campaigns_covid',
    'workplace_close': 'workplace_closures_covid',
    'public_events':'public_events_covid',
    'gathering':'public_gathering_rules_covid',
    'public_stransport':'public_transport_covid',
    'stay_at_home':'stay_at_home_covid',
    'internal_move':'internal_movement_covid',
    'international_traval':'international_travel_covid',
    'testing_policy':'covid_19_testing_policy',
    'contract_trace':'covid_contact_tracing'};
var monthMatch = {"Jan":'01', "Feb":'02', "Mar":'03', "Apr":'04', "May":'05', "Jun":'06', "Jul":'07', "Aug":'08', "Sep":'09', "Oct":'10', "Nov":'11', "Dec":'12'};
var symbolList = ['pin', 'circle', 'rect', 'triangle', 'diamond','roundRect', 'arrow']
var dataPieces = {'strick_idx': [
                        // {min: 80, max: 100, color: "#f06300"}, 
                        // {min: 60, max: 79, color: '#ff781a'},
                        // {min: 40, max: 59, color: '#ff8f56'},
                        // {min: 20, max: 39, color: '#ffc38b'},
                        // {min: 0, max: 19, color: '#ffdd54'},
                    ], 
                'school_close': [
                        {min: 0, max: 0, color: '#bbbbbb', label:'没有措施'}, 
                        {min: 1, max: 1, color: "#fceb8c", label:'建议关闭'},
                        {min: 2, max: 2, color: "#ff9757", label:'要求部分关闭'},
                        {min: 3, max: 3, color: "#ff715a", label:'要求全部关闭'},
                ],
                'campagins': [
                        {min: 0, max: 0, color: "#9de6e8", label:'没有宣传'}, 
                        {min: 1, max: 1, color: '#73b9d7', label:'官方宣传提醒'},
                        {min: 2, max: 2, color: '#909dea', label:'大规模宣传'},
                ],
                'workplace_close':[
                        {min: 0, max: 0, color: "#bbbbbb", label:'没有措施'}, 
                        {min: 1, max: 1, color: '#fceb8c', label:'推荐关闭'},
                        {min: 2, max: 2, color: '#ff9757', label:'要求部分关闭'},
                        {min: 3, max: 3, color: '#ff715a', label:'除必须外全部关闭'},
                ],
                'public_events':[
                        {min: 0, max: 0, color: "#9de6e8", label:'没有措施'}, 
                        {min: 1, max: 1, color: '#73b9d7', label:'推荐取消'},
                        {min: 2, max: 2, color: '#909dea', label:'要求取消'},
                ],
                'gathering':[
                        {min: 0, max: 0, color: "#bbbbbb", label:'没有措施'}, 
                        {min: 1, max: 1, color: '#FFFFCC', label:'限制大型集会'},
                        {min: 2, max: 2, color: '#CCFFCC', label:'限制100-1000人集会'},
                        {min: 3, max: 3, color: '#99CCCC', label:'限制100-10人集会'},
                        {min: 4, max: 4, color: '#5f99CC', label:'限制小于10人的集会'}
                ],
                'public_stransport':[
                        {min: 0, max: 0, color: "#9de6e8", label:'没有措施'}, 
                        {min: 1, max: 1, color: '#73b9d7', label:'推荐关闭/减少线路'},
                        {min: 2, max: 2, color: '#909dea', label:'要求关闭'},
                ],
                'stay_at_home':[
                        {min: 0, max: 0, color: "#bbbbbb", label:'没有措施'}, 
                        {min: 1, max: 1, color: '#f2ff97', label:'建议不要离家'},
                        {min: 2, max: 2, color: '#9ed79a', label:'要求除基本需求外不外出'},
                        {min: 3, max: 3, color: '#20af8e', label:'要求/限制最少的外出'},
                ],
                'internal_move':[
                        {min: 0, max: 0, color: "#CCFFCC", label:'没有限制'}, 
                        {min: 1, max: 1, color: '#99dbd8', label:'建议限制旅行'},
                        {min: 2, max: 2, color: '#21b0ae', label:'要求限制旅行'},
                ],
                'international_traval':[
                        {min: 0, max: 0, color: "#bbbbbb", label:'没有措施'}, 
                        {min: 1, max: 1, color: '#FFFFCC', label:'人员筛查'},
                        {min: 2, max: 2, color: '#CCFFCC', label:'高风险地区人员检疫'},
                        {min: 3, max: 3, color: '#99CCCC', label:'禁止高风险地区人员入境'},
                        {min: 4, max: 4, color: '#5f99CC', label:'完全关闭边境'}
                ],
                'testing_policy':[
                        {min: 0, max: 0, color: "#bbbbbb", label:'不检测'}, 
                        {min: 1, max: 1, color: '#f2ff97', label:'只测试符合特定标准者'},
                        {min: 2, max: 2, color: '#9ed79a', label:'测试任何出现症状者'},
                        {min: 3, max: 3, color: '#20af8e', label:'开放公开测试'},
                ],
                'contract_trace':[
                        {min: 0, max: 0, color: "#f2ff97", label:'不跟踪'}, 
                        {min: 1, max: 1, color: '#9ed79a', label:'有限接触跟踪'},
                        {min: 2, max: 2, color: '#20af8e', label:'全面接触跟踪'},
                ]};

var compareList = [];

function readcsv(filename, mainfunc) {
    var csvdata;
    var url = "http://127.0.0.1:5000/" + filename;
    console.log(url)
    $.ajax({
        "type" : "get",
        "url" : url,
        dataType:'jsonp',
        jsonp: "invoker", //指定参数名称
        jsonpCallback: filename, //指定回调函数
        "success" : function(data) {
            // 参数为json类型的对象
            // console.log(data[filename]);
            csvdata = data[filename];
            mainfunc(csvdata);
        },
        "error" : function() {
            alert("communication failed");
        }
    });
}

function readData(){
    $(document).ready(function(){
       // console.log(dataType, dataSource[dataType])
        var totalData = [], time = [], timeIdxMap = {}, countryPolicy = [];
        readcsv(dataSource[dataType], function(dataList) {
        // $.get(dataSource[dataType],function(theData){
        //     console.log(theData)
            // var dataList = $.csv.toObjects(theData);
            
            Keys = Object.keys(dataList[0]);
            var country = Keys[0], date = Keys[2], valName = Keys[3]
            var timeIdx = 0, firstPolicy = {}, lastPolicy = {};
            dataList.forEach(function(item, idx){
                var modifiedTime = modifyTimeFormat(item[date])
                var countryName = correctCountryName(item[country]);
                var policyGrade = item[valName]
                if( policyGrade > 0){
                    if (!firstPolicy.hasOwnProperty(countryName)){
                        firstPolicy[countryName] = modifiedTime
                        lastPolicy[countryName] = [[modifiedTime, countryName, policyGrade]]
                    }
                    if (dataType == "strick_idx")
                        lastPolicy[countryName].push([modifiedTime, countryName, policyGrade])
                    else if (policyGrade != lastPolicy[countryName].slice(-1)[0][2]){
                        //console.log(dataType, policyGrade, lastPolicy[countryName].slice(-1)[0][2])
                        lastPolicy[countryName].push([modifiedTime, countryName, policyGrade])
                    }
                }
            
                if (!timeIdxMap.hasOwnProperty(modifiedTime)){
                    timeIdxMap[modifiedTime] = timeIdx;
                    timeIdx += 1;
                    time.push(modifiedTime);
                    totalData.push({time:modifiedTime, data:[{name:countryName, value: policyGrade}]});
                }
                else{
                    totalData[timeIdxMap[modifiedTime]].data.push({name: countryName, value:policyGrade});
                }
            })
            var countryOrder=Object.keys(firstPolicy).sort(function(a,b){
                if (firstPolicy[a] > firstPolicy[b])
                    return -1;
                else if (firstPolicy[a] < firstPolicy[b])
                    return 1;
                return 0;
            });
            for (let key in lastPolicy){
                countryPolicy.push.apply(countryPolicy, lastPolicy[key])
            }
            //console.log(totalData.slice(0, 143), time.slice(0, 143))
            //console.log(lastPolicy, countryPolicy);
            buildMap(totalData.slice(0, 139), time.slice(0, 139), countryPolicy, countryOrder);
        })
    })
}

readData();


function correctCountryName(name){
    if (name == 'US')
        return 'United States';
    else if (name == 'Korea, South')
        return 'Korea';
    else if (name == "Congo (Kinshasa)")
        return 'Dem. Rep. Congo';
    else if (name == "Congo (Brazzaville)")
        return 'Congo';
    else if (name == 'South Sudan')
        return 'S. Sudan';
    else if (name == 'Central African Republic')
        return 'Central African Rep.';
    else if (name == 'Equatorial Guinea')
        return 'Eq. Guinea';
    else if (name == 'Bosnia and Herzegovina')
        return 'Bosnia and Herz.';
    else if (name == 'Dominican Republic')
        return 'Dominican Rep.';
    else if (name == 'Czechia')
        return 'Czech Rep.';
    else if (name == 'Laos')
        return 'Lao PDR';
    else if (name == 'Burma')
        return 'Myanmar';
    else if (name == 'Western Sahara')
        return 'W. Sahara'
    return name;
}

function modifyTimeFormat(time){
    var mouth = monthMatch[time.slice(0, 3)];
    var day = time.slice(4, 6);
    if (day[1] == ',')
        day = '0' + day[0];
    return "2020-" + mouth + '-' + day;
}


$('input[type=radio][name=color]').change(function() {
    dataType = this.value;
    readData();
});







var mapChart = echarts.init(document.getElementById('map'));

var template_map = {
    name: '疑似',
    type: 'map',
    //mapType: 'world',
    //selectedMode : 'multiple',
    
    geoIndex: 0,
    label: {
        // normal: {
        //     show: true,
        //     textStyle: {
        //         color: 'black',
        //         backgroundColor: '#dedede',
        //         borderRadius: 3,
        //         padding: 0.5,
        //     }
        // },
        emphasis: {
            show: true
        }
    },
    //nameMap:[],
    data:[]
};

var template_scatter = {
    name: 'compare contrity',
    type: 'scatter',
    coordinateSystem: 'geo',
    geoIndex: 0,
    itemStyle: {
        normal: {
            color: '#7c3c21',
            opacity: 1,
        }
    },
    symbol: 'triangle',
    symbolSize: 14,
    data:[{
        name: 'China',
        value: [ 116.4142, 40.1824, 1]
    },
    {
        name: 'U.S.A',
        value: [ -95.7129, 37.0902, 1]
    },
    {
        name: 'U.K',
        value: [ -3.436, 55.3781, 1]
    },
    {
        name: 'Russia',
        value: [ 90, 60, 4]
    }]
}

template_policy_scatter = {
    name: 'policy time',
    type: 'scatter',
    symbol: function(data){
        if (dataType == 'strick_idx')
            return 'circle';
        else
            return symbolList[parseInt(data[2])];
    },
    symbolSize: function (data) {
        if (dataType == 'strick_idx')
            return 7;
        else
            return 12;
    },
    data:[]
}


function buildMap(totalData, time, countryPolicy, countryOrder){
    var timeRange = [];
    var seriesData = [];
    //console.log(countryPolicy, countryOrder);
    for (var i = 0; i < time.length; i++){
        timeRange.push(time[i].slice(5, 10));

        var mapData = $.extend(true,{},template_map);
        var scatterData = $.extend(true,{},template_policy_scatter);
        mapData.name = dataName[dataType];
        mapData.data = totalData[i].data;
        scatterData.data = countryPolicy;
        seriesData.push({
            series: [mapData, scatterData ,/*template_scatter,*/]
        })
    }
    //console.log(seriesData[seriesData.length-1])

    //console.log(timeRange)
    var base_option = {
        label:{
            show: false
        },
        timeline: {
            autoPlay: false,
            loop: false,
            playInterval: 50,
            top: 'auto',
            bottom: 20,
            left: '5%',
            right: '45%',
            currentIndex: timeRange.length-1,
            axisType: 'category',
            data: timeRange,
            controlStyle:
                {
                    itemSize: 40,
                    color: '#fff',
                    borderWidth: 3,
                    borderColor: '#fff'
                },
            label:{
                color: '#FFFFCD',
                fontSize:14,
            }
        },
        // title: {
        //     text: 'COVID-19疫情地图',
        //     subtext: '',//'数据来源：国家及各省市地区卫健委',
        //     subtextStyle:{//副标题内容的样式
        //         color:'green',//绿色
        //         fontStyle:'normal',//主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
        //         fontFamily:"san-serif",//主题文字字体，默认微软雅黑
        //         fontSize:14//主题文字字体大小，默认为12px
        //     },
        //     // sublink: 'https://github.com/BlankerL/DXY-2019-nCoV-Data',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item',
            formatter: function(p){
                //console.log(p)
                if (p.componentType == 'timeline')
                    return p.name;
                else if (p.seriesIndex == 0 && typeof(p.data) != "undefined" && dataType!='strick_idx')
                    return p.data.name + ' ' + dataName[dataType] + '<br/>' + dataPieces[dataType][p.data.value].label;
                else if (p.seriesIndex == 0 && typeof(p.data) != "undefined" && dataType=='strick_idx')
                    return p.data.name + '<br/>' + dataName[dataType] + ' ' + p.data.value
                else if (p.seriesIndex == 0 && typeof(p.data) == "undefined")
                    return p.name + '<br/>没有数据';
                else if (p.seriesIndex == 1 && dataType=='strick_idx')
                    return p.data[0] + ' ' + p.data[1] + '<br/>' + dataName[dataType] + ' ' + p.data[2];
                else if (p.seriesIndex == 1 && dataType!='strick_idx')
                    return p.data[0] + ' ' + p.data[1] + '<br/>' + dataPieces[dataType][p.data[2]].label;
                else 
                    return ''
            }
        },
        // color: ['#2f4554','#c23531','#749f83'],
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        //     data:['累计治愈','累计死亡','累计确诊'],
        //     selectedMode: 'single',
        //     selected: {
        //         '累计确诊': false,
        //         '累计死亡': false
        //     }
        // },
        visualMap:{
            type : 'piecewise',
            showLabel: true,
            seriesIndex: [0,1],
            pieces: dataPieces[dataType],
            left: '4%',
            top: '65%',
            // text: ['多','少'],           // 文本，默认为数值文本
            calculable: true,
            max:100,
            min:0,
            itemHeight: 30,
            itemWidth:21,
            splitNumber:5,
            inRange:{
                colorAlpha:0.9,
                color: ['#ffed76', "#ff680f"]
            },
            textStyle:{
                color: '#FFFFCD',
                fontSize: 17,
            }
        },
        // toolbox: {
        //     show: true,
        //     // orient: 'vertical',
        //     right: '10%',
        //     top: 'top',
        //     itemSize: 30,
        //     itemGap: 30,
        //     feature: {
        //         saveAsImage: {
        //             pixelRatio: 5
        //         },
        //     }
        // },
        yAxis: {
            name: 'Country',
            type: 'category',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            data: countryOrder,
            axisLabel:{
                color: '#FFFFCD',
                fontSize:14,
            }
        },
        xAxis: {
            position: 'top',
            name: 'Date',
            type: 'time',
            axisLabel:{
                color: '#FFFFCD',
                fontSize:14,
            },
            min: '2020-01-01',
            max: '2020-05-21',
        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                right: '3%',
                start: 100, //数据窗口范围的起始百分比
                end: 93
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 7
            }
        ],
        grid: {
            top: '15%',
            bottom: "55%",
            left: '67%',
            right: '7%'
        },
        geo:[{
            roam:true,
            nameProperty: 'NAME',
            
            zoom:0.9,
            left: '-7%',
            top: "12%",        
            //selectedMode: 'single',
            map: 'world',
            itemStyle:{
                    borderColor: '#FFFFCD',
                    areaColor:'#dddddd',
            },
            emphasis:{
                label:{
                    show:false
                }
            }
        }],
        series: []
    };
    var option = {
        baseOption: base_option,
        options:seriesData
    };

    //mapChart.hideLoading();
    mapChart.clear()
    mapChart.setOption(option);

    
}

mapChart.on('click', function(params){
    //console.log(params)
    if (params.componentSubType == "map"){

        new_element=document.createElement("script");
        new_element.setAttribute("type","text/javascript");
        new_element.setAttribute("src","js/epidemic_in_policy.js");// 在这里引入了a.js
        document.body.appendChild(new_element);

        this_country_name = params.name;
        if(this_country_name == "United States") {
            this_country_name = "US";
        }

        var idx = compareList.indexOf(this_country_name);
        if (idx < 0){
            compareList.push(this_country_name);
        }
        else{
            compareList.splice(idx, 1)
        }
        card_drawAll(compareList);
        console.log(compareList)
    }
})
