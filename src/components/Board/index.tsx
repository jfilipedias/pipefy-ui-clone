import React, { useMemo, useState } from "react";

import produce from "immer";

import { loadLists } from "../../services/api";
import List from "../List";
import { BoardContext } from "./context";
import { Container } from "./styles";

const data = loadLists();

const Board: React.FC = () => {
  const [lists, setLists] = useState(data);

  const moveCard = (
    from: number,
    fromListIndex: number,
    to: number,
    toListIndex: number
  ): void => {
    setLists(
      produce((draft) => {
        const dragged = draft[fromListIndex].cards[from];

        draft[fromListIndex].cards.splice(from, 1);
        draft[toListIndex].cards.splice(to, 0, dragged);
      })
    );
  };

  const boardContext = useMemo(() => ({ lists, moveCard }), [lists]);

  return (
    <BoardContext.Provider value={boardContext}>
      <Container>
        {lists.map((list, index) => {
          return <List key={list.title} data={list} index={index} />;
        })}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
