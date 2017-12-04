/*
* @Author: caixin
* @Date:   2017-11-27 14:55:11
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-12-03 15:22:34
*/
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {Record, User} from './data/data'

let _Record = Record;
let _User = User;


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

		mock.onGet('/user').reply(config => {
				let {name, page, pageNum} = config.params;
				let mockUsers = _User.filter(user => {
					if (name && user.name.indexOf(name) == -1 && user.tel.indexOf(name) == -1) return false;
					return true;
				});

				let total = mockUsers.length;
				mockUsers = mockUsers.filter((u, index) => index < pageNum * page && index >= pageNum * (page - 1));
				return new Promise((resolve, reject) => {
				    setTimeout(() => {
				    	resolve([200, {
				    		users: mockUsers,
				    		total: total,
				    	}]);
				    }, 1000)
				})
			}
		)

		mock.onPost('/usermodify').reply(config => {
			let {id} = JSON.parse(config.data);

			_User.some(u => {
				if (u.id == id) {
					u.status = !u.status;
					return true
				}
			});
				return new Promise((resolve, reject) => {
				    setTimeout(() => {
				    	resolve([200, {
				    		msg: '操作成功',
				    		code: 200,
				    	}]);
				    }, 500)
				})
			}
		)

		mock.onPost('/user').reply(config => {
			let {id} = JSON.parse(config.data);

			_User = _User.filter(u => u.id !== id);
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

		mock.onPost('/userbatch').reply(config => {
			let {ids} = JSON.parse(config.data);
			ids = ids.split(',');

			_User = _User.filter(u => !ids.includes(u.id));
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