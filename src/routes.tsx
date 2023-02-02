import { AddAccount } from "./components/addAccount";
import { Balance } from "./components/balance";
import { Home } from "./components/home";
import { MemoryRouter, Route, Routes as RRoutes } from "react-router-dom";
import { Accounts } from "./components/accounts";
import { useEffect, useState } from "react";
import { useAuthContext } from "./providers/AuthProvider";
import { SignIn } from "./components/signIn";
import { Decrypt } from "./components/decrypt";
import {
  Advanced,
  BugReport,
  Contacts,
  General,
  Security,
} from "./components/settings";
import Extension from "./utils/Extension";
import { AccountForm } from "./components/accountForm/AccountForm";

export const Routes = () => {
  const {
    state: { isInit },
    createAccount,
    importAccount,
    deriveAccount,
  } = useAuthContext();

  const [homeRoute, setHomeRoute] = useState(<p>Loading...</p>);
  const [canDerive, setCanDerive] = useState(false);
  const [importIsSignUp, setImportIsSignUp] = useState(true);

  const getWalletStatus = async () => {
    setCanDerive(await Extension.areKeyringsInitialized());
    setImportIsSignUp(!await Extension.isVaultInitialized());
  };
  useEffect(() => {
    const getHomeRoute = async () => {
      const isFirstTime = !localStorage.getItem("welcome");
      if (isFirstTime) {
        setHomeRoute(<Home />);
        return;
      }
      const isVaultInitialized = await Extension.isVaultInitialized();
      if (!isVaultInitialized) {
        setHomeRoute(<AddAccount />);
        return;
      }
      const isUnlocked = await Extension.isUnlocked();
      if (!isUnlocked) {
        setHomeRoute(<SignIn />);
        return;
      }
      setHomeRoute(<Balance />);
    };
    getHomeRoute();
    getWalletStatus();
  }, [Extension, isInit]);

  return (
    <MemoryRouter>
      <RRoutes>
        <Route path="/" element={homeRoute} />
        <Route path="/account" element={<Accounts />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/import-account"
          element={
            <AccountForm
              title="Import Account"
              onSubmitFn={importAccount}
              buttonText="Import"
              signUp={importIsSignUp}
              fields={{
                privateKeyOrSeed: true,
                accountType: true,
              }}
              afterSubmitMessage="Account imported"
              goAfterSubmit="/balance"
              backButton
              callback={getWalletStatus}
            />
          }
        />
        <Route
          path="/create-account"
          element={
            <AccountForm
              title="Create Account"
              onSubmitFn={createAccount}
              buttonText="Create"
              signUp={true}
              fields={{}}
              afterSubmitMessage="Account created"
              goAfterSubmit="/balance"
              backButton
              generateSeed
              callback={getWalletStatus}
            />
          }
        />
        <Route
          path="/derive-account"
          element={
            !canDerive ? (
              <AccountForm
                title="Create Account"
                onSubmitFn={createAccount}
                buttonText="Create"
                fields={{}}
                signUp={false}
                afterSubmitMessage="Account created"
                goAfterSubmit="/balance"
                backButton
                generateSeed
                callback={getWalletStatus}
              />
            ) : (
              <AccountForm
                title="Create Account"
                onSubmitFn={deriveAccount}
                signUp={false}
                buttonText="Create"
                fields={{ accountType: true }}
                afterSubmitMessage="Account created"
                goAfterSubmit="/balance"
                backButton
              />
            )
          }
        />

        {/* setting views */}
        <Route path="/settings-general" element={<General />} />
        <Route path="/settings-advanced" element={<Advanced />} />
        <Route path="/settings-contacts" element={<Contacts />} />
        <Route path="/settings-security" element={<Security />} />
        <Route path="/settings-bug" element={<BugReport />} />

        {/* TODO: remove, only for developmet */}
        <Route path="/decrypt" element={<Decrypt />} />
      </RRoutes>
    </MemoryRouter>
  );
};
