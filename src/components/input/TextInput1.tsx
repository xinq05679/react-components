import classNames from "classnames";
import { BiError } from "react-icons/bi";
import { ComponentStyleMerging } from "../../..";
import BasicTextInput, { TextInputProps } from "./TextInput";
import { MergeComponentStyle } from "../../..";
import React, { forwardRef, useRef, useState } from "react";

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

    const _errorMessageStyle = {
      css: classNames(
        "relative",
        "h-full",
        "overflow-y-auto",
        "flex items-start",
        "text-sm text-[#f00]/80 text-start"
      ),
    } as ComponentStyleMerging;

    const _errorMessageIconStyle = {
      css: classNames("shrink-0", "me-1", "w-[18px] h-[18px]"),
    } as ComponentStyleMerging;

    return (
      <div className={classNames("flex flex-col", "h-full w-full")}>
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
        {/* Error Message */}
        {errorMessage && (
          <div
            className={_errorMessageStyle.css}
            style={_errorMessageStyle.style}
          >
            <BiError
              className={classNames(_errorMessageIconStyle.css, {
                hidden: hideErrorIcon,
              })}
              style={_errorMessageIconStyle.style}
            />
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

export default TextInput1;
