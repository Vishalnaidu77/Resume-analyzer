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
        const safeTips = Array.isArray(tips) ? tips : [];
        return (
                <div className="flex flex-col gap-4 items-center w-full">
                        <div className="flex flex-col gap-4 w-full">
                                {safeTips.map((tip, index) => (
                                        <div
                                        key={index}
                                        className={cn(
                                                "flex flex-col gap-2 rounded-2xl p-4 bg-green-50 border border-green-200 text-green-700",
                                                
                                        )}
                                        >
                                                <div className="flex flex-row gap-2 items-center">
                                                        <img
                                                                src={"/icons/check.svg"}
                                                                alt="score"
                                                                className="size-5"
                                                        />
                                                        <p className="text-lg font-medium">{tip}</p>
                                                </div>
                                        </div>
                                ))}
                        </div>
                </div>
        );
};

const Details = ({ feedback }) => {
        console.log(feedback.feedback.achievementsRecommendations);
        return (
                <div className="flex flex-col gap-4 w-full">
                        <h2 className='text-center'>What you can improve:</h2>
                        <Accordion>
                                <AccordionItem id="format-and-design">
                                        <AccordionHeader itemId="format-and-design">
                                                <CategoryHeader
                                                        title="Format & Design"
                                                        categoryScore={feedback.formatAndDesign.score}
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="format-and-design">
                                                <CategoryContent tips={feedback.feedback.formatAndDesignRecommendations} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="content">
                                        <AccordionHeader itemId="content">
                                                <CategoryHeader
                                                        title="Content"
                                                        categoryScore={feedback.contentQuality.score}
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="content">
                                                <CategoryContent tips={feedback.feedback.contentRecommendations} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="impact-and-achievements">
                                        <AccordionHeader itemId="impact-and-achievements">
                                                <CategoryHeader
                                                        title="Impact & Achievements"
                                                        categoryScore={feedback.impactAndAchievements.score}
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="impact-and-achievements">
                                                <CategoryContent tips={feedback.feedback.achievementsRecommendations} />
                                        </AccordionContent>
                                </AccordionItem>
                                <AccordionItem id="strengths">
                                        <AccordionHeader itemId="strengths">
                                                <CategoryHeader
                                                        title="Strengths"
                                                />
                                        </AccordionHeader>
                                        <AccordionContent itemId="strengths">
                                                <CategoryContent tips={feedback.feedback.strengths} />
                                        </AccordionContent>
                                </AccordionItem>
                        </Accordion>
                </div>
        );
};

export default Details;