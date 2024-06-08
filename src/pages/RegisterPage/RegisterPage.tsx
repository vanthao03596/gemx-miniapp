import { CustomHeader } from "@/components/CustomHeader";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Icon24Close } from "@/icon/icon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Input,
  List,
  Tappable,
  Text,
} from "@telegram-apps/telegram-ui";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const axiosAuth = useAxiosAuth();

  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  const updateUser = async (address: string) => {
    const res = await axiosAuth.post<{user: {
        id:                  number;
        name:                string | null;
        email:               string | null;
        email_verified_at:   string | null;
        created_at:          string;
        updated_at:          string;
        type:                string;
        address:             string;
        ref_address:         string | null;
        image_path:          string | null;
        is_vip:              number;
        follower:            number;
        following:           number;
        can_create_report:   number;
        invite_earned:       number;
        telegram_id:         number;
        telegram_username:   string;
        nonce:               string | null;
        gas_power:           number;
        gas_rate_lvl:        number;
        last_claim_gxp:      string | null;
        gas_price:           number;
        mint_gxp_per_second: number;
    }}>("/user/info", { address });
    return res.data;
  };

  const queyrClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-user"],
    mutationFn: updateUser,
    onSuccess: async (data) => {
        queyrClient.setQueryData(['get-user'], data.user)
    //   await queyrClient.invalidateQueries({ queryKey: ["get-user"] });
      setTimeout(() => {
        navigate("/");
      }, 200)
     
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    },
  });

  const handleUpdateUser = async () => {
    mutation.mutate(address);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setError("");
  };

  const handleClearAddress = () => {
    setAddress("");
    setError("");
  };

  return (
    <div className={styles.container}>
      <CustomHeader title="Let's start" />
      <List>
        <Input
          status={error ? "error" : "focused"}
          header="Wallet Address"
          placeholder={error ? error : "0x . . ."}
          value={address}
          onChange={handleChangeAddress}
          after={
            <Tappable
              Component="div"
              style={{
                display: "flex",
              }}
              onClick={handleClearAddress}
            >
              <Icon24Close />
            </Tappable>
          }
        />
        {error && <Text className={styles.error}>{error}</Text>}
      </List>

      <div className={`${styles.submit} ${styles.center}`}>
        <Button
          loading={mutation.isPending}
          disabled={!address}
          onClick={handleUpdateUser}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
