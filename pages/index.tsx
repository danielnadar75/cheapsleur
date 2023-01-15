import QuickMatch from "@/components/QuickMatch";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pimselur Clone</title>
        <meta name="description" content="Pimselur Course Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-cent items-center ">
          <QuickMatch />
        </div>
      </main>
    </>
  );
}
