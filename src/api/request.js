import axios from 'axios'
import qs from 'qs'
const baseUrl = 'https://api.pesystem.linaxhua.cn/api'
const token = sessionStorage.getItem('access_token')
const getRequest = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + url + qs.stringify(params),
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

const patchRequest = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + url + '?' + qs.stringify(params),
      method: 'patch',
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

export {
  getRequest,
  postRequest,
  patchRequest
}
