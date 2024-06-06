import { UserInfo } from "@/components/UserInfo";
import Svg from "@/icon/svg";
import { Button, IconButton, Modal } from "@telegram-apps/telegram-ui";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import styles from "./homePage.module.scss";
import { Mine } from "@/components/Mine";

export const HomePage = (): JSX.Element => {
  return (
    <div className={styles.homePage}>
      <UserInfo username="Hung nguyen" level={1} />
      <div className={styles.reward}>
        <h2>1. 00 GEM</h2>
        <div>
          <p>MỖI GIỜ</p>
          <Modal
            header={<ModalHeader />}
            trigger={
              <IconButton mode="bezeled" size="s">
                <Svg src="/icons/info.svg" className="icon" />
              </IconButton>
            }
          >
            <div className={styles.modalContent}>
              <h4>Quy tắc khai thác</h4>
              <ul>
                <li>Người dùng có thể nhận thưởng mỗi 12 giờ một lần</li>
                <li>
                  Quá trình khai thác sẽ tự động dừng nếu trong vòng 24h người
                  dùng không nhận thưởng
                </li>
              </ul>
              <ModalClose>
                <Button style={{ width: "100%" }} size="m" mode="bezeled">
                  Đã hiểu
                </Button>
              </ModalClose>
            </div>
          </Modal>
        </div>
      </div>
      <Mine gemInHour={1} />
    </div>
  );
};
