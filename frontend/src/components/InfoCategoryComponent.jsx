
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoListComponent from './InfoListComponent';
import AddCategoryComponent from './AddCategoryComponent';
import SearchCategoryComponent from './SearchCategoryComponent';


const InfoCategoryComponent = () => {
  const [infoList, setInfoList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Fetch info list from the API
    axios.get('http://localhost:5000/api/getInfoList')
      .then(response => setInfoList(response.data))
      .catch(error => console.error('Error fetching info:', error));

    // Fetch categories from the API
    axios.get('http://localhost:5000/api/getCategories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleAdd = () => {
    axios.post('http://localhost:5000/api/createInfo')
      .then(response => {
        // Update the infoList state with the newly created info
        setInfoList(prevInfoList => [...prevInfoList, response.data]);
      })
      .catch(error => console.error('Error creating info:', error));
  };


  const handleInfoCheckboxChange = (infoId) => {
    const updatedSelectedInfo = selectedInfo.includes(infoId)
      ? selectedInfo.filter(id => id !== infoId)
      : [...selectedInfo, infoId];

    setSelectedInfo(updatedSelectedInfo);
  };

  const handleAddCategory = () => {
    // Create a new category and map selected info
    axios.post('http://localhost:5000/api/createCategory', { name: newCategoryName, infoList: selectedInfo })
      .then(response => {
        setCategories([...categories, response.data]);
        setInfoList(infoList.filter(info => !selectedInfo.includes(info._id)));
        setSelectedInfo([]);
        setNewCategoryName('');
      })
      .catch(error => console.error('Error creating category:', error));
  };

const handleSearchCategory = () => {
  // Search info by category
  axios.get(`http://localhost:5000/api/searchInfoByCategory/${encodeURIComponent(searchCategory)}`)
    .then(response => {
      const result = response.data;

      // Check if there are results
      setSearchResult([]);
      if (result.length > 0) {
        setSearchResult(result);
      } else {
        // If no results found, set a custom message
        setSearchResult([{ name: 'No list found' }]);
      }
    })
    .catch(error => {
      console.error('Error searching info by category:', error);
           setSearchResult([]);
           setSearchResult([{ name: 'No list found' }]);
      // Handle other errors if needed
    });
};


  

  return (
    <div className="container  h-[600px] mx-auto  mt-4 p-6 bg-gray-100 rounded-lg shadow-lg overflow-auto">
   
              <InfoListComponent
          infoList={infoList}
          selectedInfo={selectedInfo}
          handleInfoCheckboxChange={handleInfoCheckboxChange}
          handleAdd={handleAdd}
        />


            
              <AddCategoryComponent
          categories={categories}
          selectedInfo={selectedInfo}
          handleAddCategory={handleAddCategory}
          handleInfoCheckboxChange={handleInfoCheckboxChange}
        />

              <SearchCategoryComponent
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                searchResult={searchResult}
                handleSearchCategory={handleSearchCategory}
              />

    </div>
  );
};

export default InfoCategoryComponent;
