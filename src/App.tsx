import { ConfigProvider } from "antd";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppLayout } from "./components/AppLayout/AppLayout";
import { MetricsSummary } from "./components/MetricsSummary/MetricsSummary";
import { FundTable } from "./components/FundTable/FundTable";
import { mockFunds } from "./data/mockFunds";
import { formatterCurrency, formatterPercent } from "./utils/formatters";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#1677ff",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  const totalAUM = mockFunds.reduce((acc, item) => acc + item.aum, 0);
  const avgSharpe =
    mockFunds.reduce((acc, item) => acc + item.sharpe, 0) / mockFunds.length;
  const bestFund = mockFunds.reduce((prev, current) =>
    prev.ytdReturn > current.ytdReturn ? prev : current,
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 8,
          fontFamily: 'Inter, \\"Segoe UI\\", Helvetica, Arial, sans-serif',
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout
          title="基金产品收益资产看板"
          description="汇总期初、期末及股票期货敞口，支持快速筛选、排序与分组"
        >
          <MetricsSummary
            totalAUM={formatterCurrency.format(totalAUM)}
            productCount={mockFunds.length}
            averageSharpe={avgSharpe.toFixed(2)}
            bestFundName={bestFund.fundName}
            bestFundReturn={formatterPercent.format(bestFund.ytdReturn)}
          />
          <FundTable data={mockFunds} />
        </AppLayout>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
