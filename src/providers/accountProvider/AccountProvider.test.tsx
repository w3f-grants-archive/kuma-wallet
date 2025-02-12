import { CHAINS } from "@src/constants/chains";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { AccountProvider, useAccountContext, reducer } from "./AccountProvider";
import { selectedEVMAccountMock } from "../../tests/mocks/account-mocks";
import Account from "@src/storage/entities/Account";
import { I18nextProvider } from "react-i18next";
import i18n from "@src/utils/i18n";
import { AccountFormType } from "@src/pages";
import { InitialState } from "./types";

const testIds = {
  createAccount: "create-account",
  deriveAccount: "derive-account",
  importAccount: "import-account",
  getSelectedAccount: "get-selected-account",
  getAllAccounts: "get-all-accounts",
  setSelectedAccount: "set-selected-account",
  updateAccountName: "update-account-name",
};

const TestComponent = () => {
  const {
    createAccount,
    deriveAccount,
    getAllAccounts,
    getSelectedAccount,
    importAccount,
    setSelectedAccount,
    updateAccountName,
  } = useAccountContext();

  return (
    <>
      <button
        data-testid={testIds.setSelectedAccount}
        onClick={() => setSelectedAccount(selectedEVMAccountMock as Account)}
      />
      <button
        data-testid={testIds.getAllAccounts}
        onClick={() => getAllAccounts(null)}
      />
      <button
        data-testid={testIds.getSelectedAccount}
        onClick={getSelectedAccount}
      />
      <button
        data-testid={testIds.createAccount}
        onClick={() => createAccount({} as AccountFormType)}
      />
      <button
        data-testid={testIds.importAccount}
        onClick={() => importAccount({} as AccountFormType)}
      />
      <button
        data-testid={testIds.deriveAccount}
        onClick={() => deriveAccount({} as AccountFormType)}
      />
      <button
        data-testid={testIds.updateAccountName}
        onClick={() => updateAccountName("EVM-123", "newName")}
      />
    </>
  );
};

const renderComponent = () => {
  return render(
    <I18nextProvider i18n={i18n}>
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    </I18nextProvider>
  );
};

const createAccount = vi.fn().mockReturnValue(true);
const deriveAccount = vi.fn().mockReturnValue(true);
const importAccount = vi.fn().mockReturnValue(true);
const changeAccountName = vi.fn();

const setSelectedAccount = vi.fn();
const getSelectedAccount = vi.fn();
const getAllAccounts = vi.fn();
const getNetwork = vi.fn();

describe("AccountProvider", () => {
  beforeAll(() => {
    vi.mock("../networkProvider/NetworkProvider.tsx", () => ({
      useNetworkContext: vi.fn().mockReturnValue({
        state: {
          selectedChain: CHAINS[0].chains[1],
        },
        setNewRpc: vi.fn(),
        setSelectNetwork: vi.fn(),
      }),
    }));
    vi.mock("../authProvider/AuthProvider.tsx", () => ({
      useAuthContext: vi.fn().mockReturnValue({
        createAccount: () => createAccount(),
        deriveAccount: () => deriveAccount(),
        importAccount: () => importAccount(),
      }),
    }));
    vi.mock("@src/hooks", () => ({
      useToast: vi.fn().mockReturnValue({
        showErrorToast: vi.fn(),
      }),
    }));
    vi.mock("@src/Extension", () => ({
      default: {
        setSelectedAccount: () => setSelectedAccount(),
        getSelectedAccount: () => getSelectedAccount(),
        getNetwork: () => getNetwork(),
        getAllAccounts: () => getAllAccounts(),
        changeAccountName: () => changeAccountName(),
      },
    }));
  });

  describe("reducer", () => {
    it("should set accounts", () => {
      const state = {
        accounts: [],
        isLoadingAccounts: true,
        selectedAccount: {
          address: "0x123",
        },
      } as unknown as InitialState;

      const result = reducer(state, {
        type: "change-selected-address-format",
        payload: {
          address: "0x1234",
        },
      });
      expect(result.selectedAccount.value.address).toEqual("0x1234");
    });

    it("should update account name", () => {
      const account = {
        key: "key",
        name: "originalName",
      } as unknown as Account;

      const state = {
        accounts: [account],
        isLoadingAccounts: true,
        selectedAccount: account,
      } as unknown as InitialState;

      const result = reducer(state, {
        type: "update-account-name",
        payload: {
          name: "newName",
        },
      });
      expect(result.accounts[0].value.name).toEqual("newName");
      expect(result.selectedAccount.value.name).toEqual("newName");
    });
  });

  it("should create account", async () => {
    renderComponent();

    const btn = await screen.findByTestId(testIds.createAccount);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => expect(createAccount).toHaveBeenCalled());
  });

  it("should import account", async () => {
    renderComponent();

    const btn = await screen.findByTestId(testIds.importAccount);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => expect(importAccount).toHaveBeenCalled());
  });

  it("should derive account", async () => {
    renderComponent();

    const btn = await screen.findByTestId(testIds.deriveAccount);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => expect(deriveAccount).toHaveBeenCalled());
  });

  it("should call get selected account", async () => {
    const Extension = (await import("@src/Extension")).default;

    const getNetwork = vi.fn().mockReturnValue({
      chain: CHAINS[0].chains[2],
    });

    Extension.getSelectedAccount = vi
      .fn()
      .mockReturnValue(selectedEVMAccountMock);

    Extension.getNetwork = getNetwork;

    renderComponent();

    const btn = await screen.findByTestId(testIds.getSelectedAccount);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => {
      expect(getNetwork).toHaveBeenCalled();
    });
  });

  it("should call get all accounts", async () => {
    renderComponent();

    const btn = await screen.findByTestId(testIds.getAllAccounts);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => expect(getAllAccounts).toHaveBeenCalled());
  });

  it("should change account name", async () => {
    renderComponent();

    const btn = screen.getByTestId(testIds.updateAccountName);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => expect(changeAccountName).toHaveBeenCalled());
  });

  it("should set selected account", async () => {
    renderComponent();

    const btn = screen.getByTestId(testIds.setSelectedAccount);
    act(() => {
      fireEvent.click(btn);
    });
    await waitFor(() => expect(setSelectedAccount).toHaveBeenCalled());
  });
});
