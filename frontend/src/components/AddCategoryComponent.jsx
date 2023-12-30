import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddCategoryComponent = ({ categories,newCategoryName,setNewCategoryName,handleAddCategory }) => {

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
        <button onClick={()=>{ 
          handleAddCategory();
          setNewCategoryName('');
          }} className="bg-blue-500 text-white cursor-pointer p-2 rounded md:gap-2 flex">
          <FontAwesomeIcon icon={faPlus} className='mt-1' /> Category
        </button>
      </div>
      {categories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-600 mb-2">Mapped Category Results:</h3>
          {categories.map(category => (
    <li key={category._id} className="mb-2">
    {category.name}
    </li>
))}
        </div>
      )}
    </div>
  );
};

export default AddCategoryComponent;
