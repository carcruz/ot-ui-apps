import { Link } from "ui";

function Description({ symbol }) {
  return (
    <>
      Annotations for <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.uniprot.org/">
        UniProt
      </Link>
      .
    </>
  );
}

export default Description;
