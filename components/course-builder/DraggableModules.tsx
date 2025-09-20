'use client'

import React from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { 
  GripVertical, Trash2, Edit2, Copy, ChevronDown, 
  ChevronUp, FileText, Video, Image 
} from 'lucide-react'

export function DraggableModules({ 
  modules, 
  onReorder, 
  onDelete, 
  onDuplicate,
  activeModule,
  setActiveModule 
}) {
  const handleDragEnd = (result) => {
    if (!result.destination) return
    
    const items = Array.from(modules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    // Update positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      position: index
    }))
    
    onReorder(updatedItems)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="modules">
        {(provided, snapshot) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className={`space-y-2 ${
              snapshot.isDraggingOver ? 'bg-blue-50 rounded-lg p-2' : ''
            }`}
          >
            {modules.map((module, index) => (
              <Draggable 
                key={module.id} 
                draggableId={module.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`
                      bg-white rounded-lg border transition-all
                      ${snapshot.isDragging ? 'shadow-lg rotate-2' : 'shadow-sm'}
                      ${activeModule?.id === module.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                      }
                    `}
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div 
                          {...provided.dragHandleProps}
                          className="mt-1 cursor-move"
                        >
                          <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => setActiveModule(module)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              Module {index + 1}: {module.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDuplicate(module)
                                }}
                                className="p-1 text-gray-500 hover:text-blue-600"
                                title="Duplicate"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDelete(module.id)
                                }}
                                className="p-1 text-gray-500 hover:text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {module.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {module.description}
                            </p>
                          )}
                          
                          {module.resources?.length > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              {module.resources.map((resource, idx) => (
                                <span 
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                                >
                                  {resource.type === 'video' && <Video className="w-3 h-3" />}
                                  {resource.type === 'pdf' && <FileText className="w-3 h-3" />}
                                  {resource.type === 'image' && <Image className="w-3 h-3" />}
                                  {resource.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
