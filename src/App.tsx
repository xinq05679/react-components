import BasicTemplate from "./template/BasicTemplate";
import TabPageExample from "./example/TabPageExample";
import BasicSpin from "./components/spin/BasicSpin";
import BasicToolTip from "./components/tooltip/BasicToolTip";
import BasicModal from "./components/modal/BasicModal";
import BasicButton from "./components/button/BasicButton";
import { ButtonType } from "./metadata/ButtonType";
import BasicCheckBox from "./components/checkbox/BasicCheckBox";
import BasicMultiCheckBox from "./components/checkbox/BasicMultiCheckBox";
import BasicNumeric from "./components/numeric/BasicNumeric";
import BasicTwoNumeric from "./components/numeric/BasicTwoNumeric";

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
      <BasicModal
        Header={"Ha"}
        Content={
          <div className="flex flex-col">
            <BasicMultiCheckBox
              items={[
                { text: "checkbox-1" },
                { text: "checkbox-2" },
                { text: "checkbox-3" },
              ]}
            />
            <BasicNumeric initValue={0} digits={1} />
            <BasicTwoNumeric digits={1} />
          </div>
        }
        Footer={
          <>
            <BasicButton outline>1</BasicButton>
            <BasicButton type={ButtonType.Danger}>2</BasicButton>
            <BasicButton type={ButtonType.Success}>3</BasicButton>
          </>
        }
      />
    </>
  );
};

export default App;
