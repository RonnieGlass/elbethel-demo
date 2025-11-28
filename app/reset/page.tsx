import dynamic from "next/dynamic";

const TheResetHub = dynamic(() => import("@/components/TheResetHub"), {
  ssr: false,
});

export default function Page() {
  return <TheResetHub />;
}
