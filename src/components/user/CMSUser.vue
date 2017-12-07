<template>
	<section class="record-box">
		<el-col :span="24" class="toolbar">
			<el-input 
			  placeholder="请输入用户名/手机号"
			  v-model.trim="search"
			  class="search"
			  @input="handleChangeSearch"
			  suffix-icon="el-icon-search">
			</el-input>
			<el-button type="primary" icon="el-icon-edit" class="add-user" @click="handleAdd">添加CMS用户</el-button>
		</el-col>

		<el-table
		  style="width: 100%"
		  :data="tableData"
		  border
		  highlight-current-row
		  show-header
		  @selection-change="handleSelectionChange"
		  :default-sort = "defaultSort"
		  v-loading="loading">
		  >
		  	<el-table-column type="selection" width="55">
    		</el-table-column>
		  	<el-table-column type="index" width="40">
		  	</el-table-column>
			<el-table-column prop="user" label="用户" width="80" sortable></el-table-column>
			<el-table-column prop="email" label="邮箱" width="160" sortable></el-table-column>
			<el-table-column prop="group" label="分组" width="100" sortable></el-table-column>
			<el-table-column prop="startdate" label="注册时间" width="160" sortable>
			</el-table-column>
			<el-table-column prop="enddate" label="最近登录时间" width="160" sortable>
			</el-table-column>
			<el-table-column prop="startip" label="注册IP" width="140" sortable>
			</el-table-column>
			<el-table-column prop="endip" label="最近注册IP" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" width="60"
			  filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag size="mini" v-if="scope.row.status == 1">可用</el-tag>
					<el-tag size="mini" v-else type="danger">禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar-page">
			<el-button type="danger" class="deletes" @click="handleBatchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination
			  layout="total, sizes, prev, pager, next, jumper"
			  style="float:right;"
			  class="paging"
			  :total="total"
			  :page-size="pageNum"
			  @current-change="handleCurrentChange"
			  @size-change="handleSizeChange">
			</el-pagination>
		</el-col>

		<el-dialog
		  title="新增"
		  :visible.sync="addFormVisible"
		  :center="false"
		  show-message
		  width="30%">
		  	<el-form
		  	  :model="addForm"
		  	  :rules="addFormRules"
		  	  ref="addForm"
		  	  class="addForm"
		  	  label-position="left"
		  	  status-icon
		  	  label-width="80px">
		  		<el-form-item label="用户名" prop="user">
		  			<el-input v-model="addForm.user" placeholder="请输入用户名" auto-complete="off"></el-input>
		  		</el-form-item>
		  		<el-form-item label="邮箱" prop="email">
		  			<el-input v-model="addForm.email" type="email" placeholder="请输入邮箱" auto-complete="off"></el-input>
		  		</el-form-item>
		  		<el-form-item label="权限" prop="group" class="margin-left-10">
		  			<el-radio-group v-model="addForm.group">
		  				<el-radio v-for="item in group" :key="item.id" :label="item.id">{{ item.permission_name }}</el-radio>
		  			</el-radio-group>
		  		</el-form-item>
		  		<el-form-item label="密码" prop="password">
		  			<el-input v-model="addForm.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
		  		</el-form-item>
		  		<el-form-item label="密码" prop="checkpassword">
		  			<el-input v-model="addForm.checkpassword" type="password" placeholder="确认密码" auto-complete="off"></el-input>
		  		</el-form-item>
		  	</el-form>

		    <span slot="footer" class="dialog-footer">
		  		<el-button @click="addFormVisible = false">取 消</el-button>
		  		<el-button type="primary" @click.native.prevent="handleAddSubmit">确 定</el-button>
		    </span>
		</el-dialog>

		<el-dialog
		  title="编辑"
		  :visible.sync="editFormVisible"
		  :center="false"
		  show-message
		  width="30%">
		  	<el-form
		  	  :model="editForm"
		  	  :rules="addFormRules"
		  	  ref="editForm"
		  	  class="editForm"
		  	  label-position="left"
		  	  status-icon
		  	  label-width="80px">
		  		<el-form-item label="用户名" prop="user">
		  			<el-input v-model="editForm.user" placeholder="请输入用户名" auto-complete="off"></el-input>
		  		</el-form-item>
		  		<el-form-item label="邮箱" prop="email">
		  			<el-input v-model="editForm.email" type="email" placeholder="请输入邮箱" auto-complete="off"></el-input>
		  		</el-form-item>
		  		<el-form-item label="是否禁用" prop="status" class="margin-left-10">
			        <el-switch v-model="editForm.status"></el-switch>
			    </el-form-item>
		  	</el-form>

		    <span slot="footer" class="dialog-footer">
		  		<el-button @click="editFormVisible = false">取 消</el-button>
		  		<el-button type="primary" @click.native.prevent="handleEditSubmit">确 定</el-button>
		    </span>
		</el-dialog>

	</section>
</template>

<style>
	section.record-box {
		width: 99.7%;
	}

    .toolbar,
    .toolbar-page {
        background-color:#eee;
        margin-bottom: 10px;
    }

	.toolbar {
		padding: 10px;
	}

	.search {
		width: 20%;
		float: left;
	}

	.add-user {
		float: right;
	}

	tr {
		text-align: left;
	}
	thead tr {
		background-color: #eef1f6 !important;
	}

	.deletes {
		float: left;
		margin: 10px;
	}

	.paging {
		margin: 10px;
	}

	.toolbar-page {
		margin-top: 20px;
	}

	.el-dialog__header {
		text-align: left;
	}

	.el-form-item__content{
		text-align: left;
	}
	.margin-left-10 {
		margin-left: 10px;
	}
</style>

<script>
	import {deleteCMSUser, deleteCMSUsers, getCMSUserList, modifyCMSUser, addCMSUsers, getCMSGroup} from '../../api/api';

	export default {
		data() {
		    var validatePass = (rule, value, callback) => {
		        if (value === '') {
		        	callback(new Error('请输入密码'));
		        }else{
		        	if (this.addForm.checkpassword !== '') {
		        		this.$refs.addForm.validateField('checkpassword');
		        	}
		        	callback();
		        }
		    }

		    var validatePass2 = (rule, value, callback) => {
		    	if (value === '') {
		    		callback(new Error('请再次输入密码'));
		    	} else if (value !== this.addForm.password) {
		    		callback(new Error('两次输入密码不一致！'));
		    	} else {
		    		callback();
		    	}
		    }
			return {
				tableData: [],
        		total: 0,
        		page: 1,
        		loading: false,
        		pageNum: 10,
        		sels: [],
        		search: '',
        		defaultSort: {prop: 'startdate', order: 'descending'},

        		addFormVisible: false,
        		addForm: {
        			user: '',
        			email: '',
        			password: '',
        			checkpassword: '',
        			group: '',
        		},
        		group: '',
        		addFormRules: {
        			user: [
        				{required: true, message: '请输入用户名', trigger: 'blur'},
        			],
        			email: [
        				{required: true, message: '请输入邮箱', trigger: 'blur'},
        				{type: 'email', message: '邮箱格式错误！'},
        			],
        			password: [
        				{validator: validatePass, required: true},
        				{min: 6, max: 20, message: '请输入6-20位的密码'},
        			],
        			checkpassword: [
        				{validator: validatePass2, required: true},
        			]
        		},

        		editFormVisible: false,
        		editForm: {
        			user: '',
        			email: '',
        			status: false,
        			group: '',
        		}
			}
		},
		methods: {
			requests: function(para) {
				para['func'](para['para']).then(data => {

					let types = "success";
					let msg = data.msg

					if (data['code'] != 200) {
						types = "error";
						msg = "操作失败"
					}
					this.$message({
						message: msg,
						type: types,
					});

					this.editFormVisible = false;
					this.addFormVisible = false;

					if (para['execute']) {
						this.init();
					}
				})
			},
			confirm: function(para) {
				this.$confirm(para['msg'], para['title'], {
					type: para['type']
				}).then(() => {
					this.requests(para);
				}).catch(() => {
				})
			},
			getGroup: function() {
				let para = {
				};
				getCMSGroup(para).then((res) => {
					this.group = res.data.cmsgroup;
				})
			},
			// formatStatus: function(row, column) {
			// 	return row.status == 1 ? '禁用' : '可用';
			// },
			handleCurrentChange(val) {
				this.page = val;
				this.init();
			},
			handleSizeChange(val) {
				this.pageNum = val;
				this.init();
			},
			init: function() {
				let para = {
					name: this.search,
					page: this.page,
					pageNum: this.pageNum,
				};
				this.loading = true;
				getCMSUserList(para).then((res) => {
					this.tableData = res.data.cmsusers;
					this.total = res.data.total;
					this.loading = false;
				})
			},
			handleDel: function(index, row) {
				this.confirm({
					msg: '确认删除该记录吗？',
					title: '提示',
					type: 'warning',
					func: deleteCMSUser,
					para: {id: row.id},
					execute: true,
				});
			},
			handleSelectionChange: function(sels) {
				this.sels = sels;
			},
			handleBatchRemove: function() {
				let ids = this.sels.map(item => item.id).toString();
				this.confirm({
					msg: '确认删除选中记录吗？',
					title: '提示',
					type: 'warning',
					func: deleteCMSUsers,
					para: {ids: ids},
					execute: true,
				});
			},
			handleAdd: function() {
				this.getGroup();
				this.addFormVisible = true;
			},
			handleAddSubmit: function(){
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.confirm({
							msg: '确定提交吗？',
							title: '提示',
							type: 'warning',
							func: addCMSUsers,
							para: Object.assign({}, this.addForm),
							execute: true,
						});
						this.$refs.addForm.resetFields();
					}
				})
			},
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				row['status'] = row['status'] == 1 ? true : false;
				this.editForm = Object.assign({}, row);
			},

			handleEditSubmit: function() {
				console.log(this.editForm);
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.confirm({
							msg: '确定提交吗？',
							title: '提示',
							type: 'warning',
							func: modifyCMSUser,
							para: Object.assign({}, this.editForm),
							execute: true,
						});
						this.$refs.editForm.resetFields();
					}
				})
			},
			handleChangeSearch: function() {
				this.init();
			},
		},
		mounted() {
			this.init();
		},
	}
</script>