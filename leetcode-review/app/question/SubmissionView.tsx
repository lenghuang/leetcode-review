import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SubmissionListSubmissions } from "@/utils/leetcode/graphql/submission-list";
import { SubmissionViewDetail } from "./SubmissionViewDetail";

type SumbissionViewProps = {
  submissions: SubmissionListSubmissions;
};

export const SubmissionView = async ({ submissions }: SumbissionViewProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {submissions.map((sub) => {
        const dateObject = new Date(sub.timestamp * 1000);
        const status = sub.statusDisplay;
        return (
          <AccordionItem key={sub.id} value={sub.id}>
            <AccordionTrigger>
              <p>
                [{dateObject.toLocaleDateString()}
                {dateObject.toLocaleTimeString()}] [{sub.langName}]
              </p>
              {status === "Accepted" ? (
                <p className="text-green-700">{status}</p>
              ) : (
                <p>{status}</p>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <SubmissionViewDetail submissionId={sub.id} />{" "}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
