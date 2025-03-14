import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';
import { useTheme, withStyles } from '@mui/styles';
import ExamplesGrid from './ExamplesGrid';
import examples from '../examples';
import Button from '@mui/material/Button';
import { withRouter } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
  },
};

class Examples extends React.Component {
  returnHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;

    var returnHomeStyle = { padding: '0px', margin: '20px 0 20px 0' };

    return (
      <main className={classes.root}>
        <div className={classes.contentWrapper}>
          <Switch>
            <Route path="/" exact render={() => <ExamplesGrid examples={examples} />} />
            {Object.keys(examples).map((label, index) => (
              <Route
                key={index}
                path={`/${label.replace(/\s+/g, '-').toLowerCase()}`}
                exact
                component={examples[label]}
              />
            ))}
          </Switch>
          <div>
            {this.props.location.pathname !== '/' && (
              <div style={returnHomeStyle}>
                <Button color="primary" onClick={this.returnHome}>
                  Back to Example Index
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

const StyledExamples = withRouter(withStyles(styles)(Examples));

function App() {
  const theme = useTheme() ?? createTheme();
  return (
    <Router hashType="noslash">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <StyledExamples />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app-root'));
