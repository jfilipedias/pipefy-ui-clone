import React from "react";
import { MdAdd } from "react-icons/md";

import Card from "../Card";
import { Container } from "./styles";

interface Props {
  data: IList;
  index: number;
}

interface IList {
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

const List: React.FC<Props> = ({ data, index: listIndex }: Props) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} data={card} listIndex={listIndex} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
