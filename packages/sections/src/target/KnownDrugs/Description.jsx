import { Link } from "ui";

function Description({ symbol }) {
  return (
    <>
      Clinical precedence for drugs with investigational or approved indications
      targeting <strong>{symbol}</strong> according to their curated mechanism
      of action. Source:{' '}
      <Link external to="https://www.ebi.ac.uk/chembl/">
        ChEMBL
      </Link>
      .
    </>
  );
}

export default Description;
