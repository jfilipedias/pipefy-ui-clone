import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";

import { Container, Label } from "./styles";

interface Props {
  data: ICard;
  index: number;
}

interface ICard {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Card: React.FC<Props> = ({ data, index }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover: (item: DragItem, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
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
      }
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
