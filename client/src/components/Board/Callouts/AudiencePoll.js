import React from "react";

export function AudiencePoll({ results }) {
  return <pre>{JSON.stringify(results, null, 2)}</pre>;
}
