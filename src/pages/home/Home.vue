<template>
    <div id="home" class="app-container">
        <div>首页</div>
        <el-form inline>
            <el-form-item label="消息">
                <el-input v-model="value" clearable/>
            </el-form-item>
        </el-form>
        <ul v-for="(item, index) in 100" :key="index"><li>{{item}}</li></ul>
        <el-button type="primary" @click="change">Primary</el-button>
    </div>
</template>

<script setup lang="ts">

const value = ref('')

const change = () => {
    ElMessage({
        type: 'success',
        message: '111111',
        grouping: true,
    })
}

</script>

<style scoped>
</style>
