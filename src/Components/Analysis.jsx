import { cn } from '../Lib/utils';
import {
        Accordion,
        AccordionContent,
        AccordionHeader,
        AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }) => {
        return (
                <div
                        className={cn(
                                "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
                                score > 69
                                        ? "bg-badge-green"
                                        : score > 39
                                                ? "bg-badge-yellow"
                                                : "bg-badge-red"
                        )}
                >
                        <img
                                src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
                                alt="score"
                                className="size-4"
                        />
                        <p
                                className={cn(
                                        "text-sm font-medium",
                                        score > 69
                                                ? "text-badge-green-text"
                                                : score > 39
                                                        ? "text-badge-yellow-text"
                                                        : "text-badge-red-text"
                                )}
                        >
                                {score}/100
                        </p>
                </div>
        );
};

const CategoryHeader = ({
        title,
        categoryScore
}) => {
        return (
                <div className="flex flex-row gap-4 items-center py-2">
                        <p className="text-2xl font-semibold">{title}</p>
                </div>
        );
};

const CategoryContent = ({ tips }) => {
  const safeTips = Array.isArray(tips) ? tips : tips ? [tips] : [];

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="flex flex-col gap-4 w-full">
        {safeTips.map((tip, index) => (
          <div
            key={index}
            className={cn(
              // Softer, report-style
              "flex flex-col gap-2 rounded-xl p-4 bg-white border border-gray-100 shadow-sm"
            )}
          >
            <p className="text-base text-gray-800 leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Analysis = ({ feedback }) => {
        return (
                <div className="flex flex-col gap-4 w-full">
                    <h2 className='text-4xl !text-black font-bold'>More about this Resume:</h2>
                        <Accordion>
                                <AccordionItem id="job-fit-analysis">
                                        <AccordionHeader itemId="job-fit-analysis">
                                                
                                                <CategoryHeader
                                                        title="Job Fit Analysis"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="job-fit-analysis">
                                                <CategoryContent tips={feedback.jobFitAnalysis} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="weakness">
                                        <AccordionHeader itemId="weakness">
                                                <CategoryHeader
                                                        title="Weakness"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="weakness">
                                                <CategoryContent tips={feedback.weaknesses} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="strength">
                                        <AccordionHeader itemId="strength">
                                                <CategoryHeader
                                                        title="Strengths"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="strength">
                                                <CategoryContent tips={feedback.strengths} />
                                        </AccordionContent>
                                </AccordionItem>
                        </Accordion>
                </div>
        );
};

export default Analysis;