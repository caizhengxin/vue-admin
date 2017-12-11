/*
* @Author: caixin
* @Date:   2017-12-08 14:56:35
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-12-08 17:16:56
*/
import Mock from 'mockjs'


const UserCharts = [];


for (let i = 0; i < 10; i++) {
  UserCharts.push(Mock.mock({
    id: Mock.Random.guid(),
    num: Mock.Random.integer(0, 100),
    date: Mock.Random.now('dd'),
  }));
}


export {
	UserCharts,
}