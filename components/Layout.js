import Head from "next/head";

//Layoutコンポーネントの作成。引数にchildren, title
export default function Layout({ children, title = "Default title" }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </main>
      <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        @SyoInoue 2021
      </footer>
    </div>
  );
}