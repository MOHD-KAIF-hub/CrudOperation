// AddCategoryComponent.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddCategoryComponent = ({ categories, selectedInfo, handleAddCategory, handleInfoCheckboxChange }) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  return (
    <div className="mt-8 w-1/2 mx-auto">
      <h2 className="text-2xl  font-600 mb-4">Add Category</h2>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <button onClick={handleAddCategory} className="bg-blue-500 text-white p-2 rounded">
          <FontAwesomeIcon icon={faPlus} /> Category
        </button>
      </div>
      {categories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-600 mb-2">Category Results:</h3>
          {categories.map(category => (
            <li key={category._id} className="mb-2">
              {category.name}
              <div className="ml-4">
                {category.infoList.map(info => (
                  <div key={info._id} className="flex gap-2 items-center mb-2">
                    {/* <input
                      type="checkbox"
                      checked={selectedInfo.includes(info._id)}
                      onChange={() => handleInfoCheckboxChange(info._id)}
                      className="mr-2"
                    /> */}
                    {info.name}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddCategoryComponent;
