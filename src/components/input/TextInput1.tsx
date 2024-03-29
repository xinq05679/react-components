import classNames from "classnames";
import { BiError } from "react-icons/bi";
import { ComponentStyleMerging } from "../../..";
import BasicTextInput, { TextInputProps } from "./TextInput";
import { MergeComponentStyle } from "../../..";
import React, { forwardRef, useRef, useState } from "react";
import ErrorMessageContainer from "../error/ErrorMessageContainer";

export interface TextInput1Props extends TextInputProps {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  errorMessage?: React.ReactNode;
  hideErrorIcon?: boolean;
}

export const TextInput1 = forwardRef<HTMLInputElement, TextInput1Props>(
  (
    {
      prefixIcon,
      suffixIcon,
      errorMessage,
      inputStyle,
      hideErrorIcon,
      ...others
    },
    ref
  ) => {
    const prefixIconDivRef = useRef<HTMLDivElement>(null);
    const suffixIconDivRef = useRef<HTMLDivElement>(null);
    const [forceUpdateRef, setForceUpdateRef] = useState(true);

    if (forceUpdateRef) {
      setTimeout(() => {
        setForceUpdateRef(false);
      }, 10);
    }

    const _prefixIconDivStyle = {
      css: classNames("absolute left-0"),
    } as ComponentStyleMerging;

    const _suffixIconDivStyle = {
      css: classNames("absolute right-0"),
    } as ComponentStyleMerging;

    const _inputStyle = MergeComponentStyle(
      {
        css: classNames("shrink-0", {
          "bg-[#fef7ea]": errorMessage,
          "border-[#f09b11] hover:border-[#f09b11] focus:border-[#f09b11]":
            errorMessage,
        }),
        style: {
          paddingLeft: prefixIconDivRef.current
            ? `${prefixIconDivRef.current.clientWidth}px`
            : "0px",
          paddingRight: suffixIconDivRef.current
            ? `${suffixIconDivRef.current.clientWidth}px`
            : "0px",
        },
      },
      // @ts-ignore
      inputStyle
    );

    const _divStyle = MergeComponentStyle({
      css: classNames("relative", "w-[100%]", "flex items-center"),
    });

    return (
      <ErrorMessageContainer errorMessage={errorMessage} hideErrorIcon>
        <div className={classNames(_divStyle.css)} style={_divStyle.style}>
          {/* Prefix Icon */}
          {prefixIcon && (
            <div ref={prefixIconDivRef} className={_prefixIconDivStyle.css}>
              {prefixIcon}
            </div>
          )}
          {/* Text Input */}
          <BasicTextInput ref={ref} {...others} inputStyle={_inputStyle} />
          {/* Suffix Icon */}
          {suffixIcon && (
            <div ref={suffixIconDivRef} className={_suffixIconDivStyle.css}>
              {suffixIcon}
            </div>
          )}
        </div>
      </ErrorMessageContainer>
    );
  }
);

export default TextInput1;
