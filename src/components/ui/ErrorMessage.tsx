export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="-mt-2 text-red-500">{children}</div>;
}
