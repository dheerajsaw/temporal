import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "./activities";
const { greet } = proxyActivities<typeof activities>({
  //* to initiate the activities
  startToCloseTimeout: "1 minute",
});

//* A workflow that simply calls an activity/
export async function example(name: string): Promise<string> {
  return await greet(name);
}
