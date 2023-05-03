import QueryIcon from "./resources/image/query.png";
import BasicTemplate from "./template/BasicTemplate";
import TabPageExample from "./example/TabPageExample";
import BasicButton from "./components/button/BasicButton";
import BasicQueryDialog, {
  BasicQueryDialogProps,
} from "./components/dialog/BasicQueryDialog";
import useModal, { ModalType } from "./components/modal/useModal";
import BasicCheckBox, {
  CheckBoxStatus,
} from "./components/checkbox/BasicCheckBox";
import { useState } from "react";
import BasicToolBar from "./components/toolbar/BasicToolBar";
import { AiFillAlert } from "react-icons/ai";

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
          <BasicToolBar
            items={[
              {
                label: "0",
                icon: <img src={QueryIcon} width={24} />,
                tooltip: "hi",
                selected: true,
                itemStyle: {
                  // css: "[&]:hover:bg-[#ff0]",
                },
                onContentMenu: (evt) => {
                  evt.preventDefault();
                  alert("QQ");
                },
              },
              {
                label: "1",
                tooltip: "QQ",
                icon: <AiFillAlert size={24} />,
                itemStyle: {
                  css: "[&]:hover:text-[#ff0]",
                },
              },
            ]}
          />
        }
        ContentPage={<TabPageExample />}
        // Footer={
        //   <div className="flex gap-[10px]">
        //     <BasicButton
        //       onClicked={() => {
        //         open(ModalType.BasicQueryDialog, {
        //           // prgoressbar: <BasicProgressBar></BasicProgressBar>,
        //           title: "hahb",
        //           content: (
        //             <div>
        //               <div>123455555677777777778</div>
        //               <div>1</div>
        //             </div>
        //           ),
        //           information: <div className="h-[1000px] w-[1000px]"></div>,
        //           // queryDialogType: QueryDialogType.Error,
        //           // icon: <img src={QueryIcon} />,
        //           // prgoressbar: <BasicProgressBar />,
        //           buttons: (
        //             <>
        //               <BasicButton>Hi</BasicButton>
        //             </>
        //           ),
        //           onCloseButtonClicked: () => {
        //             close();
        //           },
        //         } as BasicQueryDialogProps);
        //       }}
        //     >
        //       Open
        //     </BasicButton>
        //   </div>
        // }
      ></BasicTemplate>
    </>
  );
};

export default App;
