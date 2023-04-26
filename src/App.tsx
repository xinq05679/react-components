import QueryIcon from "./resources/image/query.png";
import BasicTemplate from "./template/BasicTemplate";
import TabPageExample from "./example/TabPageExample";
import BasicButton from "./components/button/BasicButton";
import BasicProgressDialog, {
  BasicProgressDialogProps,
} from "./components/dialog/BasicProgressDialog";
import BasicQueryDialog, {
  BasicQueryDialogProps,
} from "./components/dialog/BasicQueryDialog";
import useModal, { ModalType } from "./components/modal/useModal";
import { QueryDialogType } from "./metadata/QueryDialogType";
import BasicSelect from "./components/select/BasicSelect";
import BasicNumeric from "./components/numeric/BasicNumeric";
import BasicNumberInput from "./components/numeric/BasicNumberInput";
import BasicTwoNumberInput from "./components/numeric/BasicTwoNumberInput";
import BasicTwoNumeric from "./components/numeric/BasicTwoNumeric";
import BasicCheckBox, {
  CheckBoxStatus,
} from "./components/checkbox/BasicCheckBox";
import BasicSearchBar from "./components/search/BasicSearchBar";
import BasicProgressBar from "./components/progressbar/BasicProgressBar";
import BasicMultiCheckBox from "./components/checkbox/BasicMultiCheckBox";
import { useState } from "react";

const App: React.FC = () => {
  const { open, close } = useModal();
  const [checkedList, setCheckedList] = useState([
    CheckBoxStatus.unchecked,
    CheckBoxStatus.unchecked,
  ]);

  return (
    <>
      <BasicTemplate
        SideBar={
          <div className="flex flex-col">
            <BasicNumeric
              onValueChanged={(value) => {
                console.log(value);
              }}
            />
            <BasicNumberInput
              initValue="abc"
              onValueChanged={(value) => {
                console.log(value);
              }}
            />
            <BasicTwoNumeric
              onlyInteger
              onValueChanged={(value) => {
                console.log(value);
              }}
              numericProps={{
                inputStyle: { css: "h-[24px]" },
              }}
            />
            <BasicTwoNumberInput
              onlyInteger
              onValueChanged={(value) => {
                console.log(value);
              }}
              numberInputProps={{
                inputStyle: { css: "h-[24px]" },
              }}
            />
            <BasicSelect items={[{ label: "1" }, { label: "2" }]} />
            <BasicCheckBox text={<div>123456</div>} />
            <BasicSearchBar />
            <BasicMultiCheckBox
              items={[
                { text: "1", checked: checkedList[0] },
                { text: "2", checked: checkedList[1] },
              ]}
            />

            <div>123</div>
          </div>
        }
        ContentPage={<TabPageExample />}
        Footer={
          <div className="flex gap-[10px]">
            <BasicButton
              onClicked={() => {
                open(ModalType.BasicProgressDialog, {
                  // prgoressbar: <BasicProgressBar></BasicProgressBar>,
                  title: "hahb",
                  content: (
                    <div className="flex flex-col justify-center grow h-1 overflow-auto">
                      <div>123455555677777777778</div>
                      <div>1</div>
                      <div>1</div>
                      <div>1</div>
                    </div>
                  ),
                  information: "QQ",
                  icon: <img className="h-[100%] w-[100%]" src={QueryIcon} />,
                  prgoressbar: <BasicProgressBar />,
                  buttons: (
                    <>
                      <BasicButton>Hi</BasicButton>
                    </>
                  ),
                  onCloseButtonClicked: () => {
                    close();
                  },
                } as BasicProgressDialogProps);
              }}
            >
              Open
            </BasicButton>
          </div>
        }
      ></BasicTemplate>
    </>
  );
};

export default App;
