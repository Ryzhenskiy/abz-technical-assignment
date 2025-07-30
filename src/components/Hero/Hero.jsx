import styles from './Hero.module.scss';
import heroBg from '../../assets/hero-bg.jpg';
import '../../styles/base.scss';

const Hero = () => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of user design
            thinking. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button className="btn">Sign up</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
