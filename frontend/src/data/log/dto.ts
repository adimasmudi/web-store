export type LogResData = {
  id: string;
  title: string;
  category: string;
  message: string;
  created_at: string;
};

export type GetLogsResData = {
  totalItems: number;
  numberOfPage: number;
  items: LogResData[];
};
