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

// 當收到訊息時
bot.on('message', async (event) => {
  let msg = {}
  let arr = []
  try {
    const datajson = await rp({ uri: 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json', json: true })
    const data = eval('datajson')
    const dat = data.retVal
    
    // ----------------------------------------使用者輸入地區名 回傳資訊-------------------------------------------------------------------
    for (let d in dat) {
      if (dat[d].sna.includes(event.message.text)) {
        // arr.push(dat[d])
        msg = {
          type: 'template',
          altText: 'this is a buttons template',
          template: {
            type: 'buttons',
            thumbnailImageUrl: 'https://img.onl/TwSRW',
            title: dat[d].sna,
            text: dat[d].ar,
            actions: [{
              type: 'message',
              label: '可借車位數',
              text: dat[d].sna + '可借車位數'
            }, {
              type: 'message',
              label: '可還空位數',
              text: dat[d].sna + '可還空位數'
            },
            {
              type: 'message',
              label: '地圖',
              text: dat[d].sna + '地圖'
            }]
          }
        }
      }
      if (event.message.text === dat[d].sna + '可借車位數') {
        msg = {
          type: 'text', text: dat[d].sbi
        }
      }
      if (event.message.text === dat[d].sna + '可還空位數') {
        msg = {
          type: 'text', text: dat[d].bemp
        }
      }
      if (event.message.text === dat[d].sna + '地圖') {
        msg = {
          type: 'location',
          title: 'my location',
          address:dat[d].sna,
          latitude: dat[d].lat,
          longitude: dat[d].lng
        }
      }
    }
    // ---------------------------------使用者輸入2 回傳費率---------------------------------------------------------
    if (event.message.text === '2') {
      msg = {
        type: 'image',
        originalContentUrl: 'https://taipei.youbike.com.tw/images/5dae7194bae271537a0b4424/5eb8bc4436cea.png',
        previewImageUrl: 'https://taipei.youbike.com.tw/images/5dae7194bae271537a0b4424/5eb8bc4436cea.png'
      }
    }
    // --------------------------------------使用者輸入3 回傳租借方式---------------------------------------------------
    else if (event.message.text === '3') {
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
      msg = {
        type: 'image',
        originalContentUrl: 'https://img.onl/O3ZN3U',
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
    // ---------------------------------使用者輸入嗨 回傳訊息------------------------------------------
    if (event.message.text === '嗨') {
      msg = { type: 'text', text: '功能查詢:\n資訊查詢請輸入\n"捷運+站名或\n車站名或\n公園名或\n地標名或\n學校名或\n路口名"\n費率查詢請輸入2\n租還方式查詢請輸入3' }
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
