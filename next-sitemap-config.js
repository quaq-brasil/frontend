/** @type {import('next-sitemap').IConfig} */

let policy = {
  userAgent: "*",
}

if (process.env.NODE_ENV !== "production") {
  policy.disallow = "/"
}

module.exports = {
  siteUrl: process.env.URL || "https://quaq.me",
  generateRobotsTxt: true,
  exclude: [
    "/account",
    "/account/advanced",
    "/account/delete",
    "/account/email-update",
    "/account/password-update",
    "/adm",
    "/adm/ws/new-workspace",
    "/adm/ws/setup",
    "/recovery",
    "/terms",
    "/test",
    "/test2",
    "/404",
    "/pt/404",
    "/500",
    "/pt/500",
    "/pt/recovery",
    "/pt/terms",
    "/pt/test",
    "/pt/test2",
  ],
  robotsTxtOptions: {
    policies: [policy],
    additionalSitemaps: ["https://bff.quaq.me/api/v1/sitemap"],
  },
  outDir: "./public",
}
