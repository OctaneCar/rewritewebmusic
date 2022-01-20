<script lang="ts" setup="setup">
import {Search, Avatar, CloseBold} from '@element-plus/icons-vue'
import {reactive, ref,} from "vue";
import http from "@/api/http";
import {ElForm, ElMessage} from "element-plus";
import loginInfo from "@/ts/loginInfo";
import {useRouter} from "vue-router";


const inputSearch = ref('')
const isShow = ref(false)
const times = ref(30)
const telRexg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const centerDialogVisible = ref(false)
const infoForm = reactive({
  phoneNum: '',
  captcha: ''
})
const rules = reactive({
  phoneNum: [{
    validator: telRexg,
    trigger: 'blur'
  }],
  captcha: [{
    required: true,
    message: '请输入验证码',
    trigger: 'blur'
  }]
})
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
const myRouter = useRouter();


const getCaptcha = () => {
  http({
    methods: 'post',
    url: `/captcha/sent?phone=${infoForm.phoneNum}&timerstamp=${Date.now()}`,
  })
      .then((res: any) => {
        console.log(res)
        if (res.data) {
          isShow.value = true
          tiemer()
        }
      })
      .catch((err: any) => {
        console.log(err)
      })


}
const tiemer = () => {
  let clock = setInterval(() => {
    times.value--
    if (times.value === 0) {
      window.clearInterval(clock)
      isShow.value = false
    }
  }, 1000)
}
const getInfo = () => {
  http({
    methods: 'post',
    url: `/captcha/verify?phone=${infoForm.phoneNum}&captcha=${infoForm.captcha}&timerstamp=${Date.now()}`
  })
      .then((res: any) => {
        http({
          methods: 'post',
          url: `/login/cellphone?phone=${infoForm.phoneNum}&captcha=${infoForm.captcha}&timerstamp=${Date.now()}`
        })
            .then((res: any) => {
              console.log(res)
              localStorage.setItem('userProfile', JSON.stringify(res))
              centerDialogVisible.value = false
            })
            .catch((err: any) => {
              console.log(err)
            })

      })
      .catch((err: any) => {
        console.log(err)
      })
}
const submitForm = () => {

  if (!telRexg.test(infoForm.phoneNum)) {
    ElMessage.error('请输入完整电话号码')
    infoForm.phoneNum = ''
    return false
  }
  if (!(infoForm.captcha.length === 4)) {
    ElMessage.error('请输入完整验证码')
    infoForm.captcha = ''
    return false
  }

  getInfo()
}
const goLogin = () => {
  centerDialogVisible.value = true
}
const myInfo = () => {

  myRouter.push({
    name: 'myinfo'
  })

}
const exit = () => {
}
const icon = () => {
  myRouter.push({path: '/#'})
}
const searchKeyWord = () => {
  http.post(`/search/suggest?keywords=${inputSearch.value}`)
      .then((res: any) => {
        console.log(res)
      })
}


</script>

<template>
  <div class="h-20 bg-b text-zinc-300 flex justify-center items-center" style="background-color: #333333">

    <div class="mr-24 flex items-center" @click="icon">
      <img alt="" class="w-14 h-14 rounded-full" src="@/assets/images/Logon.png">
      <h1 class="text-2xl font-bold ml-3">网易云音乐</h1>
    </div>

    <div class="h-full">
      <ul class="flex h-full ">
        <li class="w-24 mr-2 hover:bg-black h-full flex justify-center items-center cursor-pointer">发现音乐</li>
        <li class="w-24 hover:bg-black h-full flex justify-center items-center cursor-pointer">我的音乐</li>
        <li class="w-24 hover:bg-black h-full flex justify-center items-center cursor-pointer">关注</li>
        <li class="w-24 hover:bg-black h-full flex justify-center items-center cursor-pointer">下载</li>
      </ul>
    </div>

    <div class="ml-5">
      <el-input v-model="inputSearch" :prefix-icon="Search" class="focus:bg-violet-100" clearable
                placeholder="音乐/用户/电台" @input='searchKeyWord'/>
    </div>

    <div v-if="!loginInfo.profile.avatarUrl" class="ml-5">
      <el-button round size="large" type="info" @click="goLogin">登录</el-button>
      <el-dialog v-model="centerDialogVisible" class="bg-black" title="登录" width="30%">
        <el-form
            ref="ruleFormRef"
            :model="infoForm"
            :rules="rules"
            class="demo-ruleForm"
            label-width="120px"
            status-icon
        >
          <el-form-item prop="num">
            <el-input
                v-model="infoForm.phoneNum"
                autocomplete="off"
                class="num-input"
                placeholder="请输入手机号"
                type="text"
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
                v-model="infoForm.captcha"
                class="captcha-input"
                type="text"
            ></el-input>
            <el-button :disabled="isShow" class="getCaptcha-btn" @click="getCaptcha">{{
                isShow ? times - 1 : '获取验证码'
              }}
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="success" @click="submitForm(ruleFormRef)"
            >登录
            </el-button
            >
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>

    <div v-if="loginInfo.profile.avatarUrl" class="ml-5">
      <el-dropdown>
        <el-avatar :size="50" :src="loginInfo.profile.avatarUrl" size="small"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="myInfo">
              <el-icon>
                <avatar/>
              </el-icon>
              我的主页
            </el-dropdown-item>
            <el-dropdown-item @click="exit">
              <el-icon>
                <close-bold/>
              </el-icon>
              退出
            </el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>


  </div>
</template>

<style scoped>

.getCaptcha-btn {
  font-size: 10px;
  width: 70px;
  margin-left: 20px;
}

.num-input {
  width: 200px;
}

.captcha-input {
  width: 100px;
}

.login-btn {
  width: 200px;
}
</style>