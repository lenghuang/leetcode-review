export interface QuestionContentQueryResponse {
  question: {
    content: string;
    mysqlSchemas: string | null;
    dataSchemas: string | null;
  };
}
