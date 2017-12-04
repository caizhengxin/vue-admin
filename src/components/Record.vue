<template>
	<section class="record-box">
		<el-col :span="24" class="toolbar">
			<div class="block">
				<el-date-picker
      			  v-model="dates"
			      type="datetimerange"
			      :picker-options="pickerOptions"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      align="right"
			      value-format="yyyy-MM-dd HH:mm:ss"
			      @change="handleChange">
    			</el-date-picker>
			</div>
		</el-col>

		<el-table
		  style="width: 100%"
		  :data="tableData"
		  border
		  highlight-current-row
		  show-header
		  @selection-change="handleSelectionChange"
		  v-loading="loading">
		  >
		  	<el-table-column type="selection" width="55">
    		</el-table-column>
		  	<el-table-column type="index" width="60">
		  	</el-table-column>
			<el-table-column prop="ip" label="IP" width="180" sortable></el-table-column>
			<el-table-column prop="url" label="url" width="180" sortable></el-table-column>
			<el-table-column prop="address" label="地址" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="date" label="日期" width="180" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
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
    .block {
    	margin: 10px;
    	overflow: hidden;
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
</style>

<script>
	import {getRecordPage, deleteRecordPage, deleteRecordBatch} from '../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				tableData: [],
				pickerOptions: {
          			shortcuts: [{
            			text: '最近一周',
		            	onClick(picker) {
		              		const end = new Date();
			              	const start = new Date();
			              	start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			              	picker.$emit('pick', [start, end]);
		            	}
          			},
          			{
            			text: '最近一个月',
            			onClick(picker) {
					      	const end = new Date();
					      	const start = new Date();
					      	start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					      	picker.$emit('pick', [start, end]);
            			}
          			},
          			{
            			text: '最近三个月',
            			onClick(picker) {
              				const end = new Date();
              				const start = new Date();
              				start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              				picker.$emit('pick', [start, end]);
            			}
          			}]
        		},
        		dates: '',
        		total: 0,
        		page: 1,
        		loading: false,
        		pageNum: 10,
        		sels: [],
			}
		},
		methods: {
			requests(func, para) {
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
					this.getRecord();
				})
			},
			message(para) {
				this.$confirm(para['msg'], para['title'], {
					type: para['type']
				}).then(() => {
					this.loading = true;
					this.requests(para['func'], para['para']);
				}).catch(() => {
				})
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getRecord();
			},
			handleSizeChange(val) {
				this.pageNum = val;
				this.getRecord();
			},
			getRecord: function() {
				let para = {
					page: this.page,
					pageNum: this.pageNum,
					startDate: this.dates[0],
					endDate: this.dates[1],
				};
				this.loading = true;
				getRecordPage(para).then((res) => {
					this.tableData = res.data.records;
					this.total = res.data.total;
					this.loading = false;
				})
			},
			handleDel: function(index, row) {
				this.message({
					msg: '确认删除该记录吗？',
					title: '提示',
					type: 'warning',
					func: deleteRecordPage,
					para: {id: row.id},
				});
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
					func: deleteRecordBatch,
					para: {ids: ids},
				});
			},
			handleChange: function() {
				if (this.dates.length >= 2) {
					this.getRecord();
				} else {}
			}
		},
		mounted() {
			this.getRecord();
		},
	}
</script>