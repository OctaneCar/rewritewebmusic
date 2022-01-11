import axios from "axios";
import {ElMessage} from "element-plus";
// 使用自定义的配置文件发送请求
const instance = axios.create({
    baseURL: 'https://netease-cloud-music-api-xi-lake.vercel.app',
    timeout: 7000,
});

instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    // eslint-disable-next-line no-debugger
    // debugger

    if (response.status === 200) {
        return response.data;
    } else {
        ElMessage.error('检查状态码')
    }
}, function (error) {
    // 对响应错误做点什么
    ElMessage.error('请求失败')
    return Promise.reject(error);
});

export default instance