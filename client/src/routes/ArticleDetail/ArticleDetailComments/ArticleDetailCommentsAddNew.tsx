import { useLoaderData } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Avatar } from "../../../components/ui";
import Container from "react-bootstrap/Container";
import { ChangeEvent, MouseEvent, useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArticleType, CreateCommentDtoType } from "../../../types";
import { useUser } from "../../../hooks";

const createComment = (payload: CreateCommentDtoType) =>
  axios.post("comments", payload);

function ArticleDetailCommentsAddNew() {
  const { username } = useUser();
  const article = useLoaderData() as Awaited<{ data: ArticleType }>;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["article", "detail", article.data.id],
      });
    },
  });

  const [comment, setComment] = useState("");
  const isEmpty = comment.length === 0;

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    event.preventDefault();
    setComment(event.target.value);
  };

  const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate({
      contentMarkdown: comment,
      articleId: article.data.id,
    });
    setComment("");
  };

  return (
    <Container className="d-flex mb-5">
      <Avatar username={username} diameter={48} />

      <Form>
        <Form.Control
          as="textarea"
          placeholder="Join the discussion"
          className="d-inline w-auto"
          value={comment}
          onChange={onChange}
          required
        />
        <Button
          variant="primary"
          type="submit"
          className="align-top mx-2"
          onClick={onSubmit}
          disabled={isEmpty || isLoading}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ArticleDetailCommentsAddNew;
