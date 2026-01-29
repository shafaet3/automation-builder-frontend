"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

import ActionNode from "@/components/ActionNode";
import DelayNode from "@/components/DelayNode";
import FlowToolbar from "@/components/FlowToolbar";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

const nodeTypes = {
  action: ActionNode,
  delay: DelayNode,
};

export default function Editor() {
  const params = useParams();
  const router = useRouter();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Name error

  // Setup default Start → End
  useEffect(() => {
    const start = { id: "start", position: { x: 250, y: 50 }, data: { label: "Start" } };
    const end = { id: "end", position: { x: 250, y: 400 }, data: { label: "End" } };

    setNodes([start, end]);
    setEdges([{ id: "e-start-end", source: "start", target: "end" }]);
  }, []);

  // Load existing automation if editing
  useEffect(() => {
    if (!params.id || params.id === "new") return;

    api.get(`/automations/${params.id}`)
      .then(res => {
        setName(res.data.name || "");

        const fixedNodes = (res.data.nodes || []).map(n => ({
          ...n,
          data: { ...n.data, updateNodeData },
        }));

        setNodes(fixedNodes);
        setEdges(res.data.edges || []);
      })
      .catch(err => {
        console.error("Failed to load automation:", err);
      });
  }, [params.id]);

  // Update node data safely
  const updateNodeData = (id, newData) => {
    setNodes(prev =>
      prev.map(node =>
        node.id === id ? { ...node, data: { ...node.data, ...newData, updateNodeData } } : node
      )
    );
  };

  // Add Node + Auto Layout + Connect Flow
  const addNode = (type) => {
    const id = Date.now().toString();

    setNodes(prev => {
      const filtered = prev.filter(n => n.id !== "start" && n.id !== "end");

      const newNode = {
        id,
        type,
        position: { x: 250, y: 100 + filtered.length * 120 },
        data: { message: "", mode: "relative", updateNodeData },
      };

      const start = prev.find(n => n.id === "start");
      const end = prev.find(n => n.id === "end");

      return [
        start,
        ...filtered,
        newNode,
        { ...end, position: { x: 250, y: 180 + (filtered.length + 1) * 120 } },
      ];
    });

    setEdges(prev => {
      const middle = nodes.filter(n => n.id !== "start" && n.id !== "end");
      const last = middle[middle.length - 1];
      let newEdges = prev.filter(e => e.target !== "end");

      const source = last?.id || "start";
      newEdges.push({ id: `e-${source}-${id}`, source, target: id });
      newEdges.push({ id: `e-${id}-end`, source: id, target: "end" });

      return newEdges;
    });
  };

  // Save Flow
  const saveFlow = async () => {
    setErrorMsg(""); // Clear previous error
    if (!name.trim()) {
      setErrorMsg("Automation name is required");
      return;
    }

    const payload = { name, nodes, edges };

    try {
      if (params.id === "new") {
        await api.post("/automations", payload);
      } else {
        await api.put(`/automations/${params.id}`, payload);
      }

      router.push("/");
    } catch (err) {
      console.error("Save error:", err.response?.data || err);
      const msg = err.response?.data?.error || "Save failed. Check console.";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="p-3 border-b flex gap-3 bg-gray-50 items-center">
        <div className="flex flex-col">
          <input
            className="border px-2 py-1 rounded w-64"
            placeholder="Automation Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errorMsg && <p className="text-red-500 text-xs mt-1">{errorMsg}</p>}
        </div>

        <FlowToolbar addNode={addNode} />

        <button
          onClick={saveFlow}
          className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
        >
          Save
        </button>
      </div>

      {/* React Flow */}
      <div className="flex-1 bg-gray-50">
        {nodes.length > 0 && edges.length > 0 && (
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        )}
      </div>
    </div>
  );
}
