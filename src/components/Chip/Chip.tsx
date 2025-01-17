import React from "react";
import { highlightSubString } from "../../utils";
import type { KeyboardEvent, MouseEvent } from "react";
import { ValueOf } from "types";
import classNames from "classnames";

export const ChipType = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
} as const;

export type Props = {
  /**
   * The appearance of the chip.
   */
  appearance?: ValueOf<typeof ChipType>;

  /**
   * The lead for the chip.
   */
  lead?: string;
  /**
   * Function for handling chip div click event.
   */
  onClick?: (
    event: MouseEvent<HTMLButtonElement> | { lead: string; value: string }
  ) => void;
  /**
   * Function for handling dismissing a chip.
   */
  onDismiss?: () => void;
  /**
   * Whether the chip is selected.
   */
  selected?: boolean;
  /**
   * A substring to emphasise if it is part of the chip's value,
   * e.g. "sit" => poSITive
   */
  subString?: string;
  /**
   * Whether to wrap the value in quotation marks.
   */
  quoteValue?: boolean;
  /**
   * The value of the chip.
   */
  value: string;
};

const Chip = ({
  appearance,
  lead = "",
  onClick,
  onDismiss,
  quoteValue,
  selected,
  subString = "",
  value,
}: Props): JSX.Element => {
  // When user tabs over chip and presses Enter or Space key, chip will trigger
  // click functionality
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // The " " value is what is returned for the spacebar
    if (e.key === " " || e.key === "Enter") {
      if (typeof onClick === "function") {
        onClick({ lead: lead, value: value });
      }
    }
  };

  const chipValue = highlightSubString(value, subString).text;

  const chipContent = (
    <>
      {lead && <span className="p-chip__lead">{lead.toUpperCase()}</span>}
      <span
        className="p-chip__value"
        dangerouslySetInnerHTML={{
          __html: quoteValue ? `'${chipValue}'` : chipValue,
        }}
      />
    </>
  );

  const chipClassName = classNames({
    [`p-chip--${appearance}`]: !!appearance,
    "p-chip": !appearance,
  });

  if (onDismiss) {
    return (
      <span className={chipClassName} aria-pressed={selected}>
        {chipContent}
        <button className="p-chip__dismiss" onClick={() => onDismiss()}>
          <i className="p-icon--close">Dismiss</i>
        </button>
      </span>
    );
  } else {
    return (
      <button
        className={chipClassName}
        aria-pressed={selected}
        onClick={onClick}
        onKeyDown={(e) => onKeyDown(e)}
      >
        {chipContent}
      </button>
    );
  }
};

export default Chip;
