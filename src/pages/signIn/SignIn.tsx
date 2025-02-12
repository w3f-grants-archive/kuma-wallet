import { FC, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Extension from "@src/Extension";
import { useToast } from "@src/hooks";
import { BALANCE, RESTORE_PASSWORD } from "@src/routes/paths";
import logo from "/logo.svg";
import { useTranslation } from "react-i18next";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { captureError } from "@src/utils/error-handling";
import { Button, PageWrapper } from "@src/components/common";

interface SignInProps {
  afterSignIn?: () => void;
}

export const SignIn: FC<SignInProps> = ({ afterSignIn }) => {
  const { t } = useTranslation("sign_in");
  const { t: tCommon } = useTranslation("common");

  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const [password, setPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const isValid = useMemo(() => {
    return password && password.length >= 8;
  }, [password]);

  const signIn = async () => {
    try {
      await Extension?.signIn(password);
      if (afterSignIn) {
        afterSignIn();
        return;
      }
      navigate(BALANCE);
    } catch (error) {
      captureError(error);
      showErrorToast(tCommon(error as string));
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col">
        <img src={logo} className="mx-auto mt-20 mb-5 w-36 md:w-40" />
        <p className="text-center text-xl mb-6">{t("welcome")}</p>
        <div className="relative mb-10">
          <input
            id="password"
            min={8}
            placeholder={t("password_placeholder") as string}
            onPaste={(e) => e.preventDefault()}
            type={passwordType}
            value={password}
            className="input-primary"
            onChange={({ target }) => setPassword(target.value)}
            onKeyDown={({ key }) => key === "Enter" && signIn()}
          />

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-50"
            onClick={togglePassword}
          >
            {passwordType === "password" ? (
              <BsEyeSlash className="cursor-pointer" size={20} />
            ) : (
              <BsEye className="cursor-pointer" size={20} />
            )}
          </button>
        </div>

        <div className="flex">
          <Button
            classname="font-medium text-base max-w-md  w-full py-2 md:py-4 mx-auto"
            aria-disabled={!isValid}
            isDisabled={!isValid}
            onClick={signIn}
          >
            {t("signin_button_text")}
          </Button>
        </div>
        <p
          className="text-center mb-6"
          onClick={() => navigate(RESTORE_PASSWORD)}
        >
          {t("forgot_password")}
        </p>
      </div>
    </PageWrapper>
  );
};
