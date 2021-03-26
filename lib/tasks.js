import fetch from "node-fetch";

//build時にサーバーサイドで実行される関数
export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  const staticfilterdTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );//所得したデータの昇順ソート
  return staticfilterdTasks;
}

//IDの一覧を取得するための関数
export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();

  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
}

//指定されたIDに基づいて、特定のブロック記事のデータを取得する関数。
export async function getTaskData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
  );
  const task = await res.json();
  // return {
  //   post,
  // };
  return task;
}