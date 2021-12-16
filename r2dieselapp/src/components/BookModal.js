import React, {useState, useEffect } from "react";
import { 
  Box,
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import { Alert } from '@mui/material';
import "rsuite/dist/styles/rsuite-default.css";
import "./styles.css";
import { DateRangePicker } from "rsuite";
import { style } from './ModalStyles'
import ConfirmModal from './ConfirmModal'
import ModalTitle from './ModalTitle'

function ConfirmBookModal({handleCloseParent, product, dateRange}) {
    const [cost, setCost] = useState('-1');

    useEffect(() => {    
      if (product && dateRange) {
        const dateA = new Date(dateRange[0]);
        const dateB = new Date(dateRange[1]);
        const differenceInDays = (dateB.getTime() - dateA.getTime())  / (1000 * 3600 * 24);
        const calcCost = (differenceInDays >= product.minimum_rent_period) ? product.price * differenceInDays : '-1'
        setCost(calcCost);
      } 
    },[product, dateRange]);
  
    return (
      <ConfirmModal handleCloseParent={handleCloseParent} title="Book a product" subtitle={`Your estimated cost is ${cost}`} isYesDisabled={cost === '-1'}/>
    );
  }

export default function BookModal({showModal, handleClose, products}) {
  const [product, setProduct] = useState('');
  const [dates, setDates] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleDates = (val) => {
    setDates(val);
  }

  const handleProductSelection = (val) => {
    const productCode = val.target.value;
    const product = products.filter((prod) => prod.code === productCode)[0];
    setProduct(productCode);
    setSelectedProduct(product)
  }

  const onCloseModal = () => {
    setProduct('');
    setDates('');
    setSelectedProduct('');
    handleClose();
  }

  const isInvalidBook = () => {
    if (selectedProduct && dates) {
      const dateA = new Date(dates[0]);
      const dateB = new Date(dates[1]);
      const differenceInDays = (dateB.getTime() - dateA.getTime())  / (1000 * 3600 * 24);
      return differenceInDays < selectedProduct.minimum_rent_period;
    }
    return false;
  }

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <ModalTitle title="Book a product"/>
          <FormControl fullWidth>
            <InputLabel id="select-product-label">Product</InputLabel>
            <Select
                labelId="select-product-label"
                id="select-product-label"
                value={product}
                onChange={(value) => handleProductSelection(value)}
                label="Product"
            >
            {products.map((item, indx) => {
                    return <MenuItem key={indx} value={item.code}>{`${item.name} / ${item.code}`}</MenuItem>
                }
            )}
            </Select>
          </FormControl>
          {selectedProduct && <Box sx={{ marginTop: 10 }}>
            <p>{`Mileage:  ${selectedProduct.mileage ?? 'N/A'}`}</p>
            <p>{`Need repair:  ${selectedProduct.needing_repair}`}</p>
          </Box> 
          }
          <Box sx={{ marginTop: 10 }}>
            <p>Date Time Range</p>
            <DateRangePicker appearance="default" placeholder="Select range" onChange={(val) => handleDates(val)}/>
          </Box>

          {isInvalidBook() && <Alert sx={{ marginTop: 2 }} severity="warning">The minimun rental period for this product is {selectedProduct.minimum_rent_period} days</Alert>}

          <ConfirmBookModal handleCloseParent={onCloseModal} product={selectedProduct} dateRange={dates}/>
        </Box>
      </Modal>
    </div>
  );
}
