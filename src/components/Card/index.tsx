/* eslint-disable no-param-reassign */
import React, { useContext, useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

import { BoardContext } from "../Board/context";
import { Container, Label } from "./styles";

interface Props {
  data: ICard;
  index: number;
  listIndex: number;
}

interface ICard {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

interface DragItem {
  index: number;
  listIndex: number;
  id: string;
  type: string;
}

const Card: React.FC<Props> = ({ data, index, listIndex }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { moveCard } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover: (item: DragItem, monitor) => {
      const dragIndex = item.index;
      const dragListIndex = item.listIndex;

      const hoverIndex = index;
      const hoverListIndex = listIndex;

      if (dragIndex === hoverIndex && dragListIndex === hoverListIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = (draggedOffset as XYCoord).y - hoverBoundingRect.top;

      const beforeNextItem =
        dragIndex < hoverIndex && draggedTop < hoverMiddleY;
      const afterNextItem = dragIndex > hoverIndex && draggedTop > hoverMiddleY;

      if (beforeNextItem || afterNextItem) {
        return;
      }

      moveCard(dragIndex, dragListIndex, hoverIndex, hoverListIndex);

      item.index = hoverIndex;
      item.listIndex = hoverListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
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
