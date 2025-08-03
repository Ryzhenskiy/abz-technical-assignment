import styles from './Hero.module.scss';
import heroBg from '../../assets/hero-bg.jpg';
import '../../styles/base.scss';
import CustomButton from '../CustomButton/CustomButton';
import Text from '../Text/Text';
import Heading from '../Heading/Heading';

const Hero = () => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <Heading>Test assignment for front-end developer</Heading>
          <Text>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of user design
            thinking. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </Text>
          <CustomButton>Sign up</CustomButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
