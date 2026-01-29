//app/page.js
"use client";
import { api } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/automations");
      setList(res.data);
    } catch (err) {
      console.error("Failed to load automations:", err);
      alert("Could not load automations");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteItem = async (id) => {
    try {
      await api.delete(`/automations/${id}`);
      load();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed — backend not responding");
    }
  };

  // Test Automation
  const testAutomation = async (id) => {
    const email = prompt("Enter email to test automation:");
    if (!email) return;

    try {
      setLoadingId(id);
      await api.post(`/automations/${id}/test`, { email });
      alert("Test started! Check your Gmail for emails.");
    } catch (err) {
      console.error("Failed to start test:", err);
      alert("Failed to start test");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Automations</h1>

      <Link href="/editor/new">
        <button className="btn-primary mb-4 px-4 py-2 rounded hover:bg-gray-800 hover:cursor-pointer">
          + Create New
        </button>
      </Link>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2 flex flex-wrap gap-2">

                {/* Edit */}
                <Link href={`/editor/${item._id}`}>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>

                {/* Delete */}
                <button
                  onClick={() => deleteItem(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>

                {/* Test */}
                <button
                  onClick={() => testAutomation(item._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={loadingId === item._id}
                >
                  {loadingId === item._id ? "Running..." : "Test"}
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
