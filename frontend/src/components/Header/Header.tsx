import React from 'react';
import styles from './Header.module.css';
import Text from '../Text/Text';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Text className={styles.logo} content={"OS ANÉIS DO PODER"} color={"#fff"} size={"extra-large"} bold={true}/>
    </header>
  );
};

export default Header;