import { Link } from "ui";

function Description({ symbol, name }) {
  return (
    <>
      Literature-curated list of pathway reactions affected by genetic
      alterations or changes in gene expression that lead to disregulation of{' '}
      <strong>{symbol}</strong> in the context of <strong>{name}</strong>.
      Source:&nbsp;
      <Link to="https://reactome.org" external>
        Reactome
      </Link>
    </>
  );
}

export default Description;
