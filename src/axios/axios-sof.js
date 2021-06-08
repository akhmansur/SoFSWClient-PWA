import axios from 'axios';

const querystring = require('querystring')
const convert = require('xml-js')
const commandsArray = ['getmappoints', 'getcomms', '0', 'chatmess !chroom? descr','chatmess !history']

export const sendCom = (comm) => {
  commandsArray.push(comm)
}

export const getArray = () => {
  return commandsArray.shift()
}

export const fetch_data = async (comm) => {
  const PROXY_URL = '';
  const URL = 'https://sofsw.jabbergames.ru/g.php';
  const sendData = {
    i: '6689595555',
    j: comm,
    v: 'a.1.0.8.7',
    lc: '0'
  }
  const response = await axios({
    url: PROXY_URL+URL,
    method: 'post',
    data: querystring.stringify(sendData),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    responseEncoding: 'utf8'
  })

  return convert.xml2js(response.data, {compact: true, spaces: 0})
}
