const WORKER_URL = "https://prospects.aartcleaningservices.workers.dev";
export function postStepData(payload: Record<string, unknown>) {
  fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // intentionally swallowed
  });
}