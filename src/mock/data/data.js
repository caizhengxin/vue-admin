/*
* @Author: caixin
* @Date:   2017-11-27 17:11:07
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-12-01 10:34:10
*/
import Mock from 'mockjs'


const Record = [];
const User = [];

Mock.Random.extend({
	tel: function(date) {
		var tels = [
			'15170028913',
			'15170028914',
			'15170028915',
			'15170028916',
			'15170028917',
		]
		return this.pick(tels)
	}
})

for (let i = 0; i < 50; i++) {
  Record.push(Mock.mock({
    id: Mock.Random.guid(),
    ip: Mock.Random.ip(),
    url: Mock.Random.url('http'),
    address: Mock.Random.county(true),
    date: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
  }));
}


for(let i = 0; i < 50; i++) {
    User.push(Mock.mock({
    	id: Mock.Random.guid(),
    	name: Mock.Random.cname(),
    	tel: Mock.Random.tel(),
    	startdate: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    	enddate: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    	startip: Mock.Random.ip(),
    	endip: Mock.Random.ip(),
    	status: Mock.Random.integer(0, 1),
    }))
}

export {
	Record,
	User
}