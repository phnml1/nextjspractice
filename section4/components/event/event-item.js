import Image from 'next/image';

import classes from "./event-item.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
function EventItem(props) {
  const { title, image, date, location, id } = props;
  const humanReadalbeDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      {/* 이미지 최적화 */}
      <Image src={"/" + image} alt={title} width={250} height={160}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadalbeDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{location}</address>
          </div>
        </div>
        <div>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
export default EventItem;
