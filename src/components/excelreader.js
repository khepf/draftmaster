import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from '../util/makeColumns';
import { SheetJSFT } from '../util/types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';



class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      fileChosen: false,
      nameChosen: false,
      yearChosen: false,
      leagueName: '',
      leagueYear: null,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
  }


  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) {
      this.setState({ file: files[0], fileChosen: true });
    }
  }

  handleNameChange(e) {
    const name = e.target.value;
    console.log('jmk name e', e.target.value);
    if (name) {
      this.setState({ leagueName: name, nameChosen: true });
    }
  }

  handleYearChange(e) {
    const year = e.target.value
    console.log('jmk year e', e.target.value);
    if (year) {
      this.setState({ leagueYear: year, yearChosen: true });
    }
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
        const [open, setOpen] = React.useState(false);
        const draft = {};
        const playerNames = this.state.data
          .map((player) => {
            return player.Name;
          })
          .filter((name) => {
            return name !== undefined && name !== 'Name';
          });
        draft.playerNames = playerNames;
        draft.leagueName = this.state.leagueName;
        draft.leagueYear = this.state.leagueYear;

        console.log(draft);
        console.log(playerNames);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        const options = {
          url:
            'https://us-central1-draftmaster-3fe86.cloudfunctions.net/api/drafts',
          method: 'post',
          data: draft,
        };


        axios(options)
        .then(() => {
          console.log('Draft Uploaded Successfully');
        }).catch((error) => {
          console.log('error', error);
        });
      });
      this.setState({
        leagueName: '',
        leagueYear: null,
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
        <h4>Import Draft</h4>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="League Name"
            variant="outlined"
            onChange={this.handleNameChange}
          />
          <TextField
            id="outlined-basic"
            label="League Year"
            variant="outlined"
            onChange={this.handleYearChange}
          />
        </form>
        <div style={{ margin: '15px 0 15px 0' }}>
          <label htmlFor="file">Upload an Excel File</label>
          <br />
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            type="submit"
            onClick={this.handleFile}
            color="primary"
            variant="contained"
            disabled={
              !this.state.fileChosen ||
              !this.state.nameChosen ||
              !this.state.yearChosen
            }
          >
            Import Draft
          </Button>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message="Note archived"
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={this.handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

export default ExcelReader;
