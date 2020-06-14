var dataType = 'confirmed';
var dataName = {'confirmed': '累计确诊', 'death': '累计死亡', 'recovered': '累计治愈', 'cur_confirmed': '现存确诊'};
var dataSource = {'confirmed': 'data/epidemic/time_series_covid_19_confirmed.csv', 
                  'death': 'data/epidemic/time_series_covid_19_deaths.csv',
                  'recovered': 'data/epidemic/time_series_covid_19_recovered.csv'};
var compareList = [];

function readData(){
    $(document).ready(function(){
    
        var totalData = [], time = [];
        if (dataType == 'cur_confirmed'){
            var typeNames = ['confirmed', 'death', 'recovered']
            typeNames.forEach(function(typeName, idx){
                $.get(dataSource[typeName],function(theData){
                    var dataList = $.csv.toObjects(theData);
                    if (idx == 0){
                        Keys = Object.keys(dataList[0]);
                        time = Keys.slice(3, Keys.length);
                        for (var i = 0; i < time.length; i++){
                            totalData.push({time:time[i], data:[], confirmed:[], death: [], recovered: []});
                        }
                    }
                    dataList.forEach(function(rowData, idx){
                        time.forEach(function(item, idx){
                            var country = correctCountryName(rowData['Country/Region']);
                            totalData[idx][typeName].push({name:country, value: rowData[item]});
                        })
                    })
                    if (idx == 2){
                        totalData.forEach(function(item, timeIdx){
                            item.confirmed.forEach(function(countryItem, idx){
                                item.data.push({name:countryItem.name, value: countryItem.value - item.death[idx].value - item.recovered[idx].value})
                            })
                        })
                        buildMap(totalData, time)
                    }
                })
            })

        }
        else{
            $.get(dataSource[dataType],function(theData){
                var dataList = $.csv.toObjects(theData);
                Keys = Object.keys(dataList[0]);
                time = Keys.slice(3, Keys.length);
                for (var i = 0; i < time.length; i++){
                    totalData.push({time:time[i], data:[]})
                }
                dataList.forEach(function(rowData, idx){
                    time.forEach(function(item, idx){
                        var country = correctCountryName(rowData['Country/Region'])
                        totalData[idx].data.push({name:country, value: rowData[item]})
                    })
                })
                buildMap(totalData, time);
            })
        }
        
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
    // itemStyle:{
    //     emphasis:{label:{show:false}}
    // },
    
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
 


function buildMap(totalData, time){
    var timeRange = [];
    var seriesData = [];
    for (var i = 0; i < time.length; i++){
        timeRange.push(time[i].slice(5, time[i].length));

        var mapData = $.extend(true,{},template_map);
        mapData.name = dataName[dataType];
        mapData.data = totalData[i].data;
        seriesData.push({
            series: [mapData ,]
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
                color: '#FFFFCD'
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
                if (p.componentType == 'series' && p.seriesIndex == 0 && typeof(p.data) != "undefined")
                    return p.data.name + '<br/>' + p.seriesName +': ' + p.data.value;
                // else if (p.componentType == 'series' && p.seriesIndex == 1)
                //     return p.data.name + '<br/>点击查看详细信息';
                else if (p.componentType == 'timeline')
                    return p.name;
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
            showLabel: true,
            seriesIndex: 0,
            // type : 'piecewise',
            // pieces: [
            //     {min: 10000, color: "#ee6f23"}, // 不指定 max，表示 max 为无限大（Infinity）。
            //     {min: 5000, max: 9999, color: '#eb8742'},
            //     {min: 1000, max: 4999, color: '#e19a39'},
            //     {min: 100, max: 999, color: '#f5a73b'},
            //     {min: 1, max: 99, color: '#bbd044'},
            // ],
            // pieces: [
            //     {min: 10000, color: "rgb(112,22,29)"}, // 不指定 max，表示 max 为无限大（Infinity）。
            //     {min: 5000, max: 9999, color: 'rgb(203,42,47)'},
            //     {min: 1000, max: 4999, color: 'rgb(229,90,78)'},
            //     {min: 100, max: 999, color: 'rgb(245,158,131)'},
            //     {min: 1, max: 99, color: 'rgb(253,235,207)'},
            // ],
            min: 30000,
            max: 0,
            inRange:{
                color:["#ffdd54", "#ff680f"],
                colorAlpha: 0.9,
                //color:['#FFE985', '#FA742B']
                //color:['#cceabb','#fff3cd', '#ffc38b', '#ff926b']
                //color:['#5ebddf', '#f94a91']
                //['#95D7AE', '#7BAE7F', '#73956F', '#454851']
                //['#f1f2b5','#135058']
                //['#22c1c3','#fdbb2d']
                //['#7f7fd5','#86a8e7','#91eae4']
                //['#556270','#ff6b6b']
            },
            left: '15%',
            top: '59%',
            // text: ['多','少'],           // 文本，默认为数值文本
            calculable: true,
            textStyle:{
                color: '#FFFFCD'
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
        geo:[{
            roam:true,
            nameProperty: 'NAME',
            
            zoom:1,
            //selectedMode: 'single',
            map: 'world',
            itemStyle:{
                borderColor: '#FFFFCD',
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

function my_function() {
    if (document.getElementById("card").style.display == "") {
        document.getElementById("card").style.display="none";
    }
    else {
        document.getElementById("card").style.display="";
    }
}


mapChart.on('click', function(params){
    console.log(params.data.name)
    if (params.componentSubType == "map"){
        new_element=document.createElement("script");
        new_element.setAttribute("type","text/javascript");
        new_element.setAttribute("src","js/ncov.js");// 在这里引入了a.js
        document.body.appendChild(new_element);
        this_country_name = params.data.name;
        if(this_country_name == "United States") {
            this_country_name = "US";
        }

        card_drawAll(this_country_name);
        my_function();
    }
    // var idx = compareList.indexOf(params.name);
    // if (idx < 0){
    //     compareList.push(params.name);
    // }
    // else{
    //     compareList.splice(idx, 1)
    // }
    // console.log(compareList)
})