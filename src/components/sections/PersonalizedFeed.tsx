'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableCard from '@/components/content/DraggableCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { reorderContent, fetchContent } from '@/store/slices/contentSlice';

export default function PersonalizedFeed() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, hasMore, page } = useSelector((state: RootState) => state.content);
  const { categories } = useSelector((state: RootState) => state.preferences);
  const [displayItems, setDisplayItems] = useState(items);

  useEffect(() => {
    setDisplayItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = displayItems.findIndex((item) => item.id === active.id);
      const newIndex = displayItems.findIndex((item) => item.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(displayItems, oldIndex, newIndex);
        setDisplayItems(newItems);
        dispatch(reorderContent(newItems.map(item => item.id)));
      }
    }
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(fetchContent({ page: page + 1, categories }));
    }
  }, [dispatch, loading, hasMore, page, categories]);

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-gray-500 dark:text-gray-400">
          No content available. Try adjusting your preferences.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Your Feed
      </h2>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={displayItems.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4" data-testid="content-feed">
            {displayItems.map((item) => (
              <DraggableCard key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {hasMore && (
        <div className="flex justify-center py-4">
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}