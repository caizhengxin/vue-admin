/*
* @Author: caixin
* @Date:   2017-11-25 16:13:36
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-12-05 11:06:43
*/
import axios from 'axios';

let base = '';

const getUserList = params => { return axios.get(`${base}/user`, { params: params }); };
const deleteUser = params => { return axios.post(`${base}/user`, params).then(res => res.data); };
const deleteUsers = params => { return axios.post(`${base}/userbatch`, params).then(res => res.data); };
const modifyUsers = params => { return axios.post(`${base}/usermodify`, params).then(res => res.data); };

const getRecordPage = params => { return axios.get(`${base}/record`, { params: params }); };
const deleteRecordPage = params => { return axios.post(`${base}/record`, params).then(res => res.data); };
const deleteRecordBatch = params => { return axios.post(`${base}/recordbatch`, params).then(res => res.data); };


const getCMSGroup = params => { return axios.get(`${base}/cmsgroup`, { params: params }); };
const deleteCMSGroup = params => { return axios.post(`${base}/cmsgroup`, params).then(res => res.data); };
const deleteCMSGroups = params => { return axios.post(`${base}/cmsgroupbatch`, params).then(res => res.data); };
const addCMSGroup = params => { return axios.post(`${base}/addcmsgroup`, params).then(res => res.data); };
const modifyCMSGroup = params => { return axios.post(`${base}/modifycmsgroup`, params).then(res => res.data); };

export {
	getUserList,
	deleteUser,
	deleteUsers,
	modifyUsers,

	getRecordPage,
	deleteRecordPage,
	deleteRecordBatch,

	getCMSGroup,
	deleteCMSGroup,
	deleteCMSGroups,
	addCMSGroup,
	modifyCMSGroup,
}