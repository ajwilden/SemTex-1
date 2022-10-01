import { Done, DoneAll } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { useSetAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useDataset from "src/hooks/dataset";
import useUserResponses from "src/hooks/user_responses";
import type { TextSample } from "src/types/client";
import { navButtonIndexAtom, textSampleIdAtom } from "../Semtex";

const HistoryCard = (textSample: TextSample) => {
  const router = useRouter();
  const datasetID = router.query.datasetID as string | undefined;
  const { dataset } = useDataset(datasetID);
  const { userResponses } = useUserResponses(datasetID);
  const setNavButtonIndex = useSetAtom(navButtonIndexAtom)
  const textSampleID = useAtomValue(textSampleIdAtom);

  const currentResponse = useMemo(() => {
    return userResponses?.find(
      (response) => response.textSample.id === textSample.id
    );
  }, [userResponses, textSample.id]);

  const isSelected = currentResponse?.textSample.id === textSampleID;

  const responseIcon =
    currentResponse?.response !== null ? (
      (currentResponse?.highlights?.length ?? 0) > 0 ? (
        // Returns <DoneAll /> when there's a response && highlights
        <DoneAll />
      ) : (
        // Returns <Done /> when there's a response
        <Done />
      )
    ) : // Else returns null
    null;

  const handleClick = () => {
    const selectedTextSampleID = dataset?.textSamples.findIndex(
      (sample) => sample.id === textSample.id
    );

    if (selectedTextSampleID !== undefined) {
      setNavButtonIndex(selectedTextSampleID)
    }
  };

  return (
    <ListItem divider sx={{ backgroundColor: "#F5F5F0" }} disablePadding>
      <ListItemButton selected={isSelected} onClick={handleClick}>
        <Typography noWrap>{textSample.body}</Typography>
        <ListItemIcon>{responseIcon}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default HistoryCard;
