<script lang="ts" setup="setup">

import http from "@/api/http";
import {ref} from "vue";
import loginInfo from "@/ts/loginInfo";


const banner = ref([''])
const playlist = ref([''])
const albumList = ref([''])
const recommendList = ref([''])
const rankListA = ref([''])
const newArr = ref([''])

const getBanner = () => {
  http.get('/banner?type=0')
      .then((res: any) => {
        banner.value = res.banners
      })
}
const getHotList = () => {
  http.get('/top/playlist?limit=8&order=hot')
      .then((res: any) => {
        playlist.value = res.playlists
      })
}
const getNewAlbum = () => {
  http.get('/album/newest')
      .then((res: any) => {
        albumList.value = res.albums
      })
}
const getDailyList = () => {
  http.get(`/recommend/resource?limit=8&cookie=${loginInfo.userCookies}`)
      .then((res: any) => {
        recommendList.value = res.recommend
      })

}
const getRankListDetailA = () => {
  http.get('/playlist/detail?id=19723756')
      .then((res: any) => {
        rankListA.value = res.playlist
        newArr.value = res.playlist.tracks.slice(0.10)
        console.log(newArr.value.slice(0, 9))
      })
}


getBanner()
getHotList()
getNewAlbum()
getDailyList()
getRankListDetailA()
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

      <div class="playlist-box">
        <div v-for="item in recommendList" class="playlist">
          <img :src="item.picUrl" alt="" style="width: 100%"/>
          <!--          <div class="listinfo">-->
          <!--            <img alt="" class="listicon" src="../assets/images/24gf-headphones.png"/>-->
          <!--            <span style="font-size: 10px;color: #ccc;padding-left: 8px;padding-right: 37px">{{-->
          <!--                item.playcount-->
          <!--              }}</span>-->
          <!--            <img alt="" class="listicon" src="../assets/images/play.png"/>-->
          <!--          </div>-->
          <div><span style="font-size: 10px">{{ item.name }}</span></div>
        </div>
      </div>

      <div class="flex items-center mt-20">
        <img alt="" class="img-point" src="@/assets/images/point.png">
        <h1 class="text-red-700 text-2xl ml-5 mr-5">榜单</h1>
      </div>

      <div class="mt-3 mb-3" style=" border-bottom: 2px solid #C10D0C;"></div>

      <div class="flex">
        <div style="border: 1px solid crimson;width: 230px">
          <dl>
            <dt class="flex">
              <div style="width: 80px;height: 80px">
                <img :src="rankListA.coverImgUrl" alt="">
              </div>
              <div><h2>{{ rankListA.name }}</h2></div>
            </dt>
            <dd>
              <ol v-for="(items,index) in newArr.slice(0,10)" key="{{index}}">
                <li style="border: 1px solid wheat"><span>{{ index + 1 }}</span>{{ items.name }}</li>
              </ol>
            </dd>
          </dl>
        </div>

        <div style="border: 1px solid crimson;width: 230px">
          <dl>
            <dt class="flex">
              <div style="width: 80px;height: 80px">
                <img :src="rankListA.coverImgUrl" alt="">
              </div>
              <div><h2>{{ rankListA.name }}</h2></div>
            </dt>
            <dd>
              <ol v-for="(items,index) in newArr.slice(0,10)" key="{{index}}">
                <li style="border: 1px solid wheat"><span>{{ index + 1 }}</span>{{ items.name }}</li>
              </ol>
            </dd>
          </dl>
        </div>

        <div style="border: 1px solid crimson;width: 230px">
          <dl>
            <dt class="flex">
              <div style="width: 80px;height: 80px">
                <img :src="rankListA.coverImgUrl" alt="">
              </div>
              <div><h2>{{ rankListA.name }}</h2></div>
            </dt>
            <dd>
              <ol v-for="(items,index) in newArr.slice(0,10)" key="{{index}}">
                <li style="border: 1px solid wheat"><span>{{ index + 1 }}</span>{{ items.name }}</li>
              </ol>
            </dd>
          </dl>
        </div>

      </div>

      <div>

      </div>
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

.album-box {
  width: 118px;
  height: 100px;
  border: 1px solid #C10D0C;
  margin: 0 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
</style>