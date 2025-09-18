import { Layout, Typography } from "antd";
import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function AppLayout({ title, description, children }: AppLayoutProps) {
  return (
    <Layout className={styles.layout}>
      <Layout.Header className={styles.header}>
        <Typography.Title level={3} className={styles.title}>
          {title}
        </Typography.Title>
        <Typography.Text className={styles.subtitle}>{description}</Typography.Text>
      </Layout.Header>
      <Layout.Content className={styles.content}>{children}</Layout.Content>
    </Layout>
  );
}
