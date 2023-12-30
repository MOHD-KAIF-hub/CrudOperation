import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const InfoListComponent = ({ infoList, selectedInfo, handleInfoCheckboxChange, handleAdd }) => (
  <div className="w-1/2 mx-auto">
    <div className="flex gap-4 mb-2">
      <h2 className="text-2xl font-600 mb-1">Info List</h2>
      <button onClick={handleAdd} className="bg-blue-500 text-white cursor-pointer p-2  rounded md:gap-2 flex">
        <FontAwesomeIcon icon={faPlus} className='mt-1' /> Info
      </button>
    </div>
    {infoList.map(info => (
      <div key={info._id} className="flex gap-2 items-center mb-2">
        <input
          type="checkbox"
          checked={selectedInfo.includes(info._id)}
          onChange={() => handleInfoCheckboxChange(info._id)}
          className="mr-2"
        />
        {info.name}
      </div>
    ))}
  </div>
);

export default InfoListComponent;
