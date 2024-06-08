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
import { truncateEthAddress } from "@/utils/truncateEthAddress";

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
      <UserInfo
        username={
          accountData?.user.name
            ? accountData.user.name
            : truncateEthAddress(accountData?.user.address)
        }
        level={accountData?.user.gas_rate_lvl as number}
        src={
          accountData?.user.image_path
            ? accountData.user.image_path
            : "https://avatars.githubusercontent.com/u/84640980?v=4"
        }
      />
      <div className={styles.reward}>
        {accountData && <h2>{accountData.user.gas_price.toFixed(2)} GXP</h2>}
        <div>
          <p>EVERY HOUR</p>
          <Modal
            header={<ModalHeader />}
            trigger={
              <IconButton mode="bezeled" size="s">
                <Svg src="/icons/info.svg" className="icon" />
              </IconButton>
            }
          >
            <div className={styles.modalContent}>
              <h4>Mining Rules</h4>
              <ul>
                <li>User can recieve rewards once every 6 hours</li>
                <li>
                  The mining process will automatically stop if users do not
                  receive rewards within 24 hours
                </li>
              </ul>
              <ModalClose>
                <Button style={{ width: "100%" }} size="m" mode="bezeled">
                  Got it
                </Button>
              </ModalClose>
            </div>
          </Modal>
        </div>
      </div>
      <Mine
        gemInSecond={Number(accountData?.user.mint_gxp_per_second)}
        lastClaim={lastClaimData?.last_claim as Date}
        address={String(accountData?.user.address)}
        isLoading={lastClaimLoading}
        gasPower={accountData?.user.gas_power as number}
      />
    </div>
  );
};
