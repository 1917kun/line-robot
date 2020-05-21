// 引用linebot套件
import linebot from 'linebot'
// 引用dotenv套件
import dotenv from 'dotenv'
// 引用request 套件
import rp from 'request-promise'

// 讀取.env 檔
dotenv.config()

// 宣告機器人的資訊
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// 當使用者進來時
// 當收到訊息時
bot.on('message', async (event) => {
  let msg = ''
  let arr = []
  let arr2 = []
  try {
    const data = await rp({ uri: 'https://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000352-001', json: true })

    for (let i = 0; i < data.result.records.length; i++) {
      // event.message.text是使用者傳的訊息
      if (event.message.text.includes(`${data.result.records[i].sarea}`)) {
        arr.push(`${data.result.records[i]}`)
        // msg += `場站名稱:${data.result.records[i].sna}\n位置是:${data.result.records[i].ar}\n可借車位數:${data.result.records[i].sbi}\n可還空位數:${data.result.records[i].bemp}\n\n`
        // msg += `場站名稱:${data.result.records[i].sna}\n位置是:${data.result.records[i].ar}\n可借車位數:${data.result.records[i].sbi}\n可還空位數:${data.result.records[i].bemp}`
        // console.log(msg);
      }
    }
    for (let j = 0; j < arr.length; j++) {
      msg += `場站名稱:${data.result.records[j].sna}\n位置是:${data.result.records[j].ar}\n可借車位數:${data.result.records[j].sbi}\n可還空位數:${data.result.records[j].bemp}`
    }

    // for(let k=0;k<data.result.records.length;k++){
    if (event.message.text.includes(`${data.result.records[0].sarea}`)) {
      // arr2.push(`${data.result.records[k].lat}`)
      msg = {
        
    }
    // }
  }
  catch (error) {
    msg = '發生錯誤'
  }
  event.reply(msg)

})


// 在port啟動
bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
