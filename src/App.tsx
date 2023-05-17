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

const App: React.FC = () => {
  const [checkedList, setCheckedList] = useState([
    CheckBoxStatus.unchecked,
    CheckBoxStatus.unchecked,
  ]);

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
          // <BasicTreeView
          //   roots={[
          //     {
          //       id: "0",
          //       text: "Workspace",
          //       children: [
          //         {
          //           id: "0-1",
          //         },
          //       ],
          //     },
          //     {
          //       id: "1",
          //       text: "Feature 1",
          //     },
          //     {
          //       id: "2",
          //       text: "Feature 1",
          //     },
          //     {
          //       id: "3",
          //       text: "Feature 1",
          //     },
          //     {
          //       id: "4",
          //       text: "Feature 1",
          //     },
          //     {
          //       id: "5",
          //       text: "Feature 1",
          //     },
          //   ]}
          // />
        }
        ContentPage={
          <BasicTable
            headerCell={[<th className="w-[30%]">1</th>, <th>2</th>]}
            tableCell={[
              [<td>1-1</td>, <td>1-2</td>],
              [<td>2-1</td>, <td>2-2</td>],
              [<td>2-1</td>, <td>2-2</td>],
              [
                <td>
                  <BasicCheckBox readOnly />
                </td>,
                <td>2-2</td>,
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
                    items={[{ label: "1" }, { label: "2" }]}
                    selectedLabel="1"
                    readOnly
                  />
                </td>,
                <td>
                  <BasicToolTip text="QQ" position="TC">
                    <BasicTextInput
                      readOnly
                      value=""
                      onValueChanged={(value) => console.log(value)}
                      onBlur={(value) => console.log(value)}
                    />
                  </BasicToolTip>
                </td>,
              ],
            ]}
          />
          // <BasicTabPage
          //   tabs={{
          //     "tab 1": { text: "tab 1", isModified: true },
          //     "tab 2": { text: "tab 2" },
          //   }}
          // />
        }
      ></BasicTemplate>
    </>
  );
};

export default App;
