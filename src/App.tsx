import QueryIcon from "./resources/image/query.png";
import { AiFillEye } from "react-icons/ai";
import BasicTemplate from "./template/BasicTemplate";
import BasicButton from "./components/button/Button";
import BasicQueryDialog, {
  BasicQueryDialogProps,
} from "./components/dialog/BasicQueryDialog";
import useModal, { ModalType } from "./components/modal/useModal";
import BasicCheckBox, {
  CheckBoxStatus,
} from "./components/checkbox/BasicCheckBox";
import { useState, useRef } from "react";
import { AiFillAlert } from "react-icons/ai";
import BasicTreeView from "./components/treeview/BasicTreeView";
import TextInput from "./components/input/TextInput";
import BasicSelect from "./components/select/BasicSelect";
import BasicTable from "./components/table/BasicTable";
import BasicTabPage from "./components/tabpage/BasicTabPage";
import useQueryDialog from "./hooks/useQueryDialog";
import { QueryDialogType } from "./metadata/QueryDialogType";
import BasicList from "./components/list/BasicList";
import BasicContextMenuItem from "./components/contextmenu/BasicContextMenuItem";
import { ContextMenuItemType } from "./metadata/ContextMenuItemType";
import useContextMenu from "./hooks/useContextMenu";
import { ButtonType } from "./metadata/ButtonType";
import BasicDateTimePicker from "./components/datetime/BasicDateTimePicker";
import TextInput1 from "./components/input/TextInput1";
import { BasicSearchTextBox } from "./components/search/BasicSearchBar";
import { NumericInput } from "./components/numeric/NumericInput";
import { TwoNumericInput } from "./components/numeric/TwoNumericInput";
import classNames from "classnames";
import ToolBar from "./components/toolbar/ToolBar";
import ToolTip from "./components/tooltip/ToolTip";
import Textarea from "./components/input/Textarea";
import TextareaWithErrorMessage from "./components/input/TextareaWithErrorMessage";

const App: React.FC = () => {
  const [value, setValue] = useState("444");
  const [selectedLabel, setSelectedLabel] = useState("5");
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [checkedState, setCheckedState] = useState(CheckBoxStatus.checked);
  const inputRef = useRef<HTMLInputElement>(null);
  const [checkedList, setCheckedList] = useState([
    CheckBoxStatus.unchecked,
    CheckBoxStatus.unchecked,
  ]);
  const { openContextMenu } = useContextMenu();

  function handleChange() {
    console.log(inputRef);
  }

  return (
    <>
      <BasicTemplate
        SideBar={
          <BasicList
            items={[
              {
                id: "1",
                textReactNode: "1",
              },
              {
                id: "2",
                textReactNode: "2",
              },
              {
                id: "3",
                textReactNode: "3",
              },
            ]}
          />
        }
        ContentPage={
          <BasicTable
            headRow={
              <tr>
                <th className="w-[30%]">1</th>, <th>2</th>
              </tr>
            }
            tableRows={[
              <tr>
                <td>
                  <BasicTabPage
                    tabs={{
                      "tab 1": {
                        text: "tab 1",
                        isModified: true,
                        isSelected: true,
                        page: <div className="bg-[#fff]">1</div>,
                      },
                      "tab 2": { text: "tab 2" },
                    }}
                  />
                </td>
                <td>
                  <ToolBar
                    direction="horizontal"
                    items={[
                      {
                        node: (
                          <ToolTip tooltip={"haha"}>
                            <img src={QueryIcon} />
                          </ToolTip>
                        ),
                        position: 1,
                      },
                      {
                        node: (
                          <ToolTip tooltip="QQ">
                            <img src={QueryIcon} />
                          </ToolTip>
                        ),
                        position: -2,
                      },
                      {
                        node: <img src={QueryIcon} />,
                        position: -3,
                      },
                    ]}
                  />
                </td>
              </tr>,
              <tr>
                <td>
                  <TextareaWithErrorMessage
                    onValueChanged={(value) => console.log(value)}
                    onSubmit={(value) => setValue(value)}
                    text={value}
                  />
                </td>
                <td>
                  <BasicDateTimePicker
                    onDateTimeChanged={(date) => {
                      setDateTime(date);
                    }}
                    dateTime={dateTime}
                    readOnly
                  />
                </td>
              </tr>,
              <tr>
                <td>
                  <TwoNumericInput
                    value={{ min: 1, max: 5 }}
                    range={{ min: 0, max: 10 }}
                    digits={0}
                    onValueChanged={(range) => {
                      console.log(range);
                    }}
                  />
                </td>
                <td>2-2</td>
              </tr>,
              <tr>
                <td>
                  <BasicCheckBox
                    text={10}
                    checked={checkedState}
                    onCheckedChagned={(checked) => {
                      setCheckedState(checked);
                    }}
                  />
                </td>
                <td>
                  <BasicSearchTextBox onChanged={handleChange} />
                </td>
              </tr>,
              <tr>
                <td>
                  <NumericInput
                    value={5}
                    range={{ min: 0, max: 6 }}
                    onValueChanged={(value) => {}}
                  />
                </td>
                <td>
                  <TextInput
                    ref={inputRef}
                    placeholder="123"
                    autoFocus
                    enableSelectAll
                    onValueChanged={(value) => {
                      // @ts-ignore
                      console.log(inputRef.current);
                    }}
                  />
                </td>
              </tr>,
              <tr>
                <td>
                  <BasicSelect
                    items={[
                      { label: "1", style: { css: classNames("bg-[#f00]") } },
                      { label: "2" },
                      { label: "3" },
                      { label: "4" },
                      { label: "5" },
                      { label: "6" },
                      { label: "7" },
                      { label: "8" },
                      { label: "empty", name: "" },
                    ]}
                    selectedLabel={selectedLabel}
                    onSelectedItemChanged={setSelectedLabel}
                    placeholder="Please select one item"
                    onSelectionListVisibleChanged={(s) => console.log(s)}
                  />
                </td>
                <td>
                  {/* <BasicToolTip text="QQ" position="TC"> */}
                  <TextInput1
                    prefixIcon={
                      <AiFillEye className={classNames("h-[24px] w-[24px]")} />
                    }
                    suffixIcon={<AiFillEye />}
                    errorMessage="00000000000  000000000000000"
                    placeholder="QQQQ"
                    inputStyle={{ css: "h-[36px] rounded-xl" }}
                    hideErrorIcon
                    // onValueChanged={(value) => console.log(value)}
                    onSubmit={(value) => {
                      setValue(value);
                      // console.log(value + "55");
                      // setValue(new Date().toLocaleString());
                    }}
                    onValueChanged={(value) => {
                      console.log(value);
                    }}
                  />
                  {/* </BasicToolTip> */}
                </td>
              </tr>,
            ]}
          />
        }
      ></BasicTemplate>
    </>
  );
};

export default App;
