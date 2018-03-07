var assert = require('assert');
require('dotenv').config();

const request = require('superagent');
const md5 = require('blueimp-md5');
const API_KEY = process.env.API_KEY;
const base64 = require('base-64');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      const options = [
        {
          title: '功能够用吗？',
          options: [
            {
              title: '够用',
              selected: false,
            },
            {
              title: '期望改善',
              selected: false,
            },
            {
              title: '不够用',
              selected: false,
            },
          ],
        },
        {
          title: '操作方便么？',
          options: [
            {
              title: '方便',
              selected: false,
            },
            {
              title: '上手有难度',
              selected: false,
            },
            {
              title: '不太会用',
              selected: false,
            },
          ],
        },
        {
          title: '界面设计满意么？',
          options: [
            {
              title: '满意',
              selected: false,
            },
            {
              title: '不够好',
              selected: false,
            },
            {
              title: '差',
              selected: false,
            },
          ],
        },
        {
          title: '收费模式能接受吗？',
          options: [
            {
              title: '可以',
              selected: false,
            },
            {
              title: '价格太贵',
              selected: false,
            },
            {
              title: '限制方式不合理',
              selected: false,
            },
          ],
        },
      ];

      const memo = 'hello world!!!!';
      const deviceId = 'testing';

      const content = {
        survey: options,
        memo: base64.encode(memo),
        deviceId,
      }


      const data = JSON.stringify(content);
      const now = Date.now();

      console.log(API_KEY);
      console.log(data);

      request
        .post('http://localhost:8000/api/v1/survey/create')
        .send(data)
        .set('Accept', 'application/json')
        .set('Timestamp', '' + now)
        .set('ApiSecret', md5(now + '', API_KEY))
        // .query({ action: 'edit', city: 'London' }) // query string
        .end((err, res) => {
          // Do something

          // console.log(err);
          if (!err) {
            console.log(res.body);
            return;
          }

          console.log(res.body);
        });
    });
  });
});