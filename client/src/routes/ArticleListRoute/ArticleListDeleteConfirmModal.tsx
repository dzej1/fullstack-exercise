import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { ArticleListDeleteConfirmModalType } from "../../types/ArticleListDeleteConfirmModalType";

function ArticleListDeleteConfirmModal({
  articleId,
  handleClose,
  handleDelete,
}: ArticleListDeleteConfirmModalType) {
  const show = articleId != null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete article</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you really want to delete this article?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          NO!
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Sure 🤓
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ArticleListDeleteConfirmModal;
