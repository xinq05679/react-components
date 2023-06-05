import QueryIcon from "./resources/image/query.png";
import BasicTemplate from "./template/BasicTemplate";
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
import BasicTreeView from "./components/treeview/BasicTreeView";
import BasicTextInput from "./components/input/BasicTextInput";
import BasicSelect from "./components/select/BasicSelect";
import BasicNumberInput from "./components/numeric/BasicNumberInput";
import BasicTable from "./components/table/BasicTable";
import BasicTabPage from "./components/tabpage/BasicTabPage";
import useQueryDialog from "./hooks/useQueryDialog";
import { QueryDialogType } from "./metadata/QueryDialogType";
import BasicList from "./components/list/BasicList";
import BasicToolTip from "./components/tooltip/BasicToolTip";
import BasicNumeric from "./components/numeric/BasicNumeric";
import BasicContextMenuItem from "./components/contextmenu/BasicContextMenuItem";
import { ContextMenuItemType } from "./metadata/ContextMenuItemType";
import useContextMenu from "./hooks/useContextMenu";
import { ButtonType } from "./metadata/ButtonType";
import BasicTextarea from "./components/input/BasicTextarea";
import BasicDateTimePicker from "./components/datetime/BasicDateTimePicker";

const App: React.FC = () => {
  const [value, setValue] = useState("444");
  const [selectedLabel, setSelectedLabel] = useState("5");
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [checkedState, setCheckedState] = useState(CheckBoxStatus.checked);
  const [checkedList, setCheckedList] = useState([
    CheckBoxStatus.unchecked,
    CheckBoxStatus.unchecked,
  ]);
  const { openContextMenu } = useContextMenu();

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
            headerCell={[<th className="w-[30%]">1</th>, <th>2</th>]}
            tableCell={[
              [
                <td>
                  <BasicTabPage
                    tabs={{
                      "tab 1": { text: "tab 1", isModified: true },
                      "tab 2": { text: "tab 2" },
                    }}
                  />
                </td>,
                <td>
                  <BasicToolBar
                    items={[
                      {
                        icon: <img src={QueryIcon} />,
                        tooltip: "1",
                        position: -5,
                      },
                      {
                        icon: <img src={QueryIcon} />,
                        tooltip: "2",
                        position: -2,
                      },
                      {
                        icon: <img src={QueryIcon} />,
                        tooltip: "3",
                        position: -3,
                      },
                    ]}
                  />
                </td>,
              ],
              [
                <td>
                  <BasicTextarea
                    onValueChanged={(value) => console.log(value)}
                    onSubmit={(value) => setValue(value)}
                    text={value}
                    // readOnly
                  />
                </td>,
                <td>
                  <BasicDateTimePicker
                    onDateTimeChanged={(date) => {
                      setDateTime(date);
                    }}
                    dateTime={dateTime}
                  />
                </td>,
              ],
              [
                <td>
                  <BasicButton type={ButtonType.Primary} outline>
                    Hi
                  </BasicButton>
                </td>,
                <td>2-2</td>,
              ],
              [
                <td>
                  <BasicCheckBox
                    text={10}
                    checked={checkedState}
                    onCheckedChagned={(checked) => {
                      setCheckedState(checked);
                    }}
                  />
                </td>,
                <td>
                  <div
                    onContextMenu={(event) => {
                      openContextMenu({
                        items: [
                          {
                            id: "1",
                            text: "1",
                            type: ContextMenuItemType.Action,
                            onClicked: () => {
                              console.log("QQ");
                            },
                          },
                          {
                            id: "2",
                            text: "1",
                            type: ContextMenuItemType.Bar,
                          },
                          {
                            id: "3",
                            text: "2222222222222222",
                            type: ContextMenuItemType.Branch,
                            children: [
                              {
                                id: "2-1",
                                text: "2-1",
                                type: ContextMenuItemType.Branch,
                                children: [
                                  {
                                    id: "2-1-1",
                                    text: "2-1-1",
                                    type: ContextMenuItemType.Action,
                                  },
                                ],
                                onClicked: () => {
                                  console.log("QQ");
                                },
                              },
                            ],
                          },
                          {
                            id: "4",
                            text: "3",
                            type: ContextMenuItemType.Action,
                          },
                        ],
                        position: { x: event.clientX, y: event.clientY },
                      });
                    }}
                  >
                    222
                  </div>
                </td>,
              ],
              [
                <td>
                  <BasicNumberInput />
                </td>,
                <td>
                  <BasicNumeric readOnly />
                </td>,
              ],
              [
                <td>
                  <BasicSelect
                    items={[
                      { label: "1" },
                      { label: "2" },
                      { label: "3" },
                      { label: "4" },
                      { label: "5" },
                      { label: "6" },
                      { label: "7" },
                      { label: "8" },
                    ]}
                    selectedLabel={selectedLabel}
                    // onSelectedItemChanged={setSelectedLabel}
                    placeholder="Please select one item"
                  />
                </td>,
                <td>
                  {/* <BasicToolTip text="QQ" position="TC"> */}
                  <BasicTextInput
                    value={value}
                    // onValueChanged={(value) => console.log(value)}
                    onSubmit={(value) => {
                      setValue(value);
                      // console.log(value + "55");
                      // setValue(new Date().toLocaleString());
                    }}
                  />
                  {/* </BasicToolTip> */}
                </td>,
              ],
            ]}
          />
        }
      ></BasicTemplate>
    </>
  );
};

export default App;
