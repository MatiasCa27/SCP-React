import { Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import '../../styles/organisms/ProductForm.css';

function ProductForm({ product, setProduct, handleSubmit, submitting = false }) {
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="scp-product-form">
      <FormField
        label="Nombre del SCP"
        name="name"
        value={product.name}
        onChange={handleChange}
        required
      />

      <FormField
        label="Descripción corta"
        name="description"
        value={product.description}
        onChange={handleChange}
        maxLength={500}
        required
      />

      <FormField
        label="Categoría"
        name="category"
        value={product.category}
        onChange={handleChange}
        required
      />

      <FormField
        label="Precio"
        type="number"
        name="price"
        min="0"
        value={product.price}
        onChange={handleChange}
        required
      />

      <FormField
        label="Stock inicial"
        type="number"
        name="stock"
        min="0"
        value={product.stock}
        onChange={handleChange}
        required
      />

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Guardando...' : 'Guardar SCP'}
      </Button>
    </Form>
  );
}

export default ProductForm;