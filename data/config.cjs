const config = {
  // port: '9500', // 绑定端口
  // bindIp: '127.0.0.1', // 绑定 IP（容器内必须 0.0.0.0，见 BIND_IP）
  httpLog: true, // 启用 HTTP 请求日志，稳定后可改回 false
  'cors.enabled': false, // 是否启用跨域
  // 'cors.whitelist': [ // 允许跨域的域名，空数组表示允许所有域名
  //   // 'www.xxx.com',
  // ],
  // 'upstreamProxy.enabled': false, // 是否使用代理转发请求
  // 'upstreamProxy.header': '', // 代理转发请求头（如 `x-real-ip`）
  // 'extension.ghMirrorHosts': [], // 扩展商店 GitHub 镜像地址
  // httpProxy: '', // 代理服务器地址，例子 `127.0.0.1:2080`

  // 允许访问的本地目录（容器内路径，对应宿主机的音乐目录）
  allowPublicDir: ['/music'],

  // 登录密码
  password: '123456',
}

module.exports = config
