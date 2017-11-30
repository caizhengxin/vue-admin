/*
* @Author: caixin
* @Date:   2017-11-27 17:11:07
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-11-28 15:18:57
*/
import Mock from 'mockjs'


const Record = [];

for (let i = 0; i < 50; i++) {
  Record.push(Mock.mock({
    id: Mock.Random.guid(),
    ip: Mock.Random.ip(),
    url: Mock.Random.url('http'),
    address: Mock.Random.county(true),
    date: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  }));
}

export {
	Record
}