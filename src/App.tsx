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
import BasicProgressDialog, {
  BasicProgressDialogProps,
} from "./components/dialog/BasicProgressDialog";
import useModal, { ModalType } from "./components/modal/useModal";
import { BasicProgressBarProps } from "./components/progressbar/BasicProgressBar";
import { BasicQueryDialogProps } from "./components/dialog/BasicQueryDialog";
import BasicProgressBar from "./components/progressbar/BasicProgressBar";
import { QueryDialogType } from "./metadata/QueryDialogType";

const App: React.FC = () => {
  const { open, close } = useModal();

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
