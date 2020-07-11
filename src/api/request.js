import axios from 'axios'
import qs from 'qs'
const baseUrl = 'http://pesystem.linaxhua.cn/api'
const token = localStorage.getItem('access_token')
const getRequest = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + url + '?' + qs.stringify(params),
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((res) => {
        reject(res)
      })
  })
}

const postRequest = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + url + '?' + qs.stringify(params),
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch((res) => {
        reject(res)
      })
  })
}

export {
  getRequest,
  postRequest
}
