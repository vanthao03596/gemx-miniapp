import { ResearchCoin } from "@/lib/types";
import stripTag from "@/utils/stripTag";
import { Link } from "react-router-dom";
import dayjs from "../../lib/dayjs";
import styles from "./researchCard.module.scss";

export const ResearchCard = ({
  src,
  title,
  created,
  desc,
  slug,
  ava,
  name,
  assets,
}: {
  src: string;
  title: string;
  created: Date;
  desc: string;
  slug: string;
  ava: string;
  name: string;
  assets: ResearchCoin[];
}) => {
  const time = dayjs.utc(created).fromNow();

  return (
    <Link
      to={`https://gemx.io/research/${slug}`}
      className={styles.researchCardContainer}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.researchCardContent}>
        <div className={styles.imageContainer}>
          <img src={src} alt="research-card" />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.authorContainer}>
            <div className={styles.author}>
              <div>
                <img src={ava} alt="author-ava" />
              </div>
              <p>{name}</p>
            </div>
            <div className={styles.coin}>
              {assets.map(({ coin }) => (
                <div key={coin.id}>
                  <img src={coin.logo} alt="coin-img" />
                </div>
              ))}
            </div>
          </div>
          <p className={[styles.title, "line-clamp"].join(" ")}>{title}</p>
          <p className={[styles.desc, "line-clamp"].join(" ")}>
            {stripTag(desc)}
          </p>
          <p className={styles.time}>{time}</p>
        </div>
      </div>
    </Link>
  );
};
