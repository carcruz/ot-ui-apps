import { useState, useEffect } from 'react';
import { Grid, Typography, withStyles } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna, faStethoscope } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
  container: {
    backgroundColor: theme.palette.grey[300],
    height: '205px',
  },
  title: {
    fontWeight: 600,
  },
  icon: {
    fill: theme.palette.grey[700],
    height: '56px',
  },
});

function Stats({ classes }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    // TODO: design GraphQL schema from stats and get this data from the
    // GraphQL API
    fetch('https://platform-api.opentargets.io/v3/platform/public/utils/stats')
      .then(res => res.json())
      .then(data => {
        if (isCurrent) {
          const numDataSources = Object.values(
            data.associations.datatypes
          ).reduce(
            (acc, current) => acc + Object.keys(current.datasources).length,
            0
          );

          setStats({
            numTargets: data.targets.total,
            numDiseases: data.diseases.total,
            numAssociations: data.associations.total,
            numDataSources,
          });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <Grid className={classes.container} container justifyContent="center">
      <Grid
        item
        container
        direction="column"
        md={7}
        justifyContent="space-around"
      >
        <Typography className={classes.title} variant="h5" align="center">
          Platform Stats
        </Typography>
        <Typography align="center" variant="subtitle1">
          Data last updated September 2019
        </Typography>
        {stats && (
          <Grid container justifyContent="space-around">
            <Grid item container md={3} direction="column" alignItems="center">
              <FontAwesomeIcon icon={faDna} className={classes.icon} />
              <Typography variant="h6">
                {stats.numTargets.toLocaleString()}
              </Typography>
              <Typography> targets</Typography>
            </Grid>
            <Grid item container md={3} direction="column" alignItems="center">
              <FontAwesomeIcon icon={faStethoscope} className={classes.icon} />
              <Typography variant="h6">
                {stats.numDiseases.toLocaleString()}
              </Typography>
              <Typography>diseases</Typography>
            </Grid>
            <Grid item container md={3} direction="column" alignItems="center">
              <Typography variant="h6">
                {stats.numAssociations.toLocaleString()}
              </Typography>
              <Typography>associations</Typography>
            </Grid>
            <Grid item container md={3} direction="column" alignItems="center">
              <Typography variant="h6">
                {stats.numDataSources.toLocaleString()}
              </Typography>
              <Typography>data sources</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

// export default withStyles(styles)(Stats);
export default Stats;
