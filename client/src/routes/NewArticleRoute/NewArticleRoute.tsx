import { ChangeEvent, useReducer } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import {
  NewArticleFormReducerActionType,
  NewArticleFormType,
} from "../../types";
import NewArticleImagePreview from "./NewArticleImagePreview";
import { useQueryClient } from "@tanstack/react-query";

function stripMarkdown(text: string) {
  return text.replace(/__|\*|#|(?:\[([^\]]*)\]\([^)]*\))/gm, "$1");
}

function reducer(
  formValues: NewArticleFormType,
  action: NewArticleFormReducerActionType
): NewArticleFormType {
  switch (action.type) {
    case "title":
    case "imageId":
    case "content": {
      return {
        ...formValues,
        [action.type]: action.newValue,
      };
    }
  }

  throw Error("Unknown action: " + action.type);
}

const initialFormValues = {
  title: "",
  imageId: 0,
  content: "",
};

function NewArticleRoute() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const [formValues, dispatch] = useReducer(reducer, initialFormValues);
  const isFormValid = Object.values(formValues).every((value) => !!value);

  function changeInput(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    return dispatch({
      newValue: e.target.value,
      type: e.target.name,
    });
  }
  async function handleArticlePublish() {
    const newArticle = await axios.post("articles", {
      title: formValues.title,
      perex: stripMarkdown(formValues.content).slice(0, 100),
      content: formValues.content,
      imageId: formValues.imageId,
    });
    queryClient.invalidateQueries({
      queryKey: ["articles"],
    });
    navigator(`/article/${newArticle.data.id}`);
  }

  // TODO: deep dive what is correct type for event
  function onFileChange(event: any) {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    axios
      .post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => dispatch({ type: "imageId", newValue: data.data }));
  }

  return (
    <Container className="pt-3">
      <h1>
        Create new article
        <Button
          className="mx-3 mb-3"
          onClick={handleArticlePublish}
          disabled={!isFormValid}
        >
          Publish article
        </Button>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Article Title</Form.Label>
            <Form.Control
              name="title"
              value={formValues.title}
              onChange={changeInput}
              placeholder="My First Article"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Featured image</Form.Label>
            {formValues.imageId ? (
              <NewArticleImagePreview
                dispatch={dispatch}
                imageId={formValues.imageId}
              />
            ) : (
              <Form.Control type="file" onChange={onFileChange} />
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              placeholder="Supports markdown. Yay!"
              className="d-inline w-100"
              value={formValues.content}
              onChange={changeInput}
              required
            />
          </Form.Group>
        </Form>
      </h1>
    </Container>
  );
}

export default NewArticleRoute;
