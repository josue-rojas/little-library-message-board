import React from 'react';
import Button from '../../components/Button'
import styles from './styles.module.css';

const Text = () => {
  return <>
    <strong>
    Howdy! Welcome to Pelham Parkway's Little Library Message Board.
    </strong>
    <br />
    This is a digital message board for those visiting our community's little library.
    <br />
    Leave a message for others to see, say hi, or any message for our community. 
  </>
}
const About = () => {
  // TODO: create real link buttons to use browser's default routing
  const onClickLink = (href) => {
    window.location = href;
  }

  return <div className={styles.main}>
    <Text />
    <div className={styles.buttonWrapper}>
      <Button appearance="primary" onClick={() => onClickLink('/new')}>New Message</Button>
    </div>
    <div>
      <Button appearance="primary" intent="warning" onClick={() => onClickLink("https://www.notion.so/Pelham-Parkway-s-Little-Library-95974c50a3b84027a98aeeeb3ca62f82")}>
        More info
      </Button>

    </div>
  </div>
};

export default About;