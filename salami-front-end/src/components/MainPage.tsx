import React, { useState, ReactNode } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Earn from "./Earn/Earn";
import Spend from "./Spend/Spend";
import Balance from "./Balance/Balance";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div hidden={value !== index} id={`scrollable-auto-tabpanel-${index}`}>
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function MainPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="সালামি থেকে আয়" />
          <Tab label="সালামি থেকে খরচ" />
          <Tab label="বর্তমানে যা আছে" />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <Earn />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Spend />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Balance />
      </TabPanel>
    </>
  );
}

export default MainPage;
