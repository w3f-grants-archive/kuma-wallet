import { AddAccount } from "./components/addAccount";
import { Balance } from "./components/balance";
import { Home } from "./components/home";
import { MemoryRouter, Route, Routes as RRoutes } from "react-router-dom";
import { CreateAccount } from "./components/createAccount";

import { FullScreenFAB } from "./components/common/FullScreenFAB";
import { Accounts } from "./components/accounts";
import { ImportAccount } from "./components/importAccount/ImportAccount";
import { useAccountContext } from "./providers/AccountProvider";
import { useMemo } from "react";

export const Routes = () => {
  const {
    state: { accounts, isLoadingAccounts },
  } = useAccountContext();

  const homeRoute = useMemo(() => {
    const isFirstTime = !localStorage.getItem("welcome");

    if (isFirstTime) {
      return <Home />;
    }
    const haveAccounts = accounts.length > 0;

    if (!haveAccounts) {
      return <AddAccount />;
    }

    return <Balance />;
  }, [accounts, isLoadingAccounts]);

  if (isLoadingAccounts) return <p>loading...</p>;

  return (
    <MemoryRouter>
      <RRoutes>
        <Route path="/" element={homeRoute} />
        <Route path="/account" element={<Accounts />} />
        <Route path="/import-account" element={<ImportAccount />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/balance" element={<Balance />} />
      </RRoutes>
      <FullScreenFAB />
    </MemoryRouter>
  );
};
