# Issues

## 跨域
> 在拦截器中`taskInterceptor.service`加入`withCredentials:true`

```Typescript
    const clonedRequest = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
        withCredentials: true 
    });
```

### ngx-uploader插件跨域
>  设置`withCredentials:true`

```typescript
const event: any = {
      type: 'uploadAll',
      url: this.addTaskService.createTask(),
      method: 'POST',
      data: { },
      concurrency: 1,
      withCredentials:true,
      fieldName:'taskFile'
    };
```

**设置`fieldName`为后台接受的参数，否则后台接受不到值(不设置默认为`file`)**


