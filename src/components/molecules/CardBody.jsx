import Text from '../atoms/Text';

function CardBody({ title, description, price, stock, variant = 'h5' }) {
  return (
    <>
      <Text variant={variant}>{title}</Text>
      <Text variant="p">{description}</Text>
      <Text variant="span" className="text-muted">${price}</Text>
      <Text variant="p">Stock disponible: {stock ?? 0}</Text>
    </>
  );
}

export default CardBody;