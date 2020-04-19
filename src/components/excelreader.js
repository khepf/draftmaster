import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from '../util/makeColumns';
import { SheetJSFT } from '../util/types';
import axios from 'axios';

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? 'binary' : 'array',
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        const playerData = JSON.stringify(this.state.data, null, 2);
        const playerNames = this.state.data
        .map((player) => {
          return player.Name;
        })
        .filter((name) => {
          return name != undefined
        })
        
        // console.log(playerData);
        // console.log(this.state.data[0]);
        console.log(playerNames);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        const options = {
          url:
            'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/players',
          method: 'post',
          data: playerNames,
        };
        console.log('1');
        axios(options)
        .then(() => {
          console.log('it worked');
        }).catch((error) => {
          console.log(error);
        });
        console.log('2');


      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
    return (
      <div>
        <label htmlFor="file">Upload an excel to Process Triggers</label>
        <br />
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
        <br />
        <input
          type="submit"
          value="Process Triggers"
          onClick={this.handleFile}
        />
      </div>
    );
  }
}

export default ExcelReader;
