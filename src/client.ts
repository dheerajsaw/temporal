import { Connection, WorkflowClient } from "@temporalio/client";
import { example } from "./workflows";
import { nanoid } from "nanoid";
async function run() {
  const connection = await Connection.connect();
  const client = new WorkflowClient({
    connection,
  });

  const handle = await client.start(example, {
    args: ["Temporal"],
    taskQueue: "hello-world",
    workflowId: "workflow-" + nanoid(),
  });

  console.log(`Started workflow ${handle.workflowId}`);

  console.log(await handle.result()); // Hello Temporal
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
