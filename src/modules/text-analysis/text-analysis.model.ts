import { Model } from 'objection';

export class TextAnalysisModel extends Model {
  id: string;
  text: string;
  createdAt: Date;

  static tableName = 'text_analysis';
}
