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
              // Slightly more colorful & interactive
              "flex flex-col gap-2 rounded-2xl p-4 bg-gradient-to-r from-purple-50 to-white border border-purple-200 shadow hover:shadow-md transition duration-300"
            )}
          >
            <p className="text-base text-gray-700 leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


const Details = ({ feedback }) => {
        return (
                <div className="flex flex-col gap-4 w-full">
                        <Accordion>
                                <AccordionItem id="format-and-design">
                                        <AccordionHeader itemId="format-and-design">
                                                <CategoryHeader
                                                        title="Format & Design"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="format-and-design">
                                                <CategoryContent tips={feedback.formatAndDesign.feedback} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="content">
                                        <AccordionHeader itemId="content">
                                                <CategoryHeader
                                                        title="Content"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="content">
                                                <CategoryContent tips={feedback.contentQuality.feedback} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="impact-and-achievements">
                                        <AccordionHeader itemId="impact-and-achievements">
                                                <CategoryHeader
                                                        title="Impact & Achievements"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="impact-and-achievements">
                                                <CategoryContent tips={feedback.impactAndAchievements.feedback} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="ats">
                                        <AccordionHeader itemId="ats">
                                                <CategoryHeader
                                                        title="ATS"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="ats">
                                                <CategoryContent tips={feedback.ATSRecommendations} />
                                        </AccordionContent>
                                </AccordionItem>
                        </Accordion>
                </div>
        );
};

export default Details;