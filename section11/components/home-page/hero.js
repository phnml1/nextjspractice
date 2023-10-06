import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return(
  <section className={classes.hero}>
    <div className={classes.image}>
      <Image
        src="/images/site/jy.jpg"
        alt="An image showing Me"
        width={300}
        height={300}
      />
    </div>
    <h1>HI I'm JY</h1>
    <p>I blog about web development</p>
  </section>);
}
export default Hero;
