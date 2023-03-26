import Card from "../Card";
import { Link } from "react-router-dom";
import { mergeClass } from "../../utils/css";

interface IProps {
  list: {
    title: string;
    link: string;
  }[];
}

export default ({ list }: IProps) => {
  return (
    <Card>
      <div className="my-[-20px]">
        {list.map((item, index) => {
          return (
            <Link
              key={item.title}
              to={item.link}
              className={mergeClass(
                "flex justify-between py-[20px] border-b-background",
                index === list.length - 1 ? "" : "border-b-1"
              )}
            >
              <div>{item.title}</div>
              <i className="iconfont icon-right"></i>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};
