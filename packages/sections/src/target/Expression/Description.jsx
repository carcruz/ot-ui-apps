import { Link } from "ui";

function Description({ symbol }) {
  return (
    <>
      RNA and protein baseline expression for <strong>{symbol}</strong>. Source:{' '}
      <Link external to="https://www.ebi.ac.uk/gxa/home">
        ExpressionAtlas
      </Link>
      ,{' '}
      <Link external to="https://www.proteinatlas.org/">
        HPA
      </Link>{' '}
      and{' '}
      <Link external to="https://www.gtexportal.org/home/">
        GTEx
      </Link>
      .
    </>
  );
}

export default Description;
