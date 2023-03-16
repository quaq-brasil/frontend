import { TermsAndServices } from "layouts/main/TermsAndServices/TermsAndServices"
import useTranslation from "next-translate/useTranslation"
import Head from "next/head"

export default function TermsPage() {
  const text = useTranslation().t

  return (
    <>
      <Head>
        <title>{`${text("terms:pagetitle")}`}</title>
        <meta name="description" content={text("terms:pagetitle")} />
      </Head>
      <TermsAndServices />
    </>
  )
}
