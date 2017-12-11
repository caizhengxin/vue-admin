<template>
	<section class="record-box">
		<el-col :span="24" class="toolbar">
			<el-button type="primary" icon="el-icon-edit" class="add-permission" @click="addFormVisible = true">添加权限</el-button>
		</el-col>

		<el-table
		  style="width: 100%"
		  :data="tableData"
		  border
		  highlight-current-row
		  show-header
		  @selection-change="handleSelectionChange"
		  :default-sort = "{prop: 'startdate', order: 'descending'}"
		  v-loading="loading">
		  >
		  	<el-table-column type="selection" width="55">
    		</el-table-column>
		  	<el-table-column type="index" width="60">
		  	</el-table-column>
			<el-table-column prop="permission_name" label="权限名" width="100%" sortable></el-table-column>
			<el-table-column prop="permission_desc" label="权限描述" min-width="120" sortable></el-table-column>
			<el-table-column prop="permission_value" label="权限值" width="100" sortable>
			</el-table-column>
			<el-table-column prop="users" label="用户数" width="100" sortable>
			</el-table-column>
			<el-table-column prop="startdate" label="创建时间" width="180" sortable>
			</el-table-column>
			<el-table-column prop="enddate" label="更新时间" width="180" sortable>
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
		  width="50%">
		  	<el-form
		  	  :model="addForm"
		  	  :rules="addFormRules"
		  	  ref="addForm"
		  	  class="addForm"
		  	  label-position="left"
		  	  label-width="80px">
		  		<el-form-item label="权限名" prop="permission_name">
		  			<el-input v-model="addForm.permission_name" placeholder="请输入权限名"></el-input>
		  		</el-form-item>
		  		<el-form-item label="权限描述" prop="permission_desc">
		  			<el-input v-model="addForm.permission_desc" type="textarea" placeholder="请输入权限描述"></el-input>
		  		</el-form-item>
		  		<el-form-item label="权限值" prop="permission_value">
		  			<el-input v-model.number="addForm.permission_value" placeholder="请输入权限值"></el-input>
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
		  width="50%">
		  	<el-form
		  	  :model="editForm"
		  	  :rules="addFormRules"
		  	  ref="editForm"
		  	  class="editForm"
		  	  label-position="left"
		  	  label-width="80px">
		  		<el-form-item label="权限名" prop="permission_name">
		  			<el-input v-model="editForm.permission_name" placeholder="请输入权限名"></el-input>
		  		</el-form-item>
		  		<el-form-item label="权限描述" prop="permission_desc">
		  			<el-input v-model="editForm.permission_desc" type="textarea" placeholder="请输入权限描述"></el-input>
		  		</el-form-item>
		  		<el-form-item label="权限值" prop="permission_value">
		  			<el-input v-model.number="editForm.permission_value" placeholder="请输入权限值"></el-input>
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

	.add-permission {
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
</style>

<script>
	import {deleteCMSGroup, deleteCMSGroups, getCMSGroup, addCMSGroup, modifyCMSGroup} from '../../api/api';

	export default {
		data() {
			return {
				tableData: [],
        		total: 0,
        		page: 1,
        		loading: false,
        		pageNum: 10,
        		sels: [],


        		addForm: {
        			permission_name: '',
        			permission_desc: '',
        			permission_value: '',
        		},

        		addFormVisible: false,
        		addFormRules: {
        			permission_name: [
        				{required: true, message: '请输入权限名', trigger: 'blur'},
        				{max: 10, message: '长度不能大于10'},
        			],
        			permission_desc: [
        				{required: true, message: '请输入权限描述', trigger: 'blur'},
        				{min: 1, max: 25, message: '长度在1-25个字符串'},
        			],
        			permission_value: [
        				{required: true, message: '请输入权限值'},
        				{type: 'number', min: 1, max: 256, message: '年龄必须为数字值(1-256)'}
        			]
        		},


        		editForm: {
        			permission_name: '',
        			permission_desc: '',
        			permission_value: '',
        		},


        		editFormVisible: false,
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
					page: this.page,
					pageNum: this.pageNum,
				};
				this.loading = true;
				getCMSGroup(para).then((res) => {
					this.tableData = res.data.cmsgroup;
					this.total = res.data.total;
					this.loading = false;
				})
			},
			handleDel: function(index, row) {
				this.confirm({
					msg: '确认删除该记录吗？',
					title: '提示',
					type: 'warning',
					func: deleteCMSGroup,
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
					func: deleteCMSGroups,
					para: {ids: ids},
					execute: true,
				});
			},
			handleAddSubmit: function() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.confirm({
							msg: '确定提交吗？',
							title: '提示',
							type: 'warning',
							func: addCMSGroup,
							para: Object.assign({}, this.addForm),
							execute: true,
						});
						this.$refs.addForm.resetFields();
					}
				})
			},
			handleEdit: function(index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			handleEditSubmit: function() {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.confirm({
							msg: '确定提交吗？',
							title: '提示',
							type: 'warning',
							func: modifyCMSGroup,
							para: Object.assign({}, this.editForm),
							execute: true,
						});
						this.$refs.editForm.resetFields();
					}
				})
			},
		},
		mounted() {
			this.init();
		},
	}
</script>