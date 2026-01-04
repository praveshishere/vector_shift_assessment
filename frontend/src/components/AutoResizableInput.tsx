import { useRef } from "react";
import { cn } from "../utils/cn";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const AutoResizeInput = ({ value, onChange, className }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onInput={handleInput}
      className={cn("min-h-[40px] resize-none", className)}
    />
  );
};

export default AutoResizeInput;
