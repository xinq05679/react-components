import BasicTemplate from "./template/BasicTemplate";
import TabPageExample from "./example/TabPageExample";
import BasicSpin from "./components/spin/BasicSpin";
import BasicToolTip from "./components/tooltip/BasicToolTip";

const App: React.FC = () => {
  return (
    <>
      <BasicTemplate
        SideBar={
          <div className="h-[200px] w-[200px] p-[50px]">
            <BasicToolTip text="hi there" delayTimeOpen={0}>
              <BasicSpin svgStyle={{ css: "h-[64px]" }} />
            </BasicToolTip>
          </div>
        }
        ContentPage={<TabPageExample />}
      ></BasicTemplate>
    </>
  );
};

export default App;
