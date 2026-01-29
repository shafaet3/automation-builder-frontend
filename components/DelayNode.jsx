//components/DelayNode.jsx
export default function DelayNode({ id, data }) {
  const mode = data.mode || "relative";
  const delayValue = data.delayValue || "";
  const dateTime = data.dateTime || "";

  // Simple validation helper
  const isValidRelative = delayValue
    ? /\d+\s*(minute|minutes|min|hour|hours|hr|day|days|d)/i.test(delayValue)
    : true;

  return (
    <div className="bg-white p-3 border rounded w-52 shadow-sm">
      <strong className="text-sm">Delay</strong>

      {/* Mode Selector */}
      <select
        className="border w-full mt-2 p-1 text-sm rounded"
        value={mode}
        onChange={(e) => {
          if (data.updateNodeData) {
            data.updateNodeData(id, { mode: e.target.value });
          }
        }}
      >
        <option value="relative">Relative Delay</option>
        <option value="specific">Specific Date & Time</option>
      </select>

      {/* Relative Delay Mode */}
      {mode === "relative" && (
        <>
          <input
            className={`border w-full mt-2 p-1 text-sm rounded ${
              !isValidRelative ? "border-red-500" : ""
            }`}
            placeholder="e.g. 10 minutes, 2 hours, 1 day"
            value={delayValue}
            onChange={(e) => {
              if (data.updateNodeData) {
                data.updateNodeData(id, { delayValue: e.target.value });
              }
            }}
          />

          <p className="text-xs text-gray-500 mt-1">
            Example: <span className="font-mono">10 minutes</span>,{" "}
            <span className="font-mono">2 hours</span>,{" "}
            <span className="font-mono">1 day</span>
          </p>

          {!isValidRelative && (
            <p className="text-xs text-red-500 mt-1">
              ⚠ Enter valid format like: 10 minutes / 2 hours / 1 day
            </p>
          )}
        </>
      )}

      {/* Specific Date Mode */}
      {mode === "specific" && (
        <>
          <input
            type="datetime-local"
            className="border w-full mt-2 p-1 text-sm rounded"
            value={dateTime}
            onChange={(e) => {
              if (data.updateNodeData) {
                data.updateNodeData(id, { dateTime: e.target.value });
              }
            }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Pick exact date & time to resume flow
          </p>
        </>
      )}
    </div>
  );
}
