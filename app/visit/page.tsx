import dynamic from "next/dynamic";

const PlanYourVisit = dynamic(() => import("@/components/PlanYourVisit"), {
  ssr: false,
});

export default function Page() {
  return <PlanYourVisit />;
}
