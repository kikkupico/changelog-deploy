import { render } from "@testing-library/react";
import { PageLayout } from "../../../components/composed/PageLayout";
import "@testing-library/jest-dom";

// used snapshoht here because layout barely ever changes

test("Matches PageLayout Snapshot", () => {
  const pageLayout = render(
    <PageLayout>
      <div>Test children</div>
    </PageLayout>
  );
  expect(pageLayout).toMatchSnapshot();
});
