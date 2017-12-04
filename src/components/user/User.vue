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
			<!-- <el-button type="primary" icon="el-icon-edit" class="add-user">添加用户</el-button> -->
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
			<el-table-column prop="name" label="用户" width="80" sortable></el-table-column>
			<el-table-column prop="tel" label="手机号" width="120" sortable></el-table-column>
			<el-table-column prop="startdate" label="注册时间" width="160" sortable>
			</el-table-column>
			<el-table-column prop="enddate" label="最近登录时间" width="160" sortable>
			</el-table-column>
			<el-table-column prop="startip" label="注册IP" width="140" sortable>
			</el-table-column>
			<el-table-column prop="endip" label="最近注册IP" min-width="140" sortable>
			</el-table-column>
			<el-table-column prop="status" label="状态" width="80"
			  :filters="[{text: '可用', value: '1'}, {text: '禁用', value: '0'}]"
			  :filter-method="filterStauts"
			  filter-placement="bottom-end">
				<template slot-scope="scope">
					<el-tag size="mini" v-if="scope.row.status == 1">可用</el-tag>
					<el-tag size="mini" v-else type="danger">禁用</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleBlack(scope.$index, scope.row)">{{ scope.row.status == 1 ? '拉黑' : '恢复' }}</el-button>
					<el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar-page">
			<el-button type="danger" class="deletes" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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

/*	.add-user {
		float: right;
	}*/

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
</style>

<script>
	import {deleteUser, deleteUsers, getUserList, modifyUsers} from '../../api/api';

	export default {
		data() {
			return {
				tableData: [],
        		total: 0,
        		page: 1,
        		loading: false,
        		pageNum: 10,
        		sels: [],
        		search: '',
			}
		},
		methods: {
			requests(func, para, execute) {
				func(para).then(data => {
					this.loading = false;
					let types = "success"
					if (data['code'] != 200) {
						types = "error"
					}
					this.$message({
						message: data.msg,
						type: types,
					});
					if (execute) {
						this.getUser();
					}
				})
			},
			message(para) {
				this.$confirm(para['msg'], para['title'], {
					type: para['type']
				}).then(() => {
					this.loading = true;
					this.requests(para['func'], para['para'], para['execute']);
				}).catch(() => {
				})
			},
			// formatStatus: function(row, column) {
			// 	return row.status == 1 ? '禁用' : '可用';
			// },
			handleCurrentChange(val) {
				this.page = val;
				this.getUser();
			},
			handleSizeChange(val) {
				this.pageNum = val;
				this.getUser();
			},
			getUser: function() {
				let para = {
					name: this.search,
					page: this.page,
					pageNum: this.pageNum,
				};
				this.loading = true;
				getUserList(para).then((res) => {
					this.tableData = res.data.users;
					this.total = res.data.total;
					this.loading = false;
				})
			},
			handleDel: function(index, row) {
				this.message({
					msg: '确认删除该记录吗？',
					title: '提示',
					type: 'warning',
					func: deleteUser,
					para: {id: row.id},
					execute: true,
				});
			},
			handleBlack: function(index, row) {
				let msg = row.status == 1 ? '确认拉黑吗？' : '确认恢复吗？'
				this.message({
					msg: msg,
					title: '提示',
					type: 'warning',
					func: modifyUsers,
					para: {id: row.id},
					execute: true,
				});
				// row.status = !row.status;
			},
			handleSelectionChange: function(sels) {
				this.sels = sels;
			},
			batchRemove: function() {
				let ids = this.sels.map(item => item.id).toString();
				this.message({
					msg: '确认删除选中记录吗？',
					title: '提示',
					type: 'warning',
					func: deleteUsers,
					para: {ids: ids},
					execute: true,
				});
			},
			handleChangeSearch: function() {
				this.getUser();
			},
			filterStauts: function(value, row) {
				return row.status == value;
			},
		},
		mounted() {
			this.getUser();
		},
	}
</script>