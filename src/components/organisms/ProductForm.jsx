import { Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import '../../styles/organisms/ProductForm.css';

function ProductForm({ product, setProduct, handleSubmit }) {
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
        required
      />

      <Form.Group className="mb-3">
        <Form.Label>Descripción detallada</Form.Label>
        <Input
          as="textarea"
          rows={5}
          name="longDescription"
          value={product.longDescription ?? ''}
          onChange={handleChange}
          placeholder="Ingrese una descripción completa del SCP"
          required
        />
      </Form.Group>

      <FormField
        label="Precio"
        type="number"
        name="price"
        min="1"
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

      <FormField
        label="URL de la imagen"
        name="image"
        value={product.image}
        onChange={handleChange}
        required
      />

      <Button type="submit">
        Guardar SCP
      </Button>
    </Form>
  );
}

export default ProductForm;