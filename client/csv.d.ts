declare module '*.csv' {
    const content: Array<{
      State: string;
      Range: string;
      Rate: number;
    }>;
    export default content;
  }