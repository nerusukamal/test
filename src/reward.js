/* eslint-disable */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  },
  button: {
    margin: theme.spacing(1)
  },
  root: {
    minWidth: 275,
    marginBottom: "1em",
    marginTop: "1em"
  },
  pos: {
    marginBottom: 12
  }
}));

const rows = [
  { Dates: "1/2/2020", TransactionAmount: 200, CustName: "Mike" },
  { Dates: "1/2/2020", TransactionAmount: 140, CustName: "John" },
  { Dates: "2/10/2020", TransactionAmount: 240, CustName: "Mike" },
  { Dates: "3/10/2020", TransactionAmount: 220, CustName: "Steve" },
  { Dates: "4/20/2020", TransactionAmount: 180, CustName: "Steve" },
  { Dates: "2/2/2020", TransactionAmount: 140, CustName: "John" },
  { Dates: "5/10/2020", TransactionAmount: 250, CustName: "John" },
  { Dates: "1/22/2020", TransactionAmount: 180, CustName: "Mike" },
  { Dates: "6/2/2020", TransactionAmount: 150, CustName: "Steve" },
  { Dates: "4/10/2020", TransactionAmount: 200, CustName: "Mike" },
  { Dates: "1/20/2020", TransactionAmount: 110, CustName: "John" },
  { Dates: "3/20/2020", TransactionAmount: 120, CustName: "John" },
  { Dates: "3/20/2020", TransactionAmount: 140, CustName: "John" }
];

export default function RewardCalculator() {
  const classes = useStyles();
  const [resultData, setResultData] = useState([]);

  const calculateRewardHandleClick = e => {
    e.preventDefault();

    let group = rows.reduce((r, a) => {
      r[a.CustName] = [...(r[a.CustName] || []), a];
      return r;
    }, {});
    let customerName;
    let transactionMonth;

    let result = [];
    let finalResultArray = [];
    for (let x of Object.keys(group)) {
      result = [];
      let obj = "";
      group[x].forEach(transactions => {
        let reward = 0;
        var d = new Date(transactions.Dates); //converts the string into date object
        transactionMonth = d.getMonth() + 1; //get the value of month
        let transactionAmount = transactions.TransactionAmount;
        reward =
          transactionAmount <= 50
            ? 0
            : transactionAmount > 50 && transactionAmount <= 100
            ? (transactionAmount - 50) * 1
            : (transactionAmount - 50) * 1 + (transactionAmount - 100);

        customerName = transactions.CustName;

        let ValueExist = result.filter(function(o) {
          return o.month === transactionMonth;
        });
        if (ValueExist.length === 0) {
          obj = { month: transactionMonth, reward: reward };
          result.push(obj);
        } else {
          result.map(element => {
            if (element.month === transactionMonth) element.reward += reward;
          });
        }
      });
      let totalMonthlySum = 0;

      result.forEach(element => {
        totalMonthlySum += element.reward;
      });
      finalResultArray.push({
        customerName: customerName,
        monthlyReward: result,
        totalReward: totalMonthlySum
      });
    }
    setResultData(finalResultArray);
  };

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dates</TableCell>
              <TableCell>Transaction Amount</TableCell>
              <TableCell>Customer Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.Dates}
                </TableCell>
                <TableCell>{row.TransactionAmount}</TableCell>
                <TableCell>{row.CustName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={calculateRewardHandleClick}
      >
        Calculate Reward
      </Button>
      {resultData.map((row, index) => (
        <Card className={classes.root} key={index} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              Reward summary for {row.customerName}
            </Typography>
            {row.monthlyReward &&
              row.monthlyReward.length &&
              row.monthlyReward.map((innerRow, innerIndex) => (
                <Typography
                  className={classes.pos}
                  key={innerIndex}
                  color="textSecondary"
                >
                  FOR MONTH {innerRow.month} REWARD = {innerRow.reward}
                </Typography>
              ))}

            <Typography variant="body2" component="p">
              Total Reward = {row.totalReward}
              <br />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
}
