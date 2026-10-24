import { SharedWakeRoutinesHub, getSharedWakeRoutinesHubMetadata } from "@/components/blog/SharedWakeRoutinesHub";

export const metadata = getSharedWakeRoutinesHubMetadata();

export default function SharedWakeRoutinesGuideHubPage() {
  return <SharedWakeRoutinesHub />;
}

