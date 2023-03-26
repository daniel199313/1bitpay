interface IProps {
  main: React.ReactNode;
  detail: React.ReactNode;
  footer?: React.ReactNode;
}

export default ({ main, detail, footer }: IProps) => {
  return (
    <div>
      <div className="bg-white rounded-[18px] min-h-[100px] p-[20px] pb-0 flex flex-col">
        <div className="flex-1">{main}</div>
        <div className="border-1 border-dashed border-background"></div>
      </div>
      <div className="bg-white rounded-[18px] min-h-[100px]  flex flex-col overflow-hidden">
        <div className="flex-1 p-[20px]">{detail}</div>
        <div className="w-full">{footer}</div>
      </div>
    </div>
  );
};
