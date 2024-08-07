import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem ({ id, children, idx }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`uppercase flex items-center justify-center px-4 py-1 rounded-lg bg-yellow text-white cursor-pointer`}
    >
      <span className="text-gray-500">{idx}</span>&nbsp;{children}
    </div>
  );
};
