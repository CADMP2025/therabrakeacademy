export default function QuizBuilder({ onSave, onCancel }) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">Quiz Builder (Coming Soon)</h3>
      <p className="mb-4">Quiz functionality will be added here</p>
      <button 
        onClick={() => onSave({ questions: [] })}
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
      >
        Save
      </button>
      <button 
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Cancel
      </button>
    </div>
  );
}3