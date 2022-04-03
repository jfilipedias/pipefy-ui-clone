import React from "react";

import produce from "immer";

import { loadLists } from "../../services/api";
import List from "../List";
import { BoardContext } from "./context";
import { Container } from "./styles";

const data = loadLists();

const Board: React.FC = () => {
  const [lists, setLists] = React.useState(data);

  const moveCard = (
    from: number,
    fromListIndex: number,
    to: number,
    toListIndex: number
  ) => {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromListIndex].cards[from];

        draft[fromListIndex].cards.splice(from, 1);
        draft[toListIndex].cards.splice(to, 0, dragged);
      })
    );

    console.log("called");
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BoardContext.Provider value={{ lists, moveCard }}>
      <Container>
        {data.map((list, index) => (
          <List key={list.title} data={list} index={index} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
