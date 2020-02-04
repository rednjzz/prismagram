const fs = require('fs');
const request = require('request');
const multiparty = require('multiparty');
// 해당 예제는 request와 multiparty를 사용하고있습니다
// npm i request
// npm i multiparty

const formParse = (obj, auth, uri) => {
  return new Promise((resolve, reject) => {
    if (obj.headers['content-type'] && obj.headers['content-type'].indexOf('multipart/form-data') !== -1) {
      // content-type이 multipart/form-data일때 multiparty form parse 사용
      let form = new multiparty.Form();
      form.parse(obj, function (err, fields, files) {
        // postData 만들기
        if (err) return reject(new Error(err))
        let postData = {};
        if (files.image) {
          // 파일이 있을경우 파일스트림으로 첨부
          postData.image = {
            value: fs.createReadStream(files.image[0].path),
            options: {
              filename: files.image[0].originalFilename,
              contentType: files.image[0].headers['content-type']
            }
          }
        }
        for (let key in auth) {
          // 인증정보
          postData[key] = auth[key]
        }
        for (let key in fields) {
          // 폼데이터
          postData[`${key}`] = fields[key][0]
        }
        postData.uri = uri
        return resolve(postData)
      });
    } else {
      // 그외 (application/json)
      let postData = {};
      for (let key in auth) {
        // 인증정보
        postData[key] = auth[key]
      }
      for (let key in obj.body) {
        // json데이터
        postData[key] = obj.body[key]
      }
      postData.uri = uri
      return resolve(postData)
    }
  });
}

const postRequest = (data) => {
  // request 발송하기
  let postData = data
  let uri = data.uri
  // uri가 필요없는 변수 삭제
  delete postData.uri
  return new Promise((resolve, reject) => {
    request.post({
      uri: uri,
      method: 'POST',
      formData: postData
    }, function (e, r, body) {
      // request 발송
      let resData = JSON.parse(body)
      // res는 parse로 콜백
      if (!e && r.statusCode == 200) {
        return resolve(resData)
      } else {
        return reject(new Error(e))
      }
    })
  });
}

const onError = (error) => {
  // 에러처리
  return new Promise((resolve, reject) => {
    return reject(new Error(error))
  });
}

const send = (obj, auth) => {
  // 문자보내기
  return formParse(obj, auth, 'https://apis.aligo.in/send/')
    .then(postRequest)
    .catch(onError)
}

const sendMass = (obj, auth) => {
  // 문자보내기 대량
  return formParse(obj, auth, 'https://apis.aligo.in/send_mass/')
    .then(postRequest)
    .catch(onError)
}

const list = (obj, auth) => {
  // 문자전송결과보기
  return formParse(obj, auth, 'https://apis.aligo.in/list/')
    .then(postRequest)
    .catch(onError)
}

const smsList = (obj, auth) => {
  // 문자전송결과보기 상세
  return formParse(obj, auth, 'https://apis.aligo.in/sms_list/')
    .then(postRequest)
    .catch(onError)
}

const remain = (obj, auth) => {
  // 문자발송가능건수
  return formParse(obj, auth, 'https://apis.aligo.in/remain/')
    .then(postRequest)
    .catch(onError)
}

const cancel = (obj, auth) => {
  // 문자예약취소
  return formParse(obj, auth, 'https://apis.aligo.in/cancel/')
    .then(postRequest)
    .catch(onError)
}

module.exports = {
  send,
  sendMass,
  list,
  smsList,
  remain,
  cancel
}