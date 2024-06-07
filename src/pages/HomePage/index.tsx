import { Mine } from "@/components/Mine";
import { UserInfo } from "@/components/UserInfo";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import Svg from "@/icon/svg";
import { LastClaimData, User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Button, IconButton, Modal } from "@telegram-apps/telegram-ui";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import styles from "./homePage.module.scss";

type Response<T> = {
  user: T;
};

export const HomePage = (): JSX.Element => {
  const axiosAuth = useAxiosAuth();

  const fetchLastClaim = async () => {
    const { data } = await axiosAuth.get<LastClaimData>("/last-claim-reward");
    return data;
  };

  const fetchAccount = async () => {
    const { data } = await axiosAuth.get<Response<User>>("/user/info");
    return data;
  };

  const { data: lastClaimData } = useQuery({
    queryKey: ["last-claim"],
    queryFn: () => fetchLastClaim(),
  });

  const { data: accountData, isLoading: lastClaimLoading } = useQuery({
    queryKey: ["account"],
    queryFn: () => fetchAccount(),
  });

  return (
    <div className={styles.homePage}>
      <UserInfo username="Hung nguyen" level={1} />
      <div className={styles.reward}>
        {accountData && <h2>{accountData.user.gas_rate_lvl.toFixed(2)} GEM</h2>}
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
      {/* {lastClaimData && (
        
      )} */}
      <Mine
        gemInSecond={Number(accountData?.user.mint_gxp_per_second)}
        lastClaim={lastClaimData?.last_claim as Date}
        address={String(accountData?.user.address)}
        isLoading={lastClaimLoading}
      />
    </div>
  );
};
