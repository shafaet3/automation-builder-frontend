//components/FlowToolbar.jsx
export default function FlowToolbar({ addNode }) {
  return (
    <div className="p-3 flex gap-3 bg-gray-50">

      <button
        onClick={() => addNode("action")}
        className="btn-blue px-3 py-1 bg-blue-600 text-white rounded"
      >
        + Action
      </button>

      <button
        onClick={() => addNode("delay")}
        className="btn-yellow px-3 py-1 bg-yellow-500 text-white rounded"
      >
        + Delay
      </button>

    </div>
  );
}
