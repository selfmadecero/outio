import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Department {
  id: string;
  name: {
    en: string;
    ko: string;
  };
  employees: number;
}

interface RecipientSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedDepartments: string[]) => void;
  language: 'en' | 'ko';
  departments: Department[];
}

const RecipientSelector: React.FC<RecipientSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  language,
  departments,
}) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedDepartments([]);
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleToggleDepartment = (departmentId: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(departmentId)
        ? prev.filter((id) => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedDepartments(departments.map((dept) => dept.id));
  };

  const handleDeselectAll = () => {
    setSelectedDepartments([]);
  };

  const handleConfirm = () => {
    onSelect(selectedDepartments);
    onClose();
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name[language].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSelected = departments
    .filter((dept) => selectedDepartments.includes(dept.id))
    .reduce((sum, dept) => sum + dept.employees, 0);

  const content = {
    en: {
      title: 'Select Recipients',
      search: 'Search departments',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      selected: 'Selected',
      employees: 'employees',
      cancel: 'Cancel',
      confirm: 'Confirm',
    },
    ko: {
      title: '수신자 선택',
      search: '부서 검색',
      selectAll: '전체 선택',
      deselectAll: '전체 해제',
      selected: '선택됨',
      employees: '명',
      cancel: '취소',
      confirm: '확인',
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              {content[language].title}
            </h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder={content[language].search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
              >
                {content[language].selectAll}
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                {content[language].deselectAll}
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto mb-4">
              {filteredDepartments.map((dept) => (
                <motion.div
                  key={dept.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center p-3 bg-gray-100 rounded-lg cursor-pointer mb-2"
                  onClick={() => handleToggleDepartment(dept.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept.id)}
                    onChange={() => {}}
                    className="mr-3"
                  />
                  <span className="flex-grow">{dept.name[language]}</span>
                  <span className="text-sm text-gray-500">
                    {dept.employees}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-indigo-700">
                {content[language].selected}: {totalSelected}{' '}
                {content[language].employees}
              </span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                {content[language].cancel}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {content[language].confirm}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecipientSelector;
