import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    MuiContainer: {
      root: {
        fontFamily: '"Raleway","Roboto", "Helvetica", "Arial", sans-serif'
      }
    },
    MuiButton: {
      root: {
        borderRadius: 15,
        fontSize: 12,
        padding: '6px 27px',
        lineHeight: 1.5
      },
      contained: {
        backgroundColor: '#33CCCC',
        minWidth: 150,
        color: '#FFF',
        boxShadow: '0px 2px 4px #00000029'
      }
    },
    MuiFormControlLabel: {
      root: {
        float: 'left',
        marginLeft: 0
      }
    }
  }
})

export default theme
