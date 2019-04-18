const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// js获取文件后缀带"."
const filePix = filePath => {
  let fileName = filePath.lastIndexOf(".");//取到文件名开始到最后一个点的长度
  let fileNameLength = filePath.length;//取到文件名长度
  let fileFormat = filePath.substring(fileName, fileNameLength);//截
  return fileFormat;
}

//用于生成uuid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// uuid
const uuid = function() {
  return guid();
}

module.exports = {
  formatTime: formatTime,
  filePix: filePix,
  uuid: uuid
}

