import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import getPageContext from './getPageContext';

function withRoot(Component) {
  class WithRoot extends React.Component {
    UNSAFE_componentWillMount() {
      this.pageContext = this.props.pageContext || getPageContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    pageContext = null;

    render() {
      // MuiThemeProvider makes the theme available down the React tree thanks to React context.
      const { theme } = this.pageContext;
      return (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme} sheetsManager={this.pageContext.sheetsManager}>
            <Component {...this.props} />
          </ThemeProvider>
        </StyledEngineProvider>
      );
    }
  }

  WithRoot.propTypes = {
    pageContext: PropTypes.object,
  };

  WithRoot.getInitialProps = (ctx) => {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }

    return {};
  };

  return WithRoot;
}

export default withRoot;
