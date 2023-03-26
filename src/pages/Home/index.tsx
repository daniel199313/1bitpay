import OrderCard from "./OrderCard";
import { useApp } from "../../providers/app";
import { useEffect, useState } from "react";
import { useServices } from "../../providers/services";

export default () => {
  const { setTitle } = useApp();
  const { api } = useServices();
  const [orderList, setOrderList] = useState<IOrderPending[]>([]);

  useEffect(() => {
    setTitle("交易审批");
    api.getOrderPendingList({}).then((res) => {
      setOrderList(res.data.data.list);
    });
  }, []);

  return (
    <div>
      {orderList.map((order) => {
        return <OrderCard key={order.id} data={order} />;
      })}
    </div>
  );
};
