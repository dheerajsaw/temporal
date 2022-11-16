import { Connection, WorkflowClient } from "@temporalio/client";
import { example } from "./workflows";
import { nanoid } from "nanoid";

import { Express } from "express";
var cors = require("cors");
var port = 3001;

var express = require("express");

const app: Express = express();
app.use(express.json());
app.use(cors());

// Start process API
async function run(workflow_def: any) {
  const connection = await Connection.connect({
    // Connect to localhost with default ConnectionOptions.
    // In production, pass options to the Connection constructor to configure TLS and other settings:
    // address: 'foo.bar.tmprl.cloud', // as provisioned
    // tls: {} // as provisioned
  });

  const client = new WorkflowClient({
    connection,
    // namespace: 'default', // change if you have a different namespace
  });

  const handle = await client.start(example, {
    args: [workflow_def],
    taskQueue: "sample_workflow",
    workflowId: "workflow-" + nanoid(),
  });
  let ret_obj = {
    workflow: handle.workflowId,
    runid: handle.firstExecutionRunId,
  };
  console.log("starting workflow def", ret_obj);
  return ret_obj;
}

app.post("/", function (req, res) {
  console.log(req.body);
  run(req.body).catch((err) => {
    console.error(err);
  });
  res.end();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
