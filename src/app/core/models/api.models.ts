export interface CatFactResponse {
  fact: string;
  error?: ApiError;
}

export interface GifResponse {
  gifUrl: string;
  error?: ApiError;
}

export interface FactWithGifResponse {
  fact: string;
  gifUrl: string;
  query: string;
  error?: ApiError;
}

export interface HistoryResponse {
    history: History[];
    error:   ApiError;
}

export interface History {
    id:         number;
    searchDate: Date;
    catFact:    string;
    query:      string;
    gifUrl:     string;
}

export interface ApiError {
  isError: boolean;
  message?: string;
}
