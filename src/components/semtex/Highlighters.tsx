import { Button, Stack } from "@mui/material";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import { highlightsDbAccess } from "src/utils/user_response";
import { textSampleIdAtom } from "./Semtex";

const Highlighters = () => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const { userResponses, mutate } = useUserResponses(datasetID);

  const textSampleID = useAtomValue(textSampleIdAtom);
  const { insertHighlight, updateHighlightSelection, deleteHighlight } =
    useMemo(
      () => highlightsDbAccess(userResponses, textSampleID, mutate),
      [userResponses, textSampleID, mutate]
    );

  // Demo buttons showing use of the different highlight functions
  return (
    <Stack 
    spacing={2} 
    padding={4}
    mt={5}
    sx={{
      backgroundColor: "white",
      borderRadius: "16px",
      height: "50vh"

      }}>
      <Button
        variant="outlined"
        onClick={() => {
          insertHighlight("New highlight", dataset?.highlightOptions[0]);
        }}
      >
        Insert Highlight
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          updateHighlightSelection("highlightID", Math.random().toString());
        }}
      >
        Change Highlight Selection
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          deleteHighlight("highlightID");
        }}
      >
        Delete Highlight
      </Button>
    </Stack>
  );
};

export default Highlighters;
