<template>
    <section class="chart-container">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content tag-background">
                    <div class="grid-left">
                        <div class="grid-head">
                            <strong class="head-top">12000</strong>
                            <p class="head-bottom">USER</p>
                        </div>
                    </div>
                    <div class="grid-right">
                        <div class="grid-icon">
                            <i class="fa fa-user i-con"></i>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content tag-background">
                    <div class="grid-left">
                        <div class="grid-head">
                            <strong class="head-top">12000</strong>
                            <p class="head-bottom">USER</p>
                        </div>
                    </div>
                    <div class="grid-right">
                        <div class="grid-icon i-view">
                            <i class="el-icon-view i-con"></i>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content tag-background">
                    <div class="grid-left">
                        <div class="grid-head">
                            <strong class="head-top">12000</strong>
                            <p class="head-bottom">USER</p>
                        </div>
                    </div>
                    <div class="grid-right">
                        <div class="grid-icon i-comments">
                            <i class="fa fa-comment i-con"></i>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content tag-background">
                    <div class="grid-left">
                        <div class="grid-head">
                            <strong class="head-top">12000</strong>
                            <p class="head-bottom">USER</p>
                        </div>
                    </div>
                    <div class="grid-right">
                        <div class="grid-icon i-post">
                            <i class="el-icon-document i-con"></i>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div id="chartColumn" class="charts"></div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div id="chartrRemember" class="charts"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import {UsersCharts} from '../../api/api';
    export default {
        data() {
            return {
                chartColumn: null,
            }
        },

        methods: {
            drawColumnChart: function() {
                this.chartColumn = this.$Echarts.init(document.getElementById('chartColumn'));
                let chartColumn = this.chartColumn;
                var userdata = []
                UsersCharts({}).then((res) => {
                    // console.log(res.data.usercharts);
                    userdata = userdata.concat(res.data.usercharts)
                    let option = {
                        backgroundColor: '#eef1f6',
                        color: ['#ff733f'],
                        title: [
                            {
                                text: '新增用户',
                                left: '4%',
                                top: '6%',
                                textStyle: {
                                    color: '#2c3e50'
                                }
                            }
                        ],
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            top: '7%',
                            textStyle: {
                                color: '#2c3e50',
                            },
                            data: ['每天']
                        },
                        grid: {
                            left: '2%',
                            right: '5%',
                            top: '16%',
                            bottom: '6%',
                            containLabel: true
                        },
                        toolbox: {
                            "show": false,
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            "axisLine": {
                                lineStyle: {
                                    color: '#609ee9'
                                }
                            },
                            "axisTick": {
                                "show": false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#2c3e50'
                                }
                            },
                            boundaryGap: false,
                            data: userdata.map(function (item) {
                                return item['date'];
                            })
                        },
                        yAxis: {
                            "axisLine": {
                                lineStyle: {
                                    color: '#609ee9'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#609ee9'
                                }
                            },
                            "axisTick": {
                                "show": false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#609ee9'
                                }
                            },
                            type: 'value'
                        },
                        series: [{
                            name: '每天',
                            smooth: true,
                            type: 'line',
                            symbolSize: 8,
                            symbol: 'circle',
                            data: userdata.map(function (item) {
                                return item['num'];
                            })
                        }]
                    }
                    chartColumn.setOption(option);
                })

                setInterval(() => {
                    UsersCharts({}).then((res) => {
                        if (userdata.length >= 10) {
                            userdata.shift();
                        }
                        
                        userdata = userdata.concat(res.data.usercharts)
                        chartColumn.setOption({
                            xAxis: {
                                data: userdata.map(function (item) {
                                    return item['date'];
                                })
                            },
                            series: [{
                                data: userdata.map(function (item) {
                                    return item['num'];
                                })
                            }]
                        })
                    });
                }, 1000)
            },
            // drawBarChart() {
            //     this.chartBar = this.$Echarts.init(document.getElementById('chartBar'));
            //     // this.$http.get('/api/data/asset/data/stock-DJI.json').then(response => {
            //     //     console.log(response);
            //     // })
            //     // this.chartBar.setOption(option);
            // },
            drawRememberChar: function() {
                this.chartrRemember = this.$Echarts.init(document.getElementById('chartrRemember'));
               
                Date.prototype.Format = function (fmt) { //author: meizz 
                    var o = {
                        "M+": this.getMonth() + 1, //月份 
                        "d+": this.getDate(), //日 
                        "h+": this.getHours(), //小时 
                        "m+": this.getMinutes(), //分 
                        "s+": this.getSeconds(), //秒 
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                        "S": this.getMilliseconds() //毫秒 
                    };
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                }
                function randomData() {
                    now = new Date(+now + oneDay);
                    value = value + Math.random() * 21 - 10;
                    return {
                        name: now.toString(),
                        value: [
                            now.Format('yyyy/MM/dd hh:mm:ss'),
                            Math.round(value)
                        ]
                    }
                }

                var data = [];
                var now = +new Date()
                var oneDay = 24 * 3600 * 1000;
                var value = Math.random() * 1000;
                for(let i = 0; i < 10; i++) {
                    data.push(randomData());
                }

                let option = {
                    title: {
                        text: '访问记录'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['Day'],
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis : [
                        {
                            type : 'time',
                            splitNumber: 30,
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            boundaryGap: [0, '100%'],
                        }
                    ],
                    series : [
                        {
                            name:'Day',
                            type:'line',
                            showSymbol: false,
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: data,
                        }
                    ]
                };
                this.chartrRemember.setOption(option);
                // setInterval(function () {

                //     for (var i = 0; i < 2; i++) {
                //         data.shift();
                //         data.push(randomData());
                //     }

                //     this.chartrRemember.setOption({
                //         series: [{
                //             data: data
                //         }]
                //     });
                // }, 1000);
            },
            drawCharts: function() {
                this.drawColumnChart()
                // this.drawRememberChar()
                this.addLoadEvent(this.chartColumn.resize)
                // this.addLoadEvent(this.chartrRemember.resize)
            },
            addLoadEvent: function(fn) {
                var old = window.onresize;
                if(typeof window.onresize != 'function') {
                    window.onresize = fn;
                } else {
                    window.onresize = function(){
                        old();
                        fn();
                    }
                }
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style>
    .tag-background {
        background-color: #eef1f6;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 100px;
        margin-bottom: 20px;
    }

    .grid-left, .grid-right {
        float: left;
        min-height: 100px;
    }

    .grid-left {
        width: 60%;
    }

    .grid-right {
        width: 40%;
    }

    .grid-head {
        width: 50%;
        height: 50px;
        margin: 25px 0 0 0;
    }

    .grid-head .head-top {
        font-size: 18px;
    }

    .grid-head .head-bottom {
        color: #AAB5BC;
        font-size: 12px;
    }

    .grid-icon {
        width: 60px;
        height: 60px;
        background-color: #FABE28;
        margin: 20px 25px 0 0;
        float: right;
    }

    .grid-icon .i-con {
        line-height: 60px;
        color: #fff;
        font-size: 26px;
    }

    .i-view {
        background-color: #f36a5a;
    }

    .i-comments {
        background-color: #1ABC9C;
    }

    .i-post {
        background-color: #30A5FF;
    }

    .charts {
        width: 100%;
        height: 400px;
        margin-bottom: 20px;
    }
</style>
