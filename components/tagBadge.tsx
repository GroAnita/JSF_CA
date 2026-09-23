import Link from "next/link";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/?tag=${encodeURIComponent(tag)}`}
      className="text-gray-800 font-medium text-xs bg-blue-200 px-2 py-1 rounded-xl"
    >
      {tag}
    </Link>
  );
}
