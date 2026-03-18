import React, { Suspense } from "react";
import MentorSetCredentialsClient from "./MentorSetCredentialsClient";

export default function MentorSetCredentialsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <MentorSetCredentialsClient />
    </Suspense>
  );
}

