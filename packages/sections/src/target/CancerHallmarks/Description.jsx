import { Link } from "ui";

function Description({ symbol }) {
  return (
    <>
      Role of <strong>{symbol}</strong> in essential alterations in cell
      physiology that dictate malignant growth. Source:{' '}
      <Link external to="https://cancer.sanger.ac.uk/cosmic">
        COSMIC
      </Link>
      .
    </>
  );
}

export default Description;
