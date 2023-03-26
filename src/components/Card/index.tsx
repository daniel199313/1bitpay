import { PropsWithChildren, ReactNode } from "react";

export default ({ children }: PropsWithChildren<ReactNode>) => {
  return (
    <div className="bg-white rounded-[20px] shadow-sm w-full p-[20px] mb-[20px]">
      {children}
    </div>
  );
};
