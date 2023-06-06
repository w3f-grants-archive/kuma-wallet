import i18n from "@src/utils/i18n";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { AboutUs } from "./AboutUs";

const renderComponent = () => {
  return render(
    <I18nextProvider i18n={i18n}>
      <AboutUs />
    </I18nextProvider>
  );
};

describe("AboutUs", () => {
  beforeAll(() => {
    vi.mock("react-router-dom", () => ({
      useNavigate: () => vi.fn(),
    }));
  });

  it("should render", () => {
    const { container } = renderComponent();

    expect(container).toBeDefined();
  });
});
