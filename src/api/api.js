/*
* @Author: caixin
* @Date:   2017-11-25 16:13:36
* @Last Modified by:   1249614072@qq.com
* @Last Modified time: 2017-12-07 11:08:41
*/
import axios from 'axios';

let base = '';

const CMSLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

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


const getCMSUserList = params => { return axios.get(`${base}/cmsuser`, { params: params }); };
const deleteCMSUser = params => { return axios.post(`${base}/cmsuser`, params).then(res => res.data); };
const deleteCMSUsers = params => { return axios.post(`${base}/cmsuserbatch`, params).then(res => res.data); };
const modifyCMSUser = params => { return axios.post(`${base}/cmsusermodify`, params).then(res => res.data); };
const addCMSUsers = params => { return axios.post(`${base}/addcmsuser`, params).then(res => res.data); };


export {
	CMSLogin,

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

	getCMSUserList,
	deleteCMSUser,
	deleteCMSUsers,
	modifyCMSUser,
	addCMSUsers,
}