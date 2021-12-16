import React, {useState} from "react";
import { data } from './constants/dataSource'
import ProductTable from './components/ProductTable'
import BookModal from './components/BookModal'
import ReturnModal from './components/ReturnModal'
import { orderBy } from 'lodash';
import { Button, Box } from "@material-ui/core";

function App() {
 
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedData, setSortedData] = useState(data);
  const [searched, setSearched] = useState("");
  const [openBookModal, setOpenBookModal] = useState(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  const copyData = (a) => {
    return JSON.parse(JSON.stringify(a));
  }
  
  const sortData = (sortBy, sortOrder) => {
    const dataToSort = copyData(sortedData);
    const sortedItems = orderBy(dataToSort, [sortBy], [sortOrder]);

    return sortedItems;
  }
  
  const requestSort = (pSortBy) => {
      if (pSortBy === sortBy) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortOrder('asc');
      }
      setSortBy(pSortBy);
      const sortedItems = sortData(pSortBy, sortOrder);
      setSortedData(sortedItems);
  }


  const onSearch = (searchedVal) => {
    const dataToFilter = copyData(data);
    const val = searchedVal.toLowerCase();

    const filteredRows = dataToFilter.filter((row) => {
      return (row.name.toLowerCase().includes(val)
        || row.code.toLowerCase().includes(val)
        || row.availability.toString().includes(val)
        || row.needing_repair.toString().includes(val)
        || row.durability.toString().includes(val)
        || row.max_durability.toString().includes(val)
        || (row.mileage && row.mileage.toString().includes(val)));
    });
    setSortedData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    onSearch(searched);
  };

  const handleCloseBookModal = () => {
    setOpenBookModal(false);
  };

  const handleCloseReturnModal = () => {
    setOpenReturnModal(false);
  };

  const getProductsByAvailability = (availability) => {
    const dataToFilter = copyData(data);
    return dataToFilter.filter((row) => row.availability === availability);
  }

  const availableProducts = getProductsByAvailability(true);
  const unavailableProducts = getProductsByAvailability(false);

  return (
    <React.Fragment>
      <ProductTable
      data={sortedData}
      onSortBy={requestSort}
      sortOrder={sortOrder}
      sortBy={sortBy}
      onSearch={onSearch}
      onCancelSearch={cancelSearch}
      searched={searched}
      />
      <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          m: 1,
        }}>
        <Button onClick={() => setOpenBookModal(true)} variant="outlined">Book</Button>
        <Button onClick={() => setOpenReturnModal(true)} variant="outlined">Return</Button>
      </Box>
      <BookModal showModal={openBookModal} handleClose={handleCloseBookModal} products={availableProducts}/>
      <ReturnModal showModal={openReturnModal} handleClose={handleCloseReturnModal} products={unavailableProducts}/>
    </React.Fragment>
  );
}

export default App;
