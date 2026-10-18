import Text from '../atoms/Text';

function CardBody({ title, description, price, variant = 'h5' }) {
  return (
    <>
      <Text variant={variant}>{title}</Text>
      <Text variant="p">{description}</Text>
      <Text variant="span" className="text-muted">${price}</Text>
    </>
  );
}

export default CardBody;