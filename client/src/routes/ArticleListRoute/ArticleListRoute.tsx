import DataTable, { TableColumn } from "react-data-table-component";
import Container from "react-bootstrap/Container";
import { ArticleType } from "../../types";
import axios from "axios";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useLoaderData, useNavigate } from "react-router";
import ArticleListDeleteConfirmModal from "./ArticleListDeleteConfirmModal";
import { useState } from "react";

const getColumns = (
  setArticleId: (id: number) => void
): TableColumn<ArticleType>[] => [
  {
    name: "Article title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Perex",
    selector: (row) => row.perex,
    sortable: true,
  },
  {
    name: "Author",
    selector: (row) => row.user.username,
    sortable: true,
  },
  {
    name: "# of comments",
    selector: (row) => row.comments.length,
    sortable: true,
  },
  {
    cell: ({ id }) => {
      return (
        <>
          <Pencil
            size="24"
            className="mx-2"
            onClick={() => console.log("TODO: update")}
          />
          <Trash size="24" className="mx-2" onClick={() => setArticleId(id)} />
        </>
      );
    },
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

function ArticleListRoute() {
  const navigate = useNavigate();
  const [articleId, setArticleId] = useState<number | null>(null);
  const articleList = useLoaderData() as Awaited<{ data: ArticleType[] }>;

  function handleDelete() {
    if (articleId != null) {
      axios.delete(`articles/${articleId}`);

      //TODO:
      navigate("/admin");
    }
    setArticleId(null);
  }
  function handleClose() {
    setArticleId(null);
  }

  return (
    <Container>
      <ArticleListDeleteConfirmModal
        articleId={articleId}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <DataTable
        columns={getColumns(setArticleId)}
        data={articleList.data}
        selectableRows
      />
    </Container>
  );
}

export default ArticleListRoute;
