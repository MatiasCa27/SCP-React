import Button from '../atoms/Button';

function StockControls({ stock, aumentar, disminuir }) {
  return (
    <div className="d-flex align-items-center gap-2">
      <Button variant="danger" onClick={disminuir} disabled={stock <= 0}>
        -
      </Button>
      <span>{stock}</span>
      <Button variant="success" onClick={aumentar}>
        +
      </Button>
    </div>
  );
}

export default StockControls;