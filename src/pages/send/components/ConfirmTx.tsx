import { LoadingButton } from "@src/components/common";
import { cropAccount } from "@src/utils/account-utils";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Tx } from "../Send";
import { useAccountContext } from "../../../providers/accountProvider/AccountProvider";
import { useNetworkContext } from "../../../providers/networkProvider/NetworkProvider";

interface ConfirmTxProps {
  tx: Tx;
  onConfirm: () => void;
  isLoading: boolean;
}

export const ConfirmTx: FC<ConfirmTxProps> = ({ tx, onConfirm, isLoading }) => {
  const {
    state: { selectedChain },
  } = useNetworkContext();
  const {
    state: { selectedAccount },
  } = useAccountContext();
  const navigate = useNavigate();
  const { t } = useTranslation("send");

  const { getValues } = useFormContext();

  const amount = getValues("amount");

  const destinationAccount = getValues("destinationAccount");
  const originAccount = getValues("from");

  const originChainName = originAccount.name;
  const destinationChainName = originAccount.name;

  const originCurrencyName = originAccount.nativeCurrency.name;
  const destinationCurrencyName = originAccount.nativeCurrency.name;

  const originCurrencySymbol = originAccount.nativeCurrency.symbol;
  const destinationCurrencySymbol = originAccount.nativeCurrency.symbol;

  return (
    <div className="mx-auto px-2">
      <div className="flex gap-3 items-center mb-7">
        <BiLeftArrowAlt
          size={26}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <p className="text-xl">{t("title")}</p>
      </div>
      <div className="mb-5">
        <p className="mb-2">Chains:</p>
        <div className="flex justify-around items-center bg-[#212529] rounded-xl py-3 px-5">
          <div className="flex flex-col">
            <p>{originChainName}</p>
            <p>{cropAccount(selectedAccount.value.address || "")}</p>
          </div>
          <div className="flex gap-1">
            <FaChevronLeft />
            <FaChevronRight />
          </div>
          <div className="flex flex-col">
            <p>{destinationChainName}</p>
            <p>{cropAccount(destinationAccount)}</p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <p>Assets:</p>
        <div className="flex justify-around items-center bg-[#343A40] rounded-xl py-3 px-5">
          <div className="flex flex-col">
            <p>{originCurrencyName}</p>
            <p>
              <span>{amount}</span> {originCurrencySymbol}
            </p>
          </div>
          <div className="flex gap-1">
            <FaChevronLeft />
            <FaChevronRight />
          </div>
          <div className="flex flex-col">
            <p>{destinationCurrencyName}</p>
            <p>
              <span>{amount}</span> {destinationCurrencySymbol}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <p>details:</p>
        <div className="flex bg-[#343A40] rounded-xl py-3 px-5">
          <p>Timestamp: Aug-08-2022 10:25:29 PM +UTC</p>
        </div>
      </div>
      <LoadingButton
        classname="font-medium text-base bg-custom-green-bg w-full py-2 md:py-4 rounded-md"
        onClick={onConfirm}
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {t("confirm")}
      </LoadingButton>
    </div>
  );
};
