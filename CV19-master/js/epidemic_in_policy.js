// var dom = document.getElementById("hist");
// var myChart = echarts.init(dom);
// var app = {};
// option = null;
var k_color = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
var k_color_ = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8','#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a'];
var k_illdis=['Slovenia','Austria','Canada','Czechia','Germany','Hungary','Italy','Singapore','covid_age_distribution']
var k_units=['',' k',' km²',' per km²','%']

k_areapath=[]

k_death_name=[];
k_death=[];
k_deathperday=[];
k_cure_name=[];
k_cure=[];
k_cureperday=[];
k_pre=[];

k_agediv=[];
k_agedis=[];
k_ill_countryname=[];
k_ill_divdis=[];

k_text_key=[];
k_text_value=[];

k_event=[];

titlestack([], []);

function getColor(idx) {
    var palette = [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
    return palette[idx % palette.length];
}

/** Death, cure and prediction should be lists. Indices of month and day start from 0. Vol is the number of days.*/

function barstack(digdata, cnames, year = 2020, month = 0, day = 21, vol = 125) {
    myBarStack = echarts.init(document.getElementById('hist'));
    myBarStack.clear();


    var base = +new Date(year, month, day);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var seriesConf = [];
    for (var i in cnames) {
        var dic = {
            name : cnames[i],
            type : 'line',
            // stack : '新增人数',
            data : digdata[i]
        }
        seriesConf.push(dic);
    }

    for (var i = 1; i < vol; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
    }

    k_option_barstack = {
        color: k_color,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: cnames,
            top: '7%',
            textStyle: {
                color: '#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: date,
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }
        ],
        yAxis: [

            {
                type: 'value',
                name: '新增人数',
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            }
        ],

        series: seriesConf

    };
    myBarStack.setOption(k_option_barstack);
}
function titlestack(digdata, cnames, year = 2020, month = 0, day = 21, vol = 125) {
    myBarStack = echarts.init(document.getElementById('title'));
    // myBarStack.clear();
    k_option_barstack = {
        title: {
            left: 'center',
            top: '0%',
            text: '每日新增人数折线图（多国对比）',
            textStyle: {
                color: '#fff'
            }
        }
    };
    myBarStack.setOption(k_option_barstack);
}

function card_drawAll(cnames) {
    //console.log(k_agedis);
    var digdata = [];
    for (var i in cnames) {
        var cname = cnames[i];
        var card_index=k_death_name.indexOf(cname);
        // var death=k_death[card_index];
        // var cure=k_cure[card_index];
        // var prediction=k_pre[card_index];
        var deathperday=k_deathperday[card_index];
        var cureperday=k_cureperday[card_index];
        var diagnosepreday = [];
        for (var i in cureperday) {
            diagnosepreday.push(parseInt(cureperday[i]) + parseInt(deathperday[i]));
        }
        digdata.push(diagnosepreday);
    }



    // barstack(cure, cureperday, death, deathperday, prediction);
    barstack(digdata, cnames);
}
function readcsvcard(){
    // for areapath
    d3.csv('./data/epidemic/time_series_stringency.csv',function(data){
        k_areapath.push(Object.values(data).slice(1))
    })

    // for barstack
    d3.csv('./data/epidemic/time_series_covid_19_deaths.csv',function(data){
        k_death_name.push(data['Country/Region']);
        k_death.push(Object.values(data).slice(3));
    })
    d3.csv('./data/epidemic/time_series_covid_19_deaths_everyday.csv',function(data){
        k_deathperday.push([0].concat(Object.values(data).slice(3)));
    })
    d3.csv('./data/epidemic/time_series_covid_19_recovered.csv',function(data){
        k_cure_name.push(data['Country/Region']);
        k_cure.push(Object.values(data).slice(3));
    })
    d3.csv('./data/epidemic/time_series_covid_19_recovered_everyday.csv',function(data){
        k_cureperday.push([0].concat(Object.values(data).slice(3)));
    })
    d3.csv('./data/epidemic/SEIR_prediction.csv',function(data){
        k_pre.push(Object.values(data).slice(1));
    })

    // for agepie
    k_agediv=['0~4','5~14','15~24','25~64','65+']
    d3.csv('./data/epidemic/age_distribution.csv',function(data){
        //console.log(Object.values(data).slice(1));
        k_agedis.push(Object.values(data).slice(1));
    })
    for(var i=0;i<9;++i){
        d3.csv('./data/epidemic/covid_age_distribution/'+k_illdis[i]+'.csv',function(data){
            var ori=Object.values(data);
            var oriind=Object.keys(data);
            if(ori[0]=='')return;
            k_ill_countryname.push(ori[0]);
            //console.log(ori[0]);
            ori=ori.slice(1,ori.length);
            oriind=oriind.slice(1,oriind.length-1);
            k_ill_divdis.push([oriind,ori]);
        })
    }


    // for text
    k_text_key=['Country/Region','Population','Area','Density','Population GrowthRate']
    d3.csv('./data/epidemic/area_and_pop.csv',function(data){
        k_text_value.push(Object.values(data).slice(0,5));
    })

    // for eventrich
    d3.csv('./data/epidemic/time_series_event.csv',function(data){
        var dateofthiscountry=[];
        var eventofthiscountry=[];
        var ori=Object.values(data).slice(1);
        var oriind=Object.keys(data).slice(1);
        for(var i=0;i<ori.length;++i){
            if(ori[i]=='')continue;
            else{
                dateofthiscountry.push(oriind[i]);
                eventofthiscountry.push(ori[i]);
            }
        }
        //console.log([dateofthiscountry,eventofthiscountry])
        k_event.push([dateofthiscountry,eventofthiscountry]);
    })
}

function k_begin(){
    readcsvcard();
}

$(document).ready(k_begin);
