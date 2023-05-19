import { useEffect, useState } from "react";
import useContextMenu from "../../hooks/useContextMenu";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { Point } from "../../metadata/Point";
import _ from "lodash";
import BasicPortal from "../portal/BasicPortal";
import BasicContextMenuItem, {
  BasicContextMenuItemProps,
} from "./BasicContextMenuItem";
import { ContextMenuItemType } from "../../metadata/ContextMenuItemType";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicContextMenuProps {
  items: BasicContextMenuItemProps[];
  containerDivStyle?: ComponentStyleMerging;
  position?: Point;
}

export const BasicContextMenu: React.FC<BasicContextMenuProps> = ({
  items,
  containerDivStyle,
  position = { x: 0, y: 0 },
}) => {
  const { closeContextMenu } = useContextMenu();
  const [selectedItem, setSelectedItems] = useState<{
    [parentID: string]: string;
  }>({});

  // parse all exist context menu items
  useEffect(() => {
    setSelectedItems({});
  }, [items]);

  // close context menu when user clicks any place on the UI
  useEffect(() => {
    document.addEventListener("click", closeContextMenu, true);
    return () => {
      document.removeEventListener("click", closeContextMenu);
    };
  }, []);

  const _containerStyle = MergeComponentStyle(
    {
      css: classNames([
        "fixed",
        "flex flex-col",
        "bg-[#fdfdfd]",
        "border border-[#444]",
      ]),
    },
    containerDivStyle
  );

  function renderContextMenu(
    parentID: string,
    items: BasicContextMenuItemProps[],
    position: Point
  ) {
    return (
      <div
        className={_containerStyle.css}
        style={{ top: position.y, left: position.x }}
      >
        {items.map((item) => {
          const selected = selectedItem[parentID] === item.id;
          const divID = `context-menu-${parentID}-${item.id}`;

          return (
            <div
              id={divID}
              key={item.id}
              onMouseEnter={() => {
                handleHoverd(parentID, item.id, true);
              }}
              onMouseLeave={() => {
                handleHoverd(parentID, item.id, false);
              }}
            >
              <BasicContextMenuItem {...item} selected={selected} />
              {/* Render Sub Item */}
              {selected && renderSubContextMenu(divID, item)}
            </div>
          );
        })}
      </div>
    );
  }

  function renderSubContextMenu(
    divID: string,
    item: BasicContextMenuItemProps
  ) {
    if (item.type !== ContextMenuItemType.Branch) return null;

    // Retrieve the parent div element
    const divElement = document.querySelector(`#${divID}`);
    if (!divElement) return null;

    const divElementRect = divElement.getBoundingClientRect();

    return (
      <BasicPortal portalId="context-menu">
        {renderContextMenu(
          item.id,
          item.children as BasicContextMenuItemProps[],
          { x: divElementRect.right + 1, y: divElementRect.top - 1 }
        )}
      </BasicPortal>
    );
  }

  function handleHoverd(parentID: string, id: string, hovered: boolean) {
    const _selectedItems = _.cloneDeep(selectedItem);
    if (hovered) {
      _selectedItems[parentID] = id;
      setSelectedItems(_selectedItems);
    }
  }

  return (
    <BasicPortal portalId="context-menu">
      {renderContextMenu("root", items, position)}
    </BasicPortal>
  );
};

export default BasicContextMenu;
