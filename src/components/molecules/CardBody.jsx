import Text from '../atoms/Text';
import '../../styles/molecules/CardBody.css';

function CardBody({ title, description, price, stock, variant = 'h5' }) {
  return (
    <div className="scp-card-body">
      <Text variant={variant}>{title}</Text>

      <Text variant="p">{description}</Text>

      <Text variant="p" className="scp-price">
        ${price}
      </Text>

      <Text variant="p">
        Stock disponible: {stock ?? 0}
      </Text>
    </div>
  );
}

export default CardBody;