# multipart write stream

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/multipart_write_stream.svg
[npm-url]: https://npmjs.com/package/multipart_write_stream
[download-image]: https://img.shields.io/npm/dm/multipart_write_stream.svg
[download-url]: https://npmjs.com/package/multipart_write_stream
[david-image]: https://img.shields.io/david/imcooder/multipart_write_stream.svg
[david-url]: https://david-dm.org/imcooder/multipart_write_stream

## Install
```
npm i multipart_write_stream -S
```

## Usage

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
## License

The [MIT License](LICENSE)