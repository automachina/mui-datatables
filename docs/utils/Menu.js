import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

const styles = (theme) => ({
  list: {
    width: 250,
  },
  listTitle: {
    fontSize: 25,
  },
});

const sandboxes = [
  { name: 'Custom Component', href: 'https://codesandbox.io/embed/xrvrzryjvp?autoresize=1&hidenavigation=1' },
  { name: 'Customize Columns', href: 'https://codesandbox.io/embed/xowj5oj8w?autoresize=1&hidenavigation=1' },
  { name: 'Customize Footer', href: 'https://codesandbox.io/embed/5z0w0w9jyk?autoresize=1&hidenavigation=1' },
  { name: 'Customize Styling', href: 'https://codesandbox.io/embed/0ylq1lqwp0?autoresize=1&hidenavigation=1' },
  { name: 'Customize Toolbar', href: 'https://codesandbox.io/embed/wy2rl1nyzl?autoresize=1&hidenavigation=1' },
  { name: 'Customize ToolbarSelect', href: 'https://codesandbox.io/embed/545ym5ov6p?autoresize=1&hidenavigation=1' },
  { name: 'Resizable Columns', href: 'https://codesandbox.io/embed/q8w3230qpj?autoresize=1&hidenavigation=1' },
];

const SandboxItem = (props) => (
  <ListItem button>
    <ListItemText onClick={() => window.open(props.href, '_blank')} primary={props.name} />
  </ListItem>
);

SandboxItem.propTypes = {
  href: PropTypes.string,
  name: PropTypes.string,
};

class Menu extends React.Component {
  render() {
    const { isOpen, toggle, classes } = this.props;
    return (
      <Drawer open={isOpen} onClose={toggle}>
        <div tabIndex={0} role="button" onClick={toggle} onKeyDown={toggle} className={classes.list}>
          <List
            component="nav"
            subheader={
              <ListSubheader className={classes.listTitle} component="h2">
                Examples
              </ListSubheader>
            }>
            {sandboxes.map((item) => (
              <SandboxItem href={item.href} name={item.name} />
            ))}
          </List>
        </div>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
