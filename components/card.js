import Link from "next/link";
import Image from "next/image";
import cls from "classnames";
import styles from "./card.module.css";

const Card = ({ latestRepo }) => {
  return (
    <Link href={`${latestRepo.url}`}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{latestRepo.name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={latestRepo.openGraphImageUrl}
              width={260}
              height={160}
            />
          </div>
          <a
            href={latestRepo.url}
            className="font-semibold group flex flex-row space-x-2 w-full items-center"
          >
            <p>View Repository </p>
            <div className="transform  group-hover:translate-x-2 transition duration-300">
              &rarr;
            </div>
          </a>
        </div>
      </a>
    </Link>
  );
};

export default Card;
