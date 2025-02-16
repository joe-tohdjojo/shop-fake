export async function WithServerData<T>({
  fetchFunction,
  children,
}: {
  children: (data: T) => React.ReactNode;
  fetchFunction: () => Promise<T>;
}) {
  const result = await fetchFunction();
  return children(result);
}
