import {
  Popover,
  FormGroup,
  Button,
  FormControlLabel,
  Checkbox,
  Drawer,
} from '@material-ui/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@material-ui/styles';

import { useState } from 'react';

const TextContent = styled('div')({
  marginLeft: '5px',
});

const PopoverContent = styled('div')({
  padding: '15px',
});

const ControllsContainer = styled('div')({
  margin: '40px',
  minWidth: '400px',
});

const VizControllsContainer = styled('div')({
  marginTop: '20px',
});

function DataMenu({
  enableIndirect,
  setEnableIndirect,
  activeWeightsControlls,
  setActiveWeightsControlls,
  vizControllsopen,
  setVizControllsOpen,
  gScoreRect,
  setGScoreRect,
  scoreRect,
  setScoreRect,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        disableElevation
      >
        <FontAwesomeIcon icon={faGear} size="lg" />
        <TextContent>Advance options</TextContent>
      </Button>
      <Popover
        id={id}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <PopoverContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={enableIndirect}
                  onChange={() => setEnableIndirect(!enableIndirect)}
                />
              }
              label="Enable Indirect"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={activeWeightsControlls}
                  onChange={() =>
                    setActiveWeightsControlls(!activeWeightsControlls)
                  }
                />
              }
              label="Show weights controlls"
            />
          </FormGroup>
          {/* Viz controlls */}
          <VizControllsContainer>
            <Button
              variant="contained"
              onClick={() => setVizControllsOpen(true)}
              disableElevation
            >
              Open Viz controlls
            </Button>
          </VizControllsContainer>
          <Drawer
            anchor="right"
            open={vizControllsopen}
            onClose={() => setVizControllsOpen(false)}
          >
            <ControllsContainer>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gScoreRect}
                      onChange={() => setGScoreRect(!gScoreRect)}
                      color="primary"
                    />
                  }
                  label="Global score rect"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={scoreRect}
                      onChange={() => setScoreRect(!scoreRect)}
                      color="primary"
                    />
                  }
                  label="Score rect"
                />
              </FormGroup>
            </ControllsContainer>
          </Drawer>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DataMenu;
