import { Alert, AlertTitle, Grid, Stack, Typography } from "@mui/material";
import useAuth from "src/contexts/AuthContext";
import useDataset from "src/hooks/dataset";
import useUrComment from "src/hooks/user_response/comment";
import useUrHighlights from "src/hooks/user_response/highlights";
import useUrResponseOption from "src/hooks/user_response/response_option";
import CommentInput from "./CommentInput";
import Highlighters from "./Highlighters";
import History from "./History";
import InstructionModal from "./instruction_modal/InstructionModal";
import InstructionModalButton from "./instruction_modal/InstructionModalButton";
import NavigationButtons from "./NavigationButtons";
import Progress from "./Progress";
import ResponseSelector from "./response_selector/ResponseSelector";
import TextSample from "./TextSample";

/* TODO:
 *
 * - Pass in the text-sample ID rather then the user response ID
 * - Use ResponseOptions instead of IDs so it behaves like the highlight_options
 * - Error handling when dataset / other things do not exist
 *
 */

const Semtex = () => {
  const { user } = useAuth();
  const { dataset, datasetError } = useDataset(
    "8b5a92ba-aaae-4223-83d2-4eab40e7a22e"
  );
  const {
    highlights,
    insertHighlight,
    updateHighlightSelection,
    deleteHighlight,
  } = useUrHighlights(dataset?.id, "8709aa3d-0026-4ea7-9de3-7caae526a9fc");
  const { comment, updateComment } = useUrComment(
    dataset?.id,
    "8709aa3d-0026-4ea7-9de3-7caae526a9fc"
  );
  const { responseOption, updateResponseOption } = useUrResponseOption(
    dataset?.id,
    "8709aa3d-0026-4ea7-9de3-7caae526a9fc"
  );
  console.log(responseOption);

  return (
    <>
      {datasetError && (
        <Alert severity="error">
          <AlertTitle>Error {datasetError.code}</AlertTitle>
          <Typography>{datasetError.message}</Typography>
          {datasetError.details && (
            <Typography>Details: {datasetError.details}</Typography>
          )}
          {datasetError.hint && (
            <Typography>hint: {datasetError.hint}</Typography>
          )}
        </Alert>
      )}
      {highlights && <pre>{JSON.stringify(highlights, null, 4)}</pre>}
      {comment && <pre>{JSON.stringify(comment, null, 4)}</pre>}
      {responseOption && <pre>{JSON.stringify(responseOption, null, 4)}</pre>}
      {/* dataset && <pre>{JSON.stringify(dataset, null, 4)}</pre> */}

      <button
        onClick={() => {
          const randInt = Math.random() * 100;

          updateComment(randInt.toString());
        }}
      >
        change comment
      </button>

      <button
        onClick={() => {
          const randInt = Math.random() * 100;

          insertHighlight(randInt.toString(), dataset!.highlightOptions[0]);
        }}
      >
        new highlight
      </button>
      <button
        onClick={() => {
          const randInt = Math.random() * 100;

          updateHighlightSelection(highlights[0]?.id, randInt.toString());
        }}
      >
        update highlight
      </button>
      <button
        onClick={() => {
          console.log(highlights[0]?.id);
          deleteHighlight(highlights[0]?.id);
        }}
      >
        delete highlight
      </button>

      <button
        onClick={() => {
          updateResponseOption(dataset?.responseOptions[0]);
        }}
      >
        change response option
      </button>

      {dataset && (
        <>
          <InstructionModal />
          <Grid container>
            <Grid item>
              <History />
            </Grid>
            <Grid item>
              <Stack>
                <Progress />
                <TextSample />
                <ResponseSelector />
                <CommentInput />
                <NavigationButtons />
              </Stack>
            </Grid>
            <Grid item>
              <Highlighters />
            </Grid>
          </Grid>
          <InstructionModalButton />
        </>
      )}
    </>
  );
};

export default Semtex;
