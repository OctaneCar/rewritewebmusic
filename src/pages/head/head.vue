<script lang="ts" setup="setup">
import {Search} from '@element-plus/icons-vue'
import {ref} from "vue";
import http from "@/api/http";


const input = ref('')
const centerDialogVisible = ref(false)
const keyInfo = ref('')
const date = new Date()
const infoImg = ref('')
const logQrCheck = () => {

  setInterval(() => {
    http({
      methods: 'post',
      url: `/login/qr/check?key=${keyInfo.value}&timerstamp=${date.getTime()}`,
      withCredentials: true
    })
        .then((res: any) => {
          console.log(res)
        })
        .catch((err: any) => {
          console.log(err)
        })
  }, 2500);  //轮询

}
const logQrCreate = () => {
  http({
    methods: 'post',
    url: `/login/qr/create?key=${keyInfo}&qrimg=${true}&timerstamp=${date.getTime()}`,
    withCredentials: true
  })
      .then((res: any) => {
        console.log(res)
        infoImg.value = res.data.qrimg
        logQrCheck()
      })
      .catch((err: any) => {
        console.log(err)
      })
}
const logQrKey = () => {
  http({
    url: `/login/qr/key?timerstamp=${date.getTime()}`,
    withCredentials: true
  })
      .then((res: any) => {
        console.log(res)
        keyInfo.value = res.data.unikey
        logQrCreate()
      })
      .catch((err: any) => {
        console.log(err)
      })
}
const logApi = () => {
  logQrKey()
}

const goLogin = () => {
  centerDialogVisible.value = true
  logApi()
}

</script>

<template>
  <div class="h-20 bg-b text-zinc-300 flex justify-center items-center" style="background-color: #333333">
    <div class="mr-24 flex items-center">
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
      <el-input v-model="input" :prefix-icon="Search" class="focus:bg-violet-100" clearable placeholder="音乐/用户/电台"/>
    </div>
    <div class="ml-5">
      <el-button round size="large" type="info" @click="goLogin">登录</el-button>
      <el-dialog v-model="centerDialogVisible" class="bg-black" title="登录" width="30%">
        <span><img :src="infoImg" alt=""></span>
        <template #footer>
          <div>123</div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
.el-input {
  border-radius: 32px;
  width: 158px;
  height: 32px;
}

.el-input:focus {
  border: none;
}

</style>