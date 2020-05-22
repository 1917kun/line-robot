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
  let msg = {}
  let arr = []
  
  // let arr2 = []
  try {
    const data = await rp({ uri: 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json', json: true })

    // for (let i = 0; i < data.result.records.length; i++) {
    // event.message.text是使用者傳的訊息
    // if (event.message.text.includes(`${data.result.records[i].sarea}`)) {
    //   arr.push(`${data.result.records[i]}`)
    // msg += `場站名稱:${data.result.records[i].sna}\n位置是:${data.result.records[i].ar}\n可借車位數:${data.result.records[i].sbi}\n可還空位數:${data.result.records[i].bemp}\n\n`
    // msg += `場站名稱:${data.result.records[i].sna}\n位置是:${data.result.records[i].ar}\n可借車位數:${data.result.records[i].sbi}\n可還空位數:${data.result.records[i].bemp}`
    // console.log(msg);
    //   }
    // }
    // for (let j = 0; j < arr.length; j++) {
    //   msg += `場站名稱:${data.result.records[j].sna}\n位置是:${data.result.records[j].ar}\n可借車位數:${data.result.records[j].sbi}\n可還空位數:${data.result.records[j].bemp}`
    // }
    // for(let k=0;k<data.result.records.length;k++){
    // if (event.message.text.includes(`${data.result.records[0].sarea}`)) {
    // arr2.push(`${data.result.records[k].lat}`)
    //   msg = {   
    // }
    // }
// ---------------------------------------------------------------------------------------------
    if (event.message.text === '1') {
      msg = { type: 'text', text: '請輸入地區名' }
    }

    for (let i = 0; i < data.retVal.length; i++) {
      if (event.message.text.includes(`${data.retVal[i].sarea}`)) {
        arr.push(`${data.retVal[i]}`)
      }
    }

    for (let j = 0; j < arr.length; j++) {
      msg += {
        type: 'template',
        altText: 'this is a carousel template',
        template: {
          type: 'carousel',
          columns: [{

            actions: [{
              type: 'location',
              title: 'my location',
              address: data.retVal[j].address,
              latitude: data.retVal[j].lat,
              longitude: data.retVal[j].lon
            }],
            text: `場站名稱:${data.retVal[j].sna}\n可借車位數:${data.retVal[j].sbi}\n可還空位數:${data.retVal[j].bemp}`,
          }]
        }
      }
    }
    // ------------------------------------------------------------------------------------------
    if (event.message.text === '2') {
      msg = {
        type: 'image',
        originalContentUrl: 'https://taipei.youbike.com.tw/images/5dae7194bae271537a0b4424/5eb8bc4436cea.png',
        previewImageUrl: 'https://taipei.youbike.com.tw/images/5dae7194bae271537a0b4424/5eb8bc4436cea.png'
      }
    }
    // -----------------------------------------------------------------------------------------
    else if (event.message.text ==='3') {
      msg = {
        type: 'template',
        altText: 'this is a confirm template',
        template: {
          type: 'confirm',
          text: '靠卡借車or掃碼借車?',
          actions:
            [{
              type: 'message',
              label: '靠卡借車',
              text: '靠卡借車'
            },
            {
              type: 'message',
              label: '掃碼借車',
              text: '掃碼借車'
            }]
        }
      }
    }
    else if (event.message.text === '靠卡借車') {
        msg= {
          type: 'image',
          originalContentUrl: 'https://img.onl/O3ZN3U' ,
          previewImageUrl: 'https://img.onl/O3ZN3U'
    }
  }
    else if (event.message.text === '掃碼借車') {
      msg = {
        type: 'image',
        originalContentUrl: 'https://img.onl/SckMFS',
        previewImageUrl: 'https://img.onl/SckMFS'
    }
    }
// ---------------------------------------------------------------------------
if(event.message.text === '嗨'){
  msg = { type: 'text', text: '功能查詢:\n資訊查詢請輸入1\n費率查詢請輸入2\n租還方式查詢請輸入3' }
}

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
