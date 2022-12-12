import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import { Avatar, CreationInfo } from "../../../components/ui";
import { CommentType } from "../../../types";

function ArticleDetailComment({ comment }: { comment: CommentType }) {
  return (
    <Container className="d-flex">
      <Avatar username={comment.user.username} diameter={48} />
      <Container className="mb-3">
        <CreationInfo
          createdAt={comment.createdAt}
          username={comment.user.username}
          relative={true}
        />
        <ReactMarkdown
          children={comment.contentMarkdown}
          remarkPlugins={[remarkGfm]}
        />
        <Container>
          <span className="p-2 user-select-none align-middle">0</span>
          <Button variant="link" onClick={() => console.log("up")}>
            <ChevronUp />
          </Button>
          <Button variant="link" onClick={() => console.log("down")}>
            <ChevronDown />
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default ArticleDetailComment;
