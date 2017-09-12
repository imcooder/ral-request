# ral-request

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/ral-request.svg
[npm-url]: https://npmjs.com/package/ral-request
[download-image]: https://img.shields.io/npm/dm/ral-request.svg
[download-url]: https://npmjs.com/package/ral-request
[david-image]: https://img.shields.io/david/imcooder/ral-request.svg
[david-url]: https://david-dm.org/imcooder/ral-request

## Install
```
npm i ral-request -S
```

## Usage
```js
ral reponse like:
{
	status: 0, //0 is ok other error
	msg: 'ok', //status desc
	data: [], success data
}
```

```js

ral.request('bind_device', {
				data: {
					data: {}, // post body
				},
				headers: {
					saiyalogid: logid, //http header
				},
				query: {
					dumi_id: userInfo.dumi_uid, //url query
				}
			});
		}).then(function() {
			console.log('[avs]directives bind finish');
		}).catch(function(error) {
			console.log(error);
		});
```
response data:
```js
{
	status: 0,
	msg:"ok",
	data: {}
}
```
#### ral.initRal
初始化ral配置
#### ral.request
resovle return data; if status !=0 reject


#### ral.requestJson
resolve response body(json) ignore status check
## License

The [MIT License](LICENSE)
