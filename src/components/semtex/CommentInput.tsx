import { Box } from "@mui/material";
import { useAtomValue } from "jotai";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useUrComment } from "src/hooks/user_response";
import { textSampleIdAtom } from "./Semtex";

const CommentInput = () => {
  const router = useRouter();
  const textSampleID = useAtomValue(textSampleIdAtom);
  console.log(textSampleID)
  const { comment, updateComment } = useUrComment(
    router.query.datasetID as string | undefined,
    textSampleID
  );
  console.log("COMMENT", comment, updateComment)

  const [inputComment, setInputComment] = useState(comment);
  // setText(event.target.value) <- console.log below will be replaced with this function
  const handleInput = debounce((event) => {
    console.log(inputComment)
    updateComment(event.target.value);
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(event.target.value);
    handleInput(event);
  };

  return (
    <Box>
      <form>
        <textarea
          onChange={handleChange}
          value={inputComment}
          style={{
            width: "800px",
            height: "200px",
            fontSize: "15px",
            resize: "none",
          }}
        ></textarea>
      </form>
    </Box>
  );
};

export default CommentInput;
