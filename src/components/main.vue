<script lang="ts" setup="setup">

import http from "@/api/http";
import {ref} from "vue";

const banner = ref([''])
const playlist = ref([''])
const getBanner = () => {
  http.get('/banner?type=0')
      .then((res: any) => {
        banner.value = res.banners
      })
}
const getHotList = () => {
  http.get('/top/playlist?limit=8&order=hot')
      .then((res: any) => {
        console.log(res)
        playlist.value = res.playlists
      })
}

getBanner()
getHotList()

</script>

<template>
  <div>
    <div class="w-full bg-red-100">
      <div class="content-box">
        <el-carousel :autoplay="true" :interval="5000" arrow="never" height="270.5px">
          <el-carousel-item v-for="item in banner" :key="item">
            <img :src="item.imageUrl" alt="" style="width: 100%"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="content-box bg-white border-2 p-5">
      
      <div class="flex items-center">
        <img alt="" class="img-point" src="@/assets/images/point.png">
        <h1 class="text-red-700 text-2xl ml-5 mr-5">热门推荐</h1>
        <ul class="flex">
          <li class="li-font">华语</li>
          <el-divider direction="vertical"></el-divider>
          <li class="li-font">流行</li>
          <el-divider direction="vertical"></el-divider>
          <li class="li-font">民谣</li>
          <el-divider direction="vertical"></el-divider>
          <li class="li-font">电子</li>
        </ul>
      </div>

      <div class="mt-3 mb-3" style=" border-bottom: 2px solid #C10D0C;"></div>

      <div class="playlist-box">
        <div v-for="item in playlist" class="playlist">
          <img :src="item.coverImgUrl" alt="" style="width: 100%"/>
          <div class="listinfo">
            <img alt="" class="listicon" src="../assets/images/24gf-headphones.png"/>
            <span style="font-size: 10px;color: #ccc;padding-left: 8px;padding-right: 37px">{{
                item.playCount
              }}</span>
            <img alt="" class="listicon" src="../assets/images/play.png"/>
          </div>
          <div><span style="font-size: 10px">{{ item.name }}</span></div>
        </div>
      </div>

      <div class="flex items-center mt-20">
        <img alt="" class="img-point" src="@/assets/images/point.png">
        <h1 class="text-red-700 text-2xl ml-5 mr-5">个性化推荐</h1>
      </div>

      <div class="mt-3 mb-3" style=" border-bottom: 2px solid #C10D0C;"></div>
    </div>
  </div>


</template>

<style scoped>
.content-box {
  width: 750px;
  margin: 0 auto
}

.img-point {
  width: 14px;
  height: 14px;
}

.li-font {
  font-size: 10px;
}

.playlist-box {
  display: flex;
  flex-wrap: wrap;
}

.playlist {
  width: 140px;
  height: 140px;
  border: 1px solid whitesmoke;
  margin: 15px;
  cursor: pointer;
  position: relative;
}

.listinfo {
  width: 100%;
  height: 27px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  @apply bg-gray-700
}

.listicon {
  width: 20px;
  height: 20px;
}
</style>