import Container from "react-bootstrap/Container";
import { Stack } from "react-bootstrap";
import ArticleCard from "./ArticleCard/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArticleType } from "../../types";

const getArticles = () => axios.get("/articles");

function RecentArticlesRoute() {
  const query = useQuery({ queryKey: ["articles"], queryFn: getArticles });

  return (
    <Container>
      <h2 className="pt-4">Recent articles</h2>
      <Stack gap={2}>
        {query?.data?.data?.map((article: ArticleType) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </Stack>
    </Container>
  );
}

export default RecentArticlesRoute;
