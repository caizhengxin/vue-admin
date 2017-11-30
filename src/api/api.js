/*
* @Author: caixin
* @Date:   2017-11-25 16:13:36
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-11-29 12:00:07
*/
import axios from 'axios';

let base = '';

const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
const getRecordPage = params => { return axios.get(`${base}/record`, { params: params }); };
const deleteRecordPage = params => { return axios.post(`${base}/record`, params).then(res => res.data); };
const deleteRecordBatch = params => { return axios.post(`${base}/recordbatch`, params).then(res => res.data); };

export {
	getUserList,
	getRecordPage,
	deleteRecordPage,
	deleteRecordBatch,
}