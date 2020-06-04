import React from 'react';
import Logo from './Logo';
import NavigationItems from './NavigationItems';
import classes from './Sidedrawer.module.css'

const Sidedrawer = (props) => {
  return (
    <div className={classes.Sidedrawer}>
      <Logo height="11%"/>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
}

export default Sidedrawer;