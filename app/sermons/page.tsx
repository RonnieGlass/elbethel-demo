import dynamic from "next/dynamic";

const SemanticSermonLibrary = dynamic(
  () => import("@/components/SemanticSermonLibrary"),
  { ssr: false }
);

export default function Page() {
  return <SemanticSermonLibrary />;
}
