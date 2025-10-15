interface LifestyleRecommendation {
  topic: string;
  details: string;
  comments: string;
}

export interface LifestyleRecommendationsData {
  title: string;
  preface: string;
  headers: string[];
  recommendations: LifestyleRecommendation[];
}
