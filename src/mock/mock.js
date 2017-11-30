/*
* @Author: caixin
* @Date:   2017-11-27 14:55:11
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-11-29 17:09:49
*/
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { LoginUsers, Users } from './user'
import {Record} from './data/data'

let _Users = Users;
let _Record = Record;


export default {
	AnalogData() {
		let mock = new MockAdapter(axios);

		mock.onGet('/success').reply(200, {
				msg: 'success',
			}
		)

		mock.onGet('/error').reply(500, {
				msg: 'failure',
			}
		)

		mock.onGet('/user/list').reply(config => {
				// let {name} = config.params;
				// let mockUsers = _Users.filter(user => {
				// 	if (name && uesr.name.indexOf(name) == -1) return false;
				// 	return true;
				// });

				return new Promise((resolve, reject) => {
				    setTimeout(() => {
				    	resolve([200, {
				    		tableData: _Users
				    	}]);
				    }, 1000)
				})
			}
		)

		mock.onGet('/record').reply(config => {
			let {page, pageNum, startDate, endDate} = config.params;
			let mockRecord = _Record.filter(record => {
				if (startDate && endDate) {
					return record.date <= endDate && record.date >= startDate
				}
				return record
			});

			let total = mockRecord.length;
			mockRecord = mockRecord.filter((u, index) => index < pageNum * page && index >= pageNum * (page - 1));
				return new Promise((resolve, reject) => {
				    setTimeout(() => {
				    	resolve([200, {
				    		records: mockRecord,
				    		total: total,
				    	}]);
				    }, 1000)
				})
			}
		)

		mock.onPost('/record').reply(config => {
			let {id} = JSON.parse(config.data);

			_Record = _Record.filter(u => u.id !== id);
				return new Promise((resolve, reject) => {
				    setTimeout(() => {
				    	resolve([200, {
				    		msg: '删除成功',
				    		code: 200,
				    	}]);
				    }, 500)
				})
			}
		)

		mock.onPost('/recordbatch').reply(config => {
			let {ids} = JSON.parse(config.data);
			ids = ids.split(',');
			console.log(ids);

			_Record = _Record.filter(u => !ids.includes(u.id));
				return new Promise((resolve, reject) => {
				    setTimeout(() => {
				    	resolve([200, {
				    		msg: '删除成功',
				    		code: 200,
				    	}]);
				    }, 500)
				})
			}
		)
	}	
}