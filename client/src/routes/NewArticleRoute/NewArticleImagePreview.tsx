import { Dispatch } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { NewArticleFormReducerActionType } from "../../types";

type NewArticleImagePreviewType = {
  dispatch: Dispatch<NewArticleFormReducerActionType>;
  imageId: number;
};

function NewArticleImagePreview({
  dispatch,
  imageId,
}: NewArticleImagePreviewType) {
  function removeFile() {
    dispatch({ type: "imageId", newValue: "" });

    //TODO: delete from db and fs
  }

  return (
    <Container>
      <img
        alt="Uploaded image"
        className="d-block"
        src={`http://localhost:3333/images/${imageId}`}
      />
      <Button onClick={removeFile}>Upload new</Button>
    </Container>
  );
}

export default NewArticleImagePreview;
