import React, { useContext } from "react";
import { salamiBalance } from "./../UserContext";

function Balance() {
  const { balance } = useContext(salamiBalance);
  return (
    <div>
      <h4>ঈদ সালামি থেকে মোট আয় : {balance.earn} টাকা</h4>
      <h4>ঈদ সালামি থেকে মোট খরচ : {balance.spend} টাকা</h4>
      <hr />
      <h3>মোট আছে : {balance.earn - balance.spend} টাকা</h3>
    </div>
  );
}

export default Balance;
