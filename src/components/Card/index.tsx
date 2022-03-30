import React from "react";

import { Container, Label } from "./styles";

interface Props {
  data: ICard;
}

interface ICard {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

const Card: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      <header>
        {data.labels.length > 0 &&
          data.labels.map((label) => <Label key={label} color={label} />)}
      </header>

      <p>{data.content}</p>
      {data.user && <img src={data.user} alt="user avatar" />}
    </Container>
  );
};

export default Card;
