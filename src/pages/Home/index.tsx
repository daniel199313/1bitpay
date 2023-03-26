import OrderCard from "./OrderCard";
import { useApp } from "../../providers/app";
import { useEffect, useState } from "react";
import { useServices } from "../../providers/services";
import Card from "../../components/Card";
import { useLoading } from "../../components/Loading/context";

export default () => {
  const { setTitle } = useApp();
  const { api } = useServices();
  const [orderList, setOrderList] = useState<IOrderPending[]>([]);
  const { isLoading } = useLoading();

  const fetchData = () => {
    api.getOrderPendingList({}).then((res) => {
      setOrderList(res.data.data.list);
    });
  };

  useEffect(() => {
    setTitle("交易审批");
    fetchData();
  }, []);

  return (
    <div>
      {orderList.map((order) => {
        return <OrderCard onSubmit={fetchData} key={order.id} data={order} />;
      })}
      {orderList.length === 0 && !isLoading && (
        <Card>
          <div className="text-center text-secondary h-[100px] flex flex-col justify-center">
            - 暂无待审批订单 -
          </div>
        </Card>
      )}
    </div>
  );
};
