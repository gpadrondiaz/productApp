import React, {useState } from "react";
import { 
  Box,
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField
} from '@material-ui/core';
import { style } from './ModalStyles'
import ConfirmModal from './ConfirmModal'
import ModalTitle from './ModalTitle'

function ConfirmReturnModal({handleCloseParent, product}) {
  // since did't find how to calculate final price, just showing product price
  return (
    <ConfirmModal handleCloseParent={handleCloseParent} title="Return a product" subtitle={`Your final price is $${product.price}`} isYesDisabled={!product}/>
  );
}

export default function ReturnModal({showModal, handleClose, products}) {

  const [product, setProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleProductSelection = (val) => {
    const productCode = val.target.value;
    const product = products.filter((prod) => prod.code === productCode)[0];
    setProduct(productCode);
    setSelectedProduct(product)
  }

  const onCloseModal = () => {
    setProduct('');
    setSelectedProduct('');
    handleClose();
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
          <ModalTitle title="Return a product"/>
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
          <TextField id="used-mileage" label="Used mileage" variant="standard" />
          <ConfirmReturnModal handleCloseParent={onCloseModal} product={selectedProduct}/>
        </Box>
      </Modal>
    </div>
  );
}
