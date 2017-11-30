/*
* @Author: caixin
* @Date:   2017-11-27 14:55:31
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-11-27 17:50:00
*/
import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'http://opquj9rzr.bkt.clouddn.com/o_1bhrtk4h71oce1qibd7gauu3tt7.jpg?imageView2/1/w/150/h/150/format/png/q/75|imageslim',
    name: '菜心'
  }
];

const Users = [];

for (let i = 0; i < 50; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    // name: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    // 'age|18-60': 1,
    // birth: Mock.Random.date(),
    // sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };