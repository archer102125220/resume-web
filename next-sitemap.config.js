/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://resume-web-orpin.vercel.app', // 替換成你的網址
  generateRobotsTxt: true, // 同步生成 robots.txt
  sitemapSize: 7000,       // 每個 sitemap 檔案的最大連結數

  // 排除不需要出現在 sitemap 的路徑
  // exclude: [
  // ],

  // 針對 robots.txt 的額外設定
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      },
    ],
    // 如果你有其他的 sitemap 來源（例如手動寫的），可以在這加入
    // additionalSitemaps: [
    //   // 'https://your-domain.com/my-other-sitemap.xml',
    // ],
  },
};