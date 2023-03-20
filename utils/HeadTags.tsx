interface HeadTags {
  title: string
  description: string
  image: string
}

export function HeadTags({
  title = "quaq",
  description = "",
  image = "https://quaq-files.s3.sa-east-1.amazonaws.com/5b13c44c-ca68-474a-856b-923056292e6c-black-logo.png",
}: HeadTags) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta property="og:url" content="https://quaq.me" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="quaq.me" />
      <meta property="twitter:url" content="https://quaq.me" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image}></meta>
    </>
  )
}
