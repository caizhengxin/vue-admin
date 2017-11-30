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
        <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div id="chartBar" class="charts"></div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div id="chartLine" class="charts"></div>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div id="chartPie" class="charts"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null
            }
        },

        methods: {
            drawColumnChart() {
                this.chartColumn = this.$Echarts.init(document.getElementById('chartColumn'));
                let option = {
                    backgroundColor: "#fff",
                    color: ['#ffd285', '#ff733f', '#ec4863'],
                    title: [
                        {
                            text: '新增用户',
                            left: '4%',
                            top: '6%',
                            textStyle: {
                                color: '#2c3e50'
                            }
                        },
                        {
                            text: '用户来源占比',
                            right: '7%',
                            top: '6%',
                            textAlign: 'center',
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
                        data: ['月', '周', '日']
                    },
                    grid: {
                        left: '2%',
                        right: '35%',
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
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                        name: '月',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        data: [90, 50, 39, 50, 120, 82, 80]
                    }, {
                        name: '周',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        data: [70, 50, 50, 87, 90, 80, 70]
                    }, {
                        name: '日',
                        smooth: true,
                        type: 'line',
                        symbolSize: 8,
                        symbol: 'circle',
                        data: [290, 200,20, 132, 15, 200, 90]
                    }, 
                    {
                        type: 'pie',
                        center: ['83%', '33%'],
                        radius: ['25%', '30%'],
                        label: {
                            normal: {
                                position: 'center'
                            }
                        },
                        data: [{
                            value: 335,
                            name: '用户来源分析',
                            itemStyle: {
                                normal: {
                                    color: '#ffd285'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: '{d} %',
                                    textStyle: {
                                        color: '#ffd285',
                                        fontSize: 20

                                    }
                                }
                            }
                        }, {
                            value: 180,
                            name: '占位',
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#87CEFA'
                                }
                            },
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#ffd285',
                                    },
                                    formatter: '\n手机号注册'
                                }
                            }
                        }]
                    },


                    {
                        type: 'pie',
                        center: ['83%', '72%'],
                        radius: ['25%', '30%'],
                        label: {
                            normal: {
                                position: 'center'
                            }
                        },
                        data: [{
                            value: 435,
                            name: '用户来源分析',
                            itemStyle: {
                                normal: {
                                    color: '#ff733f'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: '{d} %',
                                    textStyle: {
                                        color: '#ff733f',
                                        fontSize: 20

                                    }
                                }
                            }
                        }, {
                            value: 100,
                            name: '占位',
                            tooltip: {
                                show: false
                            },
                            itemStyle: {
                                normal: {
                                    color: '#87CEFA'


                                }
                            },
                            label: {
                                normal: {
                                    textStyle: {
                                        color: '#FF4500',
                                    },
                                    formatter: '\n三方快捷登陆'
                                }
                            }
                        }]
                    }]
                }
                this.chartColumn.setOption(option);
            },
            drawBarChart() {
                this.chartBar = this.$Echarts.init(document.getElementById('chartBar'));
                // this.$http.get('/api/data/asset/data/stock-DJI.json').then(response => {
                //     console.log(response);
                // })
                // this.chartBar.setOption(option);
            },
            drawLineChart() {
                this.chartLine = this.$Echarts.init(document.getElementById('chartLine'));
                this.chartLine.setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: 'Line Chart'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '搜索引擎']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                });
            },
            drawPieChart() {
                this.chartPie = this.$Echarts.init(document.getElementById('chartPie'));
                this.chartPie.setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: 'Pie Chart',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 335, name: '直接访问' },
                                { value: 310, name: '邮件营销' },
                                { value: 234, name: '联盟广告' },
                                { value: 135, name: '视频广告' },
                                { value: 1548, name: '搜索引擎' }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            drawCharts() {
                this.drawColumnChart()
                this.drawBarChart()
                this.drawLineChart()
                this.drawPieChart()
                this.addLoadEvent(this.chartColumn.resize)
                this.addLoadEvent(this.chartBar.resize)
                this.addLoadEvent(this.chartPie.resize)
                this.addLoadEvent(this.chartLine.resize)
            },
            addLoadEvent(fn) {
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
/*    body {
        background-color: #eee;
    }*/
    .tag-background {
        background-color: #fff;
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
