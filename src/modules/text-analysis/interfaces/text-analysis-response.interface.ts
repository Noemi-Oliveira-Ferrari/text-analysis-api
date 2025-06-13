export interface TextAnalysisResponse {
  totalWords: number;
  topWords: { word: string; count: number }[];
  analysis: string;
}
