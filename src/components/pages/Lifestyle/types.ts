export type LifestyleData = {
  title: string;
  intro: string;
  recommendations: {
    area: {
      title: string;
      image: string;
    };
    task: string;
    instructions: string[];
  }[];
};
