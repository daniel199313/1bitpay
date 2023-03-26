import Card from "../../components/Card";
import { shortText } from "../../utils/text";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/date";

interface IProps {
  data: IOrderPending;
}

export default ({ data }: IProps) => {
  return (
    <Link to={"/transaction/" + data.id} state={data}>
      <Card>
        <div className="flex justify-between mb-2">
          <div className="text-secondary ">转出：</div>
          <div className="text-[16px] font-medium">
            {
              //金额
              data.amount.toLocaleString()
            }
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="text-secondary ">链：</div>
          <div className="text-secondary ">{data.chain}</div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="text-secondary ">地址</div>
          <div className="text-secondary ">{shortText(data.toAddress)}</div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="text-secondary ">日期</div>
          <div className="text-secondary ">
            {formatDate(new Date(data.createTime), "yyyy-MM-dd HH:mm:ss")}
          </div>
        </div>
      </Card>
    </Link>
  );
};
