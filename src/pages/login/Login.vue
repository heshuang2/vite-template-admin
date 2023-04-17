<template>
    <div class="h-screen font-sans login bg-cover bg-gradient-to-b from-black to-gray-800 overflow-hidden">
        <bg-canvas />
        <div class="container mx-auto h-full flex flex-1 justify-center items-center">
            <div class="relative mx-10 sm:max-w-sm w-full">
                <div class="card card-1 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"/>
                <div class="card card-2 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"/>
                <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
                    <label class="block mt-3 text-2xl text-gray-700 text-center font-semibold">
                        登录
                    </label>
                    <el-form class="mt-10" ref="loginFormRef" :model="loginForm" :rules="loginRules">
                        <el-form-item prop="account">
                            <el-input v-model="loginForm.account" placeholder="请输入账号" size="large">
                                <template #prefix>
                                    <Icon icon="noto-v1:bust-in-silhouette" height="20"/>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" placeholder="请输入密码" size="large"
                                      :type="isShowPwd ? 'text' : 'password'">
                                <template #prefix>
                                    <Icon icon="noto:locked" height="20"/>
                                </template>
                                <template #suffix>
                                    <Icon :icon="isShowPwd ? 'ph:eye' : 'ph:eye-closed'" height="20"
                                          @click="isShowPwd = !isShowPwd"/>
                                </template>
                            </el-input>
                        </el-form-item>
                        <div class="mt-10 flex">
                            <label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
                                <input
                                    id="remember_me"
                                    type="checkbox"
                                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="remember"
                                />
                                <span class="ml-2 text-sm text-gray-600"> 记住密码 </span>
                            </label>

                            <div class="w-full text-right">
                                <a class="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                    忘记密码
                                </a>
                            </div>
                        </div>

                        <div class="mt-7">
                            <el-button type="primary" class="w-full" :loading="isLoading" @click="handleLogin">登录</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { switchTheme } from '@/utils/theme'
import { isPassword } from '@/utils/validate/modules/validate-password'
import { useUserStore } from '@/stores/modules/user'
import BgCanvas from '@/pages/login/BgCanvas'

onMounted(() => {
    const theme = localStorage.getItem('theme')
    theme && switchTheme(localStorage.getItem('theme'))
})

const route = useRoute()
const router = useRouter()

const loginFormRef = ref()
const loginForm = reactive({
    account: 'admin',
    password: 'a123456'
})

const validatePassword = (rule, value, callback) => {
    if (!isPassword(value)) {
        return callback(new Error('密码必须包含字母和数字,长度最少为6位'))
    }
    return callback()
}
const loginRules = reactive({
    account: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { required: true, validator: validatePassword, trigger: ['blur', 'change'] }
    ]
})

const isShowPwd = ref(false)

const userStore = useUserStore()
const { login } = userStore
const isLoading = ref(false)
// 登录操作
const handleLogin = async () => {
    await loginFormRef.value.validate( async (valid, fields) => {
        if (valid) {
            isLoading.value = true
            try {
                const data = await login(loginForm)
                isLoading.value = false
                console.log(ElNotification)
                ElNotification({
                    title: '登录成功',
                    message: `欢迎您，${data.name}`,
                    type: 'success'
                })
                // ElMessage({ type: 'success', message: `欢迎您，${data.name}` })
                await router.push(route.query?.redirect ?? '/')
            } catch (err) {
                isLoading.value = false
                return err
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="scss" scoped>
.card-1 {
    background-color: $menuActiveBg
}

.card-2 {
    background-color: $menuBg;
}
</style>
