import BasicTemplate from "./template/BasicTemplate";
import TabPageExample from "./example/TabPageExample";
import BasicButton from "./components/button/BasicButton";
import BasicProgressDialog, {
  BasicProgressDialogProps,
} from "./components/dialog/BasicProgressDialog";
import useModal, { ModalType } from "./components/modal/useModal";
import { QueryDialogType } from "./metadata/QueryDialogType";
import BasicSelect from "./components/select/BasicSelect";
import BasicNumeric from "./components/numeric/BasicNumeric";
import BasicNumberInput from "./components/numeric/BasicNumberInput";
import BasicTwoNumberInput from "./components/numeric/BasicTwoNumberInput";
import BasicTwoNumeric from "./components/numeric/BasicTwoNumeric";

const App: React.FC = () => {
  const { open, close } = useModal();

  return (
    <>
      <BasicTemplate
        SideBar={
          <div className="flex flex-col">
            <BasicNumeric />
            <BasicNumberInput initValue="7.3" />
            <BasicTwoNumeric onlyInteger />
            <BasicTwoNumberInput onlyInteger />
            <BasicSelect items={[{ label: "1" }, { label: "2" }]} />

            <div>123</div>
          </div>
        }
        ContentPage={<TabPageExample />}
        Footer={
          <div className="flex gap-[10px]">
            <BasicButton
              onClicked={() => {
                open(ModalType.BasicProgressDialog, {
                  queryDialogType: QueryDialogType.Error,
                  // prgoressbar: <BasicProgressBar></BasicProgressBar>,
                  title: "hahb",
                  content: "Downloading ....",
                  // information: "QQ",
                  icon: "QQ",
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
