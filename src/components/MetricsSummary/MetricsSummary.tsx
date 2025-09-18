import { Card, Statistic, Typography } from "antd";
import styles from "./MetricsSummary.module.css";

interface MetricsSummaryProps {
  totalAUM: string;
  productCount: number;
  averageSharpe: string;
  bestFundName: string;
  bestFundReturn: string;
}

export function MetricsSummary({
  totalAUM,
  productCount,
  averageSharpe,
  bestFundName,
  bestFundReturn,
}: MetricsSummaryProps) {
  return (
    <div className={styles.grid}>
      <Card bordered={false}>
        <Statistic
          title="管理规模（AUM）"
          value={totalAUM}
          valueStyle={{ fontSize: 24 }}
        />
        <Typography.Text type="secondary">
          覆盖 {productCount} 只存续产品
        </Typography.Text>
      </Card>
      <Card bordered={false}>
        <Statistic
          title="平均夏普比率"
          value={averageSharpe}
          valueStyle={{ fontSize: 24 }}
        />
        <Typography.Text type="secondary">
          维持稳健风险收益水平
        </Typography.Text>
      </Card>
      <Card bordered={false}>
        <Statistic
          title="年度表现最佳"
          value={bestFundName}
          valueStyle={{ fontSize: 18 }}
        />
        <Typography.Text type="success">
          今年以来 {bestFundReturn}
        </Typography.Text>
      </Card>
    </div>
  );
}
