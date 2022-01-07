<script lang="ts" setup="setup">
import {Search} from '@element-plus/icons-vue'
import {ref} from "vue";

import http from "@/api/http";

const input = ref('')
const centerDialogVisible = ref(false)

const goLogin = () => {
  centerDialogVisible.value = true
  // axios.get('https://netease-cloud-music-api-xi-lake.vercel.app/login/qr/key')
  //     .then(res => {
  //       let paramsA: any = {
  //         key: res.data.data.unikey,
  //         qrimg: '1',
  //       }
  //       axios.get('https://netease-cloud-music-api-xi-lake.vercel.app/login/qr/create', paramsA)
  //           .then(res => {
  //             console.log(res)
  //           })
  //           .catch(res => {
  //             console.log(res)
  //           })
  //     })
  //     .catch(res => {
  //       console.log(res)
  //     })
  logApi()
}
const logApi = () => {
  http.get('/login/qr/key')
      .then((res: any) => {
        console.log(res.unikey)
        let params: any = {
          key: res.unikey
        }
        http.get(`'/login/qr/create?key=${res.unikey}'`)
            .then((res: any) => {
              console.log(res)
            })
      })
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
        <span>1</span>
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