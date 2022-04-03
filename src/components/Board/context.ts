import { createContext } from "react";

interface List {
  title: string;
  creatable: boolean;
  cards: Card[];
  done?: boolean;
}

interface Card {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

interface BoardContext {
  lists: List[];
  moveCard: (
    from: number,
    fromListIndex: number,
    to: number,
    toListIndex: number
  ) => void;
}

export const BoardContext = createContext<BoardContext>({} as BoardContext);
