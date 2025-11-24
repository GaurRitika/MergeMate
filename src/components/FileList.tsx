import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, FileText, X } from "lucide-react";

interface FileItem {
  id: string;
  file: File;
}

interface FileListProps {
  files: FileItem[];
  onReorder: (files: FileItem[]) => void;
  onRemove: (id: string) => void;
}

const SortableFileItem = ({ item, onRemove }: { item: FileItem; onRemove: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-3 p-4 bg-card rounded-xl border border-border
        shadow-card hover:shadow-card-hover transition-base
        ${isDragging ? "opacity-50 scale-105" : ""}
      `}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="w-5 h-5 text-muted-foreground" />
      </div>
      <FileText className="w-5 h-5 text-primary flex-shrink-0" />
      <span className="flex-1 text-sm font-medium text-foreground truncate">
        {item.file.name}
      </span>
      <span className="text-xs text-muted-foreground flex-shrink-0">
        {(item.file.size / 1024 / 1024).toFixed(2)} MB
      </span>
      <button
        onClick={() => onRemove(item.id)}
        className="p-1 hover:bg-destructive/10 rounded-lg transition-base"
        aria-label="Remove file"
      >
        <X className="w-4 h-4 text-destructive" />
      </button>
    </div>
  );
};

const FileList = ({ files, onReorder, onRemove }: FileListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      onReorder(arrayMove(files, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">
        Selected Files ({files.length})
      </h3>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={files.map(f => f.id)} strategy={verticalListSortingStrategy}>
          {files.map((item) => (
            <SortableFileItem key={item.id} item={item} onRemove={onRemove} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default FileList;
