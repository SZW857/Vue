<template>
  <el-form ref="form"
           :model="form"
           label-width="80px"
           style="width: 700px">
    <el-form-item label="头像修改">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="家庭住址">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="form.region" placeholder="请选择性别">
        <el-option label="男" value="M"></el-option>
        <el-option label="女" value="F"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="暗色主题">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>



    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
  },
}
</script>