import Cell from "../../components/Cell";
export default () => {
  return (
    <div>
      <Cell
        list={[
          { title: "官网", link: "/" },
          { title: "Email", link: "/" },
        ]}
      />
      <Cell
        list={[
          {
            title: "软件更新",
            link: "/",
          },
        ]}
      />
    </div>
  );
};
