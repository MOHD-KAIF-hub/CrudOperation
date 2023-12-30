
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfoListComponent from './InfoListComponent';
import AddCategoryComponent from './AddCategoryComponent';
import SearchCategoryComponent from './SearchCategoryComponent';


const Home = () => {
  const [infoList, setInfoList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Fetching info by backend api
    axios.get('http://localhost:5000/api/getInfoList')
      .then(response => setInfoList(response.data))
      .catch(error => console.error('Error fetching info:', error));

    // Fetching  all categories from the backend api
    axios.get('http://localhost:5000/api/getCategories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleAdd = () => {
    axios.post('http://localhost:5000/api/createInfo')
      .then(response => {
        // Updating the infoList state according to the newly created info
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
    // Checking if the category name already exists
    const existingCategory = categories.find(category => category.name === newCategoryName); 
      axios.post('http://localhost:5000/api/createCategory', { name: newCategoryName, infoList: selectedInfo })
        .then(response => {
          const newCategory = response.data;
          if (existingCategory) {
            setCategories([...categories]); 
          }
          else
          {
          setCategories([...categories, newCategory]); 
          }
          setInfoList(infoList.filter(info => !selectedInfo.includes(info._id)));
          setSelectedInfo([]); 
          setNewCategoryName('');
        })
        .catch(error => console.error('Error creating category:', error));

  };

 

const handleSearchCategory = () => {
  // Searching info by category Name
  axios.get(`http://localhost:5000/api/searchInfoByCategory/${encodeURIComponent(searchCategory)}`)
    .then(response => {
      const result = response.data;

      
      setSearchResult([]);
      // Checking if there are results
      if (result.length > 0) {
        setSearchResult(result);
      } else {
        // If no results found, setting a custom message
        setSearchResult([{ name: 'No list found' }]);
      }
    })
    .catch(error => {
      console.error('Error searching info by category:', error);
           setSearchResult([]);
           setSearchResult([{ name: 'No list found' }]);
    });
};


  

  return (
    <div className="container flex flex-col mx-auto  mt-4 p-6 bg-gray-100 rounded-lg shadow-lg overflow-auto md:flex-row">
   <div className='w-1/2'>
   {/* Adding all components */}
                    <InfoListComponent
                infoList={infoList}
                selectedInfo={selectedInfo}
                handleInfoCheckboxChange={handleInfoCheckboxChange}
                handleAdd={handleAdd}
              />


            
                  <AddCategoryComponent
              categories={categories}
              newCategoryName={newCategoryName}
              setNewCategoryName={setNewCategoryName}
              handleAddCategory={handleAddCategory}

            />
    </div>

      <div className='w-1/2'>
              <SearchCategoryComponent
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                searchResult={searchResult}
                handleSearchCategory={handleSearchCategory}
              />
              </div>
    </div>
  );
};

export default Home;
