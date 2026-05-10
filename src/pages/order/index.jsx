import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OrderList from "../../features/order/OrderLists";
import { socket } from "../../lib/socket";

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    socket.connect();

    const handleOrderStatus = (data) => {
      toast.success(`Order ${data.orderId} ${data.status}`);
    };

    socket.on("order:status", handleOrderStatus);

    return () => {
      socket.off("order:status", handleOrderStatus);
      socket.disconnect();
    };
  }, []);

  const handleJoinRoom = () => {
    if (!orderId) {
      toast.error("Masukkan Order ID dulu");
      return;
    }

    socket.emit("join:order", orderId);

    toast.success(`Joined room ${orderId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Masukkan Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "320px",
          }}
        />

        <button
          onClick={handleJoinRoom}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Connect
        </button>
      </div>

      <OrderList />
    </div>
  );
}
