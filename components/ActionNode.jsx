//components/ActionNode.jsx
export default function ActionNode({ id, data }) {
  return (
    <div className="bg-white p-3 border rounded w-48">
      <strong>Email Action</strong>

      <textarea
        className="border w-full mt-2 p-1 text-sm"
        placeholder="Write email message"
        value={data.message || ""}
        onChange={(e) => {
          if (data.updateNodeData) {
            data.updateNodeData(id, { message: e.target.value });
          }
        }}
      />
    </div>
  );
}
