'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ContentCard from './ContentCard';
import { ContentItem } from '@/types';

interface DraggableCardProps {
  item: ContentItem;
}

export default function DraggableCard({ item }: DraggableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <ContentCard item={item} isDragging={isDragging} />
    </div>
  );
}