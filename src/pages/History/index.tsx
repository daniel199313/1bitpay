import OrderCard from "./OrderCard";
import { useServices } from "../../providers/services";
import { useEffect, useState } from "react";

export default () => {
  const { api } = useServices();

  const [orderList, setOrderList] = useState<IOrderPending[]>([]);

  useEffect(() => {
    api.getOrderHistoryList({}).then((res) => {
      if (res.data.code === 200) {
        setOrderList(res.data.data.list);
      }
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
