import { MaterialSymbolsLightArrowBackIosNewRounded } from "@/icon/icon";
import { IconButton } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";
import styles from "./CustomHeader.module.scss";

interface CustomHeaderProps {
  title: string;
  hasBack?: boolean;
}

const CustomHeader = (props: CustomHeaderProps) => {
  const { title, hasBack = false } = props;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.title}>
      {/* Back */}
      {hasBack && (
        <IconButton
          mode="bezeled"
          size="m"
          onClick={handleBack}
          className={styles.icon}
        >
          <MaterialSymbolsLightArrowBackIosNewRounded />
        </IconButton>
      )}

      {/* Title */}
      <p className={styles.heading}>{title}</p>
    </div>
  );
};

export default CustomHeader;
