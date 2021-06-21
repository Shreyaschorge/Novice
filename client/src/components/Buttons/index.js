import React from "react";
import { Button, Tooltip } from "antd";
import "./Button.scss";

export const PrimaryButton = (props) => {
  return (
    <Button className={"primaryButton"} {...props}>
      {props.children}
    </Button>
  );
};

export const SecondaryButton = (props) => {
  return (
    <Button className={"secondaryButton"} {...props}>
      {props.children}
    </Button>
  );
};

export const TertiaryButton = (props) => {
  return (
    <Button className={"tertiaryButton"} {...props}>
      {props.children}
    </Button>
  );
};

export const PrimaryButtonWithTooltip = (props) => {
  return (
    <Tooltip title={props.title}>
      <Button className={"primaryButton"} {...props}>
        {props.children}
      </Button>
    </Tooltip>
  );
};

export const SecondaryButtonWithTooltip = (props) => {
  return (
    <Tooltip title={props.title}>
      <Button className={"secondaryButton"} {...props}>
        {props.children}
      </Button>
    </Tooltip>
  );
};
