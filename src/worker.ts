import { Worker } from "@temporalio/worker";
import * as activities from "./activities";

async function run() {
  //* step to register workflows and activities with
  //* the worker and connect to the temporal server.

  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows"),
    activities,
    taskQueue: "hello-world",
  });

  //* step 2 start accepting tasks on the hello world
  await worker.run();
}

run().catch((err) => {
  console.log(err);
  process.exit(1);
});
