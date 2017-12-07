/*
* @Author: caixin
* @Date:   2017-11-27 17:11:07
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-12-06 21:25:51
*/
import Mock from 'mockjs'


const Record = [];
const User = [];
const CMSGroup = [];
const CMSUser = [];

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


let permission = [
	['超级管理员', '拥有所有权限', 255],
	['普通管理员', '只读权限', 1],
]


for(let i = 0; i < 2; i++) {
    CMSGroup.push(Mock.mock({
    	id: Mock.Random.guid(),
    	permission_name: permission[i][0],
    	permission_desc: permission[i][1],
    	permission_value: permission[i][2],
    	users: Mock.Random.integer(0, 5),
    	startdate: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    	enddate: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
    }))
}


for(let i = 0; i < 50; i++) {
    CMSUser.push(Mock.mock({
        id: Mock.Random.guid(),
        user: Mock.Random.cname(),
        email: Mock.Random.email('qq.com'),
        password: 'caixin',
        group: permission[0][0],
        startdate: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        enddate: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),
        startip: Mock.Random.ip(),
        endip: Mock.Random.ip(),
        status: Mock.Random.integer(0, 1),
    }))
}


export {
	Record,
	User,
	CMSGroup,
    CMSUser,
}