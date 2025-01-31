import { SummaryItem, usePlatformApi } from 'ui';

import { definition } from '.';
import MECHANISM_OF_ACTION_SUMMARY_FRAGMENT from './MechanismsOfActionSummaryFragment.gql';

function Summary() {
  const request = usePlatformApi(MECHANISM_OF_ACTION_SUMMARY_FRAGMENT);

  return (
    <SummaryItem
      definition={definition}
      request={request}
      renderSummary={data => (
        <>
          {data.mechanismsOfAction.uniqueActionTypes.length > 0
            ? data.mechanismsOfAction.uniqueActionTypes.join(' • ')
            : null}
          <br />
          {data.mechanismsOfAction.uniqueTargetTypes.length > 0
            ? data.mechanismsOfAction.uniqueTargetTypes.join(' • ')
            : null}
        </>
      )}
    />
  );
}

Summary.fragments = {
  MechanismsOfActionSummaryFragment: MECHANISM_OF_ACTION_SUMMARY_FRAGMENT,
};

export default Summary;
