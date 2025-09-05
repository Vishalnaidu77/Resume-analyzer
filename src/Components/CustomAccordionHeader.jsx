import { cn } from "../Lib/utils";
import { AccordionHeader } from "./Accordion";

const CustomAccordionHeader = ({ children, variant = "analysis", ...props }) => {
  return (
    <AccordionHeader
      {...props}
      className={cn(
        "flex justify-between items-center py-3 px-4 transition-all",
        variant === "analysis" &&
          "bg-white border-b border-gray-100 hover:bg-gray-50",
        variant === "details" &&
          "bg-gradient-to-r from-purple-50 to-white border-b border-purple-200 hover:from-purple-100 hover:to-white shadow-sm"
      )}
    >
      {children}
    </AccordionHeader>
  );
};

export default CustomAccordionHeader;
