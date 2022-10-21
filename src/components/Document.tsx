import Head from "next/head";

type DocumentProps = {
  title?: string;
};

export default function Document({ title }: DocumentProps) {
  return (
    <Head>
      <title>{title ? `Terrakion - ${title}` : "Terrakion"}</title>
    </Head>
  );
}
