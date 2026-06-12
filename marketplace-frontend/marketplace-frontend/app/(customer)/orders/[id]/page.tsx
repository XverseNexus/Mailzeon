export default function CustomerOrderDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Order {params.id}</h1>
      <p className="text-gray-400 text-sm">Order detail — coming in Phase 3</p>
    </div>
  );
}
