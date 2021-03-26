import { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";

//クライアントフェッチ用の関数。最終的にjsonで返してくれる
const fetcher = (url) => fetch(url).then((res) => res.json());
//定数。APIのリストタスクのエンドポイント
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({ staticfilterdTasks }) {
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    initialData: staticfilterdTasks,
  });
  const filteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  useEffect(() => {
    mutate();
  }, []); //第二引数を空の[]にすることで一回だけ実行される

  return (
    <Layout title="Task page">
      {filteredTasks &&
        filteredTasks.map((task) => (
          <Task key={task.id} task={task} taskDeleted={mutate} />
        ))}
      <Link href="/main-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  const staticfilterdTasks = await getAllTasksData();

  return {
    props: { staticfilterdTasks },
    revalidate: 3,
  };
}

