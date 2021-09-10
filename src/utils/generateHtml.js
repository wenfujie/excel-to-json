/*
 * @Author: your name
 * @Date: 2021-06-09 11:25:57
 * @LastEditTime: 2021-06-09 14:58:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test2\src\utils\generateHtml.js
 */
const fs = require('fs-extra')
const path = require('path')
const translatedText = {
  en: {
    description: '6666666666666666666',
    title: '8888888888',
    image: '分享的图片'
  },
  zh: {
    description: '6666666666666666666',
    title: '8888888888',
    image: '分享的图片'
  }
}


const shareHtml = () => {
  console.log(path.resolve(__dirname, './src'))

  // fs.ensureDir(path.resolve(__dirname, './src', function (err) {
  //     console.log('hjhjh', err)
  //  }))
  // fs.ensureDir(path.resolve(__dirname, './src'), function (err) {
  //     if (!err) {
  //         console.log('hjhjh')
  //     }
  //  })
  // fs.mkdir(path.resolve(__dirname, './src'), (err) => {
  //     if (!err) {
  //         console.log('hjhjh')
  //     }
  //  })
  const dir = path.resolve(__dirname, './src')
  fs.ensureDir(dir)
    .then(() => {
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })
}

shareHtml.install = () => {
  shareHtml(translatedText)
}
export default shareHtml

// class ShareHtml {
//   constructor (option) {
//     console.log(path.resolve(__dirname))
//     console.log(process.cwd())

//     this.translatedText = option
//   }
// }
// export default ShareHtml
// const install = () => {

// }
// export {
//     ShareHtml,
//     install
// }
