import Head from "next/head";
import React from "react";

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
        <h1>WELCOME TO CHEAPSLEUR</h1>
        {/* <div className="flex justify-cent items-center ">
          <SpeakEasy />
        </div> */}
      </main>
    </>
  );
}
