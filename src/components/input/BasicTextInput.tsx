import { useState, useRef, useEffect } from "react";
import { ComponentStyleMerging } from "../../metadata/ComponentStyle";
import { MergeComponentStyle } from "../../utility/componentUtility";
import classNames from "classnames";

export interface BasicTextInputProps {
  text?: string;
  editable?: boolean;
  onChanged?: () => string;
  inputStyle?: ComponentStyleMerging;
}

const BasicTextInput: React.FC<BasicTextInputProps> = ({
  text,
  editable,
  onChanged,
  inputStyle,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setInputHeight(inputRef.current?.clientHeight);
    } else {
      if (inputHeight != 0) {
        setInputHeight(0);
      }
    }
  }, []);

  const handleClick = () => {
    if (!editable) return;

    setIsEditMode(true);
    inputRef.current?.select();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const errorMsg = onChanged?.();

    if (!errorMsg) {
      setIsEditMode(false);
      inputRef.current?.blur();
    } else {
      setErrorMsg(errorMsg);
    }
  };

  const _inputStyle = MergeComponentStyle(
    {
      css: classNames(
        "outline-0 border border-[#000] w-full h-10 text-xl px-2 rounded m-0",
        {
          "border-0 bg-[#fff0]": !isEditMode,
          "cursor-pointer": editable,
          "cursor-text": isEditMode,
        }
      ),
    },
    inputStyle
  );

  return (
    <form className="relative" onSubmit={handleSubmit} ref={formRef} noValidate>
      <input
        className={_inputStyle.css}
        style={_inputStyle.style}
        type="text"
        value={input}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={(evt) => {
          formRef.current?.requestSubmit();
        }}
        ref={inputRef}
        disabled={!editable}
      />
    </form>
  );
};

export default BasicTextInput;
