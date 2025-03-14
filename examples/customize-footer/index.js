import React, { useState } from 'react';
import MUIDataTable from '../../src/';
import CustomFooter from './CustomFooter';
import makeStyles from '@mui/styles/makeStyles';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  footerCell: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: 'none',
  },
  stickyFooterCell: {
    position: 'sticky',
    bottom: 0,
    zIndex: 100,
  },
}));

function Example() {
  const [resizableColumns, setResizableColumns] = useState(false);
  const [stickyFooter, setStickyFooter] = useState(true);
  const classes = useStyles();

  const columns = ['Name', 'Title', 'Location', 'Age', 'Salary'];

  let data = [
    ['Gabby George', 'Business Analyst', 'Minneapolis', 30, 100000],
    ['Aiden Lloyd', 'Business Consultant', 'Dallas', 55, 200000],
    ['Jaden Collins', 'Attorney', 'Santa Ana', 27, 500000],
    ['Franky Rees', 'Business Analyst', 'St. Petersburg', 22, 50000],
    ['Aaren Rose', 'Business Consultant', 'Toledo', 28, 75000],
    ['Blake Duncan', 'Business Management Analyst', 'San Diego', 65, 94000],
    ['Frankie Parry', 'Agency Legal Counsel', 'Jacksonville', 71, 210000],
    ['Lane Wilson', 'Commercial Specialist', 'Omaha', 19, 65000],
    ['Robin Duncan', 'Business Analyst', 'Los Angeles', 20, 77000],
    ['Mel Brooks', 'Business Consultant', 'Oklahoma City', 37, 135000],
    ['Harper White', 'Attorney', 'Pittsburgh', 52, 420000],
    ['Kris Humphrey', 'Agency Legal Counsel', 'Laredo', 30, 150000],
    ['Frankie Long', 'Industrial Analyst', 'Austin', 31, 170000],
    ['Brynn Robbins', 'Business Analyst', 'Norfolk', 22, 90000],
    ['Justice Mann', 'Business Consultant', 'Chicago', 24, 133000],
    ['Addison Navarro', 'Business Management Analyst', 'New York', 50, 295000],
    ['Jesse Welch', 'Agency Legal Counsel', 'Seattle', 28, 200000],
    ['Eli Mejia', 'Commercial Specialist', 'Long Beach', 65, 400000],
    ['Gene Leblanc', 'Industrial Analyst', 'Hartford', 34, 110000],
    ['Danny Leon', 'Computer Scientist', 'Newark', 60, 220000],
    ['Lane Lee', 'Corporate Counselor', 'Cincinnati', 52, 180000],
    ['Jesse Hall', 'Business Analyst', 'Baltimore', 44, 99000],
    ['Danni Hudson', 'Agency Legal Counsel', 'Tampa', 37, 90000],
    ['Terry Macdonald', 'Commercial Specialist', 'Miami', 39, 140000],
    ['Justice Mccarthy', 'Attorney', 'Tucson', 26, 330000],
    ['Silver Carey', 'Computer Scientist', 'Memphis', 47, 250000],
    ['Franky Miles', 'Industrial Analyst', 'Buffalo', 49, 190000],
    ['Glen Nixon', 'Corporate Counselor', 'Arlington', 44, 80000],
    ['Gabby Strickland', 'Business Process Consultant', 'Scottsdale', 26, 45000],
    ['Mason Ray', 'Computer Scientist', 'San Francisco', 39, 142000],
  ];

  const footerClasses = clsx({
    [classes.footerCell]: true,
    [classes.stickyFooterCell]: stickyFooter,
  });

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    tableBodyHeight: '500px',
    rowsPerPage: 10,
    resizableColumns: resizableColumns,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) => {
      return (
        <CustomFooter
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          changePage={changePage}
          textLabels={textLabels}
        />
      );
    },
    customTableBodyFooterRender: function(opts) {
      console.dir(opts);

      let avgAge =
        opts.data.reduce((accu, item) => {
          return accu + item.data[3];
        }, 0) / opts.data.length;

      let avgSalary =
        opts.data.reduce((accu, item) => {
          return accu + item.data[4];
        }, 0) / opts.data.length;

      avgAge = Math.round(avgAge);
      avgSalary = Math.round(avgSalary);

      return (
        <TableFooter className={footerClasses}>
          <TableRow>
            {opts.selectableRows !== 'none' ? <TableCell className={footerClasses} /> : null}
            {opts.columns.map((col, index) => {
              if (col.display === 'true') {
                if (col.name === 'Age') {
                  return (
                    <TableCell key={index} className={footerClasses}>
                      Avg: {avgAge}
                    </TableCell>
                  );
                } else if (col.name === 'Salary') {
                  return (
                    <TableCell key={index} className={footerClasses}>
                      Avg: {avgSalary}
                    </TableCell>
                  );
                } else {
                  return <TableCell key={index} className={footerClasses} />;
                }
              }
              return null;
            })}
          </TableRow>
        </TableFooter>
      );
    },
  };

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={resizableColumns}
              onChange={e => setResizableColumns(e.target.checked)}
              value="denseTable"
              color="primary"
            />
          }
          label="Resizable Columns"
        />
        <FormControlLabel
          control={
            <Switch
              checked={stickyFooter}
              onChange={e => setStickyFooter(e.target.checked)}
              value="stacked"
              color="primary"
            />
          }
          label="Sticky Footer"
        />
      </FormGroup>
      <MUIDataTable title={'ACME Employee list'} data={data} columns={columns} options={options} />
    </>
  );
}

export default Example;
